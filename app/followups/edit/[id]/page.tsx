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

    if (data) {
      setHospitalId(data.hospital_id || "");
      setFollowupDate(data.followup_date || "");
      setNotes(data.notes || "");
      setStatus(data.status || "Pending");
    }

    setLoading(false);
  }

  async function updateFollowup(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const { error } = await supabase
      .from("followups")
      .update({
        hospital_id: hospitalId,
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
    return <p style={{ padding: "30px" }}>Loading...</p>;
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
      <h1>Edit Followup</h1>

      <form onSubmit={updateFollowup}>
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
          Update Followup
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