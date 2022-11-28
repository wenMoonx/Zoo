import { Container, Row, Col } from "react-bootstrap";
import React from "react";
import twitterImg from "./twitter.png";
import telegramImg from "./telegram.png";
import discordImg from "./discord.png";
import mediumImg from "./medium.png";
import "./footer.css";

const Footer = (props) => {
  return (
    <Container fluid className="footer">
      <Row className="justify-content-center">
        <Col>
          <div className="social-media">
            <a href="/">
              <img src={twitterImg} alt="twitter" />
            </a>
            <a href="https://www.telegram.com">
              <img src={telegramImg} alt="telegram" />
            </a>
            <a href="/">
              <img src={discordImg} alt="discord" />
            </a>
            <a href="/">
              <img src={mediumImg} alt="medium" />
            </a>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="footer-text">© 2022 Crazy Zoo. All rights reserved.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
