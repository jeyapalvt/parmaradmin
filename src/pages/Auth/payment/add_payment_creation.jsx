import Titlebanner from "../../../globel_cmponents/title_banner";
import { Row, Col } from "react-bootstrap";
import PaymentCreationForm from "./forms/PaymentCreationForm";
import FromSubmitToApi from "../../../utils/FromSubmitToApi";
const Addpaymentcreation = () => {
  return (
    <>
      <Titlebanner title="Add Payment" />

      <PaymentCreationForm />
    </>
  );
};

export default Addpaymentcreation;
