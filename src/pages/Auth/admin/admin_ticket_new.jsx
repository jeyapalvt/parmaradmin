import Titlebanner from "../../../globel_cmponents/title_banner";

import { useEffect, useState } from "react";
import TicketTypeCreationForm from "./forms/TicketTypeCreationForm";

import { useParams } from "react-router";

const Ticketcreatenew = () => {
  // const Test = useSelector(state =>state);
  let { id } = useParams();
  useEffect(() => {}, []);
  // const [tktEdit, settktEdit] = useState([]);
  // const [isloading, setisloading] = useState(false);
  // const getTktObj=(id)=>{

  //   console.log("ID  getTktObj", id);
  //   axios.post(requests.gettickettypelist, {userRolesId : 1}).then((response)=>{
  //     console.log("responce", response.data);
  //     settktEdit(response.data);
  //     filteredit(response.data, id);
  //   }).catch((error)=>{
  //     console.log(error)
  //   })

  // }

  // const filteredit =(tktdata, id)=>{
  //   console.log("For filter",tktdata)
  //   const editdata = tktdata.filter(
  //     (tktdata) => tktdata.ticketTypeId == id);
  //     console.log("tjteerfe", editdata);
  //     settktEdit(editdata);
  //     setisloading(true);

  // }

  return (
    <>
      <Titlebanner title="Ticket Type" />
      {/* <RoleCreateForm onSubmit={FromSubmitToApi.showResults} /> */}
      <TicketTypeCreationForm tktId={id} />
    </>
  );
};

export default Ticketcreatenew;
