import ParkCreationForm from "./attractionForms/ParkCreationForm";
import Titlebanner from "../../../globel_cmponents/title_banner";

import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Attractioncreationform = (props) => {
  let { id } = useParams();
  useEffect(() => {
    // console.log(id);
  }, []);
  return (
    <>
      <Titlebanner title="Attraction Creation" />

      <ParkCreationForm attid={id} />
    </>
  );
};

export default Attractioncreationform;
