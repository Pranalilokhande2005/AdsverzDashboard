"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AddMOUPage() {
  const router = useRouter();

  const [hospitalName, setHospitalName] = useState("");
  const [agreementType, setAgreementType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dealValue, setDealValue] = useState("");
  const [status, setStatus] = useState("Active");
  const [notes, setNotes] = useState("");

  async function saveMOU(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const { error } = await supabase
      .from("mou_tracker")
      .insert([
        {
          hospital_name: hospitalName,
          agreement_type: agreementType,
          start_date: startDate,
          end_date: endDate,
          deal_value: dealValue,
          status,
          notes,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("MOU Added Successfully");
    router.push("/crm/mou-tracker");
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "35px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ marginBottom: "30px" }}>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: 700,
              marginBottom: "8px",
            }}
          >
            Add New MOU
          </h1>

          <p
            style={{
              color: "#6b7280",
            }}
          >
            Create a new agreement with a hospital
          </p>
        </div>

        <form onSubmit={saveMOU}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(350px,1fr))",
              gap: "20px",
            }}
          >
            <div style={fieldCard}>
              <label style={labelStyle}>
                Hospital Name
              </label>

              <input
                value={hospitalName}
                onChange={(e) =>
                  setHospitalName(
                    e.target.value
                  )
                }
                required
                style={inputStyle}
              />
            </div>

            <div style={fieldCard}>
              <label style={labelStyle}>
                Agreement Type
              </label>

              <input
                value={agreementType}
                onChange={(e) =>
                  setAgreementType(
                    e.target.value
                  )
                }
                required
                style={inputStyle}
              />
            </div>

            <div style={fieldCard}>
              <label style={labelStyle}>
                Start Date
              </label>

              <input
                type="date"
                value={startDate}
                onChange={(e) =>
                  setStartDate(
                    e.target.value
                  )
                }
                style={inputStyle}
              />
            </div>

            <div style={fieldCard}>
              <label style={labelStyle}>
                End Date
              </label>

              <input
                type="date"
                value={endDate}
                onChange={(e) =>
                  setEndDate(
                    e.target.value
                  )
                }
                style={inputStyle}
              />
            </div>

            <div style={fieldCard}>
              <label style={labelStyle}>
                Deal Value (₹)
              </label>

              <input
                type="number"
                value={dealValue}
                onChange={(e) =>
                  setDealValue(
                    e.target.value
                  )
                }
                style={inputStyle}
              />
            </div>

            <div style={fieldCard}>
              <label style={labelStyle}>
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value
                  )
                }
                style={inputStyle}
              >
                <option value="Active">
                  Active
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="Expired">
                  Expired
                </option>

                <option value="Completed">
                  Completed
                </option>
              </select>
            </div>
          </div>

          <div
            style={{
              ...fieldCard,
              marginTop: "20px",
            }}
          >
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
                minHeight: "180px",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "30px",
            }}
          >
            <button
              type="submit"
              style={primaryBtn}
            >
              Save MOU
            </button>

            <button
              type="button"
              onClick={() =>
                router.push(
                  "/crm/mou-tracker"
                )
              }
              style={secondaryBtn}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const fieldCard = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  padding: "16px",
  boxShadow:
    "0 1px 3px rgba(0,0,0,0.05)",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontWeight: 600,
  color: "#374151",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  padding: "12px 14px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  background: "#fafafa",
  fontSize: "14px",
};

const primaryBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "14px 24px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: 600,
};

const secondaryBtn = {
  background: "#f3f4f6",
  color: "#111827",
  border: "none",
  padding: "14px 24px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: 600,
};