import React, { useState, useEffect } from "react";
import smallCometWebp from "../../assets/images/item/small-comet.webp";
import { Button } from "./index.js";
import { getServiceList } from "../../apis";

const SectionServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServiceList();
        if (response.success && response.data) {
          setServices(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div id="services" className="section-service section spacing-1">
        <div className="heading-section mb_43">
          <div className="tag-heading text-uppercase text-label font-3 letter-spacing-1 mb_33">
            Services
          </div>
        </div>
      </div>
    );
  }

  if (!services || services.length === 0) {
    return null;
  }

  return (
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
          key={item.id}
        >
          <div className="content-inner d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center content">
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
          {item.image && (
            <div className="img-hover">
              <img 
                src={item.image} 
                width="140" 
                height="140" 
                alt={item.title}
                loading="lazy"
                decoding="async"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SectionServices;
