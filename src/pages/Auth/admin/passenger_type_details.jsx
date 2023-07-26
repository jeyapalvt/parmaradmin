import React from 'react';
import Titlebanner from '../../../globel_cmponents/title_banner';
import PassengerType from './forms/PassengerType';
import {Button} from 'reactstrap'
import {Link} from 'react-router-dom'
import SubuserTable from './sub_user_table';
const PassengerTypeDetails = () => {
    return ( <>
    <Titlebanner title="Sub-User Details"/>
   
    <div className="float-right">
        <Link to="/admin/usertype-creation" class="btn btn-primary" role="button">
          Create New
        </Link>
      </div>
<br/><br/><br/>
      <SubuserTable/>
   
    </> );
}
 
export default PassengerTypeDetails;