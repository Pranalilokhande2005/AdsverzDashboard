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
    return <div style={{ padding: "30px" }}>Loading Tasks...</div>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Tasks</h1>

      <Link href="/crm/tasks/add">
        <button>+ Add Task</button>
      </Link>

      {tasks.map((task) => (
        <div key={task.id}>
          {task.task_name}
        </div>
      ))}
    </div>
  );
}
