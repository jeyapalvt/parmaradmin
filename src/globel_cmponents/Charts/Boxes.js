/** @format */

import React from "react";
import CommonEnq from "./CommonEnq";
import TourEnq from "./TourEnq";
import VisaEnq from "./VisaEnq";
const Boxes = () => {
  return (
    <>
      <div class='row'>
        <div className='col-lg-3 col-6'>
          <TourEnq />
        </div>
        <div className='col-lg-3 col-6'>
          <VisaEnq />
        </div>
        <div className='col-lg-3 col-6'>
          <CommonEnq />
        </div>
      </div>
    </>
  );
};
export default Boxes;
