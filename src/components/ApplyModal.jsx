import { useState } from "react";
import { applyToJob } from "../services/api";

export default function ApplyModal({ open, onClose, job, user }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await applyToJob({
        uuid: user.uuid,
        jobId: job.id,
        candidateId: user.candidateId,
        repoUrl,
      });
      setSuccess("¡Postulación enviada con éxito!");
      setRepoUrl("");
    } catch (err) {
      setError("Error al enviar la postulación.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow max-w-md w-full p-6 relative">
        <button
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-xl"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        <h2 className="text-lg font-bold mb-2">Postularse a: {job.title}</h2>
        <div className="mb-4 text-sm text-gray-700">
          <div>
            <strong>Nombre:</strong> {user.firstName} {user.lastName}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>UUID:</strong> {user.uuid}
          </div>
          <div>
            <strong>Candidate ID:</strong> {user.candidateId}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="url"
            placeholder="URL de tu repositorio de GitHub"
            className="border rounded px-3 py-2"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar postulación"}
          </button>
        </form>
        {error && <div className="text-red-500 mt-4">{error}</div>}
        {success && <div className="text-green-600 mt-4">{success}</div>}
      </div>
    </div>
  );
}