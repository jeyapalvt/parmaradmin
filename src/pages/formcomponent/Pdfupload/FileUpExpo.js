import { useState } from "react";
import axios from "axios";
import { Button, Row, Col, Label, Progress } from "reactstrap";
import requests from "../../../utils/Requests";

const FileUpExpo = (props) => {
  const [file, setFile] = useState(null);
  const ticketNumber = [];
  //const [ticketNumber, setticketNumber] = useState();

  const [ShowResult, setShowResult] = useState([]);
  const [isLoading, setisLoading] = useState(1);
  const [numberOftkt, setnumberOftkt] = useState();
  const [showtkt, setshowtkt] = useState(0);
  const [uploadPercentage, setuploadPercentage] = useState(0);
  const UPLOAD_ENDPOINT = requests.getTicketInfoFromExpoPdf;
  // "http://103.235.106.127:8080/parmartour/v1.0/getticketinfofrompdf";  //for dubai formet
  // "http://66.29.149.191:8080/parmartour/v1.0/getTicketInfoFromExpoPdf"; // for expo formet

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    //if await is removed, console log will be called before the uploadFile() is executed completely.
    //since the await is added, this will pause here then console log will be called
    setisLoading(2);

    let res = await uploadFile(file);

    //  setticketNumber(res.data.ticketNumberPdf);
    const n = res.data.ticketNumberPdf.length;
    // console.log("length")
    // console.log(n)
    setnumberOftkt(n);

    for (let i = 0; i < n; i++) {
      ticketNumber.push(res.data.ticketNumberPdf[i]);
    }
    setisLoading(3);

    setShowResult(ticketNumber);
    props.onChange(ticketNumber);
    setshowtkt(1);
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return await axios.post(UPLOAD_ENDPOINT, formData, {
      onUploadProgress: (progressEvent) => {
        const percentage = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setuploadPercentage(percentage);
      },
    });
  };
  const handleOnChange = (e) => {
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
              <p> Total Number Of tickets - {numberOftkt}</p>
            </>
          )}{" "}
        </Col>
      </Row>

      {showtkt == 1 ? (
        <>
          <p>Upload Ticket Numbers</p>

          <ul>{listItems}</ul>
        </>
      ) : null}
    </>
  );
};

export default FileUpExpo;
