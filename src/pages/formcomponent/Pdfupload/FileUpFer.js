import { useState } from "react";
import axios from "axios";
import { Button, Row, Col, Label, Progress } from "reactstrap";
import requests from "../../../utils/Requests";
const FileUpFer = (props) => {
  const [file, setFile] = useState(null);
  const ticketNumber = [];
  const [ShowResult, setShowResult] = useState([]);
  const [tktCount, settktCount] = useState();
  const [uploadRes, setuploadRes] = useState();
  const [isLoading, setisLoading] = useState(1);
  const [showtkt, setshowtkt] = useState(0);
  const [uploadPercentage, setuploadPercentage] = useState(0);
  const UPLOAD_ENDPOINT = requests.getticketinfofromferraripdf;
  // "http://103.235.106.127:8080/parmartour/v1.0/getticketinfofrompdf";  //for dubai formet
  //    "http://103.235.106.127:8080/parmartour/v1.0/getTicketInfoFromExpoPdf"; // for expo formet /getticketinfofromferraripdf
  // "http://66.29.149.191:8080/parmartour/v1.0/getticketinfofromferraripdf";
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    //if await is removed, console log will be called before the uploadFile() is executed completely.
    //since the await is added, this will pause here then console log will be called
    setisLoading(2);
    let res = await uploadFile(file);
    // console.log("Ticket Res");
    // console.log(res.data); //ferrariPdfList
    // console.log(res.data.ferrariPdfList);
    settktCount(res.data.ferrariPdfList.length);

    const TicketNumbers = res.data.ferrariPdfList;
    for (let i = 0; i < res.data.ferrariPdfList.length; i++) {
      ticketNumber.push(res.data.ferrariPdfList[i].ticketNumberPdf);
    }
    setisLoading(3);
    setShowResult(ticketNumber);
    props.onChange(TicketNumbers);
    setshowtkt(1);
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return await axios.post(
      UPLOAD_ENDPOINT,
      formData,

      {
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setuploadPercentage(percentage);
        },
      }
    );
  };
  const handleOnChange = (e) => {
    // console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };
  const { value, onChange } = props;

  const listItems = ShowResult.map((number) => <li>{number}</li>);
  return (
    <>
      <Row>
        <Label>Select PDF File</Label>
        <Col>
          {" "}
          <input
            type="file"
            accept="application/pdf"
            onChange={handleOnChange}
          />
        </Col>
        <Col>
          {isLoading == 1 ? (
            <>
              <Button color="primary" onClick={handleSubmitForm}>
                Upload Pdf
              </Button>
            </>
          ) : isLoading == 2 ? (
            <>
              {uploadPercentage > 0 && (
                <Progress color="success" value={uploadPercentage} />
              )}

              {uploadPercentage == 100 && (
                <p>Please Wait Your File Is Under Prossing</p>
              )}
            </>
          ) : (
            <>
              <p> Total Number Of Ticket &nbsp;: &nbsp;{tktCount}</p>
            </>
          )}{" "}
        </Col>
      </Row>
      {/* {
            isLoading ? null : <> Total Number Of Ticket &nbsp;: &nbsp;{tktCount}</>
        } */}
      {showtkt == 1 ? (
        <>
          <p>Upload Ticket Numbers</p> <ul>{listItems}</ul>
        </>
      ) : null}
    </>
  );
};

export default FileUpFer;
