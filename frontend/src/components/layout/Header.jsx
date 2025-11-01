import React from "react";
import avatarImage from "../../assets/images/user/avatar-2.webp";
const Header = () => (
  <div className="header header-fixed style-1">
    <div className="tf-container">
      <div className="row">
        <div className="offset-xxl-4 col-xxl-7 offset-xl-4 col-xl-7">
          <div className="header-sidebar style-horizontal bs-light-mode">
            <div className="box ">
              <div className="avatar">
                <img src={avatarImage} width="68" height="68" alt="avatar" />
              </div>
              <div className="info">
                <h6 className="font-4 mb_4">ZenG</h6>
                <div className="text-label text-uppercase fw-6 text_primary-color font-3 letter-spacing-1">
                  AI Developer
                </div>
              </div>
            </div>
            <ul className="nav-menu style-2 list-icon">
              <li>
                <a className="nav_link active" href="#about">
                  <i className="icon icon-User"></i>
                  <span className="tooltip text-caption-1">About</span>
                </a>
              </li>
              <li>
                <a className="nav_link" href="#resume">
                  <i className="icon icon-ReadCvLogo"></i>
                  <span className="tooltip text-caption-1">Resume</span>
                </a>
              </li>
              <li>
                <a className="nav_link" href="#services">
                  <i className="icon icon-GearFine"></i>
                  <span className="tooltip text-caption-1">Services</span>
                </a>
              </li>
              <li>
                <a className="nav_link" href="#portfolio">
                  <i className="icon icon-Briefcase"></i>
                  <span className="tooltip text-caption-1">Portfolio</span>
                </a>
              </li>
              <li>
                <a className="nav_link" href="#pricing">
                  <i className="icon icon-Tag"></i>
                  <span className="tooltip text-caption-1">Pricing</span>
                </a>
              </li>
              <li>
                <a className="nav_link" href="#contact">
                  <i className="icon icon-PaperPlaneTilt"></i>
                  <span className="tooltip text-caption-1">Contact</span>
                </a>
              </li>
            </ul>
            <a
              className="menu-button show-menu-mobile d-sm-none link-no-action"
              data-target="#menu-1"
              href="#"
            >
              <i className="icon-CirclesFour"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    {/* Mobile popup menu placeholder for future interactivity */}
    <div className="popup-menu-mobile" id="menu-1">
      {/* ...mobile menu structure here; will move to subcomponent if needed... */}
    </div>
  </div>
);

export default Header;
