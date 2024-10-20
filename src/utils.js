import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

const addNotification = async (notificationData, type) => {
    console.log("adding new notification")
    notificationData.type = type;
    notificationData.date_tr = new Date().toLocaleDateString("tr-TR");;
    notificationData.date_tmsp = new Date()
      try {
        const notificationsRef = collection(db, "notifications");
        const docRef = await addDoc(notificationsRef, notificationData); // Ensure addDoc is awaited
        console.log("notification succesfully added")
      } catch (error) {
        console.error("Error adding notification data:", error);
      }
};
const convertTimestampToDate = (timestamp_str) => {
  const timestamp = Number(timestamp_str);

  // Create a new Date object using the timestamp
  const date = new Date(timestamp);

  // Extract date components and format them
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
};

function formatDate(timestamp) {
    if (!timestamp) return "";
    if (timestamp.seconds) {
      // Firestore timestamp
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleDateString("tr-TR");
    }
    if (typeof timestamp === "string") {
      // Already formatted string
      return timestamp;
    }
    const date = new Date(timestamp); // Fallback for any other case
    return date.toLocaleDateString("tr-TR");
  }
  
  function convertMonthToTurkish(month) {
    const monthMap = {
      "01": "OCA",
      "02": "ŞUB",
      "03": "MAR",
      "04": "NİS",
      "05": "MAY",
      "06": "HAZ",
      "07": "TEM",
      "08": "AĞU",
      "09": "EYL",
      10: "EKİ",
      11: "KAS",
      12: "ARA",
    };
    return monthMap[month];
  }

  export { formatDate, convertMonthToTurkish, addNotification, convertTimestampToDate};