import { useState } from "react";
import { getCandidateByEmail } from "../services/api";

export default function UserForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUser(null);
    try {
      const data = await getCandidateByEmail(email);
      setUser(data);
      if (onLogin) onLogin(data); // Llama a la prop onLogin con los datos del usuario
    } catch (err) {
      setError("No se encontró el usuario o hubo un error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Ingresa tu email"
          className="border rounded px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Cargando..." : "Iniciar sesión"}
        </button>
      </form>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {user && (
        <div className="mt-6 text-sm text-gray-700">
          <div><strong>Nombre:</strong> {user.firstName} {user.lastName}</div>
          <div><strong>Email:</strong> {user.email}</div>
          <div><strong>UUID:</strong> {user.uuid}</div>
          <div><strong>Candidate ID:</strong> {user.candidateId}</div>
          <div><strong>Application ID:</strong> {user.applicationId}</div>
        </div>
      )}
    </div>
  );
}