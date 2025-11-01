import React, { useState, useEffect } from "react";
// Background videos
import video1 from "../../assets/video/A-Glowing-Green-Energy-Sphere.mp4";
import video2 from "../../assets/video/Dark-Minimalist-Tech-Background-With-A-Digital.mp4";
import video3 from "../../assets/video/Digital-Particle-Wave-And-Lights.mp4";
import video4 from "../../assets/video/Dotted-waves-bounce.mp4";
import video5 from "../../assets/video/Dust-Dot-Particles.mp4";
import video6 from "../../assets/video/Particles-Slowly-Moving-In-Cyberspace.mp4";
import video7 from "../../assets/video/Plexus-Tech-Background-With-Glowing.mp4";
import video8 from "../../assets/video/Vecteezy-Abstract-Blue-Waves.mp4";
import video9 from "../../assets/video/Vibrant-Particle-Glow.mp4";
import video10 from "../../assets/video/video3.mp4";
import video11 from "../../assets/video/White-And-Black-Color-Particles-Wave-Cyber-Technology.mp4";

const COLOR_KEY = "selectedColorIndex";
const DARK_KEY = "darkMode";
const VIDEO_KEY = "selectedBackgroundVideo";
const colorCount = 8;

// Video list with names for display
const backgroundVideos = [
  { id: "video1", name: "Glowing Green Energy Sphere", src: video1 },
  { id: "video2", name: "Dark Minimalist Tech", src: video2 },
  { id: "video3", name: "Digital Particle Wave", src: video3 },
  { id: "video4", name: "Dotted Waves Bounce", src: video4 },
  { id: "video5", name: "Dust Dot Particles", src: video5 },
  { id: "video6", name: "Particles in Cyberspace", src: video6 },
  { id: "video7", name: "Plexus Tech Background", src: video7 },
  { id: "video8", name: "Abstract Blue Waves", src: video8 },
  { id: "video9", name: "Vibrant Particle Glow", src: video9 },
  { id: "video10", name: "Video 3", src: video10 },
  { id: "video11", name: "White & Black Particles", src: video11 },
];

const SidebarThemePanel = ({ show, onClose }) => {
  // state for current color index and mode
  const [colorIndex, setColorIndex] = useState(1); // 1-based for original theme
  const [isDark, setIsDark] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("video2"); // Default to video2 (Dark Minimalist Tech)

  // On mount, sync from localStorage and <body>
  useEffect(() => {
    if (!show) return;
    // Color
    const stored = localStorage.getItem(COLOR_KEY);
    let idx = stored ? parseInt(stored, 10) : 1;
    if (isNaN(idx)) idx = 1;
    setColorIndex(idx);
    document.body.setAttribute("data-color-primary", `color-primary-${idx}`);
    // Dark mode
    const darkStorage = localStorage.getItem(DARK_KEY);
    const bodyHasDark = document.body.classList.contains("dark-mode");
    let dark = false;
    if (darkStorage) {
      dark = darkStorage === "enabled";
    } else {
      dark = bodyHasDark;
    }
    setIsDark(dark);
    document.body.classList.toggle("dark-mode", dark);
    // Background video
    const storedVideo = localStorage.getItem(VIDEO_KEY);
    if (storedVideo && backgroundVideos.find((v) => v.id === storedVideo)) {
      setSelectedVideo(storedVideo);
    }
    // Dispatch custom event to update video in Layout
    window.dispatchEvent(
      new CustomEvent("backgroundVideoChanged", {
        detail: storedVideo || "video2",
      })
    );
  }, [show]);

  // Handle color click
  const handleColor = (idx) => {
    setColorIndex(idx);
    document.body.setAttribute("data-color-primary", `color-primary-${idx}`);
    localStorage.setItem(COLOR_KEY, idx);
  };

  // Handle dark mode toggle
  const handleToggleMode = () => {
    const dark = !isDark;
    setIsDark(dark);
    document.body.classList.toggle("dark-mode", dark);
    localStorage.setItem(DARK_KEY, dark ? "enabled" : "disabled");
  };

  // Handle video selection
  const handleVideoSelect = (videoId) => {
    setSelectedVideo(videoId);
    localStorage.setItem(VIDEO_KEY, videoId);
    // Dispatch custom event to update video in Layout
    window.dispatchEvent(
      new CustomEvent("backgroundVideoChanged", { detail: videoId })
    );
  };

  if (!show) return null;
  return (
    <div
      className="popup-setting offcanvas offcanvas-bottom show"
      style={{ zIndex: 9999, display: "block" }}
    >
      <div
        className="close-menu"
        tabIndex="0"
        role="button"
        aria-label="Close"
        onClick={onClose}
        style={{
          color: "#fff",
          fontSize: 28,
          position: "absolute",
          right: 15,
          top: 15,
          cursor: "pointer",
        }}
      >
        ✕
      </div>
      <div className="offcanvas-body ">
        <div className="wrap-features">
          <div className="feature-color tf-setting-color ">
            <h5 className="font-4 mb_29">Color</h5>
            <div className="settings-color list-choose">
              {Array.from({ length: colorCount }).map((_, i) => (
                <a
                  href="#;"
                  key={i}
                  className={`choose-item link-no-action${
                    colorIndex === i + 1 ? " active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleColor(i + 1);
                  }}
                ></a>
              ))}
            </div>
          </div>
          <span className="line"></span>
          <div className="features-background ">
            <h5 className="font-4 mb_19">Background Video</h5>
            <div
              className="d-flex flex-wrap wrap-feature-bg-item"
              style={{ gap: "12px" }}
            >
              {backgroundVideos.map((video) => (
                <div
                  key={video.id}
                  className="feature-bg-item"
                  style={{
                    position: "relative",
                    cursor: "pointer",
                    width: "80px",
                    height: "80px",
                    border:
                      selectedVideo === video.id
                        ? "3px solid #fff"
                        : "2px solid rgba(255,255,255,0.3)",
                    borderRadius: "50%",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    boxShadow:
                      selectedVideo === video.id
                        ? "0 0 15px rgba(255,255,255,0.5)"
                        : "none",
                  }}
                  onClick={() => handleVideoSelect(video.id)}
                  onMouseEnter={(e) => {
                    if (selectedVideo !== video.id) {
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.6)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedVideo !== video.id) {
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.3)";
                    }
                  }}
                  title={video.name}
                >
                  <video
                    src={video.src}
                    width="80"
                    height="80"
                    muted
                    autoPlay
                    loop
                    playsInline
                    style={{
                      objectFit: "cover",
                      pointerEvents: "none",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <span className="line"></span>
          {/* Dark/Light switch */}
          <div
            className="toggle-switch-mode"
            onClick={handleToggleMode}
            style={{ marginTop: "25px", cursor: "pointer" }}
          >
            <i className="icon-Sun" style={{ marginRight: 6 }}></i>
            <span className={isDark ? "active" : ""}>
              {isDark ? "Light Mode" : "Dark Mode"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarThemePanel;
