"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AddFollowupPage() {
  const router = useRouter();

  const [hospitalId, setHospitalId] = useState("");
  const [followupDate, setFollowupDate] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("Pending");

  async function saveFollowup(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const { error } = await supabase
      .from("followups")
      .insert([
        {
          hospital_id: hospitalId,
          followup_date: followupDate,
          notes: notes,
          status: status,
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
        maxWidth: "900px",
        margin: "30px auto",
        background: "white",
        padding: "30px",
        borderRadius: "10px",
      }}
    >
      <h1>Add Followup</h1>

      <form onSubmit={saveFollowup}>
        <label>Hospital ID</label>
        <input
          value={hospitalId}
          onChange={(e) =>
            setHospitalId(e.target.value)
          }
          required
          style={inputStyle}
        />

        <label>Followup Date</label>
        <input
          type="date"
          value={followupDate}
          onChange={(e) =>
            setFollowupDate(e.target.value)
          }
          required
          style={inputStyle}
        />

        <label>Status</label>
        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          style={inputStyle}
        >
          <option>Pending</option>
          <option>Completed</option>
        </select>

        <label>Notes</label>
        <textarea
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
          style={{
            ...inputStyle,
            minHeight: "120px",
          }}
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
            marginTop: "15px",
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
  padding: "10px",
  marginTop: "5px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "6px",
} as const;