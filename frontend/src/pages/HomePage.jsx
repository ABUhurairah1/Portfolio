import React, { useState, useEffect, useCallback } from "react";
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

const RightBar = ({ onShowTheme, onShowChat }) => (
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
      <li>
        <a
          href="#"
          className="link-no-action"
          onClick={(e) => {
            e.preventDefault();
            onShowChat();
          }}
        >
          <FaComments />
        </a>
      </li>
    </ul>
  </div>
);

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
          <RightBar onShowTheme={handleShowTheme} onShowChat={handleShowChat} />
        </div>
      </Layout>
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
