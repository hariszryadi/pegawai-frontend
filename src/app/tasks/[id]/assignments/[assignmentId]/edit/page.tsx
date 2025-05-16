'use client'

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";

export default function EditAssignmentPage() {
    const { id, assignmentId } = useParams();
    const router = useRouter();

    const [assignment, setAssignment] = useState<any>(null);
    const [employees, setEmployees] = useState<any[]>([]);
    const [employeeId, setEmployeeId] = useState("");
    const [hoursSpent, setHoursSpent] = useState("");

    useEffect(() => {
        api.get("/employees").then(res => setEmployees(res.data));

        api.get(`/assignments/${assignmentId}`).then(res => {
            const a = res.data;
            setAssignment(a);
            setEmployeeId(a.employee_id.toString());
            setHoursSpent(a.hours_spent.toString());
        });
    }, [assignmentId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await api.put(`/assignments/${assignmentId}`, {
            employee_id: Number(employeeId),
            task_id: Number(id),
            hours_spent: Number(hoursSpent),
        });
        router.push(`/tasks/${id}`);
    };

    if (!assignment) return <div className="p-6">Memuat...</div>;

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Edit Assignment</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Pegawai</label>
                    <select
                        className="w-full border p-2 rounded"
                        value={employeeId}
                        onChange={e => setEmployeeId(e.target.value)}
                    >
                        <option value="">Pilih Pegawai</option>
                        {employees.map(emp => (
                            <option key={emp.id} value={emp.id}>
                                {emp.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1">Jumlah Jam Kerja</label>
                    <input
                        type="number"
                        className="w-full border p-2 rounded"
                        value={hoursSpent}
                        onChange={e => setHoursSpent(e.target.value)}
                        required
                    />
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
                    >
                        Kembali
                    </button>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Simpan Perubahan
                    </button>
                </div>
            </form>
        </div>
    );
}
