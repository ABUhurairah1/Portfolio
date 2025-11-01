import React, { useState, useEffect, useRef, useCallback } from "react";
import smallCometPng from "../../assets/images/item/small-comet.png";
import portfolio1 from "../../assets/images/user/portfolio-item-1.webp";
import portfolio2 from "../../assets/images/user/portfolio-item-2.webp";
import portfolio3 from "../../assets/images/user/portfolio-item-3.webp";
import portfolio4 from "../../assets/images/user/portfolio-item-4.webp";
import { Button } from "./index.js";

// Text formatter component for bold (**text**) and lists
const FormattedText = ({ text, className = "" }) => {
  if (!text) return null;

  const formatText = (content) => {
    const lines = content.split("\n");
    const elements = [];
    let processedLines = new Set();

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      if (processedLines.has(lineIndex)) continue;

      const trimmedLine = lines[lineIndex].trim();

      // Check if it's a list item (starts with -, *, or number)
      if (trimmedLine.match(/^[-*]\s/) || trimmedLine.match(/^\d+\.\s/)) {
        const currentListItems = [];
        const currentListType = trimmedLine.match(/^\d+\.\s/) ? "ol" : "ul";

        // Collect consecutive list items of the same type
        for (let i = lineIndex; i < lines.length; i++) {
          const trimmed = lines[i].trim();
          const isNumbered = trimmed.match(/^\d+\.\s/);
          const isBulleted = trimmed.match(/^[-*]\s/);

          if (isNumbered || isBulleted) {
            const type = isNumbered ? "ol" : "ul";
            if (type === currentListType) {
              const itemText = trimmed
                .replace(/^[-*]\s/, "")
                .replace(/^\d+\.\s/, "");
              currentListItems.push(formatBoldText(itemText));
              processedLines.add(i);
            } else {
              break;
            }
          } else if (trimmed === "") {
            processedLines.add(i);
            continue;
          } else {
            break;
          }
        }

        // Render the list
        if (currentListItems.length > 0) {
          if (currentListType === "ol") {
            elements.push(
              <ol
                key={`list-${lineIndex}`}
                className="portfolio-formatted-list portfolio-numbered-list"
              >
                {currentListItems.map((item, itemIdx) => (
                  <li key={itemIdx}>{item}</li>
                ))}
              </ol>
            );
          } else {
            elements.push(
              <ul
                key={`list-${lineIndex}`}
                className="portfolio-formatted-list portfolio-bulleted-list"
              >
                {currentListItems.map((item, itemIdx) => (
                  <li key={itemIdx}>{item}</li>
                ))}
              </ul>
            );
          }
        }
      } else if (trimmedLine === "") {
        // Empty line
        elements.push(<br key={`br-${lineIndex}`} />);
      } else {
        // Regular text with bold formatting
        elements.push(
          <React.Fragment key={`text-${lineIndex}`}>
            {formatBoldText(trimmedLine)}
            {lineIndex < lines.length - 1 && <br />}
          </React.Fragment>
        );
      }
    }

    return elements;
  };

  const formatBoldText = (text) => {
    const parts = [];
    const boldRegex = /\*\*(.+?)\*\*/g;
    let lastIndex = 0;
    let match;

    while ((match = boldRegex.exec(text)) !== null) {
      // Add text before the bold
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      // Add bold text
      parts.push(<strong key={`bold-${match.index}`}>{match[1]}</strong>);
      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  const formattedContent = formatText(text);

  return <div className={className}>{formattedContent}</div>;
};

const items = [
  {
    id: 1,
    img: portfolio1,
    images: [portfolio1, portfolio2, portfolio3],
    tag: "Conversational AI",
    title: "AI-Powered Chatbot",
    subtitle: "Advanced Natural Language Processing",
    desc: "Built a sophisticated chatbot leveraging NLP and deep learning.",
    paragraphs: [
      {
        title: "Overview",
        content:
          "This project represents a breakthrough in conversational AI, combining state-of-the-art natural language processing techniques with deep learning architectures to create an intelligent chatbot system.",
      },
      {
        title: "Technical Architecture",
        content:
          "The system utilizes transformer-based models for understanding context and generating human-like responses. It supports multiple languages and can handle complex multi-turn conversations while maintaining context throughout the interaction.",
      },
      {
        title: "Key Features",
        content:
          "Key features include:\n- **Sentiment analysis** for understanding user emotions\n- **Intent recognition** for accurate request handling\n- **Dynamic response generation** for natural conversations\n\nThe architecture is designed for **scalability**, handling thousands of concurrent users with minimal latency.",
      },
      {
        title: "Results & Impact",
        content:
          "Implementation involved fine-tuning pre-trained language models on domain-specific data, resulting in a 40% improvement in user satisfaction scores compared to rule-based systems.",
      },
    ],
    href: "#",
  },
  {
    id: 2,
    img: portfolio2,
    images: [portfolio2, portfolio1, portfolio4, portfolio3],
    tag: "Computer Vision",
    title: "Real-Time Object Detection",
    subtitle: "Edge Computing Solution",
    desc: "Deployed a live CV pipeline on edge devices for fast recognition.",
    paragraphs: [
      {
        title: "Project Description",
        content:
          "This computer vision system enables real-time object detection on resource-constrained edge devices, making advanced AI capabilities accessible without cloud dependency.",
      },
      {
        title: "Technology Stack",
        content:
          "The solution uses optimized YOLO architecture adapted for mobile and IoT devices, achieving 30 FPS on embedded hardware while maintaining high accuracy.",
      },
      {
        title: "Deployment & Applications",
        content:
          "The system has been deployed across multiple use cases including retail analytics, security monitoring, and industrial automation, demonstrating robust performance in various lighting and environmental conditions.",
      },
      {
        title: "Optimization Techniques",
        content:
          "Advanced techniques like model quantization and knowledge distillation were employed to reduce model size by 75% while preserving detection accuracy above 92%.",
      },
    ],
    href: "#",
  },
  {
    id: 3,
    img: portfolio3,
    images: [portfolio3, portfolio1, portfolio2],
    tag: "Predictive Analytics",
    title: "Sales Forecast Dashboard",
    subtitle: "ML-Powered Business Intelligence",
    desc: "Forecasted large-scale KPIs for 300+ clients using ML.",
    paragraphs: [
      {
        title: "Platform Overview",
        content:
          "A comprehensive sales forecasting platform that leverages machine learning to predict future sales trends and help businesses make data-driven decisions.",
      },
      {
        title: "Data Processing & Analysis",
        content:
          "The system processes historical sales data, market trends, seasonal patterns, and external factors to generate accurate forecasts with confidence intervals.",
      },
      {
        title: "Client Success",
        content:
          "Serving over 300 clients across different industries, the platform has demonstrated a 85% accuracy rate in monthly forecasts, helping businesses optimize inventory and resource allocation.",
      },
      {
        title: "Dashboard Features",
        content:
          "The dashboard provides intuitive visualizations, customizable reports, and real-time alerts for significant deviations from predicted values, enabling proactive business management.",
      },
    ],
    href: "#",
  },
  {
    id: 4,
    img: portfolio4,
    images: [portfolio4, portfolio2, portfolio3, portfolio1],
    tag: "Resume Pro",
    title: "Resume ZenG pro",
    subtitle: "AI-Enhanced Resume Builder",
    desc: "A resume builder featuring AI suggestions and formatting.",
    paragraphs: [
      {
        title: "Platform Introduction",
        content:
          "Resume ZenG Pro is an intelligent resume building platform that combines professional design templates with AI-powered content suggestions and optimization.",
      },
      {
        title: "AI-Powered Features",
        content:
          "The platform analyzes job descriptions and user profiles to provide tailored suggestions for improving resume content, ensuring alignment with industry standards and ATS compatibility.",
      },
      {
        title: "Core Functionality",
        content:
          "Features include real-time formatting assistance, keyword optimization, skills gap analysis, and multiple export formats (PDF, Word, HTML).",
      },
      {
        title: "Measured Impact",
        content:
          "User testing revealed a 60% increase in interview callbacks when using AI-suggested improvements, validating the platform's effectiveness in helping job seekers stand out in competitive markets.",
      },
    ],
    href: "#",
  },
];

const PortfolioModal = ({ item, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageScrollRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);

  const resetAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
    if (item.images && item.images.length > 1) {
      autoScrollIntervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
      }, 3000);
    }
  }, [item.images]);

  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
      resetAutoScroll();
    }

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [isOpen, resetAutoScroll]);

  useEffect(() => {
    if (imageScrollRef.current && item.images && item.images.length > 0) {
      const scrollContainer = imageScrollRef.current;
      const imageWidth = scrollContainer.clientWidth;
      scrollContainer.scrollTo({
        left: imageWidth * currentImageIndex,
        behavior: "smooth",
      });
    }
  }, [currentImageIndex, item.images]);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    resetAutoScroll();
  };

  const handleManualScroll = (e) => {
    const scrollContainer = e.target;
    const imageWidth = scrollContainer.clientWidth;
    const scrollIndex = Math.round(scrollContainer.scrollLeft / imageWidth);
    if (scrollIndex !== currentImageIndex) {
      setCurrentImageIndex(scrollIndex);
      resetAutoScroll();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="overlay-popup show" onClick={onClose}></div>
      <div className="portfolio-modal">
        <div className="portfolio-modal-header">
          <div className="portfolio-modal-header-left">
            <div className="tag font-3 text-label text-uppercase fw-6 letter-spacing-1">
              {item.tag}
            </div>
          </div>
          <div className="portfolio-modal-header-right">
            <Button
              variant="style-1"
              animate
              href={item.href}
              className="portfolio-modal-visit-btn"
            >
              Visit Now
            </Button>
            <button className="close-menu" onClick={onClose}>
              &times;
            </button>
          </div>
        </div>
        <div className="portfolio-modal-content">
          <div
            className="portfolio-modal-images"
            ref={imageScrollRef}
            onScroll={handleManualScroll}
          >
            {item.images.map((img, index) => (
              <div
                key={index}
                className={`portfolio-modal-image-wrapper ${
                  index === currentImageIndex ? "active" : ""
                }`}
                onClick={() => handleImageClick(index)}
              >
                <img
                  decoding="async"
                  loading="lazy"
                  src={img}
                  alt={`${item.title} - Image ${index + 1}`}
                  className="portfolio-modal-image"
                />
              </div>
            ))}
          </div>
          {item.images.length > 1 && (
            <div className="portfolio-modal-indicators">
              {item.images.map((_, index) => (
                <button
                  key={index}
                  className={`portfolio-modal-indicator ${
                    index === currentImageIndex ? "active" : ""
                  }`}
                  onClick={() => handleImageClick(index)}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          )}
          <div className="portfolio-modal-body">
            {item.subtitle && (
              <h4 className="text_white font-4 mb_8">{item.subtitle}</h4>
            )}
            <h3 className="title font-4 text_white mb_16">{item.title}</h3>
            <p className="text-body-2 text_white mb_16">{item.desc}</p>
            {item.paragraphs && item.paragraphs.length > 0 && (
              <div className="portfolio-modal-paragraphs">
                {item.paragraphs.map((para, index) => {
                  const paragraphContent =
                    typeof para === "string" ? para : para.content;
                  const paragraphTitle =
                    typeof para === "object" && para.title ? para.title : null;
                  return (
                    <div
                      key={index}
                      className="portfolio-modal-paragraph-item mb_24"
                    >
                      {paragraphTitle && (
                        <h5 className="text_white font-4 mb_8 portfolio-paragraph-title">
                          {paragraphTitle}
                        </h5>
                      )}
                      <FormattedText
                        text={paragraphContent}
                        className="text-body-2 text_white mb_16 portfolio-formatted-text"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const SectionPortfolio = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isModalOpen]);

  return (
    <>
      <div
        id="portfolio"
        className="section-portfolio spacing-1 stack-element section"
      >
        <div className="heading-section mb_42">
          <div className="tag-heading text-uppercase text-label font-3 letter-spacing-1 mb_34">
            Portfolio
          </div>
          <h3 className="text_white fw-5  split-text effect-blur-fade">
            Featured Projects
          </h3>
        </div>
        <div className="tabs-content-wrap">
          {items.map((item) => (
            <div className="portfolio-item element" key={item.id}>
              <a
                href="#"
                className="img-style"
                onClick={(e) => {
                  e.preventDefault();
                  handleItemClick(item);
                }}
              >
                <img
                  decoding="async"
                  loading="lazy"
                  src={item.img}
                  width="690"
                  height="388"
                  alt="portfolio"
                />
                <div className="tag font-3 text-label text-uppercase fw-6 letter-spacing-1">
                  {item.tag}
                </div>
              </a>
              <h5 className=" title font-4 text_white">
                <a
                  href="#"
                  className="link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleItemClick(item);
                  }}
                >
                  {item.title}
                </a>
              </h5>
              <p className="text-body-2 text_white mb_4">{item.desc}</p>
              <div className="item-shape">
                <img src={smallCometPng} alt="item" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedItem && (
        <PortfolioModal
          item={selectedItem}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default SectionPortfolio;
