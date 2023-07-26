import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const TopNav = () => {
  let history = useHistory();
  const logout = (e) => {
    sessionStorage.clear();
    window.location.reload();
    window.location.href = "/";
  };

  // const currentUrl = window.location.href;
    // const pathname = window.location.pathname;
    // console.log("current url", currentUrl);
    // console.log("Path Name", pathname);
    // console.log(pathname.split("/"));
    // console.log(pathname.split("/")[2]);
    
  return (
    <>
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>
        </ul>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          {/* Navbar Search */}
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="navbar-search"
              href="#"
              role="button"
            ></a>
            <div className="navbar-search-block"></div>
          </li>
          {/* Messages Dropdown Menu */}

          {/* Notifications Dropdown Menu */}

          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="fullscreen"
              href="#"
              role="button"
            >
              <i className="fas fa-expand-arrows-alt" />
            </a>
          </li>

          <li className="nav-item dropdown">
            {/* <a className="nav-link" data-toggle="dropdown" href="#">
    <i className="far fa-comments" />
    <span className="badge badge-danger navbar-badge">3</span>
  </a> */}
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <a href="#" className="dropdown-item">
                {/* Message Start */}
                <div className="media">
                  {/* <img src="dist/img/user1-128x128.jpg" alt="User Avatar" className="img-size-50 mr-3 img-circle" /> */}
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      Brad Diesel
                      {/* <span className="float-right text-sm text-danger"><i className="fas fa-star" /></span> */}
                    </h3>
                    <p className="text-sm">Call me whenever you can...</p>
                    {/* <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p> */}
                  </div>
                </div>
                {/* Message End */}
              </a>

              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item dropdown-footer">
                See All Messages
              </a>
            </div>
          </li>

          <li>
            <Button color="danger" onClick={(e) => logout(e)}>
              Logout
            </Button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default TopNav;
