import Titlebanner from "../../../globel_cmponents/title_banner";
import { Row, Col } from "react-bootstrap";
import MarkupForm from "./forms/MarkupForm";
import FromSubmitToApi from "../../../utils/FromSubmitToApi";
import Markuplisttable from "./markup_list_table";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import requests from "../../../utils/Requests";
const Markupdiscountcreate = (props) => {
  let { id } = useParams();
  return (
    <>
      <Titlebanner title="MarkUp Discount Creation" />
      <MarkupForm id={id} onSubmit={FromSubmitToApi.setmarkupdiscountdetail} />
      {/* getmarkupdiscountlist markupDiscountId */}
    </>
  );
};

export default Markupdiscountcreate;
