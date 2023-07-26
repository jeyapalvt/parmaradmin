/** @format */

import { Row, Col } from "reactstrap";

const OldImg = ({ currentImage, removeImage }) => {
  return (
    <>
      <Row>
        {currentImage.map((pic) => {
          return (
            <div style={{ marginBottom: "100px" }}>
              <Col>
                <img
                  src={
                    "https://parmartours.com:8443/filestorage/parmartour/images/" +
                    pic.imgUrl
                  }
                  width="100px"
                  height="100px"
                  alt="placeholder grey 100px"
                />
                <button type="button" onClick={() => removeImage(pic.id)}>
                  X
                </button>
              </Col>
            </div>
          );
        })}
      </Row>
    </>
  );
};

export default OldImg;
