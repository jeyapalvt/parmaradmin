const accountsMenu = [
  // {
  //     name: "Dashboard",
  //     fixMenu: true,
  //     path: "/dashboard/index",
  //     SpanIcon: "nav-icon fas fa-th",
  //     SideMenu: [],
  //   },
  {
    name: "Admin",
    // path: "/admin",
    SpanIcon: "fa fa-user-secret",
    fixMenu: false,
    admin: true,
    SideMenu: [
      {
        name: "Agency Creation",
        path: "/admin/agency-creation",
        adminAgencyCreation: true,
      },
    ],
  },
];
export default accountsMenu;
