/** @format */

import AdminRoles from "../admin/admin-roles";
import AdminRoleProLinks from "../admin/admin_role_pgmlink";
import Adminrolecreate from "../admin/admin_role_create";

import Attractioncreation from "../attraction/attraction_creation";
import Attractioncreationform from "../attraction/attraction_creation_from";
import Newagencycreation from "../admin/admin_agency_new";
import AgencyCreation from "../admin/agency_creation";
import Ticketcreatenew from "../admin/admin_ticket_new";
import TicketType from "../admin/ticket_type";
import Parkgrouping from "../attraction/park_grouping";
import Parkgroupingnew from "../attraction/park_grouping_new";
import Customertype from "../admin/customer_type";
import CustomerTypenew from "../admin/customer_type_create";
import CreateVisa from "../visa/createVisa";
import Passengercreatenew from "../admin/passenger_type_new";
import Paymentdetails from "../payment/payment_details";
import Addpaymentcreation from "../payment/add_payment_creation";
import Markupcreation from "../payment/markup_discount";
import Markupdiscountcreate from "../payment/markup_discount_create";
import Parklistforbooking from "../booking/parklist_for_booking";
import Ticketbook from "../booking/ticket_book";
import Ticketbookingform from "../booking/tickrt_boking_form";
import Ticketreturn from "../booking/ticket_return";
import Dailysalesreport from "../reports/daily_sales_report";
import Agentsalesreport from "../reports/agent_sales_report";
import Cancellationreport from "../reports/cancellation_report";
import Stacksummeryrepo from "../reports/stack_summery_report";
import Inventortdetailreport from "../reports/inventory_detail_report";
import Statmentreport from "../reports/statment_report";

import AdminIndex from "../admin/admin_index";

import Onlinepayment from "../payment/online_payment";
import Addpaybyuser from "../payment/add_payby_user";
import Attractionlisttable from "../attraction/attraction_list_table";
import TicketCreation from "../attraction/ticket_creation";
import TourPackCreation from "../attraction/tour_pack_creation";
import LoginPage from "../../Unauth/login";
import successmessage from "../../../globel_cmponents/successMsg";
import Ticketlisttable from "../attraction/tkt_list_table";
import Tourpacklisttable from "../attraction/tour_pack_list_table";
import BannerAddOn from "../attraction/banner_add_on";
import FormAdddOn from "../attraction/form_add_on";
import Dashboard from "../../../globel_cmponents/dashboard";
import TicketEditForm from "../attraction/attractionForms/TicketEditForm";
import TktEditForm from "../attraction/tkt_edit_form";
import Agencylistmarkup from "../admin/agency_list_for_markup";
import Pdfgenerate from "../admin/pdf_generate";
import Combopackcreation from "../attraction/combo_creation";
import ConnectWithAPI from "../attraction/connect_with_api";
import TourPackEnquiry from "../attraction/tour_pack_Enquiry";
import VisaEnquiry from "../Enquiry/visa_enquiry";
import CommonEnquiry from "../Enquiry/common_enquiry";
import ApiTicketReport from "../reports/api_tkt_report";
import BannerImages from "../admin/banner_images";
import PassengerTypeDetails from "../admin/passenger_type_details";
import PassengerType from "../admin/forms/PassengerType";
import FormAddonBarCode from "../attraction/formAddon_Barcode";
import TourpackGrouping from "../attraction/tourpack_grouping";
import TourGroupForm from "../attraction/attractionForms/TourGroupForm";
import ComboListTable from "../attraction/comboList";
import VisaList from "../visa/visaList";
import VisaDetails from "../Enquiry/VisaDetails";
import PriceSetting from "../api/PriceSettings";
import MarkupDiscount from "../api/MarkupDiscount";
import ReturnTicketList from "../reports/return_tickets_list";
import ReturnTicketDetails from "../reports/return_tickets_detail";
import ExpirtTktDetails from "../../../globel_cmponents/Tables/ExpTktDetails";
import bookinglist from "../reports/bookinglist";
import MarkupTable from "../api/Tables/MarkupTable";
import MonthlySalesRep from "../../../globel_cmponents/Charts/MonthlySalesRep";
import MonthlySalesReport from "../reports/monthly_sales_report";
import AddonStockReport from "../reports/addon_stock_report";
import AddHolidays from "../attraction/AddHolidays";
import ApiAccessPermistion from "../agentapi/ApiAccessPermistion";
import TicketUpload from "../agentapi/TicketUpload";
import CreateTransport from "../transport/CreateTransport";
import TransportList from "../transport/TransportList";
import LinkTransportList from "../transport/LinkTransportList";
import LinkTransport from "../transport/LinkTransport";
import CreateHotel from "../hotel/CreateHotel";
import HotelList from "../hotel/HotelList";
import AttractionTransport from "../transport/AttractionTransport";
import ListAminities from "../hotel/ListAminities";
import CraeteAminities from "../hotel/CraeteAminities";
import LanguageList from "../websetting/languageList";
import CreateLanguage from "../websetting/createLanguage";
import ReviewList from "../reviewAndfaq/ReviewList";
import FaqList from "../reviewAndfaq/FaqList";
import CreateReview from "../reviewAndfaq/CreateReview";
import CreateFaq from "../reviewAndfaq/CreateFaq";
import BannerImageBtoC from "../websetting/BannerImageBtoC";

