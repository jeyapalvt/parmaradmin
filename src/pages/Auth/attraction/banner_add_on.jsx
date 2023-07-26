import Titlebanner from "../../../globel_cmponents/title_banner";
import FromSubmitToApi from "../../../utils/FromSubmitToApi";
import BannerAddonForm from "./attractionForms/BannerAddonForm";

const BannerAddOn = () => {
    return ( <>
    <Titlebanner title="Banner Add On"/>
    <BannerAddonForm onSubmit={FromSubmitToApi.setBannerAddon}/>
    </> );
}
 
export default BannerAddOn;