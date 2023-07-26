/** @format */

import React, { useEffect, useState } from "react";

import axios from "axios";
import requests from "../../../utils/Requests";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Titlebanner from "../../../globel_cmponents/title_banner";
import { Col, Row, Button } from "reactstrap";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { useHistory } from "react-router-dom";

const ReturnTicketDetails = () => {
  let history = useHistory();
  let { id } = useParams();
  useEffect(() => {
    getTicketList(id);
  }, []);

  const [ticketData, setticketData] = useState("");



  const getTicketList = (id) => {
    axios
      .post(requests.getExpiredTicketList, { tktBatchNumber: id })
      .then((response) => {
        const tempData = response.data;
        const filterData = tempData.filter((item) => item.tktBatchNumber == id);
        getTicketDetails(filterData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTicketDetails = (inputData) => {
    axios
      .post(requests.getExpiredTicketDetails, {
        tktBatchNumber: inputData[0].tktBatchNumber,
        attractionName: inputData[0].attractionName,
        ticketTypeName: inputData[0].ticketTypeName,
        nofTicketsAvailable: inputData[0].nofTicketsAvailable,
        expiryDate: inputData[0].expiryDate,
      })
      .then((response) => {
        setticketData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeTickets = () => {
    console.log("kahvxhassvjsbdss");

    Swal.fire({
      title: "Warning",
      text: "Are you sure to delete this tickets?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Please wait untill your precess complete, Do not reload or refresh page"
        );

        // console.log(`You submitted:\n\n${JSON.stringify(ticketData, null, 2)}`);

        axios
          .post(requests.removeExpiredTickets, ticketData)
          .then((response) => {
        //    console.log(response.data);

            let ticketNumber= []; 
            ticketNumber= response.data.ticketNumber

            let tempdata =[];
            for (let i=0; i<ticketNumber.length; i++){
              tempdata.push({TicketNumber : ticketNumber[i]});
            }


            const xlName = response.data.attractionName+"-"+response.data.ticketTypeName
            exportToCSV(tempdata, xlName)
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };




  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    Swal.fire(
      "Expiry tickets has been removed and downloaded to your local storage"
    );
    history.push('/report/return-ticket-list')
  };

  return (
    <>
      <Titlebanner title="Return Tickets Details" />

     
      {ticketData != "" && (
        <>
          <Row>
            <Col>Batch Number: {ticketData.tktBatchNumber}</Col>
            <Col>Attraction Name: {ticketData.attractionName}</Col>
          </Row>
          <Row>
            <Col>Ticket TypeName: {ticketData.ticketTypeName}</Col>
            <Col> Expiry Date: {ticketData.expiryDate.substring(0, 10)}</Col>
          </Row>

          <div className="float-right">
            <Button color="primary" onClick={() => removeTickets()}>
              Delete & Export Tickets
            </Button>{" "}
          </div>
          <br />
          <br />
          <p>Ticket Numbers</p>
          {ticketData.ticketNumber.map((item) => (
            <li>{item}</li>
          ))}
        </>
      )}
    </>
  );
};

export default ReturnTicketDetails;
