"use client";

import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Sidebar() {
  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  const linkStyle = {
    display: "block",
    color: "white",
    textDecoration: "none",
    padding: "12px 15px",
    borderRadius: "8px",
    marginBottom: "8px",
    background: "rgba(255,255,255,0.05)",
  };

  return (
    <div
      style={{
        width: "260px",
        background: "#0f172a",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <h2
          style={{
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          ADSVERZ CRM
        </h2>

        <Link
          href="/crm/dashboard"
          style={linkStyle}
        >
          📊 Dashboard
        </Link>

        <Link
          href="/crm/hospitals"
          style={linkStyle}
        >
          🏥 Hospitals
        </Link>

        <Link
          href="/crm/contacts"
          style={linkStyle}
        >
          👥 Contacts
        </Link>

        <Link
          href="/crm/teams"
          style={linkStyle}
        >
          👨‍💼 Teams
        </Link>

        <Link
          href="/crm/tasks"
          style={linkStyle}
        >
          ✅ Tasks
        </Link>

        <Link
          href="/crm/meetings"
          style={linkStyle}
        >
          📅 Meetings
        </Link>

        <Link
          href="/crm/followups"
          style={linkStyle}
        >
          📞 Followups
        </Link>

        <Link
          href="/crm/mou-tracker"
          style={linkStyle}
        >
          📄 MOU Tracker
        </Link>

        <Link
          href="/crm/reports"
          style={linkStyle}
        >
          📈 Reports
        </Link>
      </div>

      <div style={{ marginTop: "auto" }}>
        <button
          onClick={logout}
          style={{
            width: "100%",
            padding: "12px",
            background: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}