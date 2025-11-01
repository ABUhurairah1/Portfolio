import React from "react";
import smallCometPng from "../../assets/images/item/small-comet.png";
import partner1 from "../../assets/images/logo/partner-1.png";
import partner2 from "../../assets/images/logo/partner-2.png";
import partner3 from "../../assets/images/logo/partner-3.png";
import partner4 from "../../assets/images/logo/partner-4.png";
import partner5 from "../../assets/images/logo/partner-5.png";
import partner6 from "../../assets/images/logo/partner-6.png";
import partner7 from "../../assets/images/logo/partner-7.png";
import partner8 from "../../assets/images/logo/partner-8.png";
import partner9 from "../../assets/images/logo/partner-9.png";

const skills = [
  {
    id: 1,
    img: partner1,
    name: "React.js",
    category: "Framework",
    className: "item-1 sz-100",
  },
  {
    id: 2,
    img: partner2,
    name: "HTML5",
    category: "Markup",
    className: "item-2 sz-80",
  },
  {
    id: 3,
    img: partner3,
    name: "CSS3",
    category: "Styling",
    className: "item-3 sz-80",
  },
  {
    id: 4,
    img: partner4,
    name: "JavaScript",
    category: "Language",
    className: "item-4 sz-60",
  },
  {
    id: 5,
    img: partner5,
    name: "TypeScript",
    category: "Language",
    className: "item-5 sz-60",
  },
  {
    id: 6,
    img: partner6,
    name: "Node.js",
    category: "Runtime",
    className: "item-6 sz-100",
  },
  {
    id: 7,
    img: partner7,
    name: "Python",
    category: "Language",
    className: "item-7 sz-200",
  },
  {
    id: 8,
    img: partner8,
    name: "Vue.js",
    category: "Framework",
    className: "item-8 sz-160",
  },
  {
    id: 9,
    img: partner9,
    name: "Next.js",
    category: "Framework",
    className: "item-9 sz-120",
  },
];

const SectionPartners = () => (
  <div id="partners" className="section-partner section spacing-1">
    <div className="heading-section mb_44">
      <div className="tag-heading text-uppercase text-label font-3 letter-spacing-1 mb_32">
        Skills
      </div>
      <h3 className="text_white fw-5  split-text effect-blur-fade">
        Technologies & Frameworks
      </h3>
    </div>
    <div
      className="swiper tf-sw-partner wrap-partner"
      data-preview="8"
      data-tablet="8"
      data-mobile-sm="6"
      data-mobile="4"
      data-space="15"
      data-space-md="30"
      data-space-lg="30"
    >
      <div className="swiper-wrapper ">
        {skills.map((skill) => (
          <div className={`swiper-slide`} key={skill.id}>
            <div
              className={`partner-item ${skill.className} scrolling-effect effectZoomIn skill-item`}
            >
              <img src={skill.img} alt={skill.name} className="skill-image" />
              <div className="skill-name-overlay">
                <span className="skill-name">{skill.name}</span>
              </div>
              <div className="item-shape">
                <img src={smallCometPng} alt="item" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default SectionPartners;
