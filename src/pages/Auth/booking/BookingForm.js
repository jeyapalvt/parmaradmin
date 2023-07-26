import { reduxForm, Field, Form } from "redux-form";
import {
  Row,
  Col,
  Card,
  CardBody,
  TabContent,
  TabPane,
  Nav,
  Input,
  NavItem,
  NavLink,
  Button,
  Label,
  CardImg,
} from "reactstrap";
import RenderField from "../../formcomponent/formfields/RenderField";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import requests from "../../../utils/Requests";
import axios from "axios";
import classnames from "classnames";
const BookingForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  let { id } = useParams();
  let attraction = { attractionsId: id };
  useEffect(() => {
    getTourDeail();
    getFormAddons(id);
    apicalltkt(id);
    props.initialize({ attractionsId: id });
  
  }, []);
  const [isLoading, setisLoading] = useState(true);
  const [tourpack, setTourpack] = useState([]);
  const getTourDeail = async () => {
    await axios
      .post(requests.getAttractionDetails, attraction)
      .then((res) => {
        setisLoading(false);
        // settktfare(tourpack.price)
        setTourpack(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [formAddOn, setformAddOn] = useState();
  const [isFormLoading, setisFormLoading] = useState(true);
  const getFormAddons = async (attId) => {
    await axios
      .post(requests.setaddonformlist, { attractionId: attId })
      .then((res) => {
        setformAddOn(res.data);
        setisFormLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [bookingAddon, setbookingAddon] = useState([]);
  const [addonPrice, setaddonPrice] = useState(0);
  const checkboxvalues = (e) => {
    let val = e.target.id;

    let newprice = e.target.value;

    let tempAddon = [...bookingAddon];
    if (e.target.checked == true) {
      let finalprice = Number(addonPrice) + Number(newprice);
      setaddonPrice(finalprice);
      let tempEle = { addonId: val };
      tempAddon.push(tempEle);
      setbookingAddon(tempAddon);
    } else {
      let finalprice = Number(addonPrice) - Number(newprice);
      setaddonPrice(finalprice);
      let temp = bookingAddon.filter((item) => item.addonId != val);
      setbookingAddon(temp);
    }
  };

  const [tkttypeTemp, settkttypeTemp] = useState([]);
  const apicalltkt = (attId) => {
    axios
      .post(requests.getTicketTypeListByAttraction, { ttAttractionId: attId })
      .then((res) => {
     
        const values = [...tkttypeTemp];
        values.length = 0;
        values.push({
          name: "Select Ticket Type",
          value: "",
        });

        for (let i = 0; i < res.data.length; i++) {
          values.push({
            name: res.data[i].ttTicketType,
            value: res.data[i].ticketTypeId,
          });
        }
        // console.log("value", values);
        settkttypeTemp(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [adultfare, setadultfare] = useState();
  const [childfare, setchildfare] = useState();
  const [tktAvailability, settktAvailability] = useState(0);
  const [servserRes, setservserRes] = useState();
  const [showTktFare, setshowTktFare] = useState(0);
  const [actAdultfare, setactAdultfare] = useState();
  const [actChildfare, setactChildfare] = useState();
  const gettktDisPrice = (val) => {
    // axios
    //   .post(requests.getAttractionTicketTypePrice, {
    //     ticketTypeId: val,
    //     agencyId: agency,
    //     agencyUserId: agencyuser,
    //     attractionsId: id,
    //   })
    //   .then((res) => {
    //     // errorCode 505 No Adult Ticket
    //     // errorCode 504 No Child Ticket
    //     // console.log(res.data);
    //     // for b2b
    //     if (res.data.errorCode == 505) {
    //       setshowTktFare(1);
    //       setservserRes("Ticket Not Available");
    //       settktAvailability(1);
    //     } else if (res.data.errorCode == 504) {
    //       if (res.data.b2bAdultDisPrice == 0) {
    //         setadultfare(res.data.b2bAdultPrice); //b2bChildDisPrice
    //         setchildfare(0);
    //         setshowTktFare(1);
    //         setservserRes("Child Ticket Not Available");
    //         settktAvailability(1);
    //       } else {
    //         setadultfare(res.data.b2bAdultDisPrice);
    //         setchildfare(0);
    //         setshowTktFare(1);
    //         setservserRes("Child Ticket Not Available");
    //         settktAvailability(1);
    //       }
    //     } else {
    //       if (res.data.b2bAdultDisPrice == 0) {
    //         setadultfare(res.data.b2bAdultPrice); //b2bChildDisPrice
    //         setchildfare(res.data.b2bChildPrice);
    //         setshowTktFare(1);
    //         settktAvailability(0);
    //       } else {
    //         setadultfare(res.data.b2bAdultDisPrice); //b2bChildDisPrice
    //         setchildfare(res.data.b2bChildDisPrice);
    //         setshowTktFare(1);
    //         settktAvailability(0);
    //       }
    //     }
    //   })
    //   .catch((err) => {});
  };

  if (isLoading) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }
  return (
    <>
      <Row>
        <Col xs={8}>
          <Card>
            <CardImg
              top
              width="100%"
              src={requests.imgpath + tourpack.attSitePhoto}
              alt="Card image cap"
            />
            <CardBody>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    About
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    Terms And Conditions
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  {tourpack.attDescription ? (
                    <p className="content">
                      {" "}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: tourpack.attDescription.substring(0, 250),
                        }}
                      />
                    </p>
                  ) : null}
                </TabPane>
                <TabPane tabId="2"></TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
        <Col xs={4}>
          <Card>
            <Form onSubmit={handleSubmit}>
              <CardBody>
                <Field
                  name="attractionsId"
                  type="hidden"
                  icon=""
                  component={RenderField.RenderTextField}
                />

                <Field
                  name="bookCustomerName"
                  type="text"
                  label="Lead Passenger Name"
                  component={RenderField.RenderTextField}
                />
                <Field
                  name="bookCustomerEmail"
                  type="email"
                  label="Email Address"
                  component={RenderField.RenderTextField}
                />
                <Field
                  name="bookMobileNumber"
                  type="number"
                  label="Contact Number"
                  component={RenderField.RenderTextField}
                />
                <Field
                  name="ticketTypeId"
                  type="select"
                  customfeild={tkttypeTemp}
                  label="Ticket Type"
                  onChange={(e) => gettktDisPrice(e.target.value)}
                  component={RenderField.renderOptionField}
                />
                <Row>
                  <Col>
                    {" "}
                    <Field
                      name="bookNofAdult"
                      type="text"
                      label="Adult"
                      component={RenderField.RenderTextField}
                    />
                  </Col>
                  <Col>
                    {" "}
                    <Field
                      name="bookNofChild"
                      type="text"
                      label="Child"
                      component={RenderField.RenderTextField}
                    />
                  </Col>
                </Row>
                <Field
                  name="bookTravellDate"
                  type="date"
                  label="Contact Number"
                  component={RenderField.RenderTextField}
                />
                {formAddOn.map((add, index) => (
                  <div key={index}>
                    <Label>
                      &nbsp; &nbsp; &nbsp;{" "}
                      <Input
                        type="checkbox"
                        id={add.addonFormId}
                        value={add.addonPrice}
                        name={add.addonName}
                        onChange={(e) => checkboxvalues(e)}
                      />{" "}
                      {add.addonName} &nbsp; &nbsp;
                      {"AED " + add.addonPrice}
                    </Label>
                  </div>
                ))}
                <Row>
                  <Label>Select Payment Method</Label>
                  <Col>
                    <Field
                      name="bookPaymentMode"
                      component="input"
                      type="radio"
                      value="1"
                      //  onChange={(e) => settktType(e.target.value)}
                    />{" "}
                    Online
                  </Col>
                  <Col>
                    <Field
                      name="bookPaymentMode"
                      component="input"
                      type="radio"
                      value="2"
                      //  onChange={(e) => settktType(e.target.value)}
                    />{" "}
                    Credit
                  </Col>
                </Row>
                <br />
                <Label>Total Amount</Label>
                <Field
                  name="TotalAmount"
                  type="text"
                  component={RenderField.RenderDisableField}
                />
                <br />
                <div className="float-right">
                  <Button color="primary" disabled={submitting}>
                    Book
                  </Button>{" "}
                  &nbsp; &nbsp;
                  <Button
                    color="danger"
                    disabled={pristine || submitting}
                    onClick={reset}
                  >
                    Cancel
                  </Button>{" "}
                </div>
                <br />
                <br />
              </CardBody>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default reduxForm({
  form: "TicketBookingForm",
})(BookingForm);
