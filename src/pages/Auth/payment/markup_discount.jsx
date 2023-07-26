import Titlebanner from "../../../globel_cmponents/title_banner"
import { Link } from "react-router-dom";
import Markuplisttable from "./markup_list_table";
const Markupcreation = (props) => {
    return ( <>
    <Titlebanner title="MarkUp Creation"/>
    <div className="float-right">
        <Link to="/payment/markup-discount-create/null" class="btn btn-primary" role="button">
          Create New
        </Link>
      </div>
<br/><br/>
 <Markuplisttable/>
    </> );
}
 
export default Markupcreation;