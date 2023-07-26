import SideMenu from "../route/sidemenu";
import accountsMenu from "../route/accountsMenu";
import BackOfficeAdmin from "../route/backOfficeAdmin";
import ItteamMenu from "../route/itteamMenu";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import logimg from "../../../../src/ParmarLogo.png";
import avataimg from "../../../../src/avatar.png";
import { useState, useEffect } from "react";
import encryptStorage from "../../../utils/EncryptStorage";
const AsideNav = () => {
  const [mainMenu, setmainMenu] = useState([]);
  const [isloading, setisloading] = useState(true);
  useEffect(() => {
    const loginDetails = encryptStorage.getItem("DFuck");
    let userType = JSON.parse(loginDetails);

    if (userType.userType == 1) {
      setmainMenu(SideMenu);
    } else if (userType.userType == 2) {
      setmainMenu(accountsMenu);
    } else if (userType.userType == 3) {
      setmainMenu(BackOfficeAdmin);
    } else if (userType.userType == 4) {
      setmainMenu(ItteamMenu);
    }

    setTimeout(function () {
      setisloading(false);
    }, 1000);
  }, []);

  return (
    <>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="#" className="brand-link">
          <img
            src={logimg}
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">Parmar Tours</span>
        </a>
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src={avataimg}
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <a href="#" className="d-block">
                Parmar Admin
              </a>
            </div>
          </div>
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {mainMenu.map((menu, index) =>
                menu.fixMenu ? (
                  <React.Fragment key={index}>
                    <li className="nav-item">
                      <div className="nav-link ">
                        <i className={menu.SpanIcon}></i> &nbsp;
                        <p>
                          <Link to={menu.path}>{menu.name}</Link>
                        </p>
                      </div>
                    </li>
                  </React.Fragment>
                ) : (
                  <React.Fragment key={index}>
                    <li className="nav-item ">
                      <Link to={menu.path} className="nav-link ">
                        <i className={menu.SpanIcon} /> &nbsp;&nbsp;&nbsp;
                        <p>
                          {menu.name}
                          <i className="right fas fa-angle-right" />
                        </p>
                      </Link>
                      <ul className="nav nav-treeview">
                        {menu.SideMenu.map((child, Cindex) => (
                          <li className="nav-item sub-nav" key={Cindex}>
                            <Link to={child.path} className="nav-link ">
                              {/* <i className="far fa-circle nav-icon" /> */}
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <p>{child.name}</p>
                            </Link>
                            <div class="devicer"></div>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </React.Fragment>
                )
              )}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default AsideNav;
