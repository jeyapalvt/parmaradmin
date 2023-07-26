import { Row, Col } from "react-bootstrap";

const Addpaybyuser = () => {
  return (
    <>
      <div className="card card-primary">
        <div className="card-header">
          <h3 className="card-title" />
        </div>
        <form>
          <div className="card-body">
            <Row>
              <Col xs={3}>
                <fieldset className="form-group">
                  <label htmlFor="exampleInputEmail1">
                    Booking Date (From)
                  </label>
                  <div className="input-group">
                    <input
                      type="date"
                      className="form-control ng-untouched ng-pristine ng-invalid"
                      formcontrolname="purchaseDate"
                      placeholder="dd-mm-yyyy"
                      min="Wed Aug 04 2021 21:47:12 GMT+0530 (India Standard Time)"
                    />
                  </div>
                </fieldset>
              </Col>
              <Col xs={3}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder
                  />
                </div>
              </Col>
              <Col xs={3}>
                <div className="form-group">
                  <label>Balance Amount </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Total Amount (AED)"
                    disabled
                  />
                </div>
              </Col>
              <Col xs={3}>
                <div className="form-group">
                  <label>Utilized Amount </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Total Amount (AED)"
                    disabled
                  />
                </div>
              </Col>
            </Row>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Remarks</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={2}
                defaultValue={""}
              />
            </div>

            <div className="float-right">
              <button type="submit" className="btn btn-primary">
                Proceed to pay
              </button>
              &nbsp; &nbsp; &nbsp;
              <button type="submit" className="btn btn-primary">
                Cancel
              </button>
            </div>
          </div>
          <div className="card-footer" />
        </form>
      </div>
    </>
  );
};

export default Addpaybyuser;
