'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { formatRupiah } from "@/lib/rupiah";
import Link from "next/link";

export default function TaskDetailPage() {
    const { id } = useParams();
    const [task, setTask] = useState<any>(null);

    useEffect(() => {
        api.get(`/tasks/${id}/remuneration`).then(res => setTask(res.data));
    }, [id]);

    const handleDelete = async (assignmentId: number) => {
        if (!confirm("Yakin mau hapus assignment ini?")) return;

        try {
            await api.delete(`/assignments/${assignmentId}`);
            const updated = await api.get(`/tasks/${task.id}`);
            setTask(updated.data);
        } catch (err) {
            console.error("Gagal menghapus assignment:", err);
        }
    };


    if (!task) return <p className="p-6">Memuat...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">{task.task}</h1>

            <p>Tanggal: {task.date}</p>
            <p>Tarif / Jam: {formatRupiah(task.hourly_rate)}</p>
            <p>Biaya Tambahan: {formatRupiah(task.additional_charges)}</p>
            <p>Total Remunerasi: <strong>{formatRupiah(task.total_remuneration)}</strong></p>

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold mt-6">Pembagian Remunerasi:</h2>
                <div className="flex gap-4">
                    <Link
                        href={`/tasks`}
                        className="text-sm bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700"
                    >
                        Kembali
                    </Link>
                    <Link
                        href={`/tasks/${task.id}/assignments/new`}
                        className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                        + Tambah Assignment
                    </Link>
                </div>
            </div>

            <ul className="mt-2 space-y-2">
                {task.assignments.map((a: any, i: number) => (
                    <li key={i} className="border p-3 rounded">
                        <div className="flex justify-between items-center">
                            <div>
                                <p>{a.employee_name}</p>
                                <p>{a.hours_spent} jam → {formatRupiah(a.remuneration)}</p>
                            </div>

                            <div className="space-x-2">
                                <Link
                                    href={`/tasks/${task.id}/assignments/${a.id}/edit`}
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(a.id)}
                                    className="text-sm text-red-600 hover:underline"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
