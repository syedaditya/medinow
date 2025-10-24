import React, { useState } from "react";
import { createReminder, getReminders } from "../api/reminderApi";

function RemindersPage() {
  const [reminders, setReminders] = useState([]);

  const handleAdd = async () => {
    const reminderData = {
      medicineName: "Paracetamol",
      dosage: "1 tablet",
      time: new Date(),
    };
    await createReminder(reminderData);
    alert("✅ Reminder added!");
  };

  const handleFetch = async () => {
    const data = await getReminders();
    setReminders(data);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-semibold mb-4">💊 Your Medicine Reminders</h2>

      <div className="space-x-4 mb-6">
        <button
          onClick={handleAdd}
          className="bg-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
        >
          Add Reminder
        </button>
        <button
          onClick={handleFetch}
          className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition"
        >
          Fetch Reminders
        </button>
      </div>

      <ul className="space-y-2">
        {reminders.map((r) => (
          <li key={r._id} className="bg-gray-800 p-3 rounded-lg shadow">
            <strong>{r.medicineName}</strong> — {r.dosage}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RemindersPage;
