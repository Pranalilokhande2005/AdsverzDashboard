"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchHospitals();
  }, []);

  async function fetchHospitals() {
    const { data, error } = await supabase
      .from("hospitals")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setHospitals(data || []);
    setLoading(false);
  }

  async function deleteHospital(id: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this hospital?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("hospitals")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Hospital Deleted Successfully");

    fetchHospitals();
  }

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch =
      hospital.hospital_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      hospital.area
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      hospital.decision_maker
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesPriority =
      priorityFilter === "All" ||
      hospital.priority === priorityFilter;

    const matchesStatus =
      statusFilter === "All" ||
      hospital.status === statusFilter;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Hospitals</h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search Hospital..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        >
          <option value="All">All Priorities</option>
          <option value="Hot">Hot</option>
          <option value="Warm">Warm</option>
          <option value="Cold">Cold</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        >
          <option value="All">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Meeting Fixed">Meeting Fixed</option>
          <option value="Proposal Sent">Proposal Sent</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
        </select>
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
              <th style={headerStyle}>Hospital</th>
              <th style={headerStyle}>Area</th>
              <th style={headerStyle}>Phone</th>
              <th style={headerStyle}>Decision Maker</th>
              <th style={headerStyle}>Priority</th>
              <th style={headerStyle}>Status</th>
              <th style={headerStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredHospitals.map((hospital) => (
              <tr key={hospital.id}>
                <td style={cellStyle}>{hospital.hospital_name}</td>
                <td style={cellStyle}>{hospital.area}</td>
                <td style={cellStyle}>{hospital.phone}</td>
                <td style={cellStyle}>{hospital.decision_maker}</td>
                <td style={cellStyle}>{hospital.priority}</td>
                <td style={cellStyle}>{hospital.status}</td>

                <td style={cellStyle}>
                  <Link href={`/crm/hospitals/edit/${hospital.id}`}>
                    <button
                      style={{
                        backgroundColor: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                    >
                      Edit
                    </button>
                  </Link>

                  <button
                    style={{
                      backgroundColor: "#dc2626",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => deleteHospital(hospital.id)}
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