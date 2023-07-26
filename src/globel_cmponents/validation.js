const validation = (Data) => {

    let errors = ({});
    if(!Data.empName){
        errors.empName = "User Name Required"
    }
    if(!Data.empPass){
        errors.empPass="Password Required"
    }
    return errors;
}
 
export default validation;