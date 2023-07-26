import React from 'react';
import {CardBody} from 'reactstrap'
import {Link} from 'react-router-dom';
import Titlebanner from '../../../globel_cmponents/title_banner';
import TourpackGrouptable from './tourpackgroup_table';
const TourpackGrouping = () => {
    return ( <>
    <Titlebanner title='Tour Pack Group'/>
     <CardBody>
     <div className="float-right">
        <Link to='/attraction/tour-packgroup-form' class="btn btn-primary" role="button">
          Create New
        </Link>
      </div>
      </CardBody>

      <TourpackGrouptable/>
    </> );
}
 
export default TourpackGrouping;