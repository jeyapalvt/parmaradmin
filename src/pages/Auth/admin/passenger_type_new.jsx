import Titlebanner from "../../../globel_cmponents/title_banner";
import FromSubmitToApi from "../../../utils/FromSubmitToApi";
import PassengerCreationForm from "./forms/PassengerCreationForm";
const Passengercreatenew = () => {
  return (
    <>
      <Titlebanner title="Passenger Create New" />
      <PassengerCreationForm onSubmit={FromSubmitToApi.showResults} />
    </>
  );
};

export default Passengercreatenew;
