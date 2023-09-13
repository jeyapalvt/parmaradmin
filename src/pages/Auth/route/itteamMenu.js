import { path } from "react-dom-factories";

const ItteamMenu = [
  {
    name: "Dashboard",
    fixMenu: true,
    path: "/dashboard/index",
    SpanIcon: "nav-icon fas fa-th",
    SideMenu: [],
  },

  {
    name: "Website Settings",
    // path: "/admin",
    SpanIcon: "fa fa-cog",
    fixMenu: false,
    admin: true,
    SideMenu: [
      {
        name: "Banner Images",
        path: "/admin/banner-images",
      },
      {
        name: "Banner Image(BtoC)  ",
        path: "/admin/banner-imagesbtoc",
      },
      {
        name: "Language  Settings",
        path: "/admin/language-settings",
      },
    ],
  },
  {
    name: "Admin",
    // path: "/admin",
    SpanIcon: "fa fa-user-secret",
    fixMenu: false,
    admin: true,
    SideMenu: [
      {
        name: "Roles",
        path: "/admin/test/roles",
        adminRoles: true,
      },
      {
        name: "Role Program Link",
        path: "/admin/role-programe-link",
        adminRolesProgramLink: true,
      },
      {
        name: "Customer Type",
        path: "/admin/customer-type",
        adminCustomerType: true,
      },
      {
        name: "Ticket Type",
        path: "/admin/ticket-type-creation/null",
        adminTicketTypeNew: true,
      },

      {
        name: "Sub-User Creation",
        path: "/admin/passenger-type",
        adminPassengerType: true,
      },
      {
        name: "Agency Creation",
        path: "/admin/agency-creation",
        adminAgencyCreation: true,
      },
      {
        name: "Generate PDF",
        path: "/admin/pdf-generate",
      },
    ],
  },
  {
    name: "Payment",
    // path: "/payment",
    payment: true,
    SpanIcon: "fa fa-credit-card",
    fixMenu: false,
    SideMenu: [
      {
        name: "Payment Creation",
        path: "/payment/payment-creation",
        paymentCreation: true,
      },
      {
        name: "Markup Discount",
        path: "/payment/markup-discount",
        paymentMarkupDiscount: true,
      },
    ],
  },
  {
    name: "API Settings",
    // path: "/payment",
    payment: true,
    SpanIcon: "fa fa-credit-card",
    fixMenu: false,
    SideMenu: [
      {
        name: "API Master",
        path: "/attraction/connect-with_api",
        attractionList: true,
      },
      {
        name: "Price Settings",
        path: "/apimaster/price-settings",
        paymentOnlinePayment: true,
      },
      {
        name: "MarkUp Discount",
        path: "/apimaster/markup-discount",
        paymentMarkupDiscount: true,
      },
    ],
  },
  {
    name: "Agent API Settings",
    // path: "/payment",
    // payment: true,
    SpanIcon: "fa fa-credit-card",
    fixMenu: false,
    SideMenu: [
      {
        name: "Create Access Permistion",
        path: "/api/access-permistion",
        attractionList: true,
      },
      {
        name: "Upload Test(Dummy) Ticket",
        path: "/api/upload-test-tickets",
        paymentOnlinePayment: true,
      },
    ],
  },
  {
    name: "Attraction",
    fixMenu: false,
    SpanIcon: "fa fa-globe",
    SideMenu: [
      {
        name: "Attraction Creation",
        path: `/attraction/attraction-creation/null`,
        attractionCreation: true,
      },

      {
        name: "Attraction List",
        path: "/attraction/attraction-list",
        attractionList: true,
      },
      {
        name: "Set Holidays",
        path: "/attraction/set-hollydays",
      },
      {
        name: "API Master",
        path: "/attraction/connect-with_api",
        attractionList: true,
      },
      {
        name: "Ticket Creation",
        path: "/attraction/ticket-creation",
        attractionTicketCreation: true,
      },
      {
        name: "Ticket List",
        path: "/attraction/ticket-list",
        attractionTicketList: true,
      },
      {
        name: "Combo Pack Creation",
        path: "/attraction/combo-pack-creation/null",
        //attractionParkGrouping:true
      },
      {
        name: "Combo Pack list",
        path: "/attraction/combo-pack-list",
        //attractionParkGrouping:true
      },
      {
        name: "Park Grouping",
        path: "/attraction/park-grouping",
        attractionParkGrouping: true,
      },
      {
        name: "Banner Add-On",
        path: "/attraction/banner-add-on",
      },
      {
        name: "Form Add-On",
        path: "/attraction/form-add-on",
      },
      {
        name: "Add-On Barcode",
        path: "/attraction/form-add-on-BarcodeUpload",
      },
    ],
  },
  {
    name: "Tour Pack",
    fixMenu: false,
    tourPackage: true,
    SpanIcon: "fa fa-globe",
    SideMenu: [
      {
        name: "Tour Pack Group",
        path: "/attraction/tour-pack-group",
      },
      {
        name: "Tour Pack Creation",
        path: "/attraction/tour-pack-creation/null",
        tourPackageCreation: true,
      },
      {
        name: "Tour Pack List",
        path: "/attraction/tour-pack-list",
        tourPackageList: true,
      },
    ],
  },
  {
    name: "Booking",
    fixMenu: false,

    SpanIcon: "fa fa-book",
    SideMenu: [
      {
        name: "Booking",
        path: "/booking/ticket-booking",
        booking: true,
      },
      {
        name: "Cancellation",
        path: "/booking/ticket-cansolation",
        bookingCancellation: true,
      },
      {
        name: "Return Tickets",
        path: "/booking/ticket-return",
        bookingReturnTickets: true,
      },
    ],
  },
  {
    name: "Review And Faq",
    // path: "/admin",
    SpanIcon: "fa fa-cog",
    fixMenu: false,
    admin: true,
    SideMenu: [
      {
        name: "Review",
        path: "/randf/reviewlist",
      },
      {
        name: "FAQ",
        path: "/randf/faqslist",
      },
    ],
  },
  {
    name: "Reports",
    fixMenu: false,
    reports: true,
    SpanIcon: "fa fa-list-alt",
    SideMenu: [
      {
        name: "Daily Sales Report",
        path: "/report/daily-sales-report",
        reportsDailySalesReport: true,
      },
      {
        name: "Monthly Sales Report",
        path: "/report/monthly-sales-report",
      },
      {
        name: "API Ticket Sales report",
        path: "/report/api-ticket-booking-report",
      },
      {
        name: "Bookig List",
        path: "/report/all-booking-list",
      },
      {
        name: "Return Tickets",
        path: "/report/return-ticket-list",
      },
      {
        name: "Addon Stock",
        path: "/report/addon-stock-report",
      },
      {
        name: "Agent Sales Report",
        path: "/report/agent-sales-report",
        reportsAgentSalesReport: true,
      },
      {
        name: "Cancellation Report",
        path: "/report/cancellation-report",
        reportsCancellationReport: true,
      },
      {
        name: "Stock Summery Report",
        path: "/report/stack-summery-report",
        reportsStackSummaryReport: true,
      },
      {
        name: "Inventory Detail Report",
        path: "/report/inventory-detail-report",
        reportsInventoryDetailReport: true,
      },
      {
        name: "Statment Report",
        path: "/report/statment-report",
        reportsStatementReport: true,
      },
    ],
  },

  {
    name: "Enquiry List",
    fixMenu: false,
    // reports: true,
    SpanIcon: "fa fa-list-alt",
    SideMenu: [
      {
        name: "Tour Enquiry",
        path: "/attraction/tour-pack-enquiry",
      },
      {
        name: "Visa Enquiry",
        path: "/enquiry/visa-enquiry",
      },
      {
        name: "Common Enquiry",
        path: "/enquiry/common-enquiry",
      },
    ],
  },
];
export default ItteamMenu;
