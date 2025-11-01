import React, { useState, useEffect, useRef } from "react";
// Import all background videos
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
import Header from "./Header.jsx";

const VIDEO_KEY = "selectedBackgroundVideo";

// Video mapping
const videoMap = {
  video1,
  video2,
  video3,
  video4,
  video5,
  video6,
  video7,
  video8,
  video9,
  video10,
  video11,
};

const Layout = ({ children }) => {
  const [currentVideo, setCurrentVideo] = useState(video2); // Default video
  const videoRef = useRef(null);

  // Load video from localStorage on mount
  useEffect(() => {
    const storedVideoId = localStorage.getItem(VIDEO_KEY);
    if (storedVideoId && videoMap[storedVideoId]) {
      setCurrentVideo(videoMap[storedVideoId]);
    }

    // Listen for video change events from theme panel
    const handleVideoChange = (event) => {
      const videoId = event.detail;
      if (videoMap[videoId]) {
        setCurrentVideo(videoMap[videoId]);
      }
    };

    window.addEventListener("backgroundVideoChanged", handleVideoChange);

    return () => {
      window.removeEventListener("backgroundVideoChanged", handleVideoChange);
    };
  }, []);

  // Update video source when currentVideo changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [currentVideo]);

  return (
    <div id="wrapper" className="bg_dark counter-scroll">
      <video
        ref={videoRef}
        className="body-overlay"
        muted
        autoPlay
        loop
        playsInline
      >
        <source src={currentVideo} type="video/mp4" />
      </video>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
