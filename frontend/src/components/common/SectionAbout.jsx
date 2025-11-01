import React from "react";
import smallCometWebp from "../../assets/images/item/small-comet.webp";

const SectionAbout = () => (
  <div id="about" className="section-about section spacing-1">
    <div className="heading-section mb_45">
      <div className="tag-heading text-uppercase text-label font-3 letter-spacing-1 mb_32">
        About
      </div>
      <div className="title-border-shape">
        <h4 className="animationtext clip">
          Hello! I'm{" "}
          <span className="tf-text s1 cd-words-wrapper text_primary-color">
            <span className="item-text is-visible">AI Developer</span>
            <span className="item-text is-hidden">Data Scientist</span>
            <span className="item-text is-hidden">UI/UX Developer</span>
          </span>
        </h4>
        <div className="shape">
          <span className="shape-1"></span>
          <span className="shape-2"></span>
          <span className="shape-3"></span>
          <span className="shape-4"></span>
        </div>
        <div className="line">
          <span className="line-horizontal horizontal-1"></span>
          <span className="line-horizontal horizontal-2"></span>
          <span className="line-vertical vertical-1"></span>
          <span className="line-vertical vertical-2"></span>
        </div>
      </div>
    </div>
    <h1 className="title mb_16 split-text effect-blur-fade">
      Empower Code Intelligence
    </h1>
    <p className="text_muted-color font-3 mb_43 split-text split-lines-transform">
      Hello! I'm ZenG, an AI Developer with 10 years of experience in designing
      and developing intelligent systems. My expertise spans machine learning,
      natural language processing, computer vision, and data analysis. Driven by
      curiosity, I transform complex data into smart solutions."
    </p>
    <div className="wrap-counter tf-grid-layout md-col-3">
      <div className="counter-item bs-light-mode">
        <div className="counter-number h2 text_white mb_7">
          <div className="odometer" data-number="10">
            10
          </div>
          <span className="sub">+</span>
        </div>
        <p className="text-body-1 text_muted-color font-3">
          Years in AI Development
        </p>
        <div className="item-shape">
          <img
            src={smallCometWebp}
            loading="lazy"
            decoding="async"
            alt="item"
          />
        </div>
      </div>
      <div className="counter-item bs-light-mode">
        <div className="counter-number h2 text_white mb_7">
          <div className="odometer" data-number="500">
            500
          </div>
          <span className="sub">+</span>
        </div>
        <p className="text-body-1 text_muted-color font-3">Satisfied Clients</p>
        <div className="item-shape">
          <img
            src={smallCometWebp}
            loading="lazy"
            decoding="async"
            alt="item"
          />
        </div>
      </div>
      <div className="counter-item bs-light-mode">
        <div className="counter-number h2 text_white mb_7">
          <div className="odometer" data-number="1">
            1
          </div>
          <span className="sub">k</span>
          <span className="sub">+</span>
        </div>
        <p className="text-body-1 text_muted-color font-3">
          Projects Completed
        </p>
        <div className="item-shape">
          <img
            src={smallCometWebp}
            loading="lazy"
            decoding="async"
            alt="item"
          />
        </div>
      </div>
    </div>
  </div>
);

export default SectionAbout;
