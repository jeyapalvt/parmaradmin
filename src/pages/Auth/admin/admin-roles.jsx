import Titlebanner from "../../../globel_cmponents/title_banner";
import Commontable from "../../../globel_cmponents/common_table";
import { Switch, Redirect } from "react-router";
import { Link } from "react-router-dom";
import RouteWithSubRoute from "../../../utils/route_with_sub_route";
import Formthree from "../../../globel_cmponents/formthree";
import Userroletable from "./user_roles_table";
const AdminRoles = ({ routes }) => {
  return (
    <>
      <Titlebanner title="Role Creation" />
    

      <div className="float-right">
        <Link to="/admin/roles-create-new/null" class="btn btn-primary" role="button">
          Create New
        </Link>
      </div>
      <br/><br/><br/>

     <Userroletable/>
   


    </>
  );
};

export default AdminRoles;
