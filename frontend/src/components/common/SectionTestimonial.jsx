import React, { useEffect, useRef, useState } from "react";
import smallCometWebp from "../../assets/images/item/small-comet.webp";
import { getTestimonialList } from "../../apis";

const SectionTestimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);
  const swiperInstanceRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  const updateButtonStates = (swiper) => {
    if (!prevButtonRef.current || !nextButtonRef.current) return;

    const isBeginning = swiper.isBeginning;
    const isEnd = swiper.isEnd;

    // Update prev button
    if (isBeginning) {
      prevButtonRef.current.classList.add("sw-button-disabled");
    } else {
      prevButtonRef.current.classList.remove("sw-button-disabled");
    }

    // Update next button
    if (isEnd) {
      nextButtonRef.current.classList.add("sw-button-disabled");
    } else {
      nextButtonRef.current.classList.remove("sw-button-disabled");
    }
  };

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await getTestimonialList();
        if (response.success && response.data) {
          setTestimonials(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    // Wait for Swiper to be available (loaded via script tag) and testimonials to be loaded
    if (loading || testimonials.length === 0) {
      // Clean up existing swiper if testimonials are cleared
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
        swiperInstanceRef.current = null;
      }
      return;
    }

    // Destroy existing swiper instance if it exists
    if (swiperInstanceRef.current) {
      swiperInstanceRef.current.destroy(true, true);
      swiperInstanceRef.current = null;
    }

    let retryCount = 0;
    const maxRetries = 50; // 5 seconds max wait

    const initSwiper = () => {
      const SwiperClass =
        typeof window !== "undefined" ? window.Swiper : undefined;

      if (SwiperClass && swiperRef.current && !swiperInstanceRef.current) {
        const swiperContainer = swiperRef.current.querySelector(".sw-single");
        if (swiperContainer) {
          const prevButton = swiperRef.current.querySelector(".sw-single-prev");
          const nextButton = swiperRef.current.querySelector(".sw-single-next");

          if (prevButton) prevButtonRef.current = prevButton;
          if (nextButton) nextButtonRef.current = nextButton;

          swiperInstanceRef.current = new SwiperClass(swiperContainer, {
            slidesPerView: 1,
            loop: false,
            spaceBetween: 15,
            speed: 800,
            autoplay: {
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            },
            navigation: {
              nextEl: nextButton,
              prevEl: prevButton,
              clickable: true,
            },
            on: {
              init: function () {
                updateButtonStates(this);
              },
              slideChange: function () {
                updateButtonStates(this);
              },
            },
          });

          // Initial button state
          updateButtonStates(swiperInstanceRef.current);
        }
      } else if (!SwiperClass && retryCount < maxRetries) {
        // Retry after a short delay if Swiper isn't loaded yet
        retryCount++;
        setTimeout(initSwiper, 100);
      }
    };

    // Start initialization
    initSwiper();

    // Cleanup on unmount
    return () => {
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
        swiperInstanceRef.current = null;
      }
    };
  }, [loading, testimonials]);

  return (
    <div
      id="testimonial"
      className="section-testimonial section spacing-1"
      ref={swiperRef}
    >
      <div className="heading-section mb_43">
        <div className="tag-heading text-uppercase text-label font-3 letter-spacing-1 mb_30">
          testimonials
        </div>
        <h3 className="text_white fw-5  split-text effect-blur-fade">
          Trusted By Clients
        </h3>
      </div>
      {loading || testimonials.length === 0 ? (
        <div className="swiper sw-single">
          <div className="swiper-wrapper"></div>
        </div>
      ) : (
        <div className="swiper sw-single">
          <div className="swiper-wrapper">
            {testimonials.map((t) => (
              <div className="swiper-slide" key={t.id}>
                <div className="testimonial-item area-effect">
                  <div className="icon">
                    <i className="icon-quote"></i>
                  </div>
                  <p className="text-body-2 text_white mb_21">{t.quote}</p>
                  <div className="athor">
                    <h5 className="name text_white mb_4 font-4">
                      <a href="#" className="link">
                        {t.name}
                      </a>
                    </h5>
                    <span className="text-label text-uppercase text_primary-color font-3">
                      {t.title}
                    </span>
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
          <div className="wrap-sw-button d-flex gap_12 ">
            <div className="sw-button sw-single-prev ">
              <i className="icon-CaretLeft"></i>
            </div>
            <div className="sw-button sw-single-next ">
              <i className="icon-CaretRight"></i>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionTestimonial;
