/** @format */

import React, { useEffect ,useState} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import axios from "axios";
import requests from "../../../utils/Requests";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { GiCancel } from "react-icons/gi";
import Swal from "sweetalert2";
const SubuserTable = () => {
  useEffect(() => {
    getUserDataList()
  }, []);

  let history = useHistory();
  let attraction = { attractionsId: 1, secretKey: requests.apiKey };
  const [rowData, setrowData] = useState([]);

  const getUserDataList = () =>{
    axios
    .post(requests.getUserDataList, { userListId: 0 })
    .then((res) => {
         setRecordForTable(res.data);
     console.log(res.data);     
    })
    .catch((err) => {
      console.log(err);
    });
  }
//teamparmarit@gmail.com  Pparmar@2023
  const setRecordForTable = (record) => {
    const tempRecord = record.map(
      ({
        userListId,
        userEmail,       
        userName,        
        userType,        
      }) => ({   
        userListId:userListId,     
        userEmail: userEmail, 
        userName:userName,
        userType:getuserType(userType)
      })
    );
    setrowData(tempRecord);
   
  };

  const getuserType = (uType) => {
    if (uType == 1) {
      return "Super Admin";
    } else if (uType == 2) {
      return "Company Creation";
    } else if (uType == 3) {
      return "Back Office Admin";
    }
    else if (uType == 4) {
      return "IT Team";
    }
  };
  const actionButton = (params) => {

   console.log(params.data)


   if(params.data.userEmail == 'parmarjis@gmail.com'){
    Swal.fire({
     
      text: "This Id Can't be delete by any user",
      icon: "error",
    });

   }else{
    Swal.fire({
      title: "Warning",
      text: "Are you sure to delete this user?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result)=>{
      if(result.isConfirmed){

        axios.post(requests.removeUserData, {userListId:params.data.userListId } ).then((response)=>{
         
          if(response.data.errCode == 200){
            Swal.fire({
              title: "Success",
              text: "User Has Been deleted",
              icon: "success",
            });
          }
        }).catch((error)=>{
          console.log(error)
        })
      }
  
    })

   }
  
  };
  const columnDefs = [
    { headerName: "Agency Name", field: "userName" },
    { headerName: "Compeny Name", field: "userEmail" },
    { headerName: "User Type", field: 'userType' },
    // { headerName: "Email", field: "agencyEmail" },
    // { headerName: "Country", field: "agencyCountry" },
    {
      headerName: "Action",
      filter: false,
      field: "attName",
      cellRendererFramework: (params) => (
        <div>
          <Button color="danger" onClick={() => actionButton(params)}>
          <GiCancel />
          </Button>
        </div>
      ),
    },
  ];

  const defaultColDef = {
    sortable: true,
    editable: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
  };
  return (
    <>
      <div className='App'>
        <div className='ag-theme-alpine' style={{ height: "500px" }}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData}
            defaultColDef={defaultColDef}
            // onGridReady={onGridReady}
            pagination={true}
            // paginationPageSize={5}
            paginationAutoPageSize={true}></AgGridReact>
        </div>
      </div>
    </>
  );
};

export default SubuserTable;
