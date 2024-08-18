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

  export { formatDate, convertMonthToTurkish };