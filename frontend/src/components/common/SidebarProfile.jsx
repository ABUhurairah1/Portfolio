import React from "react";
import avatarImage from "../../assets/images/user/avatar.webp";
import smallCometPng from "../../assets/images/item/small-comet.png";
import { Button } from "./index.js";

const SidebarProfile = () => (
  <div className="user-bar text-center">
    <div className="box-author mb_12">
      <div className="img-style mb_16">
        <img
          decoding="async"
          loading="lazy"
          src={avatarImage}
          width="314"
          height="314"
          alt="feature post"
        />
      </div>
      <div className="info">
        <div className="name font-2 text_white mb_8">ZenG</div>
        <div className="text-label text-uppercase fw-6 text_primary-color font-3 mb_16 letter-spacing-1">
          AI Developer
        </div>
        <a
          href="mailto:themesflat@gmail.com"
          className="hover-underline-link text_white text-body-2 mb_4"
        >
          themesflat@gmail.com
        </a>
        <p className="text-caption-2 text_secondary-color font-3">
          Based in San Francisco, CA
        </p>
      </div>
    </div>
    <ul className="list-icon d-flex justify-content-center mb_28">
      <li>
        <a href="#" className="icon-LinkedIn"></a>
      </li>
      <li>
        <a href="#" className="icon-GitHub"></a>
      </li>
      <li>
        <a href="#" className="icon-X"></a>
      </li>
      <li>
        <a href="#" className="icon-dribbble"></a>
      </li>
    </ul>
    <Button className="mb_20" fullWidth variant="style-border" href="#">
      <span className="bg_btn"></span>
      <span className="title">
        <i className="icon-ReadCvLogo"></i>View My CV
      </span>
      <span className="effect-shine"></span>
    </Button>
    <Button href="#contact" fullWidth variant="style-1" animate>
      <i className="icon-EnvelopeSimple"></i>
      <span>Contact Me</span>
    </Button>
    <div className="item-shape">
      <img src={smallCometPng} alt="item" />
    </div>
  </div>
);

export default SidebarProfile;
