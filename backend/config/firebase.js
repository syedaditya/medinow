const admin = require("firebase-admin");
const path = require("path");

const serviceAccount = require(path.join(__dirname, "mediinow-firebase-adminsdk-fbsvc-1f88e8831c.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log("✅ Firebase Admin initialized successfully");

module.exports = admin;
