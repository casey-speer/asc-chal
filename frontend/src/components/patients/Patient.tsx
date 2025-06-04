import { usePatientDetails } from "@/queries/patient";
import { useParams } from "react-router";

const Patient = () => {
  const { id } = useParams();
  const { data: patient, isLoading, isError, error } = usePatientDetails(id!);
  console.log("patient", patient)

  if (!patient) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>{patient.full_name}</h2>
      <p>Birth Date: {patient.birth_date}</p>
      <p>ID: {patient.id}</p>
      <p>Resource Type: {patient.resourceType}</p>
    </div>
  );

}
export default Patient