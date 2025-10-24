import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../firebase/config";
import axios from "axios";

export default function PrescriptionUpload({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const storage = getStorage();

  const sendMetadataToBackend = async (url) => {
    const token = await auth.currentUser.getIdToken();
    await axios.post("http://localhost:5001/api/prescriptions", {
      url,
      uploadedAt: new Date()
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  };

  const handleUpload = async () => {
    if (!file) return alert("Pick a file first");
    setUploading(true);
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) throw new Error("Not logged in");
      const path = `prescriptions/${uid}/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      await sendMetadataToBackend(url);
      alert("✅ Prescription uploaded");
      setFile(null);
      onUploaded?.();
    } catch (err) {
      console.error(err);
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={e => setFile(e.target.files?.[0] || null)}
        className="w-full text-sm text-gray-300 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-gray-800 file:text-gray-200 hover:file:bg-gray-700"
      />
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 rounded-xl px-4 py-2 font-medium"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
      <p className="text-xs text-gray-400">
        We’ll store the file in Firebase Storage and save a reference in your account.
      </p>
    </div>
  );
}
