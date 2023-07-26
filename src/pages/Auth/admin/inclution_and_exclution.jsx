import Titlebanner from "../../../globel_cmponents/title_banner";
import { Row, Col, Form } from "react-bootstrap";
import InclutionAnaExclution from "./forms/InclutionAnaExclution";
import FromSubmitToApi from "../../../utils/FromSubmitToApi";

const Inclutionexclution = () => {
  return (
    <>
      <Titlebanner title="Create Inclutions And Exclutions" />
      <InclutionAnaExclution onSubmit={FromSubmitToApi.showResults} />
    </>
  );
};

export default Inclutionexclution;
