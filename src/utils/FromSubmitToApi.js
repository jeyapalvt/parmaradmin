import axios from "axios";

import requests from "./Requests";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// export default (
//   async function showResults(values) {
//   await sleep(500); // simulate server latency
//   window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
//   //window.alert(`You submitted:\n\n${values.username}`);
// }

// );
// const FormSubmitToAPI=(values)=>{

//   const [AttractionDto, setAttractionDto] = useState(attractionDto);
//   window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
// const newVal = JSON.stringify(values, null, 2);

// setAttractionDto({
//   ...attractionDto,
//   attractionsId: null,
//   attName: values.attrName,
//   attDescription: values.attrDescription,
//   attCountryCode: values.attrCountry,
//   attCity: null,
//   attGroup: values.attrGroup,
//   attEntryTime: null,
//   attstatus: values.attrStatus,
//   attCodeFormat: null,
//   attTicketFormat: null,
//   price: null,
// });
// console.log(AttractionDto)
//};

// async function Submitdata(values){
//   window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
// }
// export default FormSubmitToAPI;
async function showResults(values) {
  await sleep(500); // simulate server latency
  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  // axios.post(`http://103.235.106.127:8080/parmartour/v1.0/setattraction`, values)
  // .then(res =>{
  //   console.log(res.data)
  // })
  // .catch(err=>{
  //   console.log(err);
  // })
  console.log(values);
}

async function attractionSubmit(values, dispatch, props) {
  await // simulate server latency
  // window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  axios
    .post(requests.postattraction, values)
    .then((res) => {
      console.log(res.data);
      window.alert(`Successfully Created`);
      dispatch(props.reset());
    })
    .catch((err) => {
      console.log(err);
      window.alert(err);
    });
}

async function attractionUpdate(values, dispatch, props) {
  await // simulate server latency
  //window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  axios
    .post(requests.updateattraction, values)
    .then((res) => {
      console.log(res.data);
      window.alert(`Successfully Created`);
      dispatch(props.reset());
    })
    .catch((err) => {
      console.log(err);
      window.alert(err);
    });
}
async function ticketSubmit(values, dispatch, props) {
  await sleep(500); // simulate server latency
  // console.log("values", values);
  //window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);

  axios
    .post(requests.posttktcreation, values)
    .then((res) => {
      console.log(res.data);
      window.alert(`Successfully Created`);
      dispatch(props.reset());
    })
    .catch((err) => {
      console.log(err);
    });
}
async function tourpackSubmit(values, dispatch, props) {
  await sleep(500); // simulate server latency
  //window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  axios
    .post(requests.posttourpackage, values)
    .then((res) => {
      console.log(res.data);
      window.alert(`Successfully Created`);
      dispatch(props.reset());
    })
    .catch((err) => {
      console.log(err);
      window.alert(`Error`);
    });
}
async function userLogin(values) {
  // await sleep(500); // simulate server latency
  // window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  // axios.post("http://192.168.225.59:8080/v1.0/getloginuserdetails", values)
  //   .then(res => {
  //     console.log(res.data)
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  sessionStorage.setItem("Name", "jey");
  window.location.reload();
  window.location.href = "/";
}

async function agencySumbit(values, dispatch, props) {
  await sleep(500); // simulate server latency

  axios
    .post(requests.postagencycreation, values)
    .then((res) => {
      console.log(res.data);
      window.alert(`Successfully Created`);
      dispatch(props.reset());
    })
    .catch((err) => {
      console.log(err);
    });
}
async function agencyUser(values, dispatch, props) {
  await sleep(500); // simulate server latency
  // window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  console.log(JSON.stringify(values));
  axios
    .post(requests.postagencyuser, values)
    .then((res) => {
      console.log(res.data);
      window.alert(`Successfully Created`);
      dispatch(props.reset());
    })
    .catch((err) => {
      console.log(err);
    });
}
async function parkgroupSumbit(values, dispatch, props) {
  await sleep(500); // simulate server latency
  // window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  axios
    .post(requests.postparkgroupping, values)
    .then((res) => {
      console.log(res.data);
      window.alert(`Successfully Created`);
      dispatch(props.reset());
    })
    .catch((err) => {
      console.log(err);
    });
}
async function tktTypeCreation(values, dispatch, props) {
  await sleep(500); // simulate server latency
  // window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  axios
    .post(requests.posttkttypecreation, values)
    .then((res) => {
      console.log(res.data);
      window.alert(`Successfully Created`);
      dispatch(props.reset());
    })
    .catch((err) => {
      console.log(err);
    });
}

