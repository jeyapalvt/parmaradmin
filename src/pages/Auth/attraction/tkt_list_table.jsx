/** @format */

import { React, useState, useEffect } from "react";
import { Table, Button, FormGroup, Label, Input } from "reactstrap";
import Titlebanner from "../../../globel_cmponents/title_banner";
import axios from "axios";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";
import { AiOutlineFileSearch } from "react-icons/ai";
import requests from "../../../utils/Requests";
import { useHistory } from "react-router-dom";
const Ticketlisttable = () => {
  // const attid ={ attractionId: 1};
  let history = useHistory();
  const [attractionList, setattractionList] = useState([]);
  const [loadingRec, setloadingRec] = useState(0);
  useEffect(() => {
    apicall();
    
  }, []);
  let getAtt = { attractionsId: 1 };
  // let tktlist = { attractionId: 1 };

  const [attraction, setattraction] = useState([{ name: "", value: "" }]);


  const apicall = async () => {
    await axios
    .post(requests.getAttractionListForTicketReport, { attractionId: 1 , secretKey: requests.apiKey
    })
      .then((res) => {

      
        setattractionList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setFillter = (attid) => {};
  const [tktGroupNumber, settktGroupNumber] = useState({ attractionId: 1 });

  const [TktBatch, setTktBatch] = useState([]);

  const gettktGroup = (e, val) => {
    // settktGroupNumber( { attractionId: val});
    setloadingRec(val);

    axios
      .post(requests.getTicketGroupListForAttraction, {
        attractionId: val,
        secretKey: requests.apiKey,
      })
      .then((res) => {

        console.log(res.data);
        setTktBatch(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const actionButton = (ticketBatchString) => {

    
    history.push(`/attraction/tkt-edit-page/${ticketBatchString}`); //{`tour-pack-details/${alltour.attractionsId}`}"/attraction/attraction-creation"
  };

  const [search, setsearch] = useState("");
  const fulterAttraction = attractionList.filter((attract) => {
    return attract.attractionName.toLowerCase().includes(search.toLocaleLowerCase());
  });

  return (
    <>
      <Titlebanner title='Ticket List' />
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

      <div className='form-group'>
        <input
          type='text'
          placeholder='Search'
          onChange={(e) => setsearch(e.target.value)}
        />
      </div>

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
                <th scope='row'>
                  {loadingRec == 0 ? (
                    <>
                      {" "}
                      <Button
                        size='sm'
                        onClick={(e) =>
                          gettktGroup(e, attraction.attractionId)
                        }>
                        <FaArrowCircleDown color='black' />
                        {}
                      </Button>
                    </>
                  ) : (
                    <>
                      {" "}
                      <Button size='sm' onClick={() => setloadingRec(0)}>
                        <FaArrowCircleUp color='black' />{" "}
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
                  <Table>
                    <thead>
                      <tr>
                        <th>Park Name</th>
                        <th>Ticket Type</th>
                        <th>Adult Fare B2B</th>
                        <th>Child Fare B2B</th>
                        <th>Adult Fare B2C</th>
                        <th>Child Fare B2C</th>
                        <th>Purchase Date</th>
                        <th>Expiry Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TktBatch.map((tkt, index) => (
                        <tr>
                          <td scope='row' key={index}>
                            {attraction.attName}
                          </td>
                          <td>{tkt.tktType}</td>
                          <td>{tkt.tktAdultFareB2B}</td>
                          <td>{tkt.tktChildFareB2B}</td>
                          <td>{tkt.tktAdultFareB2C}</td>
                          <td>{tkt.tktChildFareB2C}</td>
                          <td>{tkt.tktPurchase.substring(0, 10)}</td>
                          <td>{tkt.tktExpiry.substring(0, 10)}</td>

                          <td>
                            {" "}
                            <Button
                              size='sm'
                              onClick={() =>
                                actionButton(tkt.ticketBatchString)
                              }>
                              <AiOutlineFileSearch color='black' />
                            </Button>
                          </td>
                          {/* <td>Otto</td>
          <td>@mdo</td> */}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </>
              ) : null}
            </>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Ticketlisttable;
