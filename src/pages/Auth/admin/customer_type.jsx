import { Link } from "react-router-dom";
import Titlebanner from "../../../globel_cmponents/title_banner";
import Customertypetable from "./customer_type_table";

const Customertype = () => {
    
    return ( <>
    <Titlebanner title="Customer Type"/>
    <div className="float-right">
    <Link to="/admin/customer-type-new" class="btn btn-primary" role="button">
      Create New
    </Link>
  </div>

  <br></br><br/><br/>
  <Customertypetable/>
  </>
 
  );
}
 
export default Customertype;