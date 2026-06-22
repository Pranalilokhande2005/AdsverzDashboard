"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditFollowupPage() {
  const router = useRouter();
  const params = useParams();

  const [hospitalId, setHospitalId] = useState("");
  const [followupDate, setFollowupDate] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("Pending");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFollowup();
  }, []);

  async function fetchFollowup() {
    const { data, error } = await supabase
      .from("followups")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    setHospitalId(data.hospital_id || "");
    setFollowupDate(data.followup_date || "");
    setNotes(data.notes || "");
    setStatus(data.status || "Pending");

    setLoading(false);
  }

  async function updateFollowup(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const { error } = await supabase
      .from("followups")
      .update({
        followup_date: followupDate,
        notes: notes,
        status: status,
      })
      .eq("id", params.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Followup Updated Successfully");
    router.push("/crm/followups");
  }

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      <h1
        style={{
          fontSize: "30px",
          marginBottom: "25px",
        }}
      >
        Edit Followup
      </h1>

      <form onSubmit={updateFollowup}>
        <label style={labelStyle}>
          Hospital ID
        </label>

        <input
          value={hospitalId}
          readOnly
          style={{
            ...inputStyle,
            backgroundColor: "#f3f4f6",
            cursor: "not-allowed",
          }}
        />

        <label style={labelStyle}>
          Followup Date
        </label>

        <input
          type="date"
          value={followupDate}
          onChange={(e) =>
            setFollowupDate(e.target.value)
          }
          style={inputStyle}
          required
        />

        <label style={labelStyle}>
          Status
        </label>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          style={inputStyle}
        >
          <option value="Pending">
            Pending
          </option>

          <option value="Completed">
            Completed
          </option>
        </select>

        <label style={labelStyle}>
          Notes
        </label>

        <textarea
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
          style={{
            ...inputStyle,
            minHeight: "140px",
          }}
        />

        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            marginTop: "15px",
          }}
        >
          Update Followup
        </button>
      </form>
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "600",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "20px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "15px",
} as const;