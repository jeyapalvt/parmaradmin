import Titlebanner from "../../../globel_cmponents/title_banner";
import RoleCreateForm from "./forms/RoleCreateForm";
import FromSubmitToApi from "../../../utils/FromSubmitToApi";

const Adminrolecreate = (props) => {
  return (
    <>
      <Titlebanner title="Role Creation" />

      <RoleCreateForm />
    </>
  );
};

export default Adminrolecreate;
