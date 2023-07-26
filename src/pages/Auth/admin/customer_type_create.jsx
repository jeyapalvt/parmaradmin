
import Titlebanner from "../../../globel_cmponents/title_banner";
import CustomerCreationForm from "./forms/CustomerCreationForm";
import FromSubmitToApi from "../../../utils/FromSubmitToApi";

const CustomerTypenew = () => {
  return (
    <>
      <Titlebanner title="Customer Type" />
      {/* <RoleCreateForm onSubmit={FromSubmitToApi.showResults} /> */}
      <CustomerCreationForm onSubmit={FromSubmitToApi.setCustomertype} />
    </>
  );
};

export default CustomerTypenew;
