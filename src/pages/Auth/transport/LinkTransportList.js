import React from "react";
import Titlebanner from "../../../globel_cmponents/title_banner";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
const LinkTransportList = () => {
  const history = useHistory();
  return (
    <div>
      <Titlebanner title="Linked Transport List" />
      <Button
        color="primary"
        onClick={() => history.push("/transport/link-transport")}
      >
        Create New Link
      </Button>
    </div>
  );
};

export default LinkTransportList;