async function userRoleCreation(values, dispatch, props) {
  await sleep(500); // simulate server latency
  // window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  axios
    .post(requests.postuserrolecreation, values)
    .then((res) => {
      console.log(res.data);
      window.alert(`Successfully Created`);
      dispatch(props.reset());
    })
    .catch((err) => {
      console.log(err);
    });
}
async function setMarkupdis(values, dispatch, props) {
  await sleep(500); // simulate server latency
  // window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  axios
    .post(requests.setmarkupdiscountdetail, values)
    .then((res) => {
      console.log(res.data);
      window.alert(`Successfully Created`);
      dispatch(props.reset());
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getattractionallbygroup(values, dispatch, props) {
  await sleep(500); // simulate server latency
  // window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  axios
    .post(requests.getattractionallbygroup, values)
    .then((res) => {
      console.log(res.data);
      //window.alert(`Successfully Created`);
      dispatch(props.reset());
    })
    .catch((err) => {
      console.log(err);
    });
}

async function setFormAddon(values, dispatch, props) {
  await sleep(500); // simulate server latency
  // window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  axios
    .post(requests.getaddonformdetails, values)
    .then((res) => {
      console.log(res.data);
      window.alert(`Successfully Created`);
      dispatch(props.reset());
    })
    .catch((err) => {
      console.log(err);
    });
}

async function setBannerAddon(values, dispatch, props) {
  await sleep(500); // simulate server latency
  // window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  axios
    .post(requests.setaddonbannerdetails, values)
    .then((res) => {
      console.log(res.data);
      window.alert(`Successfully Created`);
      dispatch(props.reset());
    })
    .catch((err) => {
      console.log(err);
    });
}

async function updateTktExpiry(values, dispatch, props) {
  await sleep(500); // simulate server latency
  // window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  axios
    .post(requests.updateTicketExpiry, values)
    .then((res) => {
      console.log(res.data);
      window.alert(`Successfully Updated`);
      dispatch(props.reset());
    })
    .catch((err) => {
      console.log(err);
    });
}

// setcustomercypedetails

async function setCustomertype(values, dispatch, props) {
  await sleep(500); // simulate server latency
  // window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  axios
    .post(requests.setcustomercypedetails, values)
    .then((res) => {
      console.log(res.data);
      window.alert(`Successfully Updated`);
      dispatch(props.reset());
    })
    .catch((err) => {
      console.log(err);
    });
}

//setCustomerTypeAgency

async function setCustomerTypeAgency(values, dispatch, props) {
  await sleep(500); // simulate server latency
  //  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  axios
    .post(requests.setCustomerTypeAgency, values)
    .then((res) => {
      console.log(res.data);
      window.alert(`Successfully Updated`);
      window.location.reload();
      dispatch(props.reset());
    })
    .catch((err) => {
      console.log(err);
    });
}
//setmarkupdiscountdetail

async function setmarkupdiscountdetail(values, dispatch, props) {
  await sleep(500); // simulate server latency
  //  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  console.log(JSON.stringify(values, null, 2));
  axios
    .post(requests.setmarkupdiscountdetail, values)
    .then((res) => {
      console.log(res.data);
      window.alert(`Successfully Updated`);

      dispatch(props.reset());
    })
    .catch((err) => {
      console.log(err);
    });
}

export default {
  attractionSubmit,
  showResults,
  ticketSubmit,
  tourpackSubmit,
  userLogin,
  agencySumbit,
  parkgroupSumbit,
  agencyUser,
  tktTypeCreation,
  userRoleCreation,
  setMarkupdis,
  getattractionallbygroup,
  setFormAddon,
  setBannerAddon,
  updateTktExpiry,
  setCustomertype,
  setCustomerTypeAgency,
  setmarkupdiscountdetail,
  attractionUpdate,
};

// http://103.235.106.127:8080/parmartour/v1.0/setticket
