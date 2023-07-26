import { Link } from "react-router-dom";
import Titlebanner from "../../../globel_cmponents/title_banner";
import Groupingmastertable from "./grouping_master_table";
const Parkgrouping = () => {
  return (
    <>
      <Titlebanner title="Park Grouping" />
      <div className="float-right">
        <Link
          to="/attraction/park-grouping-new/null"
          class="btn btn-primary"
          role="button"
        >
          Create New
        </Link>
      </div>
      <Groupingmastertable />
    </>
  );
};

export default Parkgrouping;
