import { Link } from "react-router-dom";

import "react-dropzone-uploader/dist/styles.css";
import Titlebanner from "../../../globel_cmponents/title_banner";
import Attractionlisttable from "./attraction_list_table";

const Attractioncreation = () => {


  return (
    <>
     <Titlebanner title="Attraction List" />
      <div className="float-right">
        <Link to="/attraction/attraction-creation-new" class="btn btn-primary" role="button">
          Create New
        </Link>
      </div>

      <br></br>
      <Attractionlisttable/>
    </>
  );
};

export default Attractioncreation;
