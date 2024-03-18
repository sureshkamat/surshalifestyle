import React from "react";
import "./about.css";

import { Button,Typography,Avatar } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from '@mui/icons-material/Language';
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/dkaamat";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://sureshkamat.github.io/public_html/assets/ImagesProfile/sureshkamatbg.png"
              alt="Founder"
            />
            <Typography>Suresh Kamat</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @sureshkamat. Only with the
              purpose to teach MERN Stack            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Connect Here</Typography>
            

            <a href="https://instagram.com/dkaamat" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
            <a href="https://github.com/sureshkamat" target="blank">
              <GitHubIcon className="youtubeSvgIcon" />
            </a>
            <a href="https://www.linkedin.com/in/suresh-k-69588a107/" target="blank">
              <LinkedInIcon className="linkedinSvgIcon" />
            </a>
            <a href="https://sureshkamat.github.io/" target="blank">
              <LanguageIcon className="webSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;