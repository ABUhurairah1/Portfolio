import React from "react";
import smallCometWebp from "../../assets/images/item/small-comet.webp";
import { Button } from "./index.js";

const pricingPlans = [
  {
    id: "standard-plan",
    title: "Standard Plan",
    features: [
      "60 keywords",
      "6,000 monthly website visitors",
      "8 blogs / month",
      "10 quality backlinks / month",
    ],
    price: "$29",
    unit: "/per hour",
    active: true,
  },
  {
    id: "premium-plan",
    title: "Premium Plan",
    features: [
      "120 keywords",
      "15,000 monthly website visitors",
      "20 blogs / month",
      "30 pro-quality backlinks / month",
    ],
    price: "$99",
    unit: "/per hour",
    active: false,
  },
];

const SectionPricing = () => (
  <div
    id="pricing"
    className="section-pricing flat-animate-tab spacing-1 section"
  >
    <div className="heading-section mb_45">
      <div className="tag-heading text-uppercase text-label font-3 letter-spacing-1 mb_30">
        Pricing
      </div>
      <h3 className="text_white fw-5  split-text effect-blur-fade">
        My Pricing
      </h3>
    </div>
    <div className="tab-slide  mb_30">
      <ul className="menu-tab d-flex align-items-center" role="tablist">
        <li className="item-slide-effect"></li>
        {pricingPlans.map((plan) => (
          <li
            key={plan.id}
            className={`nav-tab-item${plan.active ? " active" : ""}`}
            role="presentation"
          >
            <a
              href={`#${plan.id}`}
              className={`text-button tab-link fw-6 font-3${
                plan.active ? " active" : ""
              }`}
              data-bs-toggle="tab"
            >
              {plan.title.split(" ")[0]} Plan
            </a>
          </li>
        ))}
      </ul>
    </div>
    <div className="tab-content">
      {pricingPlans.map((plan) => (
        <div
          key={plan.id}
          className={`tab-pane${plan.active ? " active show" : ""}`}
          id={plan.id}
          role="tabpanel"
        >
          <div className="pricing-item bs-light-mode area-effect">
            <h4 className="title">
              {plan.title.split(" ")[0]} <br /> Plan
            </h4>
            <ul className="list-check d-grid gap_8">
              {plan.features.map((feature) => (
                <li
                  className="text-body-1 text_white font-3 d-flex align-items-center gap_8"
                  key={feature}
                >
                  <i className="icon-check"></i>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="wrap-pricing">
              <h3 className="text_white d-flex align-items-center gap_4 mb_20">
                {plan.price}{" "}
                <span className="text-caption-1 text-caption-1 text_muted-color">
                  {plan.unit}
                </span>
              </h3>
              <Button href="#contact" variant="style-1" animate>
                Get Started !
              </Button>
            </div>
            <div className="item-shape spotlight">
              <img
                src={smallCometWebp}
                loading="lazy"
                decoding="async"
                alt="item"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SectionPricing;
