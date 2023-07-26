import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { AgGridReact, AgGridColumn, defaultColDef } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
const Inventoryreporttable = () => {
    const rowData = [
        {ParkName:"Al Barsha Pond Park, Al Barsha 2", TotalTicket:"500", SoldTicket:"300", BalanceTicket:"200"},
        { ParkName:"Al Nahda Pond Park, Al Nahda", TotalTicket:"650",  SoldTicket:"500",  BalanceTicket:"150"},
        { ParkName:"Al Mamzar Beach Park, Deira",TotalTicket:"480",  SoldTicket:"400",  BalanceTicket:"80"},
       
    ];
    const [gridApi, setGridApi] = useState(rowData);
    const onBtExport = () => {
        gridApi.exportDataAsExcel();
      };
    return ( <>
    <Titlebanner title="Stack Summery Report"/>

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
                   
              
              
              
               <AgGridColumn field="ParkName" sortable={ true } filter={ true }></AgGridColumn>
           
               <AgGridColumn field="TotalTicket" sortable={ true } filter={ true }></AgGridColumn>
               <AgGridColumn field="SoldTicket" sortable={ true } filter={ true }></AgGridColumn>
               <AgGridColumn field="BalanceTicket" sortable={ true } filter={ true }></AgGridColumn>
              

               
           </AgGridReact>
            
            </div>
       
    </> );
}
 
export default Inventoryreporttable;