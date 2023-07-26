import { Link } from "react-router-dom";
import Titlebanner from "../../../globel_cmponents/title_banner";
import Tickettypetable from "./ticket_type_table";
const TicketType = () => {
  return (
    <>
      <Titlebanner title="Ticket Type"/>
     <div className="float-right">
        <Link to="/admin/ticket-type-new/null" class="btn btn-primary" role="button">
          Create New
        </Link>
      </div>

      <br/> <br/> <br/>
    <Tickettypetable/>
    </>
  );
};

export default TicketType;
