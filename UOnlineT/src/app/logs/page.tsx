"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect, useState } from "react";

interface LogEntry {
  id: number;
  user: string;
  action: string;
  timestamp: string;
}

export default function ActivityLogPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch("/api/logs");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setLogs(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <DefaultLayout>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Activity Log</h2>
        {isLoading ? (
          <p>Loading logs...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <table className="w-full text-left border-collapse bg-white shadow rounded-lg">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="border border-gray-400 px-4 py-2">ID</th>
                <th className="border border-gray-400 px-4 py-2">User</th>
                <th className="border border-gray-400 px-4 py-2">Action</th>
                <th className="border border-gray-400 px-4 py-2">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="border border-gray-400 px-4 py-2 text-center">
                    {log.id}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">{log.user}</td>
                  <td className="border border-gray-400 px-4 py-2">{log.action}</td>
                  <td className="border border-gray-400 px-4 py-2">{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DefaultLayout>
  );
}
