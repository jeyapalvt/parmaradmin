import { Link } from "react-router-dom";
import Forgetpass from "./Forgetpass";
import { Row, Col } from "reactstrap";
const Forgetpassword = () => {
  return (
    <>
        <div className="login-page-bg ">
    <Row>

<Col xs={7}></Col>
<Col xs={4}>
<Forgetpass/>

</Col>
<Col xs={1}>
</Col>
    </Row>
  
    </div>
    </>
  );
};

export default Forgetpassword;
