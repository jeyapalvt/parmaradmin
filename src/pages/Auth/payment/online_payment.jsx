import { Link } from "react-router-dom";
const Onlinepayment = () => {
  return (
    <>
      <div className="col-md-12">
        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title" />
          </div>
          <form>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3">
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
                </div>
                <div className="col-md-3">
                  <fieldset className="form-group">
                    <label htmlFor="exampleInputEmail1">Booking Date(TO)</label>
                    <div className="input-group">
                      <input
                        type="date"
                        className="form-control ng-untouched ng-pristine ng-invalid"
                        formcontrolname="expiryDate"
                        placeholder="dd-mm-yyyy"
                      />
                    </div>
                  </fieldset>
                </div>
                <div className="col-md-3">
                  <fieldset className="form-group">
                    <label htmlFor="exampleInputEmail1">Agency </label>
                    <select
                      className="form-control ng-pristine ng-valid ng-touched"
                      name="status"
                    >
                      <option value="Y">Agency 1</option>
                      <option value="N">Agency 2</option>
                    </select>
                  </fieldset>
                </div>
              </div>
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
            <div className="card-footer" />
          </form>
        </div>
      </div>
      <div className="float-right">
        <Link
          to="/payment/online-payment-makepay"
          class="btn btn-primary"
          role="button"
        >
          Add Payment
        </Link>
      </div>
    </>
  );
};

export default Onlinepayment;
