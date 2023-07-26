import { useState } from "react";
import axios from "axios";
import { Row, Col, Label, Button } from "reactstrap";
import requests from "../../../utils/Requests";
const ExcelUpload = (props) => {
  const [file, setFile] = useState(null);

  const [uploadRes, setuploadRes] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const ticketNumber = [];

  const [exceltkt, setexceltkt] = useState();
  const [tktCount, settktCount] = useState();
  const UPLOAD_ENDPOINT = requests.getticketinfofromexcel;

  const handleSubmitExcel = async (e) => {
    e.preventDefault();
    //if await is removed, console log will be called before the uploadFile() is executed completely.
    //since the await is added, this will pause here then console log will be called
    let res = await uploadFile(file);

    // console.log(res.data.ticketNumberExcel)
    // for (let i = 0; i < res.data.ticketNumberExcel.length; i++) {
    //     let tktElement = res.data.ticketNumberExcel[i];
    //     ticketNumber.push(tktElement);
    //     console.log(tktElement);
    // }

    /// console.log(res.data);
    settktCount(res.data.excelTicketList.length);
    // exceltkt.push(res.data.excelTicketList); //ticketNumber
    setisLoading(false);
    setexceltkt(res.data.excelTicketList);

    // setuploadRes(ticketNumber);
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return await axios.post(UPLOAD_ENDPOINT, formData);
  };
  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };
  const { value, onChange } = props;
  // handleSubmitExcel
  props.onChange(exceltkt);
  //props.value(uploadRes);
  return (
    <>
      <Row>
        <Label>Select Excel File</Label>
        <Col>
          {" "}
          <input type="file" onChange={handleOnChange} />
        </Col>
        <Col>
          {isLoading == 1 ? (
            <>
              <Button color="primary" onClick={handleSubmitExcel}>
                Upload Excel
              </Button>
            </>
          ) : isLoading == 2 ? (
            <>
              <p>Please Wait</p>
            </>
          ) : (
            <>
              <p> Total Number Of Ticket &nbsp;: &nbsp;{tktCount}</p>
            </>
          )}{" "}
        </Col>
      </Row>

      {exceltkt && exceltkt.map((item, i) => <li>{item.ticketNumber}</li>)}
      {/* {
            isLoading ? null : <> Total Number Of Ticket &nbsp;: &nbsp;{tktCount}</>
        } */}
    </>
  );
};
export default ExcelUpload;
