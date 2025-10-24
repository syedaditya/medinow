import axios from "axios";
import { auth } from "../firebase/config";

const API_URL = "http://localhost:5001/api/reminders";

async function getTokenSafely() {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");
  return await user.getIdToken();
}

export async function createReminder(reminderData) {
  const token = await getTokenSafely();

  const res = await axios.post(API_URL, reminderData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function getReminders() {
  const token = await getTokenSafely();

  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
