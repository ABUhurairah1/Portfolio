import React, { useState, useEffect } from "react";
import smallCometPng from "../../assets/images/item/small-comet.png";
import { getSkillList } from "../../apis/skill";
import axiosInstance from "../../utils/axios";

// Uniform bubble size for all skills
const UNIFORM_BUBBLE_SIZE = 140;
const UNIFORM_PADDING = 20;
const UNIFORM_ICON_SIZE = 70;

// Helper function to get full image URL
const getImageUrl = (imageUrl) => {
  if (!imageUrl) return null;
  
  // If it's already a full URL (starts with http:// or https://)
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }
  
  // If it starts with /, it's a relative path from the API
  const baseURL = axiosInstance.defaults.baseURL || import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
  
  // Ensure proper path construction
  if (imageUrl.startsWith("/")) {
    return `${baseURL}${imageUrl}`;
  }
  
  // Otherwise, treat it as a relative path
  return `${baseURL}/${imageUrl}`;
};

const SectionPartners = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = React.useRef(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const response = await getSkillList();
        
        // Handle different response structures
        let skillsData = [];
        if (response) {
          if (response.success && response.data) {
            skillsData = Array.isArray(response.data) ? response.data : [];
          } else if (Array.isArray(response)) {
            skillsData = response;
          } else if (response.data && Array.isArray(response.data)) {
            skillsData = response.data;
          }
        }
        
        // Filter only active skills and sort by order
        const filteredSkills = skillsData
          .filter((skill) => skill.is_active !== false)
          .sort((a, b) => (a.order || 0) - (b.order || 0));

        // Use uniform size for all bubbles
        const sizeConfig = {
          size: UNIFORM_BUBBLE_SIZE,
          padding: UNIFORM_PADDING,
          iconSize: UNIFORM_ICON_SIZE,
        };

        // Generate grid positions after container is available
        const activeSkills = filteredSkills.map((skill, index) => {
          return {
            ...skill,
            className: `item-${index + 1}`,
            sizeConfig: sizeConfig,
            imageUrl: (skill.image || skill.icon) ? getImageUrl(skill.image || skill.icon) : null,
          };
        });
        
        setSkills(activeSkills);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
        setSkills([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Generate straight grid positions based on container size
  const generateGridPositions = (count) => {
    if (!containerRef.current) return [];
    
    const container = containerRef.current;
    const containerWidth = container.offsetWidth || 1200;
    const containerHeight = container.offsetHeight || 600;
    const bubbleSize = UNIFORM_BUBBLE_SIZE;
    const spacing = 30; // Spacing between bubbles
    
    // Calculate number of columns based on container width
    const cols = Math.max(1, Math.floor((containerWidth - 80) / (bubbleSize + spacing)));
    const rows = Math.ceil(count / cols);
    
    // Calculate grid dimensions
    const totalGridWidth = cols * bubbleSize + (cols - 1) * spacing;
    const totalGridHeight = rows * bubbleSize + (rows - 1) * spacing;
    
    // Center the grid
    const startX = (containerWidth - totalGridWidth) / 2 + bubbleSize / 2;
    const startY = (containerHeight - totalGridHeight) / 2 + bubbleSize / 2;
    
    const positions = [];
    let skillIndex = 0;
    
    for (let row = 0; row < rows && skillIndex < count; row++) {
      for (let col = 0; col < cols && skillIndex < count; col++) {
        const x = startX + col * (bubbleSize + spacing);
        const y = startY + row * (bubbleSize + spacing);
        
        positions.push({
          left: `${x}px`,
          top: `${y}px`,
        });
        skillIndex++;
      }
    }
    
    return positions;
  };

  const [gridPositions, setGridPositions] = useState([]);

  // Update positions when container size changes or skills change
  useEffect(() => {
    if (skills.length > 0) {
      // Wait for container to be rendered and measured
      const timer = setTimeout(() => {
        if (containerRef.current) {
          const positions = generateGridPositions(skills.length);
          setGridPositions(positions);
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [skills]);

  // Recalculate positions on window resize
  useEffect(() => {
    const handleResize = () => {
      if (skills.length > 0 && containerRef.current) {
        const positions = generateGridPositions(skills.length);
        setGridPositions(positions);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [skills]);

  if (loading) {
    return (
      <div id="partners" className="section-partner section spacing-1">
        <div className="heading-section mb_44">
          <div className="tag-heading text-uppercase text-label font-3 letter-spacing-1 mb_32">
            Skills
          </div>
          <h3 className="text_white fw-5  split-text effect-blur-fade">
            Technologies & Frameworks
          </h3>
        </div>
      </div>
    );
  }

  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <div id="partners" className="section-partner section spacing-1">
      <div className="heading-section mb_44">
        <div className="tag-heading text-uppercase text-label font-3 letter-spacing-1 mb_32">
          Skills
        </div>
        <h3 className="text_white fw-5  split-text effect-blur-fade">
          Technologies & Frameworks
        </h3>
      </div>
      <div className="skills-bubbles-container">
        <div 
          ref={containerRef}
          className="wrap-partner" 
          style={{ 
            position: 'relative', 
            width: '100%', 
            minHeight: '600px',
            padding: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {skills.map((skill, index) => {
            const { size, padding, iconSize } = skill.sizeConfig;
            const position = gridPositions[index] || { left: '50%', top: '50%' };
            return (
              <div
                key={skill.id}
                className={`partner-item-bubble ${skill.className} scrolling-effect effectZoomIn skill-item`}
                style={{
                  position: 'absolute',
                  width: `${size}px`,
                  height: `${size}px`,
                  left: position.left,
                  top: position.top,
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '50%',
                  background: 'var(--Bg-linear-2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  zIndex: 1,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.15) translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 48px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.zIndex = '100';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(-50%, -50%)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.zIndex = '1';
                }}
              >
                {skill.imageUrl ? (
                  <img 
                    src={skill.imageUrl} 
                    alt={skill.name} 
                    className="skill-image-bubble"
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: `${iconSize}px`,
                      height: `${iconSize}px`,
                      maxWidth: `${iconSize}px`,
                      maxHeight: `${iconSize}px`,
                      minWidth: `${iconSize}px`,
                      minHeight: `${iconSize}px`,
                      objectFit: 'contain',
                      display: 'block',
                      transition: 'all 0.3s ease',
                      padding: `${padding}px`,
                      boxSizing: 'border-box',
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                      // Show fallback if image fails
                      const fallback = e.target.nextElementSibling;
                      if (fallback) {
                        fallback.style.display = "flex";
                      }
                    }}
                  />
                ) : null}
                <div
                  style={{
                    width: `${iconSize}px`,
                    height: `${iconSize}px`,
                    display: skill.imageUrl ? 'none' : 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: `${Math.min(iconSize * 0.5, 40)}px`,
                    opacity: 0.6,
                    position: 'absolute',
                  }}
                >
                  💻
                </div>
                <div className="skill-name-overlay">
                  <span className="skill-name">{skill.name}</span>
                </div>
                <div className="item-shape-bubble">
                  <img src={smallCometPng} alt="item" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        .skill-image-bubble {
          z-index: 2;
          position: relative;
        }
        .skill-image-bubble:hover {
          transform: rotate(25deg) scale(1.1);
          animation: heartbeat-strong 2s infinite;
        }
        .skill-item:hover .skill-name-overlay {
          opacity: 1;
          visibility: visible;
        }
        .skill-item:hover .skill-image-bubble {
          opacity: 0.8;
          filter: brightness(1.2);
        }
        .skill-name-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(17, 17, 17, 0.95);
          backdrop-filter: blur(10px);
          padding: 8px 16px;
          border-radius: 10px;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.4);
          max-width: calc(100% - 20px);
          word-break: keep-all;
        }
        .skill-name {
          font-size: 16px;
          font-weight: 600;
          color: var(--Text-light);
          font-family: "Inter", sans-serif;
          line-height: 1.2;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }
        @media (max-width: 991px) {
          .skill-name {
            font-size: 13px;
          }
          .skill-name-overlay {
            padding: 8px 14px;
            max-width: calc(100% - 10px);
          }
        }
        .item-shape-bubble {
          position: absolute;
          pointer-events: none;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
        }
        .skill-item:hover .item-shape-bubble {
          opacity: 1;
        }
        .item-shape-bubble img {
          position: absolute;
          min-width: 611px;
          height: 678px;
          top: -148%;
          left: -145px;
          transition: all 0.3s ease;
        }
        @media (max-width: 991px) {
          .partner-item-bubble {
            position: relative !important;
            margin: 10px;
            display: inline-flex !important;
          }
          .wrap-partner {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            min-height: unset !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SectionPartners;
