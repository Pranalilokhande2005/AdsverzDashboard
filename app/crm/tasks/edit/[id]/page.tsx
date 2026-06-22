"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditTaskPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [taskName, setTaskName] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Pending");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (params?.id) {
      fetchTask();
    }
  }, [params]);

  async function fetchTask() {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    setTaskName(data.task_name || "");
    setAssignedTo(data.assigned_to || "");
    setDueDate(data.due_date || "");
    setPriority(data.priority || "Medium");
    setStatus(data.status || "Pending");
    setNotes(data.notes || "");

    setLoading(false);
  }

  async function updateTask(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const { error } = await supabase
      .from("tasks")
      .update({
        task_name: taskName,
        assigned_to: assignedTo,
        due_date: dueDate,
        priority: priority,
        status: status,
        notes: notes,
      })
      .eq("id", params.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Task Updated Successfully");

    router.push("/crm/tasks");
  }

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        Loading Task...
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      <h1>Edit Task</h1>

      <form onSubmit={updateTask}>
        <label>Task Name</label>
        <input
          value={taskName}
          onChange={(e) =>
            setTaskName(e.target.value)
          }
          required
          style={inputStyle}
        />

        <label>Assigned To</label>
        <input
          value={assignedTo}
          onChange={(e) =>
            setAssignedTo(e.target.value)
          }
          style={inputStyle}
        />

        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) =>
            setDueDate(e.target.value)
          }
          style={inputStyle}
        />

        <label>Priority</label>
        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
          style={inputStyle}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label>Status</label>
        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          style={inputStyle}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">
            In Progress
          </option>
          <option value="Completed">
            Completed
          </option>
        </select>

        <label>Notes</label>
        <textarea
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
          style={{
            ...inputStyle,
            minHeight: "120px",
          }}
        />

        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "12px 24px",
            borderRadius: "6px",
            cursor: "pointer",
            marginTop: "15px",
          }}
        >
          Update Task
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "6px",
  marginBottom: "18px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
} as const;