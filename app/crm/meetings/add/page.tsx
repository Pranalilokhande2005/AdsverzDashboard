"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AddMeetingPage() {
  const router = useRouter();

  const [hospitalName, setHospitalName] = useState("");
  const [contactName, setContactName] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingType, setMeetingType] = useState("Offline");
  const [location, setLocation] = useState("");
  const [agenda, setAgenda] = useState("");
  const [status, setStatus] = useState("Scheduled");
  const [notes, setNotes] = useState("");

  async function saveMeeting(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase
      .from("meetings")
      .insert([
        {
          hospital_name: hospitalName,
          contact_name: contactName,
          meeting_date: meetingDate,
          meeting_time: meetingTime,
          meeting_type: meetingType,
          location,
          agenda,
          status,
          notes,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Meeting Added Successfully");

    router.push("/crm/meetings");
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "30px auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.08)",
      }}
    >
      <h1 style={{ marginBottom: "25px" }}>Add Meeting</h1>

      <form onSubmit={saveMeeting}>
        <label>Hospital Name</label>
        <input
          type="text"
          value={hospitalName}
          onChange={(e) => setHospitalName(e.target.value)}
          required
          style={inputStyle}
        />

        <label>Contact Name</label>
        <input
          type="text"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          required
          style={inputStyle}
        />

        <label>Meeting Date</label>
        <input
          type="date"
          value={meetingDate}
          onChange={(e) => setMeetingDate(e.target.value)}
          required
          style={inputStyle}
        />

        <label>Meeting Time</label>
        <input
          type="time"
          value={meetingTime}
          onChange={(e) => setMeetingTime(e.target.value)}
          required
          style={inputStyle}
        />

        <label>Meeting Type</label>
        <select
          value={meetingType}
          onChange={(e) => setMeetingType(e.target.value)}
          style={inputStyle}
        >
          <option value="Offline">Offline</option>
          <option value="Online">Online</option>
          <option value="Call">Call</option>
        </select>

        <label>Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={inputStyle}
        />

        <label>Agenda</label>
        <textarea
          value={agenda}
          onChange={(e) => setAgenda(e.target.value)}
          rows={4}
          style={inputStyle}
        />

        <label>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={inputStyle}
        >
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <label>Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={5}
          style={inputStyle}
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
            fontSize: "16px",
          }}
        >
          Save Meeting
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
} as const;