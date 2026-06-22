"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditMeetingPage() {
  const params = useParams();
  const router = useRouter();

  const meetingId = params.id as string;

  const [hospitalName, setHospitalName] = useState("");
  const [contactName, setContactName] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingType, setMeetingType] = useState("Offline");
  const [location, setLocation] = useState("");
  const [agenda, setAgenda] = useState("");
  const [status, setStatus] = useState("Scheduled");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (meetingId) {
      fetchMeeting();
    }
  }, [meetingId]);

  async function fetchMeeting() {
    const { data, error } = await supabase
      .from("meetings")
      .select("*")
      .eq("id", meetingId)
      .single();

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    if (data) {
      setHospitalName(data.hospital_name || "");
      setContactName(data.contact_name || "");
      setMeetingDate(data.meeting_date || "");
      setMeetingTime(data.meeting_time || "");
      setMeetingType(data.meeting_type || "Offline");
      setLocation(data.location || "");
      setAgenda(data.agenda || "");
      setStatus(data.status || "Scheduled");
      setNotes(data.notes || "");
    }

    setLoading(false);
  }

  async function updateMeeting(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase
      .from("meetings")
      .update({
        hospital_name: hospitalName,
        contact_name: contactName,
        meeting_date: meetingDate,
        meeting_time: meetingTime,
        meeting_type: meetingType,
        location,
        agenda,
        status,
        notes,
      })
      .eq("id", meetingId);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Meeting Updated Successfully");

    router.push("/crm/meetings");
  }

  if (loading) {
    return <p>Loading...</p>;
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
      <h1 style={{ marginBottom: "25px" }}>Edit Meeting</h1>

      <form onSubmit={updateMeeting}>
        <label>Hospital Name</label>
        <input
          value={hospitalName}
          onChange={(e) => setHospitalName(e.target.value)}
          style={inputStyle}
        />

        <label>Contact Name</label>
        <input
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          style={inputStyle}
        />

        <label>Meeting Date</label>
        <input
          type="date"
          value={meetingDate}
          onChange={(e) => setMeetingDate(e.target.value)}
          style={inputStyle}
        />

        <label>Meeting Time</label>
        <input
          type="time"
          value={meetingTime}
          onChange={(e) => setMeetingTime(e.target.value)}
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
          Update Meeting
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