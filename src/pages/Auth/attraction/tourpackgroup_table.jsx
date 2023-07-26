/** @format */

import React, { useEffect ,useState} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import axios from "axios";
import requests from "../../../utils/Requests";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { AiTwotoneEdit } from "react-icons/ai";
const TourpackGrouptable = () => {
  useEffect(() => {
    getTourGroup()
  }, []);

  let history = useHistory();
  let attraction = { attractionsId: 1, secretKey: requests.apiKey };
  const [rowData, setrowData] = useState([]);

  const getTourGroup= () =>{
    axios
    .post(requests.getTourCategoryList, { userListId: 0 })
    .then((res) => {

         setRecordForTable(res.data);
       console.log(res.data);     
    })
    .catch((err) => {
      console.log(err);
    });
  }


  const setRecordForTable = (record) => {
    const tempRecord = record.map(
      ({
        categoryName,       
        description,               
      }) => ({        
        categoryName : categoryName, 
        description :description,
    
      })
    );
    setrowData(tempRecord);
   
  };


  // const actionButton = (params) => {

  //   // alert(`${params.data.agencyName} `);
  //   history.push(`/admin/agency-create-new/${params.data.agencyId}`); //{`tour-pack-details/${alltour.attractionsId}`}"/attraction/attraction-creation"
  // };
  const columnDefs = [
    { headerName: "Name", field: "categoryName" },
    { headerName: "Description", field: "description" },

 
    // { headerName: "Email", field: "agencyEmail" },
    // { headerName: "Country", field: "agencyCountry" },
    // {
    //   headerName: "Action",
    //   filter: false,
    //   field: "attName",
    //   cellRendererFramework: (params) => (
    //     <div>
    //       <Button color="primary" onClick={() => actionButton(params)}>
    //         <AiTwotoneEdit />
    //       </Button>
    //     </div>
    //   ),
    // },
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

export default TourpackGrouptable;


 
