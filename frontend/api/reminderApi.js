import axios from "axios";
import { auth } from "../firebase/config";

// Base URL to your backend (adjust port if needed)
const API_URL = "http://localhost:5001/api/reminders";

// Function to create a new reminder
export async function createReminder(reminderData) {
  // 🔑 Get Firebase user token
  const token = await auth.currentUser.getIdToken();

  // 🔒 Send it as Authorization header
  const res = await axios.post(API_URL, reminderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

// Function to fetch all reminders for the logged-in user
export async function getReminders() {
  const token = await auth.currentUser.getIdToken();

  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
