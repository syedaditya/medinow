import React, { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { PlusCircle, BellRing, Upload, LogOut } from "lucide-react";
import { createReminder, getReminders } from "../api/reminderApi";
import PrescriptionUpload from "../sections/PrescriptionUpload";

export default function Dashboard() {
  const user = auth.currentUser;
  const [reminders, setReminders] = useState([]);
  const [form, setForm] = useState({ medicineName: "", dosage: "", time: "" });
  const [loading, setLoading] = useState(false);

  const fetchReminders = async () => {
    try {
      setLoading(true);
      const data = await getReminders();
      setReminders(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReminders(); }, []);

  const addReminder = async (e) => {
    e.preventDefault();
    if (!form.medicineName || !form.dosage || !form.time) return alert("Fill all fields");
    const payload = {
      medicineName: form.medicineName,
      dosage: form.dosage,
      time: new Date(form.time)
    };
    await createReminder(payload);
    setForm({ medicineName: "", dosage: "", time: "" });
    fetchReminders();
  };

  return (
    <div className="min-h-screen w-full text-white bg-[radial-gradient(1200px_600px_at_-10%_-10%,#0b1220,transparent),radial-gradient(800px_400px_at_120%_10%,#0b1220,transparent),linear-gradient(180deg,#020617, #0b1220)]">
      {/* top bar */}
      <header className="sticky top-0 z-10 bg-black/40 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-indigo-500" />
            <span className="font-semibold tracking-tight">MediNow</span>
          </div>
          <div className="flex items-center gap-4">
            {user?.photoURL && <img src={user.photoURL} alt="pfp" className="h-8 w-8 rounded-full border border-white/10" />}
            <span className="text-sm text-gray-300">{user?.displayName || user?.email}</span>
            <button
              onClick={() => signOut(auth)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 border border-white/10 text-sm"
              title="Logout"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* add reminder card */}
          <section className="md:col-span-2 bg-gray-900/60 border border-white/10 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <PlusCircle className="text-cyan-400" size={20} />
              <h2 className="text-lg font-semibold">Add Reminder</h2>
            </div>
            <form onSubmit={addReminder} className="grid sm:grid-cols-4 gap-3">
              <input
                className="sm:col-span-2 bg-black/40 border border-white/10 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Medicine name"
                value={form.medicineName}
                onChange={e => setForm({ ...form, medicineName: e.target.value })}
              />
              <input
                className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Dosage (e.g., 1 tablet)"
                value={form.dosage}
                onChange={e => setForm({ ...form, dosage: e.target.value })}
              />
              <input
                type="datetime-local"
                className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={form.time}
                onChange={e => setForm({ ...form, time: e.target.value })}
              />
              <button
                className="sm:col-span-4 mt-1 bg-indigo-500 hover:bg-indigo-600 rounded-xl px-4 py-2 font-medium transition transform hover:scale-[1.01]"
                type="submit"
              >
                Save Reminder
              </button>
            </form>
          </section>

          {/* upload prescription card */}
          <section className="bg-gray-900/60 border border-white/10 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Upload className="text-indigo-400" size={20} />
              <h2 className="text-lg font-semibold">Prescription Upload</h2>
            </div>
            <PrescriptionUpload onUploaded={fetchReminders} />
          </section>
        </div>

        {/* reminder list */}
        <section className="mt-8 bg-gray-900/60 border border-white/10 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
            <BellRing className="text-amber-300" size={20} />
            <h2 className="text-lg font-semibold">My Reminders</h2>
          </div>

          {loading ? (
            <div className="text-gray-400">Loading...</div>
          ) : reminders.length === 0 ? (
            <div className="text-gray-400">No reminders yet.</div>
          ) : (
            <ul className="space-y-3">
              {reminders.map(r => (
                <li key={r._id} className="bg-black/40 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{r.medicineName}</div>
                    <div className="text-sm text-gray-400">{r.dosage}</div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {new Date(r.time).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
