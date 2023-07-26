const BackOfficeAdmin = [
  {
    name: "Attraction",
    fixMenu: false,
    SpanIcon: "fa fa-globe",
    SideMenu: [
      {
        name: "Ticket Creation",
        path: "/attraction/ticket-creation",
        attractionTicketCreation: true,
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
];
export default BackOfficeAdmin;
