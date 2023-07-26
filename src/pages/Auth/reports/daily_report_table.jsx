
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { AgGridReact, AgGridColumn, defaultColDef } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const Dailyreporttable = () => {
    const rowData = [
        {TicketNumber: "12345", BookingRefNO: "par12", Transaction:"Test" ,ParkName:"Al Barsha Pond Park, Al Barsha 2", PaxName:"Test Pax",ContactNo:"12365447982", SalesAmount:"520", OrderId:"362", SalesDate:"11/08/2022"},
        {TicketNumber: "65985", BookingRefNO: "par56",Transaction:"Test", ParkName:"Al Nahda Pond Park, Al Nahda",PaxName:"Test Pax", ContactNo:"9885455625", SalesAmount:"550", OrderId:"236", SalesDate:"11/08/2022" },
        {TicketNumber: "98565", BookingRefNO: "par03", Transaction:"Test", ParkName:"Al Mamzar Beach Park, Deira", PaxName:"Test Pax", ContactNo:"5566698745", SalesAmount:"565", OrderId:"9875",SalesDate:"11/08/2022"},
       
    ];
    const [gridApi, setGridApi] = useState(rowData);
    const onBtExport = () => {
        gridApi.exportDataAsExcel();
      };
    return ( <>


<div className="ag-theme-alpine" style={{height: 400}}>
    
<div className="container">
        
          <button
            onClick={() => onBtExport()}
            style={{ marginBottom: '5px', fontWeight: 'bold' }}
          >
            Export to Excel
          </button>
        </div>

           <AgGridReact
               rowData={rowData}

               >
                   
               <AgGridColumn field="TicketNumber" sortable={ true } filter={ true }></AgGridColumn>
               <AgGridColumn field="BookingRefNO" sortable={ true } filter={ true }></AgGridColumn>
               <AgGridColumn field="Transaction" sortable={ true } filter={ true }></AgGridColumn>
               <AgGridColumn field="ParkName" sortable={ true } filter={ true }></AgGridColumn>
               <AgGridColumn field="PaxName" sortable={ true } filter={ true }></AgGridColumn>
               <AgGridColumn field="ContactNo" sortable={ true } filter={ true }></AgGridColumn>
               <AgGridColumn field="SalesAmount" sortable={ true } filter={ true }></AgGridColumn>
               <AgGridColumn field="OrderId" sortable={ true } filter={ true }></AgGridColumn>
               <AgGridColumn field="SalesDate" sortable={ true } filter={ true }></AgGridColumn>
              

               
           </AgGridReact>
            
            </div>
       
     
    </> );
}
 
export default Dailyreporttable;