"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ReportsPage() {
  const [stats, setStats] = useState({
    hospitals: 0,
    contacts: 0,
    followups: 0,
    meetings: 0,
    mous: 0,
    dealValue: 0,
  });

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    const hospitals = await supabase
      .from("hospitals")
      .select("*");

    const contacts = await supabase
      .from("contacts")
      .select("*");

    const followups = await supabase
      .from("followups")
      .select("*");

    const meetings = await supabase
      .from("meetings")
      .select("*");

    const mous = await supabase
      .from("mou_tracker")
      .select("*");

    let dealValue = 0;

    if (mous.data) {
      dealValue = mous.data.reduce(
        (sum, item) =>
          sum + Number(item.deal_value || 0),
        0
      );
    }

    setStats({
      hospitals: hospitals.data?.length || 0,
      contacts: contacts.data?.length || 0,
      followups: followups.data?.length || 0,
      meetings: meetings.data?.length || 0,
      mous: mous.data?.length || 0,
      dealValue,
    });
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Reports</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginTop: "25px",
        }}
      >
        <ReportCard
          title="Hospitals"
          value={stats.hospitals}
        />

        <ReportCard
          title="Contacts"
          value={stats.contacts}
        />

        <ReportCard
          title="Followups"
          value={stats.followups}
        />

        <ReportCard
          title="Meetings"
          value={stats.meetings}
        />

        <ReportCard
          title="MOU Count"
          value={stats.mous}
        />

        <ReportCard
          title="Deal Value"
          value={`₹ ${stats.dealValue.toLocaleString()}`}
        />
      </div>
    </div>
  );
}

function ReportCard({
  title,
  value,
}: {
  title: string;
  value: any;
}) {
  return (
    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "10px",
        boxShadow:
          "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      <h3>{title}</h3>

      <h1>{value}</h1>
    </div>
  );
}