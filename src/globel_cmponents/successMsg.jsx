import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { Button } from "reactstrap";
const Successmessage = ({smsg}) => {
    let history = useHistory()
    return (  <><p>Form Submited Successfully</p>
    
    <Button onClick={history.goBack}>Go Back</Button></>);
}
 
export default Successmessage;