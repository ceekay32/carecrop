import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";

// Components
import Sidebar from "../Nav/Sidebar";
import Backdrop from "../Elements/Backdrop";
// Assets
import LogoIcon from "../../assets/svg/Logo";
import BurgerIcon from "../../assets/svg/BurgerIcon";

export default function TopNavbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };
  const [y, setY] = useState(window.scrollY);
  const [sidebarOpen, toggleSidebar] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => setY(window.scrollY));
    return () => {
      window.removeEventListener("scroll", () => setY(window.scrollY));
    };
  }, [y]);

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper
        className="flexCenter animate  colourNew"
        style={y > 100 ? { height: "60px" } : { height: "80px" }}
      >
        <NavInner className="container flexSpaceCenter">
          <NavLink
            exact
            to="/"
            className="pointer flexNullCenter"
            smooth={true}
          >
            <LogoIcon />
            <h1 style={{ marginLeft: "15px" }} className="font20 extraBold">
              I-Krishi
            </h1>
          </NavLink>

          <BurderWrapper
            className="pointer"
            onClick={() => toggleSidebar(!sidebarOpen)}
          >
            <BurgerIcon />
          </BurderWrapper>
          <UlWrapper className="flexNullCenter">
            <li className="semiBold font15 pointer ">
              <NavLink
                activeClass="active"
                style={{ padding: "10px 15px" }}
                to="/"
                spy={true}
                offset={-80}
              >
                Home
              </NavLink>
            </li>
            <li className="semiBold font15 pointer">
              <NavLink
                activeClass="active"
                style={{ padding: "10px 15px" }}
                exact
                to="crop"
                spy={true}
                smooth={true}
                offset={-80}
              >
                Crop
              </NavLink>
            </li>
            <li className="semiBold font15 pointer">
              <NavLink
                activeClass="active"
                style={{ padding: "10px 15px" }}
                exact
                to="/fertilizer"
                spy={true}
                smooth={true}
                offset={-80}
              >
                Fertilizer
              </NavLink>
            </li>
            <li className="semiBold font15 pointer">
              <NavLink
                activeClass="active"
                style={{ padding: "10px 15px" }}
                exact
                to="pesticide"
                spy={true}
                smooth={true}
                offset={-80}
              >
                Pesticide
              </NavLink>
            </li>
            <li className="semiBold font15 pointer">
              <NavLink
                activeClass="active"
                style={{ padding: "10px 15px" }}
                exact
                to="disease"
                spy={true}
                smooth={true}
                offset={-80}
              >
                Disease
              </NavLink>
            </li>
            {/* <li className="semiBold font15 pointer">
              <Link
                activeClass="active"
                style={{ padding: "10px 15px" }}
                to="contact"
                spy={true}
                smooth={true}
                offset={-80}
              >
                Contact
              </Link>
            </li> */}
          </UlWrapper>
          {/* <UlWrapperRight className="flexNullCenter">
            <li className="semiBold font15 pointer">
              <a href="/" style={{ padding: "10px 30px 10px 0" }}>
                Log in
              </a>
            </li>
            <li className="semiBold font15 pointer flexCenter">
              <a
                href="/"
                className="radius8 lightBg"
                style={{ padding: "10px 15px" }}
              >
                Get Started
              </a>
            </li>
          </UlWrapperRight> */}
        </NavInner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;
const NavInner = styled.div`
  position: relative;
  height: 100%;
`;
const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;
const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;
const UlWrapperRight = styled.ul`
  @media (max-width: 760px) {
    display: none;
  }
`;
