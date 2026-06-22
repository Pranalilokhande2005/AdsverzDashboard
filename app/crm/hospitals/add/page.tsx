"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AddHospitalPage() {
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalType, setHospitalType] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [decisionMaker, setDecisionMaker] = useState("");
  const [designation, setDesignation] = useState("");
  const [priority, setPriority] = useState("Hot");
  const [status, setStatus] = useState("New");
  const [notes, setNotes] = useState("");

  async function saveHospital() {
    const { error } = await supabase
      .from("hospitals")
      .insert([
        {
          hospital_name: hospitalName,
          hospital_type: hospitalType,
          address: address,
          area: area,
          phone: phone,
          email: email,
          website: website,
          decision_maker: decisionMaker,
          designation: designation,
          priority: priority,
          status: status,
          notes: notes,
          remarks: notes,
        },
      ]);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    alert("Hospital Saved Successfully!");

    setHospitalName("");
    setHospitalType("");
    setAddress("");
    setArea("");
    setPhone("");
    setEmail("");
    setWebsite("");
    setDecisionMaker("");
    setDesignation("");
    setPriority("Hot");
    setStatus("New");
    setNotes("");
  }

  const inputStyle = {
    width: "100%",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    marginTop: "6px",
    marginBottom: "20px",
    fontSize: "16px",
  };

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1>Add Hospital</h1>

      <label>Hospital Name</label>
      <input
        type="text"
        value={hospitalName}
        onChange={(e) => setHospitalName(e.target.value)}
        placeholder="Enter hospital name"
        style={inputStyle}
      />

      <label>Hospital Type</label>
      <input
        type="text"
        value={hospitalType}
        onChange={(e) => setHospitalType(e.target.value)}
        placeholder="Multi-Speciality, Clinic, etc."
        style={inputStyle}
      />

      <label>Address</label>
      <textarea
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter complete address"
        style={{
          ...inputStyle,
          height: "120px",
        }}
      />

      <label>Area</label>
      <input
        type="text"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        placeholder="HSR Layout, Koramangala, etc."
        style={inputStyle}
      />

      <label>Phone</label>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter phone number"
        style={inputStyle}
      />

      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="hospital@email.com"
        style={inputStyle}
      />

      <label>Website</label>
      <input
        type="text"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        placeholder="www.hospital.com"
        style={inputStyle}
      />

      <label>Decision Maker</label>
      <input
        type="text"
        value={decisionMaker}
        onChange={(e) => setDecisionMaker(e.target.value)}
        placeholder="Doctor / Administrator Name"
        style={inputStyle}
      />

      <label>Designation</label>
      <input
        type="text"
        value={designation}
        onChange={(e) => setDesignation(e.target.value)}
        placeholder="Director, Administrator, CEO"
        style={inputStyle}
      />

      <label>Priority</label>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        style={inputStyle}
      >
        <option value="Hot">Hot</option>
        <option value="Warm">Warm</option>
        <option value="Cold">Cold</option>
      </select>

      <label>Status</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={inputStyle}
      >
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Meeting Fixed">Meeting Fixed</option>
        <option value="Proposal Sent">Proposal Sent</option>
        <option value="MOU Sent">MOU Sent</option>
        <option value="MOU Signed">MOU Signed</option>
        <option value="Lost">Lost</option>
      </select>

      <label>Notes</label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Enter notes here..."
        style={{
          ...inputStyle,
          height: "120px",
        }}
      />

      <button
        onClick={saveHospital}
        style={{
          width: "100%",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          padding: "14px",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        Save Hospital
      </button>
    </div>
  );
}