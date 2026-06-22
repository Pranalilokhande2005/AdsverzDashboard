"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function TeamsPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    const { data, error } = await supabase
      .from("teams")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setMembers(data || []);
    setLoading(false);
  }

  async function deleteMember(id: string) {
    if (!confirm("Delete Member?")) return;

    const { error } = await supabase
      .from("teams")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchMembers();
  }

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h1>Team Members</h1>

        <Link href="/crm/teams/add">
          <button style={btnStyle}>
            + Add Team Member
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
              <th style={header}>Name</th>
              <th style={header}>Designation</th>
              <th style={header}>Phone</th>
              <th style={header}>Target</th>
              <th style={header}>Achieved</th>
              <th style={header}>Status</th>
              <th style={header}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td style={cell}>{member.name}</td>
                <td style={cell}>{member.designation}</td>
                <td style={cell}>{member.phone}</td>
                <td style={cell}>{member.target_hospitals}</td>
                <td style={cell}>{member.achieved_hospitals}</td>
                <td style={cell}>{member.status}</td>

                <td style={cell}>
                  <Link href={`/crm/teams/edit/${member.id}`}>
                    <button style={editBtn}>
                      Edit
                    </button>
                  </Link>

                  <button
                    style={deleteBtn}
                    onClick={() =>
                      deleteMember(member.id)
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

const header = {
  padding: "12px",
  borderBottom: "2px solid #ddd",
  textAlign: "left" as const,
};

const cell = {
  padding: "12px",
  borderBottom: "1px solid #eee",
};

const btnStyle = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "6px",
  cursor: "pointer",
};

const editBtn = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  marginRight: "10px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  cursor: "pointer",
};