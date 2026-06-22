"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function MOUTrackerPage() {
  const [mous, setMous] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMOUs();
  }, []);

  async function fetchMOUs() {
    const { data, error } = await supabase
      .from("mou_tracker")
      .select("*")
      .order("start_date", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setMous(data || []);
    setLoading(false);
  }

  async function deleteMOU(id: string) {
    const ok = confirm(
      "Are you sure you want to delete this MOU?"
    );

    if (!ok) return;

    const { error } = await supabase
      .from("mou_tracker")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchMOUs();
  }

  function getStatusColor(status: string) {
    switch (status) {
      case "Active":
        return "#16a34a";

      case "Pending":
        return "#f59e0b";

      case "Expired":
        return "#dc2626";

      case "Completed":
        return "#2563eb";

      default:
        return "#6b7280";
    }
  }

  if (loading) {
    return (
      <div style={{ padding: "40px" }}>
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: 700,
              marginBottom: "5px",
            }}
          >
            MOU Tracker
          </h1>

          <p
            style={{
              color: "#6b7280",
            }}
          >
            Manage hospital agreements
            and contracts
          </p>
        </div>

        <Link href="/crm/mou-tracker/add">
          <button
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              padding: "12px 20px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            + Add MOU
          </button>
        </Link>
      </div>

      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          overflow: "hidden",
          border:
            "1px solid #e5e7eb",
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse:
              "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                background:
                  "#f8fafc",
              }}
            >
              <th style={thStyle}>
                Hospital
              </th>

              <th style={thStyle}>
                Agreement Type
              </th>

              <th style={thStyle}>
                Start Date
              </th>

              <th style={thStyle}>
                End Date
              </th>

              <th style={thStyle}>
                Deal Value
              </th>

              <th style={thStyle}>
                Status
              </th>

              <th style={thStyle}>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {mous.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    textAlign:
                      "center",
                    padding: "30px",
                  }}
                >
                  No MOU Records Found
                </td>
              </tr>
            ) : (
              mous.map((mou) => (
                <tr
                  key={mou.id}
                  style={{
                    borderTop:
                      "1px solid #e5e7eb",
                  }}
                >
                  <td style={tdStyle}>
                    {
                      mou.hospital_name
                    }
                  </td>

                  <td style={tdStyle}>
                    {
                      mou.agreement_type
                    }
                  </td>

                  <td style={tdStyle}>
                    {mou.start_date}
                  </td>

                  <td style={tdStyle}>
                    {mou.end_date}
                  </td>

                  <td style={tdStyle}>
                    ₹ {mou.deal_value}
                  </td>

                  <td style={tdStyle}>
                    <span
                      style={{
                        background:
                          getStatusColor(
                            mou.status
                          ),
                        color:
                          "#fff",
                        padding:
                          "6px 12px",
                        borderRadius:
                          "20px",
                        fontSize:
                          "12px",
                        fontWeight:
                          600,
                      }}
                    >
                      {mou.status}
                    </span>
                  </td>

                  <td style={tdStyle}>
                    <div
                      style={{
                        display:
                          "flex",
                        gap: "10px",
                      }}
                    >
                      <Link
                        href={`/crm/mou-tracker/edit/${mou.id}`}
                      >
                        <button
                          style={
                            editBtn
                          }
                        >
                          Edit
                        </button>
                      </Link>

                      <button
                        onClick={() =>
                          deleteMOU(
                            mou.id
                          )
                        }
                        style={
                          deleteBtn
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = {
  padding: "16px",
  textAlign: "left" as const,
  fontWeight: 600,
};

const tdStyle = {
  padding: "16px",
};

const editBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "#dc2626",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer",
};