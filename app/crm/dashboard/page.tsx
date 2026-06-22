"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    hospitals: 0,
    contacts: 0,
    followups: 0,
    meetings: 0,
    teams: 0,
    tasks: 0,
    pendingTasks: 0,
    completedTasks: 0,
    pendingFollowups: 0,
    completedFollowups: 0,
  });

  const [recentTasks, setRecentTasks] = useState<any[]>([]);
  const [recentMeetings, setRecentMeetings] = useState<any[]>([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const [
        hospitalsRes,
        contactsRes,
        followupsRes,
        meetingsRes,
        teamsRes,
        tasksRes,
        pendingTasksRes,
        completedTasksRes,
        pendingFollowupsRes,
        completedFollowupsRes,
        recentTasksRes,
        recentMeetingsRes,
      ] = await Promise.all([
        supabase
          .from("hospitals")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("contacts")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("followups")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("meetings")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("teams")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("tasks")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("tasks")
          .select("*", { count: "exact", head: true })
          .eq("status", "Pending"),

        supabase
          .from("tasks")
          .select("*", { count: "exact", head: true })
          .eq("status", "Completed"),

        supabase
          .from("followups")
          .select("*", { count: "exact", head: true })
          .eq("status", "Pending"),

        supabase
          .from("followups")
          .select("*", { count: "exact", head: true })
          .eq("status", "Completed"),

        supabase
          .from("tasks")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5),

        supabase
          .from("meetings")
          .select("*")
          .order("meeting_date", { ascending: false })
          .limit(5),
      ]);

      setStats({
        hospitals: hospitalsRes.count || 0,
        contacts: contactsRes.count || 0,
        followups: followupsRes.count || 0,
        meetings: meetingsRes.count || 0,
        teams: teamsRes.count || 0,
        tasks: tasksRes.count || 0,
        pendingTasks: pendingTasksRes.count || 0,
        completedTasks: completedTasksRes.count || 0,
        pendingFollowups: pendingFollowupsRes.count || 0,
        completedFollowups: completedFollowupsRes.count || 0,
      });

      setRecentTasks(recentTasksRes.data || []);
      setRecentMeetings(recentMeetingsRes.data || []);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  const cardStyle = {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    textAlign: "center" as const,
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1
        style={{
          fontSize: "38px",
          fontWeight: "bold",
          marginBottom: "30px",
        }}
      >
        ADSVERZ CRM Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
        }}
      >
        <div style={cardStyle}>
          <h2>{stats.hospitals}</h2>
          <p>Total Hospitals</p>
        </div>

        <div style={cardStyle}>
          <h2>{stats.contacts}</h2>
          <p>Total Contacts</p>
        </div>

        <div style={cardStyle}>
          <h2>{stats.followups}</h2>
          <p>Total Followups</p>
        </div>

        <div style={cardStyle}>
          <h2>{stats.meetings}</h2>
          <p>Total Meetings</p>
        </div>

        <div style={cardStyle}>
          <h2>{stats.teams}</h2>
          <p>Total Team Members</p>
        </div>

        <div style={cardStyle}>
          <h2>{stats.tasks}</h2>
          <p>Total Tasks</p>
        </div>

        <div style={cardStyle}>
          <h2>{stats.pendingTasks}</h2>
          <p>Pending Tasks</p>
        </div>

        <div style={cardStyle}>
          <h2>{stats.completedTasks}</h2>
          <p>Completed Tasks</p>
        </div>

        <div style={cardStyle}>
          <h2>{stats.pendingFollowups}</h2>
          <p>Pending Followups</p>
        </div>

        <div style={cardStyle}>
          <h2>{stats.completedFollowups}</h2>
          <p>Completed Followups</p>
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          marginTop: "40px",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <h2>Recent Tasks</h2>

        <table
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th align="left">Task</th>
              <th align="left">Assigned To</th>
              <th align="left">Priority</th>
              <th align="left">Status</th>
            </tr>
          </thead>

          <tbody>
            {recentTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.task_name}</td>
                <td>{task.assigned_to}</td>
                <td>{task.priority}</td>
                <td>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        style={{
          background: "#fff",
          marginTop: "30px",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <h2>Recent Meetings</h2>

        <table
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th align="left">Hospital</th>
              <th align="left">Meeting Date</th>
              <th align="left">Agenda</th>
              <th align="left">Status</th>
            </tr>
          </thead>

          <tbody>
            {recentMeetings.map((meeting) => (
              <tr key={meeting.id}>
                <td>{meeting.hospital_name}</td>
                <td>{meeting.meeting_date}</td>
                <td>{meeting.agenda}</td>
                <td>{meeting.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}