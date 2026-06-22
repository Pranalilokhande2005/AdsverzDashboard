"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AddTeamPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [targetHospitals, setTargetHospitals] = useState("");
  const [status, setStatus] = useState("Active");
  const [loading, setLoading] = useState(false);

  async function saveMember(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from("teams")
      .insert([
        {
          name: name,
          designation: designation,
          phone: phone,
          email: email,
          target_hospitals: Number(targetHospitals),
          achieved_hospitals: 0,
          status: status,
        },
      ]);

    setLoading(false);

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
        padding: "30px",
        background: "white",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>
        Add Team Member
      </h1>

      <form onSubmit={saveMember}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
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
          style={inputStyle}
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={inputStyle}
        />

        <label>Target Hospitals</label>
        <input
          type="number"
          value={targetHospitals}
          onChange={(e) =>
            setTargetHospitals(
              e.target.value
            )
          }
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
          disabled={loading}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          {loading
            ? "Saving..."
            : "Save Member"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "5px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "6px",
} as const;