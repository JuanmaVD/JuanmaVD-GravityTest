export async function getCandidateByEmail(email) {
  const url = `https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net/api/candidate/get-by-email?email=${encodeURIComponent(email)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error fetching candidate data');
  }
  return await response.json();
}

export async function getJobsList() {
  const url = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net/api/jobs/get-list";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error fetching jobs list');
  }
  return await response.json();
}

export async function applyToJob({ uuid, jobId, candidateId, applicationId, repoUrl }) {
  const url = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net/api/candidate/apply-to-job";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ uuid, jobId, candidateId, applicationId, repoUrl })
  });
  if (!response.ok) {
    throw new Error('Error applying to job');
  }
  return await response.json();
}