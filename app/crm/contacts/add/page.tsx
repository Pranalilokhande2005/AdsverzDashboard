"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AddContactPage() {
  const router = useRouter();

  const [hospitals, setHospitals] = useState<any[]>([]);
  const [hospitalId, setHospitalId] = useState("");

  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchHospitals();
  }, []);

  async function fetchHospitals() {
    const { data, error } = await supabase
      .from("hospitals")
      .select("id, hospital_name")
      .order("hospital_name");

    if (error) {
      console.error(error);
      return;
    }

    setHospitals(data || []);
  }

  async function saveContact(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase
      .from("contacts")
      .insert([
        {
          hospital_id: hospitalId,
          name: name,
          designation: designation,
          phone: phone,
          email: email,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Contact Saved Successfully");

    router.push("/crm/contacts");
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ marginBottom: "25px" }}>Add Contact</h1>

      <form
        onSubmit={saveContact}
        style={{
          maxWidth: "700px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <div>
          <label>Select Hospital</label>

          <select
            value={hospitalId}
            onChange={(e) => setHospitalId(e.target.value)}
            required
            style={inputStyle}
          >
            <option value="">Choose Hospital</option>

            {hospitals.map((hospital) => (
              <option key={hospital.id} value={hospital.id}>
                {hospital.hospital_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Contact Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter contact name"
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label>Designation</label>

          <input
            type="text"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            placeholder="Doctor / CEO / Purchase Manager"
            style={inputStyle}
          />
        </div>

        <div>
          <label>Phone</label>

          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            style={inputStyle}
          />
        </div>

        <div>
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            style={inputStyle}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "14px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Save Contact
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "5px",
  border: "1px solid #ccc",
  borderRadius: "6px",
};