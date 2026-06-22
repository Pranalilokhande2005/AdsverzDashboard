"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AddFollowupPage() {
  const router = useRouter();

  const [followupDate, setFollowupDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [notes, setNotes] = useState("");

  async function saveFollowup(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase
      .from("followups")
      .insert([
        {
          followup_date: followupDate,
          status,
          notes,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Followup Added Successfully");

    router.push("/crm/followups");
  }

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "30px auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.08)",
      }}
    >
      <h1 style={{ marginBottom: "25px" }}>Add Followup</h1>

      <form onSubmit={saveFollowup}>
        <label>Date</label>

        <input
          type="date"
          value={followupDate}
          onChange={(e) => setFollowupDate(e.target.value)}
          required
          style={inputStyle}
        />

        <label>Status</label>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={inputStyle}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <label>Notes</label>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={5}
          style={inputStyle}
          placeholder="Enter followup notes..."
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            marginTop: "20px",
            fontSize: "16px",
          }}
        >
          Save Followup
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  marginBottom: "20px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  fontSize: "15px",
};