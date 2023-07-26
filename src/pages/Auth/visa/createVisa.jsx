import React, {useEffect} from 'react';
import Titlebanner from '../../../globel_cmponents/title_banner';
import CreateVisaForm from './CreateVisaForm';
import { useParams } from 'react-router-dom';
const CreateVisa = () =>{
    let { id } = useParams();
 
   
    return(
        <>
        <Titlebanner title="create Visa"/>
<CreateVisaForm visaId ={id}/>
</>
    )
}
export default CreateVisa;