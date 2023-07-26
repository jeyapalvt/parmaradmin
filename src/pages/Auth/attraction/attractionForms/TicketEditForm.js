import { Form, Field, reduxForm, reset } from "redux-form";
import { CardBody, Card, Button, Row, Col, Label, Table } from "reactstrap";
import RenderField from "../../../formcomponent/formfields/RenderField";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import axios from "axios";
import requests from "../../../../utils/Requests";
import Titlebanner from "../../../../globel_cmponents/title_banner";
import { useHistory } from "react-router";
// const AfterSubmit = (result, dispatch) => {
//     dispatch(reset("RoleCreateForm"));
//   //  window.location.href = "/success";
//   };

const TicketEditForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  let history = useHistory();
  let tktBatchNum = { tktBatch: props.batchId };
  useEffect(() => {
    // props.initialize({ tktBatch: props.batchId,  });
    getBatchTkt();
  }, []);
  const [purchaseData, setpurchaseData] = useState("");
  const [tktNumber, settktNumber] = useState([]);
  const [ShowDetail, setShowDetail] = useState([]);
  const [TotalTkt, setTotalTkt] = useState();
  const getBatchTkt = () => {
    //  console.log("grid is ready");

    const ticketgetByBatch = {
      tktBatch: props.batchId,
      secretKey: requests.apiKey,
    };

    axios
      .post(requests.getTicketBatchList, ticketgetByBatch)
      .then((res) => {
        settktNumber(res.data);
        setShowDetail(res.data[0]);
        console.log(res.data);
        setTotalTkt(res.data.length);
        setpurchaseData(res.data[0].tktPurchase.slice(0, 10));

        // console.log(res.data.length);
        // console.log("show Detail", ShowDetail)
        setinitialValue(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const setinitialValue = (tktDetail) => {
    props.initialize({
      ticketBatchString: tktDetail[0].ticketBatchString,
      tktAdultFareB2B: tktDetail[0].tktAdultFareB2B,
      tktChildFareB2B: tktDetail[0].tktChildFareB2B,
      tktAdultFareB2C: tktDetail[0].tktAdultFareB2C,
      tktChildFareB2C: tktDetail[0].tktChildFareB2C,
      tktExpiry: tktDetail[0].tktExpiry.slice(0, 10),
      secretKey: requests.apiKey,
    });
  };

  const submitToApi = (values) => {
    // console.log(`${JSON.stringify(values, null, 2)}`); //deleteTicketUnusedTickets
    if (values.pill == 2) {
      Swal.fire({
        title: "Warning",
        text: "Are you sure to Delete this Batch?",
        icon: "question",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios
            .post(requests.deleteTicketUnusedTickets, values)
            .then((response) => {
              console.log("res", response.data);
              Swal.fire({
                title: "Success",
                text: `${response.data.deletedCount} Tickets  Deleted`,
                icon: "success",
              });
              history.goBack();
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    } else {
      axios
        .post(requests.updateTicketDetails, values)
        .then((response) => {
          Swal.fire({
            title: "Success", //'Good job!',
            text: "Ticket Details Updated", //'You clicked the button.',
            icon: "success", //'success'
          });

          history.goBack();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Titlebanner title="Ticket Details" />

      <Card>
        <CardBody>
          <Row>
            <Col>
              <Row>
                <Col>
                  <Label>Ticket Name</Label>
                </Col>

                <Col>{ShowDetail.tktType}</Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col>
                  <Label>Total Number Of Ticket</Label>
                </Col>

                <Col>{TotalTkt}</Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col>
              <Row>
                <Col>
                  <Label>Purchase Date</Label>
                </Col>

                <Col>{purchaseData}</Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col>
                  <Label>Batch Number</Label>
                </Col>

                <Col>{ShowDetail.ticketBatchString}</Col>
              </Row>
            </Col>
          </Row>

          <Form>
            <Field
              name="ticketBatchString"
              type="hidden"
              component={RenderField.RenderTextField}
            />

            <Row>
              <Col xs={4}>
                <Field
                  name="tktAdultFareB2B"
                  type="text"
                  label="B2B Adult Fare"
                  component={RenderField.RenderTextField}
                />
              </Col>
              <Col xs={4}>
                <Field
                  name="tktChildFareB2B"
                  type="text"
                  label="B2B Child Fare"
                  component={RenderField.RenderTextField}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <Field
                  name="tktAdultFareB2C"
                  type="text"
                  label="B2C Adult Fare"
                  component={RenderField.RenderTextField}
                />
              </Col>
              <Col xs={4}>
                <Field
                  name="tktChildFareB2C"
                  type="text"
                  label="B2C Child Fare"
                  component={RenderField.RenderTextField}
                />
              </Col>
            </Row>
            <Col xs={3}>
              {" "}
              <Field
                name="tktExpiry"
                type="date"
                label="Update Expiry Date"
                component={RenderField.RenderTextField}
              />
            </Col>

            <br />

            <div className="float-right">
              <Button
                color="primary"
                onClick={handleSubmit((values) =>
                  submitToApi({ ...values, pill: 1 })
                )}
              >
                Save
              </Button>{" "}
              <Button
                color="danger"
                onClick={handleSubmit((values) =>
                  submitToApi({ ...values, pill: 2 })
                )}
              >
                Delete
              </Button>{" "}
            </div>
          </Form>

          <Table borderless>
            <thead>
              <tr>
                <th>Ticket Number</th>
                <th>Booking Id</th>
                <th>B2B-Adult</th>
                <th>B2B-Child</th>
                <th>B2C-Adult</th>
                <th>B2C-Child</th>

                <th>Exp-Date</th>
              </tr>
            </thead>
            {tktNumber.map((item, index) => (
              <tbody key={index}>
                <tr>
                  <td>{item.tktNumber}</td>
                  <td>{item.tktBookingId}</td>
                  <td>{item.tktAdultFareB2B}</td>
                  <td>{item.tktChildFareB2B}</td>
                  <td>{item.tktAdultFareB2C}</td>
                  <td>{item.tktChildFareB2C}</td>

                  <td>{item.tktExpiry.slice(0, 10)}</td>
                </tr>
              </tbody>
            ))}
          </Table>
        </CardBody>
      </Card>
    </>
  );
};

export default reduxForm({
  form: "TicketEditForm",
  // onSubmitSuccess: AfterSubmit,
})(TicketEditForm);
