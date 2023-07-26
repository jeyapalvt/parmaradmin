import { Link } from "react-router-dom";
import { CardBody } from "reactstrap";
import Titlebanner from "../../../globel_cmponents/title_banner";
import Agencylistable from "./agency_list_table";

const AgencyCreation = () => {
  return (
    <>
     <Titlebanner title="Agency Creation"/>
     <CardBody>
     <div className="float-right">
        <Link to='/admin/agency-create-new/null' class="btn btn-primary" role="button">
          Create New
        </Link>
      </div>
      </CardBody>
      <br></br>
      
      <Agencylistable/>
     
    </>
  );
};

export default AgencyCreation;
