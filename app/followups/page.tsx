"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Followup = {
  id: string;
  hospital_id: string;
  followup_date: string;
  notes: string;
  status: string;
};

export default function FollowupsPage() {
  const [followups, setFollowups] = useState<Followup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFollowups();
  }, []);

  async function fetchFollowups() {
    const { data, error } = await supabase
      .from("followups")
      .select("*")
      .order("followup_date", { ascending: false });

    if (!error && data) {
      setFollowups(data);
    }

    setLoading(false);
  }

  async function deleteFollowup(id: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this followup?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("followups")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Followup Deleted Successfully");
    fetchFollowups();
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "30px auto",
        background: "white",
        padding: "30px",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h1>Followups</h1>

        <Link href="/crm/followups/add">
          <button
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            + Add Followup
          </button>
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Hospital ID</th>
              <th style={thStyle}>Followup Date</th>
              <th style={thStyle}>Notes</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {followups.map((item) => (
              <tr key={item.id}>
                <td style={tdStyle}>{item.hospital_id}</td>
                <td style={tdStyle}>{item.followup_date}</td>
                <td style={tdStyle}>{item.notes}</td>
                <td style={tdStyle}>{item.status}</td>

                <td style={tdStyle}>
                  <Link href={`/crm/followups/edit/${item.id}`}>
                    <button style={editBtn}>
                      Edit
                    </button>
                  </Link>

                  <button
                    style={deleteBtn}
                    onClick={() =>
                      deleteFollowup(item.id)
                    }
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

const thStyle = {
  borderBottom: "1px solid #ddd",
  padding: "12px",
  textAlign: "left" as const,
};

const tdStyle = {
  borderBottom: "1px solid #eee",
  padding: "12px",
};

const editBtn = {
  backgroundColor: "#16a34a",
  color: "white",
  border: "none",
  padding: "8px 12px",
  marginRight: "10px",
  borderRadius: "5px",
  cursor: "pointer",
};

const deleteBtn = {
  backgroundColor: "#dc2626",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  cursor: "pointer",
};