// src/store/index.js
import { createStore } from "vuex";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
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
    },
    clearUser(state) {
      state.user = null;
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
    updatePaymentStatus(state, { id, is_paid }) {
      const meeting = state.meetings.find((meeting) => meeting.id === id);
      if (meeting) {
        meeting.is_paid = is_paid;
      }
    }
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
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          console.log("User is signed in.");
          try {
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              user = { ...user, ...userDoc.data() };
              commit("setUser", user);
            } else {
              console.log("No such document!");
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        } else {
          console.log("No user is signed in.");
          commit("clearUser");
        }
      });
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
