import { React, useState, useEffect } from "react";
import { render } from "react-dom";
import Agencyuserform from "./forms/Agencyuserform";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import requests from "../../../utils/Requests";
import { Button, ModalHeader, Modal, ModalBody } from "reactstrap";

import Titlebanner from "../../../globel_cmponents/title_banner";
import { AiTwotoneEdit } from "react-icons/ai";

const Agencyuserlisttable = ({ agentId }) => {
  useEffect(() => {
   
  }, []);

  const [modal, setModal] = useState(false);

  const toggleModel = () => setModal(!modal);

  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  let attraction = { agencyId: agentId };
  let history = useHistory();
  const onGridReady = (params) => {
    axios
      .post(requests.getagencyuserlistforagency, agentId)
      .then((res) => {



      
        params.api.applyTransaction({ add: res.data });
      
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [agentIdedit, setagentIdedit] = useState();
  const actionButton = (params) => {
    // console.log(params);
    // alert(`${params.data.agencyUserId} `);
    setagentIdedit(params.data.agencyUserId);
    toggleModel();
    // history.push(
    //   `/admin/agency-create-new/${params.data.agencyUserId}`
    // ); //{`tour-pack-details/${alltour.attractionsId}`}"/attraction/attraction-creation"
  };

  const columnDefs = [
    { headerName: "First Name", field: "userFirstName" },
    { headerName: "Last Name", field: "userLastName" },
    { headerName: "E-Mail", field: "userEmail" },

    {
      headerName: "Action",
      filter: false,
      field: "attName",
      cellRendererFramework: (params) => (
        <div>
          <Button color="primary" onClick={() => actionButton(params)}>
            <AiTwotoneEdit />
          </Button>
        </div>
      ),
    },
  ];
  // const rowData = [
  //   { name: "Rahul", age: 19, phoneNumber: 9876543210, birthYear: 2001 },
  //   { name: "David", age: 17, phoneNumber: 9827654310, birthYear: 2003 },
  //   { name: "Dan", age: 25, phoneNumber: 9765438210, birthYear: 1995 },
  // ];

  const defaultColDef = {
    sortable: true,
    editable: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
  };
  return (
    <>
      <Modal
        isOpen={modal}
        toggle={toggleModel}
        className="modal-dialog modal-lg"
      >
        <ModalHeader toggle={toggleModel}>Create New User</ModalHeader>
        <ModalBody>
          <Agencyuserform
            id={0}
            rootAgentId={agentId}
            subUserId={agentIdedit}
            // onSubmit={FromSubmitToApi.agencyUser}
          />
        </ModalBody>
      </Modal>
      <Titlebanner title="Agency User" />
      <div className="App">
        <div className="ag-theme-alpine" style={{ height: "500px" }}>
          <AgGridReact
            columnDefs={columnDefs}
            // rowData={rowData}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            pagination={true}
            // paginationPageSize={5}
            paginationAutoPageSize={true}
          ></AgGridReact>
        </div>
      </div>
    </>
  );
};

export default Agencyuserlisttable;
