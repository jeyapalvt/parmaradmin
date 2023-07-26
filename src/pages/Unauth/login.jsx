import FromSubmitToApi from "../../utils/FromSubmitToApi";
import LoginForm from "./LoginForm";
import { Row , Col} from "reactstrap";
const LoginPage = (props) => {

 
  return (
    <>
    <div className="login-page-bg ">
    <Row>

<Col sm={7}></Col>
<Col sm={4}>
<LoginForm />

</Col>
<Col sm={1}>
</Col>
    </Row>
  
    </div>

</>
  );
};

export default LoginPage;
