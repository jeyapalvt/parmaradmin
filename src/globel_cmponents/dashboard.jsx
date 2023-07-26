/** @format */

import DailySalesRep from "./Charts/DailySalesRep";
import React, { useEffect, useState } from "react";
import Boxes from "./Charts/Boxes";
import WeeklySalesRep from "./Charts/WeeklySalesRep";
import MonthlySalesRep from "./Charts/MonthlySalesRep";
import {Field} from 'redux-form'
import RenderField from "../pages/formcomponent/formfields/RenderField";
import ExpirtTkt from "./Tables/ExpiryTkt";
const Dashboard = () => {

  const onPaymentMethodChange = (event ) => {
    console.log(`event value is ${event.target.value}`);
  };


  return (
    <>
      <div className='row mb-2'>
        <div className='col-sm-6'>
          <h1 className='m-0'>Dashboard</h1>
        </div>
      </div>

{/* <div className="form-group">
  <label>Example of select</label>
  <select data-placeholder="Choose one thing" data-allow-clear={1} onChange={onPaymentMethodChange}>
    <option />
    <option value={1}>one</option>
    <option value={2}>two</option>
    <option>three</option>
    <option>4</option>
    <option>5</option>
  </select>
</div> */}

      <Boxes />
<DailySalesRep/>
<ExpirtTkt/>
      {/* <h2>DashBoard</h2> */}
    </>
  );
};

export default Dashboard;
