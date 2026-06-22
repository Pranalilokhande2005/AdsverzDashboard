"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditContactPage() {
  const params = useParams();
  const router = useRouter();

  const contactId = params.id as string;

  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (contactId) {
      fetchContact();
    }
  }, [contactId]);

  async function fetchContact() {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .eq("id", contactId)
      .single();

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    if (data) {
      setName(data.name || "");
      setDesignation(data.designation || "");
      setPhone(data.phone || "");
      setEmail(data.email || "");
    }

    setLoading(false);
  }

  async function updateContact(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const { error } = await supabase
      .from("contacts")
      .update({
        name,
        designation,
        phone,
        email,
      })
      .eq("id", contactId);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Contact Updated Successfully");
    router.push("/crm/contacts");
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1>Edit Contact</h1>

      <form onSubmit={updateContact}>
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <label>Designation</label>
        <input
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          style={inputStyle}
        />

        <label>Phone</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={inputStyle}
        />

        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 18px",
            borderRadius: "6px",
            cursor: "pointer",
            marginTop: "15px",
          }}
        >
          Update Contact
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