let urlId = sessionStorage.getItem("randomString");
const routes = [
  {
    path: "/index",
    component: AdminIndex,
  },
  {
    path: "/dashboard/index",
    component: Dashboard,
  },
  {
    path: "/attraction/connect-with_api",
    component: ConnectWithAPI,
  },
  {
    path: "/admin/:id/roles",
    component: AdminRoles,
  },
  {
    path: "/admin/roles-create",
    component: Adminrolecreate,
  },
  {
    path: "/admin/roles-create-new/:id",
    component: Adminrolecreate,
  },

  {
    path: "/admin/role-programe-link",
    component: AdminRoleProLinks,
  },
  {
    path: "/admin/customer-type",
    component: Customertype,
  },
  {
    path: "/admin/customer-type-new",
    component: CustomerTypenew,
  },
  {
    path: "/admin/customer-list-for-markup/:id/:name/:status/:desc",
    component: Agencylistmarkup,
  },

  {
    path: "/admin/ticket-type-creation/:id",
    component: TicketType,
  },
  {
    path: "/admin/ticket-type-new/:id",
    component: Ticketcreatenew,
  },
  {
    path: "/admin/passenger-type",
    component: PassengerTypeDetails,
  },
  {
    path: "/admin/usertype-creation",
    component: PassengerType,
  },
  {
    path: "/attraction/form-add-on-BarcodeUpload",
    component: FormAddonBarCode,
  },
  {
    path: "/admin/banner-images",
    component: BannerImages,
  },
  {
    path: "/admin/passenger-create-new",
    component: Passengercreatenew,
  },

  {
    path: "/admin/agency-creation",
    component: AgencyCreation,
  },
  {
    path: "/admin/agency-create-new/:id",
    component: Newagencycreation,
  },
  {
    path: "/payment/payment-creation",
    component: Paymentdetails,
  },

  {
    path: "/payment/online-payment",
    component: Onlinepayment,
  },
  {
    path: "/apimaster/price-settings",
    component: PriceSetting,
  },
  {
    path: "/apimaster/markup-discount",
    component: MarkupDiscount,
  },
  {
    path: "/apimaster/markup-data",
    component: MarkupTable,
  },
  {
    path: "/payment/add-payment-creation",
    component: Addpaymentcreation,
  },
  {
    path: "/payment/online-payment-makepay",
    component: Addpaybyuser,
  },
  {
    path: "/payment/markup-discount",
    component: Markupcreation,
  },
  {
    path: "/payment/markup-discount-create/:id",
    component: Markupdiscountcreate,
  },

  {
    path: "/attraction/attraction-creation/:id",
    component: Attractioncreationform,
  },
  {
    path: "/attraction/tour-pack-creation/:id",
    component: TourPackCreation,
  },
  {
    path: "/attraction/tour-pack-list",
    component: Tourpacklisttable,
  },

  {
    path: "/attraction/tour-pack-enquiry",
    component: TourPackEnquiry,
  },

  {
    path: "/enquiry/visa-enquiry",
    component: VisaEnquiry,
  },

  {
    path: "/enquiry/common-enquiry",
    component: CommonEnquiry,
  },
  {
    path: "/attraction/attraction-creation-new",
    component: Attractioncreationform,
  },
  {
    path: "/attraction/attraction-list",

    component: Attractionlisttable,
  },
  {
    path: "/attraction/ticket-creation",

    component: TicketCreation,
  },
  {
    path: "/attraction/park-grouping",
    component: Parkgrouping,
  },
  {
    path: "/attraction/park-grouping-new/:id",
    component: Parkgroupingnew,
  },
  {
    path: "/attraction/banner-add-on",
    component: BannerAddOn,
  },
  {
    path: "/attraction/form-add-on",
    component: FormAdddOn,
  },
  {
    path: "/attraction/ticket-list",
    component: Ticketlisttable,
  },
  {
    path: "/attraction/tour-pack-group",
    component: TourpackGrouping,
  },
  {
    path: "/attraction/combo-pack-list",
    component: ComboListTable,
  },
  {
    path: "/attraction/tour-packgroup-form",
    component: TourGroupForm,
  },
  {
    path: "/booking/ticket-booking",
    component: Parklistforbooking,
  },

  {
    path: "/booking/ticket-booking-detail-view/:id",
    component: Ticketbook,
  },
  {
    path: "/booking/ticket-booking-detail-and-form",
    component: Ticketbookingform,
  },
  {
    path: "/booking/ticket-return",
    component: Ticketreturn,
  },
  {
    path: "/report/daily-sales-report",
    component: Dailysalesreport,
  },
  {
    path: "/report/agent-sales-report",
    component: Agentsalesreport,
  },
  {
    path: "/report/cancellation-report",
    component: Cancellationreport,
  },
  {
    path: "/report/stack-summery-report",
    component: Stacksummeryrepo,
  },
  {
    path: "/report/inventory-detail-report",
    component: Inventortdetailreport,
  },
  {
    path: "/report/statment-report",
    component: Statmentreport,
  },
  {
    path: "/success",
    component: successmessage,
  },
  {
    path: "/attraction/tkt-edit-page/:id",
    component: TktEditForm,
  },
  {
    path: "/admin/pdf-generate",
    component: Pdfgenerate,
  },
  {
    path: "/attraction/combo-pack-creation/:id",
    component: Combopackcreation,
  },
  {
    path: "/report/api-ticket-booking-report",
    component: ApiTicketReport,
  },
  {
    path: "/visa/create-visa/:id",
    component: CreateVisa,
  },
  {
    path: "/visa/visa-list",
    component: VisaList,
  },
  {
    path: "/visa/visa-details/:id",
    component: VisaDetails,
  },
  {
    path: "/report/return-ticket-list",
    component: ReturnTicketList,
  },
  {
    path: "/report/return-ticket-details/:id",
    component: ReturnTicketDetails,
  },
  {
    path: "/dashboard/soon-expiry-ticket-details/:id",
    component: ExpirtTktDetails,
  },
  {
    path: "/report/all-booking-list",
    component: bookinglist,
  },
  {
    path: "/report/monthly-sales-report",
    component: MonthlySalesReport,
  },
  {
    path: "/report/addon-stock-report",
    component: AddonStockReport,
  },
  {
    path: "/attraction/set-hollydays",
    component: AddHolidays,
  },
  {
    path: "/api/access-permistion",
    component: ApiAccessPermistion,
  },
  {
    path: "/api/upload-test-tickets",
    component: TicketUpload,
  },
  {
    path: "/transport/list-transport",
    component: TransportList,
  },
  {
    path: "/transport/create-transport",
    component: CreateTransport,
  },
  {
    path: "/transport/link-transport-list",
    component: LinkTransportList,
  },
  {
    path: "/transport/link-transport",
    component: LinkTransport,
  },
  {
    path: "/hotel/create-hotel/:id",
    component: CreateHotel,
  },
  {
    path: "/hotel/list-hotel",
    component: HotelList,
  },
  {
    path: "/transport/attraction-transport",
    component: AttractionTransport,
  },
  {
    path: "/hotel/list-amities",
    component: ListAminities,
  },
  {
    path: "/hotel/create-amities",
    component: CraeteAminities,
  },

  {
    path: "/admin/language-settings",
    component: LanguageList,
  },
  {
    path: "/admin/create-language/:id",
    component: CreateLanguage,
  },
  {
    path: "/randf/reviewlist",
    component: ReviewList,
  },
  {
    path: "/randf/faqslist",
    component: FaqList,
  },
  {
    path: "/randf/createreview/:id",
    component: CreateReview,
  },
  {
    path: "/randf/createfaq/:id",
    component: CreateFaq,
  },
  {
    path: "/admin/banner-imagesbtoc",
    component: BannerImageBtoC,
  },
];
export default routes;
///hotel/list-amities  hotel/create-amities
