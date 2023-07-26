import React, { useState, useEffect } from "react";
import axios from "axios";
import requests from "../../../utils/Requests";
import ConnectToApi from "./attractionForms/ConnectToApiForm";
import Titlebanner from "../../../globel_cmponents/title_banner";
const ConnectWithAPI = () => {
  return (
    <>
      <Titlebanner title="API Master" />
      <ConnectToApi />
    </>
  );
};

export default ConnectWithAPI;
