"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AddTeamPage() {
  const router = useRouter();

  const [employeeName, setEmployeeName] = useState("");
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [targetHospitals, setTargetHospitals] = useState("");
  const [status, setStatus] = useState("Active");

  async function saveMember(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const { error } = await supabase
      .from("teams")
      .insert([
        {
          name: employeeName,
          designation,
          phone,
          email,
          target_hospitals: Number(targetHospitals),
          achieved_hospitals: 0,
          status,
        },
      ]);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    alert("Team Member Added Successfully");

    router.push("/crm/teams");
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
      <h1 style={{ marginBottom: "25px" }}>
        Add Team Member
      </h1>

      <form onSubmit={saveMember}>
        <label>Employee Name</label>
        <input
          type="text"
          value={employeeName}
          onChange={(e) =>
            setEmployeeName(e.target.value)
          }
          required
          style={inputStyle}
        />

        <label>Designation</label>
        <input
          type="text"
          value={designation}
          onChange={(e) =>
            setDesignation(e.target.value)
          }
          required
          style={inputStyle}
        />

        <label>Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          required
          style={inputStyle}
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
          style={inputStyle}
        />

        <label>Target Hospitals</label>
        <input
          type="number"
          value={targetHospitals}
          onChange={(e) =>
            setTargetHospitals(e.target.value)
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
          <option value="Active">
            Active
          </option>
          <option value="Inactive">
            Inactive
          </option>
        </select>

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
          Save Member
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "5px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "6px",
} as const;