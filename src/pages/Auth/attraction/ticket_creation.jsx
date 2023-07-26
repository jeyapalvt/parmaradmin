import { Card, CardBody, CardText } from "reactstrap";
import Titlebanner from "../../../globel_cmponents/title_banner";
import FromSubmitToApi from "../../../utils/FromSubmitToApi";

import TicketCreationForm from "./attractionForms/TicketCreationForm";

const TicketCreation = () => {
  return (
    <>
      <Titlebanner title="Ticket Creation" />

      <TicketCreationForm  />
    </>
  );
};

export default TicketCreation;
