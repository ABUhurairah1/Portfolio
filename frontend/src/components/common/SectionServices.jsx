import React from "react";
import smallCometWebp from "../../assets/images/item/small-comet.webp";
import service1 from "../../assets/images/item/service-item-1.webp";
import service2 from "../../assets/images/item/service-item-2.webp";
import service3 from "../../assets/images/item/service-item-3.webp";
import service4 from "../../assets/images/item/service-item-4.webp";
import { Button } from "./index.js";

const services = [
  {
    number: "01/",
    title: "Custom AI Solutions",
    img: service1,
  },
  {
    number: "02/",
    title: "Data Analysis & Visualization",
    img: service2,
  },
  {
    number: "03/",
    title: "Machine Learning Automation",
    img: service3,
  },
  {
    number: "04/",
    title: "AI Consulting & Training",
    img: service4,
  },
];

const SectionServices = () => (
  <div id="services" className="section-service section spacing-1">
    <div className="heading-section mb_43">
      <div className="tag-heading text-uppercase text-label font-3 letter-spacing-1 mb_33">
        Services
      </div>
      <h3 className="text_white fw-5  split-text effect-blur-fade">
        AI Solutions That Matter
      </h3>
    </div>
    {services.map((item) => (
      <div
        className="service-item area-effect scrolling-effect effectBottom"
        key={item.title}
      >
        <div className="content-inner d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center content">
            <span className="number text-label text_muted-color font-3">
              {item.number}
            </span>
            <h5 className="text_white font-4">
              <a href="#contact" className="link">
                {item.title}
              </a>
            </h5>
          </div>
          <Button
            href="#contact"
            className="btn-arrow"
            icon={<i className="icon-ArrowRight"></i>}
          />
          <div className="item-shape spotlight">
            <img
              src={smallCometWebp}
              loading="lazy"
              decoding="async"
              alt="item"
            />
          </div>
        </div>
        <div className="img-hover">
          <img src={item.img} width="140" height="140" alt="item" />
        </div>
      </div>
    ))}
  </div>
);

export default SectionServices;
