/** @format */

import { React, useState, useEffect } from "react";
import {
  Table,
  Button,
  FormGroup,
  Label,
  Input,
  Spinner,
  Row,
  Col,
} from "reactstrap";
import Titlebanner from "../../../globel_cmponents/title_banner";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import axios from "axios";
import RenderField from "../../formcomponent/formfields/RenderField";
import { Field, Form, reduxForm } from "redux-form";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

import requests from "../../../utils/Requests";

import { useHistory } from "react-router-dom";

const Stacksummeryreport = (props) => {
  // const attid ={ attractionId: 1};
  const { handleSubmit, pristine, reset, submitting } = props;

  useEffect(() => {
    getAttractionListForTicketReport();
  }, []);
  const [loadingRec, setloadingRec] = useState(0);
  let history = useHistory();
  const [attractionList, setattractionList] = useState([]);

  // let tktlist = { attractionId: 1 };

  const [attraction, setattraction] = useState([{ name: "", value: "" }]);

  const getAttractionListForTicketReport = () => {
    axios
      .post(requests.getAttractionListForTicketReport, {
        attractionId: 1,
        secretKey: requests.apiKey,
      })
      .then((responce) => {
        setattractionList(responce.data);
        // getAllticketForExcel(responce.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [TktBatch, setTktBatch] = useState([]);

  const [loading, setloading] = useState(false);
  const gettktGroup = (val) => {
    setDateinputError("");
    if (datefrom != "" && dateto != "") {
      setloading(true);
      // settktGroupNumber( { attractionId: val});
      setloadingRec(val);
      axios
        .post(requests.getTicketListForAttractionReport, {
          attractionId: val,
          startDate: datefrom,
          endDate: dateto,
          secretKey: requests.apiKey,
        })
        .then((res) => {
          // console.log(res.data);
          setTktBatch(res.data);
          setloading(false);
          getAllticketForExcel(attractionList);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setDateinputError("Please select date for filter");
    }
  };

  const [showButton, setshowButton] = useState(0);

  const [csvData, setcsvData] = useState([
    // {
    //   attrName: "",
    //   ticketType: "",
    //   uploadedAdultCount: "",
    //   uploadedChildCount: "",
    //   soldAdultCount: "",
    //   soldChildCount: "",
    //   availableAdultCount: "",
    //   availableChildCount: "",
    // },
  ]);
  let totalAduld = 0,
    totalChild = 0;
  const [availableTicket, setavailableTicket] = useState([]);

  const getAllticketForExcel = (AttractioList) => {
    let attractionid = AttractioList;
    let attrlength = attractionid.length;
    let tempValue = [...csvData];

    //console.log(AttractioList);

    // console.log()
    for (let i = 0; i < attrlength; i++) {
      // let attid = attractionid[i].attractionId;
      let attName = attractionid[i].attractionName;
      // getStackDetail(attid, attName);
      //  console.log(attractionid[i].attractionId);
      axios
        .post(requests.getTicketListForAttractionReport, {
          attractionId: attractionid[i].attractionId,
          startDate: datefrom,
          endDate: dateto,
          secretKey: requests.apiKey,
        })
        .then((responce) => {
          //  console.log(responce.data);

          totalAduld = 0;
          totalChild = 0;
          for (let i = 0; i < responce.data.length; i++) {
            tempValue.push({
              attrName: attName,
              ticketType: responce.data[i].ticketType,
              uploadedAdultCount: responce.data[i].uploadedAdultCount,
              uploadedChildCount: responce.data[i].uploadedChildCount,
              soldAdultCount: responce.data[i].soldAdultCount,
              soldChildCount: responce.data[i].soldChildCount,
              availableAdultCount: responce.data[i].availableAdultCount,
              availableChildCount: responce.data[i].availableChildCount,
            });
            totalAduld = totalAduld + responce.data[i].availableAdultCount;
            totalChild = totalChild + responce.data[i].availableChildCount;
          }
          tempValue.push({
            attrName: "",
            ticketType: "",
            uploadedAdultCount: "",
            uploadedChildCount: "",
            soldAdultCount: "",
            soldChildCount: "TOTAL",
            availableAdultCount: totalAduld,
            availableChildCount: totalChild,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setshowButton(1);
    setcsvData(tempValue);
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
  };
  const [search, setsearch] = useState("");
  const fulterAttraction = attractionList.filter((attract) => {
    return attract.attractionName
      .toLowerCase()
      .includes(search.toLocaleLowerCase());
  });
  const getSalesDetailssuperadmin = (values) => {
    console.log("values", values);
  };
  const [dateinputError, setDateinputError] = useState("");
  const [datefrom, setdatefrom] = useState("");
  const [dateto, setdateto] = useState("");
  const setDateFilter = (dateid, values) => {
    if (dateid == "from") {
      setdatefrom(values);
    } else {
      setdateto(values);
    }
  };
  return (
    <>
      <Titlebanner title="Stock Report" />
      {/* <FormGroup>
          <Label for="exampleSelect">Select Attraction</Label>
          <Input
            type="select"
            name="select"
            id="exampleSelect"
            onChange={(e) => setFillter(e.target.value)}
          >
            {attraction.map((attration, index) => (
              <option value={attration.value}> {attration.name}</option>
            ))}
          </Input>

        </FormGroup> */}
      <Row>
        <Col>
          <br />
          <br />
          <div className="form-group">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setsearch(e.target.value)}
            />
          </div>
        </Col>
        <Col>
          <Row>
            <Col>
              <Field
                name="startDate"
                type="date"
                label="Start Date"
                component={RenderField.RenderTextField}
                onChange={(e) => setDateFilter("from", e.target.value)}
              />
            </Col>
            <Col>
              <Field
                name="endDate"
                type="date"
                label="End Date"
                component={RenderField.RenderTextField}
                onChange={(e) => setDateFilter("to", e.target.value)}
              />
            </Col>
          </Row>
          {dateinputError && (
            <span className="error text-danger">{dateinputError}</span>
          )}
        </Col>
      </Row>
      {showButton == 1 ? (
        <>
          <Button
            color="primary"
            onClick={(e) => exportToCSV(csvData, "Stock_Report")}
          >
            Download CSV
          </Button>
        </>
      ) : null}

      {/* <Button color="primary" onClick={() => getAllticketForExcel()}>
        Download CSV
      </Button> */}

      <Table>
        <thead>
          <tr>
            {/* <th>#</th> */}
            <th>Attraction Name</th>
            <th>Adult (Available)</th>
            <th>Child (Available)</th>
          </tr>
        </thead>
        <tbody>
          {fulterAttraction.map((attraction) => (
            <>
              <tr key={attraction.attractionId}>
                <th scope="row">
                  {/* <Button
                        size="sm"
                        onClick={(e) => gettktGroup(e, attraction.attractionId)}
                      >
                        <FaArrowCircleDown color="black" />
                        {}
                      </Button> */}
                  {loadingRec == 0 ? (
                    <>
                      {" "}
                      <Button
                        size="sm"
                        onClick={() => gettktGroup(attraction.attractionId)}
                      >
                        <FaArrowCircleDown color="black" />
                        {}
                      </Button>
                    </>
                  ) : (
                    <>
                      {" "}
                      <Button size="sm" onClick={() => setloadingRec(0)}>
                        <FaArrowCircleUp color="black" />{" "}
                      </Button>
                    </>
                  )}
                  &nbsp;&nbsp;&nbsp;
                  {attraction.attractionName}
                </th>
                <th>{attraction.adultAvailableTickets}</th>
                <th>{attraction.childAvailableTickets}</th>
                <td></td>
              </tr>
              {loadingRec == attraction.attractionId ? (
                <>
                  {loading == true ? (
                    <div className="justify-content-center">
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  ) : (
                    <Table>
                      <thead>
                        <tr>
                          {/* <th>Attraction Name</th> */}
                          <th>Ticket Batch</th>
                          <th>Ticket Type</th>
                          <th>Adult(Upload)</th>
                          <th>Child(Upload)</th>
                          <th>Adult(Sold)</th>
                          <th>Child(Sold)</th>
                          <th>Adult(Available)</th>
                          <th>Child(Available)</th>
                          <th>Uploaded Date</th>
                          <th>Expiry Date</th>
                          {/* <th>Action</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {TktBatch.map((tkt, index) => (
                          <tr>
                            <td scope="row" key={index}>
                              {/* {attraction.attractionName} */}
                              <td>{tkt.tktBatch}</td>
                            </td>
                            <td>{tkt.ticketType}</td>
                            <td>{tkt.uploadedAdultCount}</td>
                            <td>{tkt.uploadedChildCount}</td>
                            <td>{tkt.soldAdultCount}</td>
                            <td>{tkt.soldChildCount}</td>
                            <td>{tkt.availableAdultCount}</td>
                            <td>{tkt.availableChildCount}</td>
                            <td>
                              {tkt.uploadedDate &&
                                tkt.uploadedDate.substring(0, 10)}
                            </td>
                            <td>
                              {tkt.expiryDate &&
                                tkt.expiryDate.substring(0, 10)}
                            </td>

                            {/* <td>
                            {" "}
                          <Button size="sm" onClick={()=>actionButton(tkt.tktBatch)}><AiOutlineFileSearch color="black"/></Button>
                          </td> */}
                            {/* <td>Otto</td>
          <td>@mdo</td> */}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </>
              ) : null}
            </>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default reduxForm({
  form: "Stacksummeryreport",
})(Stacksummeryreport);
