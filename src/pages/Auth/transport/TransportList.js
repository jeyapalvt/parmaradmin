import React, { useEffect, useState } from "react";
import Titlebanner from "../../../globel_cmponents/title_banner";
import axios from "axios";
const TransportList = () => {
  useEffect(() => {
    getTransportList();
  }, []);
  const getTransportList = () => {
    axios
      .post()
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Titlebanner title="Transport List" />
    </div>
  );
};

export default TransportList;
