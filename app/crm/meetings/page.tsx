"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMeetings();
  }, []);

  async function fetchMeetings() {
    const { data, error } = await supabase
      .from("meetings")
      .select("*");

    if (error) {
      console.error(error);
      alert(error.message);
      setLoading(false);
      return;
    }

    setMeetings(data || []);
    setLoading(false);
  }

  async function deleteMeeting(id: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this meeting?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("meetings")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Meeting Deleted Successfully");
    fetchMeetings();
  }

  const filteredMeetings = meetings.filter(
    (meeting) =>
      meeting.hospital_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      meeting.contact_name
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>Meetings</h1>

        <Link href="/crm/meetings/add">
          <button
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              padding: "10px 16px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            + Add Meeting
          </button>
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search Hospital or Contact..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "300px",
          padding: "10px",
          marginBottom: "20px",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      />

      {loading ? (
        <p>Loading...</p>
      ) : filteredMeetings.length === 0 ? (
        <p>No Meetings Found</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={headerStyle}>Hospital</th>
              <th style={headerStyle}>Contact</th>
              <th style={headerStyle}>Date</th>
              <th style={headerStyle}>Time</th>
              <th style={headerStyle}>Type</th>
              <th style={headerStyle}>Status</th>
              <th style={headerStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredMeetings.map((meeting) => (
              <tr key={meeting.id}>
                <td style={cellStyle}>{meeting.hospital_name}</td>
                <td style={cellStyle}>{meeting.contact_name}</td>
                <td style={cellStyle}>{meeting.meeting_date}</td>
                <td style={cellStyle}>{meeting.meeting_time}</td>
                <td style={cellStyle}>{meeting.meeting_type}</td>

                <td style={cellStyle}>
                  <span
                    style={{
                      backgroundColor:
                        meeting.status === "Completed"
                          ? "#16a34a"
                          : meeting.status === "Cancelled"
                          ? "#dc2626"
                          : "#f59e0b",
                      color: "white",
                      padding: "4px 10px",
                      borderRadius: "20px",
                    }}
                  >
                    {meeting.status}
                  </span>
                </td>

                <td style={cellStyle}>
                  <Link href={`/crm/meetings/edit/${meeting.id}`}>
                    <button
                      style={{
                        backgroundColor: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "5px",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => deleteMeeting(meeting.id)}
                    style={{
                      backgroundColor: "#dc2626",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const headerStyle = {
  textAlign: "left" as const,
  padding: "12px",
  borderBottom: "2px solid #ddd",
};

const cellStyle = {
  padding: "12px",
  borderBottom: "1px solid #eee",
};