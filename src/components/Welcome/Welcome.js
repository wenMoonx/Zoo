import React from "react";
import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./welcome.css";
import WalletConnect from "../WalletConnect";
import { Web3ModalContext } from "contexts/Web3ModalProvider";
import PSWindow from "components/PSWindow/PSWindow";
import Header from "components/Header/Header";
import frame5 from "./Frame1(iPhone).png";
import frame6 from "./Frame2(iPhone).png";

const Welcome = (props) => {
  const { account } = useContext(Web3ModalContext);
  return (
    <>
      <Container className="">
        <Row>
          <Col>
            {!account ? (
              <>
                <img src={frame5} alt="frame5" className="frame5" />
                <img src={frame6} alt="frame6" className="frame6" />
                <div className="welcome-panel">
                  <Container>
                    <Row className="justify-content-center">
                      <h1 className="welcome-title">
                        Welcome to Crazy Zoo Private Sale!
                      </h1>
                    </Row>
                    <Row className="justify-content-center">
                      <p className="welcome-explanation">
                        To proceed futher connect your wallet and get start!
                      </p>
                    </Row>
                    <WalletConnect />
                  </Container>
                </div>
              </>
            ) : (
              <>
                <Header />
                <PSWindow />
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Welcome;
