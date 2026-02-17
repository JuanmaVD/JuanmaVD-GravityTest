import { useEffect, useState } from "react";
import { getJobsList } from "../services/api";

export default function JobList({ onApply }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      setError("");
      try {
        const data = await getJobsList();
        setJobs(data);
      } catch (err) {
        setError("No se pudieron cargar los puestos.");
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Puestos Disponibles</h2>
      {loading && <div>Cargando puestos...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && (
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left pb-2">Nombre del puesto</th>
              <th className="text-left pb-2">Acción</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-t">
                <td className="py-2">{job.title}</td>
                <td>
                  <button
                    className="bg-blue-600 text-white rounded px-3 py-1 font-semibold hover:bg-blue-700 transition"
                    onClick={() => onApply && onApply(job)}
                  >
                    Postularse
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}