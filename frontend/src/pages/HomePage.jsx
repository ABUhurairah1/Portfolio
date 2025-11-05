import React, { useState, useEffect, useCallback, useRef } from "react";
import { FaComments } from "react-icons/fa6";
import { Layout, Header, HeaderSidebar } from "../components/layout";
import {
  SidebarProfile,
  SectionAbout,
  SectionResume,
  SectionServices,
  SectionPortfolio,
  SectionTestimonial,
  SectionPricing,
  SectionPartners,
  SectionContact,
  SidebarThemePanel,
  ChatPopup,
} from "../components/common";
import footerLogoImg from "../assets/images/logo/footer-logo.png";

const FooterLogo = () => (
  <div className="footer-logo footer-container text-center ">
    <img src={footerLogoImg} width="755" height="295" alt="footer" />
  </div>
);

const RightBar = ({ onShowTheme }) => (
  <div className="right-bar style-1 d-flex flex-column align-items-center">
    <ul className="list-icon menu-option d-flex flex-column gap_8">
      <li>
        <div className="toggle-switch-mode">
          <i className="icon-Sun"></i>
        </div>
      </li>
      <li>
        <a
          href="#"
          className="link-no-action"
          onClick={(e) => {
            e.preventDefault();
            onShowTheme();
          }}
        >
          <i className="icon-GearSix"></i>
        </a>
      </li>
    </ul>
  </div>
);

// Fixed chat button - always visible
const FixedChatButton = ({ onShowChat }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const hideTimerRef = useRef(null);

  useEffect(() => {
    // Show tooltip after 3 seconds
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true);
      
      // Auto-hide tooltip after 8 seconds
      hideTimerRef.current = setTimeout(() => {
        setShowTooltip(false);
      }, 8000);
    }, 3000);

    return () => {
      clearTimeout(tooltipTimer);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setShowTooltip(false); // Hide tooltip when clicked
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    onShowChat();
  };

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 1000 }}>
      {showTooltip && (
        <div
          className="chat-tooltip"
          style={{
            position: 'absolute',
            bottom: '80px',
            right: '0',
            background: 'var(--Bg-linear-2)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            padding: '12px 20px',
            color: 'var(--Text-light)',
            fontSize: '14px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(10px)',
            animation: 'fadeInBounce 0.5s ease',
            pointerEvents: 'none',
          }}
        >
          Chat with me
          <div
            style={{
              position: 'absolute',
              bottom: '-8px',
              right: '20px',
              width: '0',
              height: '0',
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid rgba(255, 255, 255, 0.2)',
            }}
          />
        </div>
      )}
      <button
        className="fixed-chat-button"
        onClick={handleClick}
        aria-label="Open chat"
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'var(--Bg-linear-2)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s ease',
          color: 'var(--Text-light)',
          fontSize: '24px',
          padding: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 12px 48px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
          setShowTooltip(false);
          if (hideTimerRef.current) {
            clearTimeout(hideTimerRef.current);
            hideTimerRef.current = null;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
        }}
      >
        <FaComments />
      </button>
      <style>{`
        @keyframes fadeInBounce {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          50% {
            transform: translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fixed-chat-button:hover {
          background: var(--Primary);
          color: var(--Text-primary);
        }
        @media (max-width: 767px) {
          .fixed-chat-button {
            width: 50px !important;
            height: 50px !important;
          }
          .chat-tooltip {
            bottom: 70px !important;
            font-size: 12px !important;
            padding: 10px 16px !important;
          }
        }
      `}</style>
    </div>
  );
};

const HomePage = () => {
  const [showThemePanel, setShowThemePanel] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatInitialMessage, setChatInitialMessage] = useState(null);
  const [chatUserEmail, setChatUserEmail] = useState(null);

  const handleShowTheme = () => {
    setShowThemePanel(true);
  };
  const handleClosePanels = () => {
    setShowThemePanel(false);
  };

  const handleShowChat = useCallback(
    (initialMessage = null, userEmail = null) => {
      setChatInitialMessage(initialMessage);
      setChatUserEmail(userEmail);
      setShowChat(true);
    },
    []
  );

  const handleCloseChat = () => {
    setShowChat(false);
    setChatInitialMessage(null);
    setChatUserEmail(null);
  };

  // Expose handleShowChat globally so SectionContact can trigger it
  useEffect(() => {
    window.openChatPopup = handleShowChat;
    return () => {
      delete window.openChatPopup;
    };
  }, [handleShowChat]);

  return (
    <>
      <Header />
      <SidebarThemePanel show={showThemePanel} onClose={handleClosePanels} />
      <Layout>
        <div className="tf-container w-2">
          <div className="row">
            <div className="offset-xxl-4 col-xxl-7 offset-xl-4 col-xl-7 ">
              <div className="main-content section-onepage">
                <HeaderSidebar />
                <SidebarProfile />
                <SectionAbout />
                <SectionResume />
                <SectionServices />
                <SectionPortfolio />
                <SectionTestimonial />
                <SectionPricing />
                <SectionPartners />
                <SectionContact />
              </div>
              <FooterLogo />
            </div>
          </div>
          <RightBar onShowTheme={handleShowTheme} />
        </div>
      </Layout>
      <FixedChatButton onShowChat={handleShowChat} />
      <ChatPopup
        isOpen={showChat}
        onClose={handleCloseChat}
        initialMessage={chatInitialMessage}
        userEmail={chatUserEmail}
      />
    </>
  );
};

export default HomePage;
