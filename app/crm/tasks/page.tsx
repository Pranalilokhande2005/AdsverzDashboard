"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface Task {
  id: string;
  task_name: string;
  assigned_to: string;
  due_date: string;
  priority: string;
  status: string;
  notes: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    setTasks(data || []);
    setLoading(false);
  }

  async function deleteTask(id: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchTasks();
  }

  function getPriorityColor(priority: string) {
    switch (priority) {
      case "High":
        return "#dc2626";
      case "Medium":
        return "#f59e0b";
      case "Low":
        return "#16a34a";
      default:
        return "#6b7280";
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case "Completed":
        return "#16a34a";
      case "In Progress":
        return "#2563eb";
      case "Pending":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  }

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        Loading Tasks...
      </div>
    );
  }

  return (
    <div style={{ padding: "30px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h1>Tasks</h1>

        <Link href="/crm/tasks/add">
          <button
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            + Add Task
          </button>
        </Link>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#f8fafc",
              }}
            >
              <th style={th}>Task</th>
              <th style={th}>Assigned To</th>
              <th style={th}>Due Date</th>
              <th style={th}>Priority</th>
              <th style={th}>Status</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  style={{
                    textAlign: "center",
                    padding: "30px",
                  }}
                >
                  No Tasks Found
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task.id}>
                  <td style={td}>{task.task_name}</td>

                  <td style={td}>
                    {task.assigned_to}
                  </td>

                  <td style={td}>
                    {task.due_date}
                  </td>

                  <td style={td}>
                    <span
                      style={{
                        background:
                          getPriorityColor(
                            task.priority
                          ),
                        color: "#fff",
                        padding:
                          "5px 12px",
                        borderRadius:
                          "20px",
                        fontSize: "13px",
                      }}
                    >
                      {task.priority}
                    </span>
                  </td>

                  <td style={td}>
                    <span
                      style={{
                        background:
                          getStatusColor(
                            task.status
                          ),
                        color: "#fff",
                        padding:
                          "5px 12px",
                        borderRadius:
                          "20px",
                        fontSize: "13px",
                      }}
                    >
                      {task.status}
                    </span>
                  </td>

                  <td style={td}>
                    <Link
                      href={`/crm/tasks/edit/${task.id}`}
                    >
                      <button
                        style={{
                          background:
                            "#2563eb",
                          color:
                            "white",
                          border:
                            "none",
                          padding:
                            "8px 15px",
                          borderRadius:
                            "6px",
                          cursor:
                            "pointer",
                          marginRight:
                            "10px",
                        }}
                      >
                        Edit
                      </button>
                    </Link>

                    <button
                      onClick={() =>
                        deleteTask(
                          task.id
                        )
                      }
                      style={{
                        background:
                          "#dc2626",
                        color:
                          "white",
                        border:
                          "none",
                        padding:
                          "8px 15px",
                        borderRadius:
                          "6px",
                        cursor:
                          "pointer",
                      }}
                    >
                      Delete
                    </button>
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

const th = {
  textAlign: "left" as const,
  padding: "15px",
  borderBottom: "1px solid #ddd",
};

const td = {
  padding: "15px",
  borderBottom: "1px solid #eee",
};