import Titlebanner from "../../../globel_cmponents/title_banner";
import { useState } from "react";

import FromSubmitToApi from "../../../utils/FromSubmitToApi";
import { useParams } from "react-router-dom";
import Agencycreationform from './forms/AgencyCreationForm';
const Newagencycreation = () => {
    const [status, setStatus] = useState(0) 
    let { id } = useParams();
    const radioHandler = (status) => {
      setStatus(status);
    };

    return ( <>
     <Titlebanner title="Agency Creation"/>
     {/* <Agencycreationform agentId={id} onSubmit={FromSubmitToApi.agencySumbit}/> */}


      <Agencycreationform agentId={id} />

      
        
    </> );
}
 
export default Newagencycreation;