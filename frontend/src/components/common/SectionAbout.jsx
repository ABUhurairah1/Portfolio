import React, { useState, useEffect, useRef } from "react";
import smallCometWebp from "../../assets/images/item/small-comet.webp";
import { getAboutList } from "../../apis";

const SectionAbout = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const animationRef = useRef(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await getAboutList();
        if (response.success && response.data) {
          setAboutData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch about data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Animation functions (from textanimation.js)
  const switchWord = React.useCallback(($oldWord, $newWord) => {
    $oldWord.removeClass("is-visible").addClass("is-hidden");
    $newWord.removeClass("is-hidden").addClass("is-visible");
  }, []);

  const takeNext = React.useCallback(($word) => {
    return !$word.is(":last-child")
      ? $word.next()
      : $word.parent().children().eq(0);
  }, []);

  const showWord = React.useCallback(($word) => {
    const revealDuration = 600;
    
    $word
      .parents(".cd-words-wrapper")
      .animate({ width: $word.width() + 10 }, revealDuration);
  }, []);

  const hideWord = React.useCallback(($word) => {
    const nextWord = takeNext($word);
    const revealDuration = 600;
    const animationDelay = 2500;

    $word
      .parents(".cd-words-wrapper")
      .animate({ width: "2px" }, revealDuration, function () {
        switchWord($word, nextWord);
        showWord(nextWord);
      });

    setTimeout(function () {
      hideWord(nextWord);
    }, animationDelay);
  }, [takeNext, switchWord, showWord]);

  // Re-initialize animation when data loads
  useEffect(() => {
    if (!aboutData || loading) return;

    // Wait for DOM to update
    const timeoutId = setTimeout(() => {
      if (typeof window !== "undefined" && window.jQuery && animationRef.current) {
        const $ = window.jQuery;
        
        // Re-run the animation initialization for this specific element
        const $headline = $(animationRef.current);
        
        if ($headline.length > 0 && $headline.hasClass("clip")) {
          // Set up the animation for clip effect
          const spanWrapper = $headline.find(".cd-words-wrapper");
          if (spanWrapper.length > 0) {
            // Find the widest word
            const words = spanWrapper.find(".item-text");
            let maxWidth = 0;
            words.each(function () {
              const wordWidth = $(this).width();
              if (wordWidth > maxWidth) maxWidth = wordWidth;
            });
            
            if (maxWidth > 0) {
              spanWrapper.css("width", maxWidth + 10);
              
              // Trigger animation
              const animationDelay = 2500;
              setTimeout(function () {
                const $firstVisible = spanWrapper.find(".is-visible").eq(0);
                if ($firstVisible.length > 0) {
                  hideWord($firstVisible);
                }
              }, animationDelay);
            }
          }
        }
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [aboutData, loading, hideWord]);

  // Helper function to format number for odometer
  const formatNumber = (num) => {
    if (num >= 1000) {
      return { value: Math.floor(num / 1000), suffix: "k", plus: true };
    }
    return { value: num, suffix: "", plus: true };
  };

  if (loading) {
    return (
      <div id="about" className="section-about section spacing-1">
        <div className="heading-section mb_45">
          <div className="tag-heading text-uppercase text-label font-3 letter-spacing-1 mb_32">
            About
          </div>
        </div>
      </div>
    );
  }

  if (!aboutData) {
    return null;
  }

  const rotatingTitles = aboutData.rotating_titles || [];
  const yearsExp = parseFloat(aboutData.years_experience) || 0;
  const satisfiedClients = parseInt(aboutData.satisfied_clients) || 0;
  const projectsCompleted = parseInt(aboutData.projects_completed) || 0;
  const projectsFormatted = formatNumber(projectsCompleted);

  return (
    <div id="about" className="section-about section spacing-1">
      <div className="heading-section mb_45">
        <div className="tag-heading text-uppercase text-label font-3 letter-spacing-1 mb_32">
          About
        </div>
        <div className="title-border-shape">
          <h4 ref={animationRef} className="animationtext clip">
            Hello! I'm{" "}
            <span className="tf-text s1 cd-words-wrapper text_primary-color">
              {rotatingTitles.length > 0 ? (
                rotatingTitles.map((title, index) => (
                  <span
                    key={index}
                    className={`item-text ${index === 0 ? "is-visible" : "is-hidden"}`}
                  >
                    {title}
                  </span>
                ))
              ) : (
                <span className="item-text is-visible">{aboutData.title || "Developer"}</span>
              )}
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
        {aboutData.main_title || "Empower Code Intelligence"}
      </h1>
      <p className="text_muted-color font-3 mb_43 split-text split-lines-transform">
        {aboutData.description || ""}
      </p>
      <div className="wrap-counter tf-grid-layout md-col-3">
        <div className="counter-item bs-light-mode">
          <div className="counter-number h2 text_white mb_7">
            <div className="odometer" data-number={yearsExp}>
              {yearsExp}
            </div>
            <span className="sub">+</span>
          </div>
          <p className="text-body-1 text_muted-color font-3">
            Years Experience
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
            <div className="odometer" data-number={satisfiedClients}>
              {satisfiedClients}
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
            <div className="odometer" data-number={projectsFormatted.value}>
              {projectsFormatted.value}
            </div>
            {projectsFormatted.suffix && <span className="sub">{projectsFormatted.suffix}</span>}
            {projectsFormatted.plus && <span className="sub">+</span>}
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
};

export default SectionAbout;
