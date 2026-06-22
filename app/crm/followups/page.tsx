"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function FollowupsPage() {
  const [followups, setFollowups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFollowups();
  }, []);

  async function fetchFollowups() {
    const { data, error } = await supabase
      .from("followups")
      .select("*");

    if (error) {
      console.error(error);
      alert(error.message);
      setLoading(false);
      return;
    }

    setFollowups(data || []);
    setLoading(false);
  }

  async function deleteFollowup(id: string) {
    const confirmDelete = window.confirm(
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
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
              padding: "10px 16px",
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
      ) : followups.length === 0 ? (
        <p>No Followups Found</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={headerStyle}>Date</th>
              <th style={headerStyle}>Status</th>
              <th style={headerStyle}>Notes</th>
              <th style={headerStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {followups.map((item) => (
              <tr key={item.id}>
                <td style={cellStyle}>{item.followup_date}</td>

                <td style={cellStyle}>
                  <span
                    style={{
                      backgroundColor:
                        item.status === "Completed"
                          ? "#16a34a"
                          : "#f59e0b",
                      color: "white",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                    }}
                  >
                    {item.status}
                  </span>
                </td>

                <td style={cellStyle}>{item.notes}</td>

                <td style={cellStyle}>
                  <Link href={`/crm/followups/edit/${item.id}`}>
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
                    onClick={() => deleteFollowup(item.id)}
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