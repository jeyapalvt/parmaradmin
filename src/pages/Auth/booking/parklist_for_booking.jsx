import Titlebanner from "../../../globel_cmponents/title_banner";

import { Link } from "react-router-dom";
import requests from "../../../utils/Requests";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
const Parklistforbooking = () => {
  useEffect(() => {
    getAllTourList();
  }, []);
  const [tourlist, setTourlist] = useState([].slice(0, 1));
  const [allTours, setallTours] = useState([]);
  let b2bid = 1,
    b2buserid = 0;

  let attraction = { attractionId: 1 };
  const getAllTourList = async (b2bid, b2buserid) => {
    await axios
      .post(requests.getattractionall, {
        attractionId: 1,
        agencyId: b2bid,
        agencyUserId: b2buserid,
      })
      .then((res) => {
        setallTours(res.data);
        setTourlist(res.data);
      
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [search, setsearch] = useState("");
  const fulterAttraction = tourlist.filter((attract) => {
    return attract.attName.toLowerCase().includes(search.toLocaleLowerCase());
  });
  return (
    <>
      <Titlebanner title="Attractions" />

      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setsearch(e.target.value)}
      />
      <div>
        <br />
      </div>

      {fulterAttraction.map((attraction, index) => (
        <>
          <Card body key={index}>
            <Row>
              <Col xs={3}>
                {/* //attThumbnailImage */}
                <img
                  src={requests.imgpath + attraction.attThumbnailImage}
                  width="250px"
                />
              </Col>
              <Col xs={6}>
                <CardText>
                  <h4>{attraction.attName} </h4>
                  <p>
                    {attraction.attDescription ? (
                      <p className="content">
                        {" "}
                        <div
                          dangerouslySetInnerHTML={{
                            __html: attraction.attDescription.substring(0, 250),
                          }}
                        />
                      </p>
                    ) : null}
                  </p>
                </CardText>
              </Col>
              <Col xs={3}>
                {/* /booking/ticket-booking-detail-view/:id */}{" "}
                <Link
                  class="btn btn-primary"
                  to={`/booking/ticket-booking-detail-view/${attraction.attractionsId}`}
                >
                  Book Now
                </Link>
              </Col>
            </Row>
          </Card>
        </>
      ))}
    </>
  );
};

export default Parklistforbooking;
