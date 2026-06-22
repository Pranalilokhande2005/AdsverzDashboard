"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AddTaskPage() {
  const router = useRouter();

  const [taskName, setTaskName] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Pending");
  const [notes, setNotes] = useState("");

  async function saveTask(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const { error } = await supabase
      .from("tasks")
      .insert([
        {
          task_name: taskName,
          assigned_to: assignedTo,
          due_date: dueDate,
          priority: priority,
          status: status,
          notes: notes,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Task Added Successfully");

    router.push("/crm/tasks");
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        background: "white",
        padding: "30px",
        borderRadius: "10px",
      }}
    >
      <h1>Add Task</h1>

      <form onSubmit={saveTask}>
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
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <label>Status</label>
        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          style={inputStyle}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
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
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            marginTop: "15px",
          }}
        >
          Save Task
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