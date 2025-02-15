import React from "react";
import { useLocation } from "react-router-dom";
// import { removeUserSession } from "../Utils/Common";
import { removeCookie, setCookie} from '../Utils/Cookie';
import {useCookies} from 'react-cookie';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";

import routes from "routes.js";

function DemoNavbar(props) {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [MymenudropdownOpen, setMymenuropdownOpen] = React.useState(false);
  const [color, setColor] = React.useState("transparent");
  const sidebarToggle = React.useRef();
  const [cookies, setCookie, removeCookie] = useCookies(["xToken"]);
  const toggle = () => {
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("white");
    }
    setIsOpen(!isOpen);
  };
  const dropdownToggle = (e) => {
    setDropdownOpen(!dropdownOpen);
  };
  const mymenuDropdownToggle = (e) => {
    setMymenuropdownOpen(!MymenudropdownOpen);
  };
  const getBrand = () => {
    var name;
    routes.map((prop, key) => {
      if (prop.collapse) {
        prop.views.map((prop, key) => {
          if (prop.path === props.location.pathname) {
            name = prop.name;
          }
          return null;
        });
      } else {
        if (prop.redirect) {
          if (prop.path === props.location.pathname) {
            name = prop.name;
          }
        } else {
          if (prop.path === props.location.pathname) {
            name = prop.name;
          }
        }
      }
      return null;
    });
    return name;
  };
  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor("white");
    } else {
      setColor("transparent");
    }
  };
  // 로그아웃 logout
  const handleLogout = () => {
    // removeUserSession();
    // removeCookie('xToken');
    document.cookie = "xToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // removeCookie('xToken', {expires: 0})
    props.history.push('/login')
  }

  React.useEffect(() => {
    window.addEventListener("resize", updateColor);
  }, []);
  React.useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  }, [location]);
  return (
    // add or remove classes depending if we are on full-screen-maps page or not
    <Navbar
      color={
        props.location.pathname.indexOf("full-screen-maps") !== -1
          ? "white"
          : color
      }
      expand="lg"
      className={
        props.location.pathname.indexOf("full-screen-maps") !== -1
          ? "navbar-absolute fixed-top"
          : "navbar-absolute fixed-top " +
            (color === "transparent" ? "navbar-transparent " : "")
      }
    >
      <Container fluid style={{marginRight:'10px'}}>
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button
              type="button"
              ref={sidebarToggle}
              className="navbar-toggler"
              onClick={() => openSidebar()}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <NavbarBrand href="/">{getBrand()}</NavbarBrand>
        </div>
        <NavbarToggler onClick={toggle}>
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar className="justify-content-end">
        <form>
            <InputGroup className="no-border">
              <Input  placeholder="Search..." />
                <InputGroupText >
                  <i  className="now-ui-icons ui-1_zoom-bold" />
                </InputGroupText>
            </InputGroup>
          </form>
          <Nav navbar>
            {/* <NavItem>
              <Link to="#pablo" className="nav-link">
                <i className="now-ui-icons media-2_sound-wave" />
                <p>
                  <span className="d-lg-none d-md-block">Stats</span>
                </p>
              </Link>
            </NavItem> */}
            <Dropdown
              nav
              isOpen={dropdownOpen}
              toggle={(e) => dropdownToggle(e)}
            >
              <DropdownToggle caret nav>
                <i className="now-ui-icons location_world" />
                <p>
                  <span className="d-lg-none d-md-block">Some Actions</span>
                </p>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag="a">Action</DropdownItem>
                <DropdownItem tag="a">Another Action</DropdownItem>
                <DropdownItem tag="a">Something else here</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            {/* <NavItem>
              <Link  className="nav-link">
                <i className="now-ui-icons users_single-02" />
                <p>
                  <span className="d-lg-none d-md-block">Account</span>
                </p>
              </Link>
            </NavItem> */}

            <Dropdown nav isOpen={MymenudropdownOpen} toggle={(e) => mymenuDropdownToggle(e)} >
              <DropdownToggle caret nav >
              <i className="now-ui-icons users_single-02" />
                <p>
                  <span className="d-lg-none d-md-block">Account</span>
                </p>
                <DropdownMenu right>
                  <DropdownItem tag='b'>테스트</DropdownItem>
                  <DropdownItem tag='b'>테스트</DropdownItem>
                  <DropdownItem tag='b' onClick={handleLogout}>LOGOUT</DropdownItem>
                </DropdownMenu>
              </DropdownToggle>
            </Dropdown>

          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default DemoNavbar;
