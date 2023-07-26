import Titlebanner from "../../../globel_cmponents/title_banner";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import BookingForm from "./BookingForm";
import FromSubmitToApi from "../../../utils/FromSubmitToApi";
const Ticketbook = () => {

  return (
    <>

      <Titlebanner title="Attraction List" />
      <BookingForm onSubmit={FromSubmitToApi.showResults}/>

    </>
  );
};

export default Ticketbook;
