import { useState } from "react";
import axios from "axios";
import { Row, Col, Label, Button } from "reactstrap";
import requests from "../../../utils/Requests";
const ExcelForBarcode = (props) => {
    const [file, setFile] = useState(null);

    const [uploadRes, setuploadRes] = useState("");
const [isLoading, setisLoading] = useState(true);
    const ticketNumber = [];
    const exceltkt =[];
    const [exe, setexe] = useState();
    const [tktCount, settktCount] = useState();
    const UPLOAD_ENDPOINT = requests.getBarcodeFromExcel;

    const handleSubmitExcel = async (e) => {

        e.preventDefault();
        //if await is removed, console log will be called before the uploadFile() is executed completely.
        //since the await is added, this will pause here then console log will be called
        let res = await uploadFile(file);


      

        // for (let i = 0; i < res.data.ticketNumberExcel.length; i++) {
        //     let tktElement = res.data.ticketNumberExcel[i];
        //     ticketNumber.push(tktElement);
        //     console.log(tktElement);
        // }
        settktCount(res.data.length)
        exceltkt.push( res.data);
        setisLoading(false)
        setexe(res.data);
      
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
    props.onChange(exe);
    //props.value(uploadRes);
    return (<>
        <Row>
            <Label>Select Excel File</Label>
            <Col>  <input type="file" onChange={handleOnChange} /></Col>
            <Col>
            {
                isLoading == 1? <><Button color="primary" onClick={handleSubmitExcel}>
                Upload Excel
            </Button></>: isLoading == 2 ? <><p>Please Wait</p></> : <><p> Total Number Of BarCode &nbsp;: &nbsp;{tktCount}</p></>
            } {" "}</Col>
        </Row>
        {/* {
            isLoading ? null : <> Total Number Of Ticket &nbsp;: &nbsp;{tktCount}</>
        } */}
    </>
    );
}
export default ExcelForBarcode;