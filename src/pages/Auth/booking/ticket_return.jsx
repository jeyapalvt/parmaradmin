import { Row, Col } from "react-bootstrap";
import Titlebanner from "../../../globel_cmponents/title_banner";

const Ticketreturn = () => {
  return (
    <>
      <Titlebanner title=" Return Ticket" />

      {/* general form elements */}
      <div className="card card-primary">
        <div className="card-header">
          <h3 className="card-title"></h3>
        </div>
        {/* /.card-header */}
        {/* form start */}
        <form >
          <div className="card-body">
            <Row >
             
              <Col >
              <fieldset class="form-group"><label for="exampleInputEmail1">Agency </label><select class="form-control ng-pristine ng-valid ng-touched" name="status"><option value="Y">Agency 1</option><option value="N">Agency 2</option></select></fieldset>
              </Col>
              <Col><label for="exampleInputEmail1"> </label><br/><br/><br/>
                <button type="submit" className="btn btn-primary mb-2">
                  Search
                </button>{" "}
                &nbsp;&nbsp;
                <button type="submit" className="btn btn-primary mb-2">
                  Cancel
                </button>
                &nbsp;&nbsp;
                <button type="submit" className="btn btn-primary mb-2">
                 Return All Ticket
                </button>
                &nbsp;&nbsp;
                <button type="submit" className="btn btn-primary mb-2">
                Return Selected Ticket
                </button>
              </Col>
              
            </Row>
          </div>
          {/* /.card-body */}
        </form>
      </div>
      {/* /.card */}
      {/* general form elements */}
     
    </>
  );
};

export default Ticketreturn;
