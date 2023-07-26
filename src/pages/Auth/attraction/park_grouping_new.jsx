import { useParams } from "react-router-dom";
import FromSubmitToApi from "../../../utils/FromSubmitToApi";
import ParkGrouping from "./attractionForms/ParkGrouping";

const Parkgroupingnew = () => {
  let { id } = useParams();
  return (
    <>
      <ParkGrouping groupid={id} />
    </>
  );
};

export default Parkgroupingnew;
