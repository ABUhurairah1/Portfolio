import React from "react";
import smallCometWebp from "../../assets/images/item/small-comet.webp";

const resumeData = [
  {
    id: 1,
    role: "AI Developer",
    org: "Google Inc.",
    period: "2020 - Present",
  },
  {
    id: 2,
    role: "Machine Learning Engineer",
    org: "Microsoft Inc.",
    period: "2018 - 2020",
  },
  {
    id: 3,
    role: "Data Scientist",
    org: "IBM Inc.",
    period: "2014 - 2018",
  },
  {
    id: 4,
    role: "M.Sc. in Computer Science",
    org: "Stanford University",
    period: "2013 - 2014",
  },
  {
    id: 5,
    role: "B.Sc. in Information Technology",
    org: "Massachusetts Institute of Technology",
    period: "2008 - 2013",
  },
];

const SectionResume = () => (
  <div id="resume" className="section-resume spacing-1 section">
    <div className="heading-section mb_44">
      <div className="tag-heading text-uppercase text-label font-3 letter-spacing-1 mb_30">
        Resume
      </div>
      <h3 className="text_white fw-5 split-text effect-blur-fade">
        Education & Experience
      </h3>
    </div>
    <div className="effect-line-hover">
      {resumeData.map((item) => (
        <div
          className="wrap-education-item area-effect scrolling-effect effectTop"
          key={item.id}
        >
          <span className="point"></span>
          <div className="education-item">
            <div className="content">
              <h5 className="font-4 mb_4">
                <a href="#contact" className="link">
                  {item.role}
                </a>
              </h5>
              <span className="text-body-1 font-3">{item.org}</span>
            </div>
            <div className="date text-caption-1 text_white font-3">
              {item.period}
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

export default SectionResume;
