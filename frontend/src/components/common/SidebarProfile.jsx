import React, { useState, useEffect } from "react";
import avatarImage from "../../assets/images/user/avatar.webp";
import smallCometPng from "../../assets/images/item/small-comet.png";
import { Button } from "./index.js";
import { getAboutList, getSocialMediaList } from "../../apis";

const SidebarProfile = () => {
  const [aboutData, setAboutData] = useState(null);
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutResponse, socialResponse] = await Promise.all([
          getAboutList(),
          getSocialMediaList(),
        ]);

        if (aboutResponse.success && aboutResponse.data) {
          setAboutData(aboutResponse.data);
        }

        if (socialResponse.success && socialResponse.data) {
          setSocialMediaLinks(socialResponse.data);
        }
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="user-bar text-center">
        <div className="box-author mb_12">
          <div className="img-style mb_16">
            <img
              decoding="async"
              loading="lazy"
              src={avatarImage}
              width="314"
              height="314"
              alt="feature post"
            />
          </div>
        </div>
      </div>
    );
  }

  const cvUrl = aboutData?.cv;
  const email = aboutData?.email || "#";
  const name = aboutData?.name || "User";
  const title = aboutData?.title || "Developer";

  return (
    <div className="user-bar text-center">
      <div className="box-author mb_12">
        <div className="img-style mb_16">
          <img
            decoding="async"
            loading="lazy"
            src={avatarImage}
            width="314"
            height="314"
            alt="feature post"
          />
        </div>
        <div className="info">
          <div className="name font-2 text_white mb_8">{name}</div>
          <div className="text-label text-uppercase fw-6 text_primary-color font-3 mb_16 letter-spacing-1">
            {title}
          </div>
          <a
            href={`mailto:${email}`}
            className="hover-underline-link text_white text-body-2 mb_4"
          >
            {email}
          </a>
          {aboutData?.location && (
            <p className="text-caption-2 text_secondary-color font-3">
              Based in {aboutData.location}
            </p>
          )}
        </div>
      </div>
      {socialMediaLinks.length > 0 && (
        <ul className="list-icon d-flex justify-content-center mb_28">
          {socialMediaLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={link.icon_class || `icon-${link.platform}`}
                aria-label={link.platform}
              ></a>
            </li>
          ))}
        </ul>
      )}
      {cvUrl && (
        <Button
          className="mb_20"
          fullWidth
          variant="style-border"
          href={cvUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="bg_btn"></span>
          <span className="title">
            <i className="icon-ReadCvLogo"></i>View My CV
          </span>
          <span className="effect-shine"></span>
        </Button>
      )}
      <Button href="#contact" fullWidth variant="style-1" animate>
        <i className="icon-EnvelopeSimple"></i>
        <span>Contact Me</span>
      </Button>
      <div className="item-shape">
        <img src={smallCometPng} alt="item" />
      </div>
    </div>
  );
};

export default SidebarProfile;
