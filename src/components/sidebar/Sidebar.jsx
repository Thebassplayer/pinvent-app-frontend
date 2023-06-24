import React from "react";
import { useState } from "react";

// React Icons
import { HiMenuAlt3 } from "react-icons/hi";
import { RiProductHuntLine } from "react-icons/ri";

// Components
import menu from "../../data/sidebar";

// Styles
import "./Sidebar.scss";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="layout">
      <div className="sidebar" style={{ width: isOpen ? "230px" : "60px" }}>
        <div className="top_section">
          <div
            className="logo"
            style={{
              display: isOpen ? "block" : "none",
            }}
          >
            <RiProductHuntLine size={35} style={{ cursor: "pointer" }} />
          </div>
          <div
            className="bars"
            style={{
              marginLeft: isOpen ? "100px" : "0px",
            }}
          >
            <HiMenuAlt3 onClick={toggle} />
          </div>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
