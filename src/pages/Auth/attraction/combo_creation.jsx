import Titlebanner from "../../../globel_cmponents/title_banner";
import CompopackForm from "./attractionForms/CombopackForm";
import { useParams } from "react-router-dom";
const Combopackcreation = () => {
  let { id } = useParams();
  return (
    <>
      <Titlebanner title="Combo Pack Creation" />
      <CompopackForm id={id}/>
    </>
  );
};

export default Combopackcreation;
