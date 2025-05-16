'use client'

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";

export default function TaskListPage() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        api.get("/tasks").then(res => setTasks(res.data));
    }, []);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Daftar Tugas</h1>
                <Link
                    href="/tasks/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + Tambah Tugas
                </Link>
            </div>

            <ul className="space-y-3">
                {tasks.map((task: any) => (
                    <li key={task.id} className="border p-4 rounded-lg shadow">
                        <p className="font-semibold">{task.description}</p>
                        <p className="text-sm text-gray-600">Tanggal: {task.date}</p>
                        <Link href={`/tasks/${task.id}`} className="text-blue-600 underline mr-4">Lihat Detail</Link>

                        <Link href={`/tasks/${task.id}/edit`} className="text-sm text-green-600 mr-4">
                            Edit
                        </Link>

                        <button
                            onClick={async () => {
                                if (confirm("Yakin hapus tugas ini?")) {
                                    await api.delete(`/tasks/${task.id}`);
                                    setTasks(tasks.filter((t: any) => t.id !== task.id));
                                }
                            }}
                            className="text-sm text-red-600"
                        >
                            Hapus
                        </button>
                    </li>
                ))}
            </ul>
        </div >
    );
}
