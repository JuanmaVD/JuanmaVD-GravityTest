import { useState } from "react";
import JobList from "./components/JobList";
import UserForm from "./components/UserForm";
import ApplyModal from "./components/ApplyModal";

function App() {
  const [user, setUser] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Recibe el usuario logueado desde UserForm
  const handleUserLogin = (userData) => {
    setUser(userData);
  };

  // Abre el modal con el puesto seleccionado
  const handleApply = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  // Cierra el modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <>
      <UserForm onLogin={handleUserLogin} />
      <JobList onApply={user ? handleApply : undefined} />
      {user && selectedJob && (
        <ApplyModal
          open={modalOpen}
          onClose={handleCloseModal}
          job={selectedJob}
          user={user}
        />
      )}
    </>
  );
}

export default App;