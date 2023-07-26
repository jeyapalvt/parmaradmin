/** @format */

import React, { useEffect ,useState} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import axios from "axios";
import requests from "../../utils/Requests";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { FcViewDetails } from "react-icons/fc";
import Swal from "sweetalert2";


const ExpirtTkt = () => {
  useEffect(() => {
    getReturnTicketList()
  }, []);

  let history = useHistory();
  let attraction = { attractionsId: 1, secretKey: requests.apiKey };
  const [rowData, setrowData] = useState([]);

  const getReturnTicketList = () =>{
    axios
    .post(requests.getTicketsExpiringShortly, { tktBatchNumber: 436567567867 })
    .then((res) => {

        
         setRecordForTable(res.data);
   // console.log(res.data);     
    })
    .catch((err) => {
      console.log(err);
    });
  }
//teamparmarit@gmail.com  Pparmar@2023
  const setRecordForTable = (record) => {
    const tempRecord = record.map(
      ({
        tktBatchNumber,
        attractionName,       
        ticketTypeName, 
        adultOrChildTicket,       
        expiryDate,    
        nofTicketsAvailable    
      }) => ({   
        tktBatchNumber:tktBatchNumber,     
        attractionName: attractionName, 
        ticketTypeName:ticketTypeName,
        adultOrChildTicket:adultOrChildTicket,
        expiryDate:expiryDate.substring(0, 10),
        nofTicketsAvailable: nofTicketsAvailable
      })
    );
    setrowData(tempRecord);
   
  };


  const actionButton = (params) => {
    history.push(
        `/dashboard/soon-expiry-ticket-details/${params.data.tktBatchNumber}`
      );
//   console.log(params.data)


//    if(params.data.userEmail == 'parmarjis@gmail.com'){
//     Swal.fire({
     
//       text: "This Id Can't be delete by any user",
//       icon: "error",
//     });

//    }else{
//     Swal.fire({
//       title: "Warning",
//       text: "Are you sure to delete this user?",
//       icon: "question",
//       showDenyButton: true,
//       confirmButtonText: "Yes",
//       denyButtonText: `No`,
//     }).then((result)=>{
//       if(result.isConfirmed){

//         axios.post(requests.removeUserData, {userListId:params.data.userListId } ).then((response)=>{
         
//           if(response.data.errCode == 200){
//             Swal.fire({
//               title: "Success",
//               text: "User Has Been deleted",
//               icon: "success",
//             });
//           }
//         }).catch((error)=>{
//           console.log(error)
//         })
//       }
  
//     })

//    }
  
  };
  const columnDefs = [
    { headerName: "Batch Number ", field: "tktBatchNumber" },
    { headerName: "Attraction Name ", field: "attractionName" },
    { headerName: "Ticket Name Type", field: 'ticketTypeName' },
    { headerName: "Adult Or Child", field: 'adultOrChildTicket' },
    { headerName: "Expiry Date", field: "expiryDate" },
    { headerName: "Tickets Available", field: "nofTicketsAvailable" },
    {
      headerName: "Action",
      filter: false,
      field: "tktBatchNumber",
      cellRendererFramework: (params) => (
        <div>
          <Button color="primary" onClick={() => actionButton(params)}>
          <FcViewDetails />
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
      <h2>Expiry Soon</h2>
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

export default ExpirtTkt;
