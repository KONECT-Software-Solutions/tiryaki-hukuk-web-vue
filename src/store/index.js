// src/store/index.js
import { createStore } from "vuex";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase"; // Adjust the import according to your firebase setup
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { formatDate, convertMonthToTurkish } from "../utils";

export default createStore({
  state: {
    blogs: [],
    attorneys: [],
    user: null,
    dateTimePickerData: {
      attorneyId: null,
      selectedDate: null,
      selectedDay: null,
      selectedDateForDisplay: null,
      selectedSlot: null,
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
    getMeetings: (state) => {
      return state.meetings;
    },
    getDateTimePickerData: (state) => {
      return state.dateTimePickerData;
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
    setDateTimePickerData(state, data) {
      state.dateTimePickerData = { ...state.dateTimePickerData, ...data };
    },
    clearDateTimePickerData(state) {
      state.dateTimePickerData = {
        attorneyId: null,
        selectedDate: null,
        selectedDay: null,
        selectedDateForDisplay: null,
        selectedSlot: null,
      };
    },
    setMeetings(state, meetings) {
      state.meetings = meetings;
    },
    updateMeetingStatus(state, { id, status }) {
      const meeting = state.meetings.find((meeting) => meeting.id === id);
      if (meeting) {
        meeting.status = status;
      }
    },
    updatePaymentStatus(state, { id, payment_status }) {
      const meeting = state.meetings.find((meeting) => meeting.id === id);
      if (meeting) {
        meeting.payment_status = payment_status;
      }
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
      try {
        const blogDocRef = doc(db, "blogs", id);
        const blogDoc = await getDoc(blogDocRef);
        if (blogDoc.exists()) {
          let blog = blogDoc.data();
          blog.id = blogDoc.id;

          const commentsRef = collection(db, "blogs", id, "comments");
          const commentData = [];
          const commentsSnapshot = await getDocs(commentsRef);
          commentsSnapshot.docs.forEach((commentDoc) => {
            commentData.push(commentDoc.data());
          });
          blog.comments = commentData;

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
    async signIn({ commit }, { email, password }) {
      console.log("Signing in...");
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        commit("setUser", userCredential.user);
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
      } catch (error) {
        console.error("Error signing out:", error);
        throw error;
      }
    },
    async fetchUserData({ commit }) {
      console.log("fetchUserData invoked.");

      // Check if the user is already authenticated (even if there's data in local storage)
      const localUser = localStorage.getItem("user");

      if (localUser) {
        console.log("User found in localStorage.");
        const user = JSON.parse(localUser);
        commit("setUser", user); // Use the local storage data for quick initialization
      }

      // Always attempt to fetch fresh data from Firestore
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          console.log("Fetching fresh user data from Firestore.");
          try {
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
              const freshUser = { ...user, ...userDoc.data() };
              commit("setUser", freshUser); // Update Vuex store with fresh data
              localStorage.setItem("user", JSON.stringify(freshUser)); // Sync with localStorage
            } else {
              console.log("No such document found in Firestore!");
            }
          } catch (error) {
            console.error("Error fetching user data from Firestore:", error);
          }
        } else {
          console.log("No user is signed in.");
          commit("clearUser");
        }
      });
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
          if (currentDate > deadline && meeting.status === "1" && meeting.payment_status === "0") {
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
    updateDateTimePickerData({ commit }, data) {
      commit("clearDateTimePickerData");
      commit("setDateTimePickerData", data);
      localStorage.setItem("dateTimePickerData", JSON.stringify(data));
    },
  },
});
