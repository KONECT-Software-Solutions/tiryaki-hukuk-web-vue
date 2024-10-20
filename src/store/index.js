// src/store/index.js
import { createStore } from "vuex";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { auth, db } from "../firebase"; // Adjust the import according to your firebase setup
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  signOut,
} from "firebase/auth";
import { formatDate, convertMonthToTurkish } from "../utils";

export default createStore({
  state: {
    blogs: [],
    attorneys: [],
    user: JSON.parse(localStorage.getItem("user")) || null,
    appointmentProcessData: JSON.parse(
      localStorage.getItem("appointmentProcessData")
    ) || {
      appointmentToken: null,
      paymentToken: null,
      expireTime: null,
      currentStep: null,
      userData: {},
      in24Hours: true,
      paymentStatus: null,
      attorneyData: {},
      formData: {},
      selectedDate: null,
      selectedDay: null,
      selectedDateForDisplay: null,
      selectedSlot: null,
      uploadedFiles: [],
      notes: null,
      isFinished: false,
    },
    meetings: [],
  },
  getters: {
    getBlogById: (state) => (id) => {
      return state.blogs.find((blog) => blog.id === id);
    },
    getBlogs: (state) => {
      return state.blogs;
    },
    getAttorneyById: (state) => (id) => {
      return state.attorneys.find((attorney) => attorney.id === id);
    },
    isAuthenticated: (state) => {
      return !!state.user;
    },
    getUser: (state) => {
      return state.user;
    },
    getUserId: (state) => {
      return state.user.uid;
    },
    getMeetings: (state) => {
      return state.meetings;
    },
    getMeetingById: (state) => (id) => {
      return state.meetings.find((meeting) => meeting.id === id);
    },
    getAppointmentProcessData: (state) => {
      return state.appointmentProcessData;
    },
  },
  mutations: {
    setBlogs(state, blogs) {
      state.blogs = blogs;
    },
    setBlog(state, blog) {
      const index = state.blogs.findIndex((b) => b.id === blog.id);
      if (index !== -1) {
        state.blogs.splice(index, 1, blog);
      } else {
        state.blogs.push(blog);
      }
    },
    setAttorneys(state, attorneys) {
      state.attorneys = attorneys;
    },
    setAttorney(state, attorney) {
      state.attorney = attorney;
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user)); // Store user in localStorage
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem("user"); // Remove user from localStorage
    },
    updateUserDataMeetings(state, newMeetingId) {
      state.user.meetings.push(newMeetingId);
      localStorage.setItem("user", JSON.stringify(state.user));
      console.log("new meeting id added to user.meetings", state.user.meetings);
    },
    updateMeetingStatus(state, { id, status }) {
      const index = state.meetings.findIndex((b) => b.id === id);
      if (index !== -1) {
        state.meetings[index].status = status;
      }
      console.log("index", index);
      console.log("state.meetings", state.meetings);
    },
    setMeetings(state, meetings) {
      state.meetings = meetings;
    },
    setAppointmentProcessData(state, data) {
      localStorage.removeItem("appointmentProcessData");
      state.appointmentProcessData = {
        ...state.appointmentProcessData,
        ...data,
      };
      localStorage.setItem(
        "appointmentProcessData",
        JSON.stringify(state.appointmentProcessData)
      );
    },
    resetAppointmentProcessData(state) {
      state.appointmentProcessData = {
        appointmentToken: null,
        paymentToken: null,
        expireTime: null,
        currentStep: null,
        userData: {},
        in24Hours: null,
        paymentStatus: null,
        attorneyData: {},
        formData: {},
        selectedDate: null,
        selectedDay: null,
        selectedDateForDisplay: null,
        selectedSlot: null,
        uploadedFiles: [],
        notes: null,
        isFinished: false,
      };
      localStorage.removeItem("appointmentProcessData");
    },
  },
  actions: {
    async fetchBlogs({ commit }) {
      console.log("fetching blogs...");
      const blogRef = collection(db, "blogs");
      let blogs = [];
      const querySnapshot = await getDocs(blogRef);
      for (const doc of querySnapshot.docs) {
        let docData = doc.data();
        docData.id = doc.id;
        const commentsRef = collection(db, "blogs", doc.id, "comments");
        const commentData = [];
        const commentsSnapshot = await getDocs(commentsRef);
        commentsSnapshot.docs.forEach((commentDoc) => {
          commentData.push(commentDoc.data());
        });
        docData.comments = commentData;
        blogs.push(docData);
      }
      // Format the date fields
      blogs = blogs.map((blog) => {
        const formattedCreatedDate = formatDate(blog.created_date);
        const formattedUpdatedDate = formatDate(blog.updated_date);

        const [day, month, year] = formattedCreatedDate.split(".");

        return {
          ...blog,
          created_date: formattedCreatedDate,
          updated_date: formattedUpdatedDate,
          day: day,
          month: convertMonthToTurkish(month),
          year: year,
        };
      });
      commit("setBlogs", blogs);
    },
    async fetchBlogById({ commit }, id) {
      console.log("fetching blog by ID... vuex store");
      try {
        const blogDocRef = doc(db, "blogs", id);
        const blogDoc = await getDoc(blogDocRef);
        if (blogDoc.exists()) {
          let blog = blogDoc.data();
          blog.id = blogDoc.id;

          if (blog.view_count) {
            console.log("page view + 1");
            // If the document exists, increment the view count
            await updateDoc(blogDocRef, {
              view_count: increment(1),
            });
          } else {
            console.log("page view set to 1");
            // If the document doesn't exist, set the view count to 1
            await updateDoc(blogDocRef, {
              view_count: 1,
            });
          }

          const formattedCreatedDate = formatDate(blog.created_date);
          const formattedUpdatedDate = formatDate(blog.updated_date);
          const [day, month, year] = formattedCreatedDate.split(".");

          blog = {
            ...blog,
            created_date: formattedCreatedDate,
            updated_date: formattedUpdatedDate,
            day: day,
            month: convertMonthToTurkish(month),
            year: year,
          };
          commit("setBlog", blog);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching blog by ID:", error);
      }
    },
    async fetchAttorneys({ commit }) {
      console.log("fetching attorneys...");
      const attorneyRef = collection(db, "attorneys");
      let attorneys = [];
      const querySnapshot = await getDocs(attorneyRef);
      querySnapshot.forEach((doc) => {
        let docData = doc.data();
        docData.id = doc.id;
        attorneys.push(docData);
      });
      commit("setAttorneys", attorneys);
      console.log("Attorneys data fetched successfully.");
    },
    async fetchAttorneyById({ commit }, id) {
      try {
        const attorneyDocRef = doc(db, "attorneys", id);
        const attorneyDoc = await getDoc(attorneyDocRef);
        if (attorneyDoc.exists()) {
          let attorney = attorneyDoc.data();
          attorney.id = attorneyDoc.id;
          commit("setAttorney", attorney);
        }
      } catch (error) {
        console.error("Error fetching attorney by ID:", error);
      }
    },
    async signIn({ commit }, { email, password, rememberMe }) {
      console.log("Signing in...");

      try {
        // Set Firebase auth persistence based on rememberMe
        const persistenceType = rememberMe
          ? browserLocalPersistence // Persist session across browser restarts
          : browserSessionPersistence; // Only for current session

        // Set the persistence before signing in
        await setPersistence(auth, persistenceType);

        // Sign in with email and password
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user; // Firebase Auth user data

        // Fetch additional user data from Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          // Merge Auth and Firestore user data
          const userData = { ...user, ...userDoc.data() };

          // Commit the combined user data to Vuex
          commit("setUser", userData);
          localStorage.setItem("user", JSON.stringify(userData)); // Sync with localStorage
        } else {
          console.log("No user document found in Firestore");
        }
      } catch (error) {
        console.error("Error signing in:", error);
        throw error;
      }
    },
    async signOut({ commit }) {
      console.log("Signing out...");
      try {
        await signOut(auth);
        commit("clearUser");
        commit("resetAppointmentProcessData");
      } catch (error) {
        console.error("Error signing out:", error);
        throw error;
      }
    },
    async deleteException({ exceptionData }) {
      try {
        const attorneyDocRef = doc(db, "attorneys", exceptionData.attorney_id);
        const attorneyDoc = await getDoc(attorneyDocRef);
        if (attorneyDoc.exists()) {
          const attorneyData = attorneyDoc.data();
          const exceptions = attorneyData.exceptions || [];
          const updatedExceptions = exceptions.filter(
            (exception) => exception.meeting_id !== exceptionData.meeting_id
          );
          await updateDoc(attorneyDocRef, { exceptions: updatedExceptions });
        }
      } catch (error) {
        console.error("Error fetching attorney by ID:", error);
      }
    },
    async fetchMeetingsData({ commit }, { meetingIds }) {
      console.log("fetching meetings...");
      try {
        const meetingsData = [];
        for (const meetingId of meetingIds) {
          const meetingDocRef = doc(db, "meetings", meetingId);
          const meetingDoc = await getDoc(meetingDocRef);
          if (meetingDoc.exists()) {
            meetingsData.push({ id: meetingDocRef.id, ...meetingDoc.data() });
          }
        }
        meetingsData.forEach((meeting) => {
          const deadline = new Date(meeting.deadline.seconds * 1000);
          const currentDate = new Date();
          if (
            currentDate > deadline &&
            meeting.status === "1" &&
            meeting.payment_status === "0"
          ) {
            // find this meeting in the firestore and update the status to 6
            const docRef = doc(db, "meetings", meeting.id);
            updateDoc(docRef, {
              status: "6",
              cancel_reason: "Ödeme süresi geçti.",
              payment_status: "2",
            });
            deleteException({
              attorney_id: meeting.attorney_id,
              meeting_id: meeting.id,
            });
            return true;
          } else {
            return false;
          }
        });
        console.log("Meetings data", meetingsData);
        commit("setMeetings", meetingsData);
        console.log("Meetings data fetched successfully.");
      } catch (error) {
        console.error("Error fetching meetings data by ID:", error);
      }
    },
  },
});
