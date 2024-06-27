import Readonly from "./Readonly";
import { useNavigate } from "react-router-dom";

type Props = { patientId: string };

const UkgSection = ({ patientId }: Props) => {
  const navigate = useNavigate();
  return (
    <Readonly
      patientId={patientId}
      addNew={() => navigate(`/patient/${patientId}/ukg/add`)}
    />
  );
};

export default UkgSection;
