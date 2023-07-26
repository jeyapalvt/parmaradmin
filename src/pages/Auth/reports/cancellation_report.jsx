import Titlebanner from "../../../globel_cmponents/title_banner"
import { Row, Col } from "react-bootstrap";
import Ticketcancellationtable from "./ticket_cancellation_table";
const Cancellationreport = () => {
    return ( <>
    <Titlebanner title="Calellation Report"/>
    <div className="col-md-12">
        {/* general form elements */}
        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title"></h3>
          </div>
          {/* /.card-header */}
          {/* form start */}
          <form>
            <div className="card-body">
                <Row>
              <div _ngcontent-c14 className="col-md-3">
                <fieldset _ngcontent-c14 className="form-group">
                <label htmlFor="exampleInputEmail1">Booking Date (From)</label>
                  <div _ngcontent-c14 className="input-group">
                    <input
                      type="date"
                      className="form-control ng-untouched ng-pristine ng-invalid"
                      formcontrolname="purchaseDate"
                      ngbdatepicker
                      placeholder="dd-mm-yyyy"
                      min="Wed Aug 04 2021 21:47:12 GMT+0530 (India Standard Time)"
                    />
                  </div>
                </fieldset>
              </div>
              <div _ngcontent-c14 className="col-md-3">
                <fieldset _ngcontent-c14 className="form-group">
                <label htmlFor="exampleInputEmail1">Booking Date(TO)</label>
                  <div _ngcontent-c14 className="input-group">
                    <input
                      type="date"
                      className="form-control ng-untouched ng-pristine ng-invalid"
                      formcontrolname="expiryDate"
                      ngbdatepicker
                      placeholder="dd-mm-yyyy"
                    />
                  </div>
                </fieldset>
              </div>
              

              <div _ngcontent-c14 className="col-md-3">
                <fieldset _ngcontent-c14 className="form-group">
                <label htmlFor="exampleInputEmail1">Compeny </label>
                      <select
                        _ngcontent-c11
                        className="form-control ng-pristine ng-valid ng-touched"
                        name="status"
                      >
                        <option _ngcontent-c11 value="Y">
                          Agency 1
                        </option>
                        <option _ngcontent-c11 value="N">
                        Agency 2
                        </option>
                      </select>
                      </fieldset>
              </div>

              
             
                    

              </Row>
              <div className="float-right">
                <button type="submit" className="btn btn-primary">
                  Search
                </button>
                &nbsp; &nbsp; &nbsp;
                <button type="submit" className="btn btn-primary">
                 Clear
                </button>
              </div>
            </div>
            {/* /.card-body */}
            <div className="card-footer">
       
            </div>
          </form>
        </div>
        {/* /.card */}
        {/* general form elements */}
      </div>
      <br></br>
      <Ticketcancellationtable/>
    </> );
}
 
export default Cancellationreport;