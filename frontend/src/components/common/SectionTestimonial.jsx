import React, { useEffect, useRef } from "react";
import smallCometWebp from "../../assets/images/item/small-comet.webp";
// avatars optional for now
const testimonials = [
  {
    id: 1,
    quote:
      "ZenG delivered exceptional work. He's professional, fast, and extremely easy to work with. I'd definitely hire him again for future projects!",
    name: "Lincoln Press",
    title: "CEO Themesfalt",
  },
  {
    id: 2,
    quote:
      "ZenG managed our project with impressive efficiency and clarity. Deadlines were met, communication was smooth, and the outcome was exactly what we hoped for.",
    name: "Cheyenne Mango",
    title: "CEO Themesfalt",
  },
  {
    id: 3,
    quote:
      "We were blown away by the project quality and turnaround time. Highly recommended for any high-end AI work.",
    name: "Morgan Stanford",
    title: "CTO FinTech Labs",
  },
  {
    id: 4,
    quote:
      "The best freelancer we ever worked with. Super organized and creative!",
    name: "Nikita Varga",
    title: "Product Manager BrightPath",
  },
];

const SectionTestimonial = () => {
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
    // Wait for Swiper to be available (loaded via script tag)
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
  }, []);

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
    </div>
  );
};

export default SectionTestimonial;
