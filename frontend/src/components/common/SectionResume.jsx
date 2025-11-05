import React, { useState, useEffect } from "react";
import smallCometWebp from "../../assets/images/item/small-comet.webp";
import { getResumeList } from "../../apis";

const SectionResume = () => {
  const [resumeData, setResumeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await getResumeList();
        if (response.success && response.data) {
          setResumeData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch resume data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, []);

  if (loading) {
    return (
      <div id="resume" className="section-resume spacing-1 section">
        <div className="heading-section mb_44">
          <div className="tag-heading text-uppercase text-label font-3 letter-spacing-1 mb_30">
            Resume
          </div>
        </div>
      </div>
    );
  }

  if (!resumeData || resumeData.length === 0) {
    return null;
  }

  return (
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
                <span className="text-body-1 font-3">{item.organization}</span>
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
};

export default SectionResume;
