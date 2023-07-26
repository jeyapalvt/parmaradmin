import Titlebanner from "../../../globel_cmponents/title_banner";
import FromSubmitToApi from "../../../utils/FromSubmitToApi";
import AgencylistToMarkup from "./forms/AgencylistToMarkup";
import { useParams } from "react-router";
import { useEffect } from "react";
const Agencylistmarkup = (props) => {
  let { id, name, status, desc } = useParams();

  useEffect(() => {}, []);
  return (
    <>
      <Titlebanner title="" />
      <AgencylistToMarkup
        groupid={id}
        name={name}
        status={status}
        desc={desc}
        onSubmit={FromSubmitToApi.setCustomerTypeAgency}
      />
    </>
  );
};

export default Agencylistmarkup;
