import TicketEditForm from "./attractionForms/TicketEditForm";
import FromSubmitToApi from "../../../utils/FromSubmitToApi";
import { useParams } from "react-router-dom";
const TktEditForm = () => {
  let { id } = useParams();
  return (
    <>
      <TicketEditForm batchId={id} />
    </>
  );
};

export default TktEditForm;
