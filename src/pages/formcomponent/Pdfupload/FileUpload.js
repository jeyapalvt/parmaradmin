import { useState } from "react";
import axios from "axios";
import { Button, Row, Col, Label, Progress } from "reactstrap";
import requests from "../../../utils/Requests";
const FileUpload = (props) => {
  const [file, setFile] = useState(null);
  const ticketNumber = [];
  const [uploadPercentage, setuploadPercentage] = useState();
  const [ShowResult, setShowResult] = useState([]);
  const [tktCount, settktCount] = useState();
  const [showtkt, setshowtkt] = useState(0);
  const [isLoading, setisLoading] = useState(1);
  const UPLOAD_ENDPOINT = requests.getticketinfofrompdf;
  // "http://66.29.149.191:8080/parmartour/v1.0/getticketinfofrompdf";  //for dubai formet
  // "http://103.235.106.127:8080/parmartour/v1.0/getTicketInfoFromExpoPdf"; // for expo formet

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    //if await is removed, console log will be called before the uploadFile() is executed completely.
    //since the await is added, this will pause here then console log will be called
    setisLoading(2);
    let res = await uploadFile(file);

    // console.log(res.data);
    const n = res.data.ticketNumberPdf.length;
    // console.log("length")
    // console.log(n)
    settktCount(n);

    for (let i = 0; i < n; i++) {
      ticketNumber.push(res.data.ticketNumberPdf[i]);
    }

    setshowtkt(1);
    setShowResult(ticketNumber);
    props.onChange(ticketNumber);
    setisLoading(3);
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
              <p> Total Number Of Ticket &nbsp;: &nbsp;{tktCount}</p>
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
      {/* {
            isLoading == 1 ? null : <> Total Number Of Ticket &nbsp;: &nbsp;{tktCount}</>
        } */}
    </>
  );
};

export default FileUpload;
