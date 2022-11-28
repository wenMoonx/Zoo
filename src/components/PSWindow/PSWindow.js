import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./PSWindow.css";
import { Web3WrapperContext } from "contexts/Web3WrapperProvider";
import CountdownTimer from "react-component-countdown-timer";
import ProgressBar from "react-bootstrap/ProgressBar";
import CButton from "../Button";
import { CopyButton, Flex, TextInput } from "@contentful/f36-components";
import { useRef, useContext } from "react";
import Swal from "sweetalert";
import {db} from '../../firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'

const Title = (props) => {
  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col className="ps-title ">
            <span className="title-txt">Private Sale starts in</span>
          </Col>
          <br />
          <br />
        </Row>
      </Container>
    </>
  );
};

const IncomingEdit = (props) => {
  return (
    <Container className="widget-container pb-3">
      <input
        disabled="true"
        type="edit"
        className="bnb-input"
        placeholder="Status"
        value={props.value}
      />
      <p className="income-label">Saled / {props.valueLeft} Left</p>
    </Container>
  );
};

const Widgets = (props) => {
  const [progressNow, setProgress] = useState(31);
  const amountRef = useRef(0.0);
  const referralAddress1 = useRef("");
  const referralAddress2 = useRef("");
  let [referralLinkValue, setLinkAddress] = useState("");
  const { web3Wrapper: wrapper } = useContext(Web3WrapperContext);
  const [pendingState, setPendingState] = useState(false);
  const [refLink, setRefLink] = useState("");
  const [status, setStatus] = useState(1);
  const REF = window.location.href.split("ref1=")[1]?.split("&ref2=");
  const BASE_REF_LINK =
    window.location.href.indexOf("?") >= 0
      ? window.location.href.substring(0, window.location.href.indexOf("?"))
      : window.location.href;
  const [totalSaledToken, setSaledTokenAmount] = useState(0);
  const totalPrivateSaleToken = 3000;

  useEffect(() => {
    const getSaledAmount = async () => {
      setSaledTokenAmount(await wrapper?.getTotalSaledToken());
      setStatus(await wrapper?.getUSDTApproval(amountRef.current.value) ? 2 : 1)
    };

    document.getElementsByClassName("css-en3na7")[0]?.remove();
    setRefLink(
      wrapper?.account
        ? BASE_REF_LINK +
            "?ref1=" +
            wrapper?.account +
            (REF ? "&ref2=" : "") +
            (REF ? REF[0] : "")
        : ""
    );
    amountRef.current.value = 30;
    getSaledAmount();
  }, [wrapper?.account]);

  const saveFirebase = async () => {
    try {
      await addDoc(collection(db, 'sales'), {
        address: wrapper?.account
      })
    } catch (e) {
      console.log(e)
    }
  }

  const approve = async () => {
    let amount = amountRef.current.value;
    let usdtBalance = await wrapper?.getUsdtBalance(wrapper?.account);
    if (!wrapper?.account) {
      Swal({
        title: "Warning!",
        text: "Connect your wallet please.",
        icon: "warning",
        button: "OK",
      });
      return;
    } else if (amount < 30) {
      Swal({
        title: "Warning!",
        text: "Minimum purchase amount is 30.",
        icon: "warning",
        button: "OK",
      });
      return;
    } else if (usdtBalance < amount * 8) {
      Swal({
        title: "Warning!",
        text: `You don't have enough USDT(You need ${amount * 8} USDT).`,
        icon: "warning",
        button: "OK",
      });
      return;
    }
    if (wrapper?.account === REF?.at(0)) {
      Swal({
        title: "Warning!",
        text: "You can not refer yourself.",
        icon: "warning",
        button: "OK",
      });
      return;
    }
    try {
      setPendingState(true);
      const mintable = await wrapper?.checkMintable(amount);
      if (!mintable) {
        Swal({
          title: "Warning!",
          text: "You are out of limit or not a whitelist member.",
          icon: "warning",
          button: "OK",
        });
        setPendingState(false);
        return;
      }
      await wrapper?.approveUSDT();
      Swal({
        title: "Congratulations!",
        text: "USDT Approved. You can buy ZOO with USDT now",
        icon: "success",
        button: "OK",
      });
      setStatus(2)
      setPendingState(false);
      setSaledTokenAmount(await wrapper?.getTotalSaledToken());
      saveFirebase();
    } catch (error) {
      setPendingState(false);
      if (error.code === 4001) {
        Swal({
          title: "Rejected!",
          text: "Transaction rejected!",
          icon: "error",
          button: "OK",
        });
        return;
      }
      Swal({
        title: "Transaction failed!",
        text: "Get some errors in transaction!",
        icon: "error",
        button: "OK",
      });
    }
  };

  const buyToken = async () => {
    let amount = amountRef.current.value;
    let usdtBalance = await wrapper?.getUsdtBalance(wrapper?.account);
    if (!wrapper?.account) {
      Swal({
        title: "Warning!",
        text: "Connect your wallet please.",
        icon: "warning",
        button: "OK",
      });
      return;
    } else if (amount < 30) {
      Swal({
        title: "Warning!",
        text: "Minimum mint amount is 30.",
        icon: "warning",
        button: "OK",
      });
      return;
    } else if (usdtBalance < amount * 8) {
      Swal({
        title: "Warning!",
        text: `You don't have enough USDT(You need ${amount * 8} USDT).`,
        icon: "warning",
        button: "OK",
      });
      return;
    }
    if (wrapper?.account === REF?.at(0)) {
      Swal({
        title: "Warning!",
        text: "You can not refer yourself.",
        icon: "warning",
        button: "OK",
      });
      return;
    }
    try {
      setPendingState(true);
      const mintable = await wrapper?.checkMintable(amount);
      if (!mintable) {
        Swal({
          title: "Warning!",
          text: "You are out of limit or not a whitelist member.",
          icon: "warning",
          button: "OK",
        });
        setPendingState(false);
        return;
      }
      await wrapper?.mintToken(
        amount,
        REF?.at(0) !== undefined
          ? REF?.at(0)
          : "0x0000000000000000000000000000000000000000",
        REF?.at(1) !== undefined
          ? REF?.at(1)
          : "0x0000000000000000000000000000000000000000"
      );
      Swal({
        title: "Congratulations!",
        text: `You bought ${amount}$ZOO successfully. `,
        icon: "success",
        button: "OK",
      });
      setPendingState(false);
      setSaledTokenAmount(await wrapper?.getTotalSaledToken());
    } catch (error) {
      setPendingState(false);
      if (error.code === 4001) {
        Swal({
          title: "Rejected!",
          text: "Transaction rejected!",
          icon: "error",
          button: "OK",
        });
        return;
      }
      Swal({
        title: "Transaction failed!",
        text: "Get some errors in transaction!",
        icon: "error",
        button: "OK",
      });
    }
  };
  const handleInputChange = (e) => {
    setProgress(e.target.value);
  };
  return (
    <>
      <Container>
        <Row>
          <Col>
            <CountdownTimer count={5432} className="countdown-timer" noPoints />
          </Col>
        </Row>
        <Row className="justify-content-md-center pt-3">
          <Col className="mx-2">
            <ProgressBar min="30" max="120" now={progressNow} />
            <p className="min-value">30 $ZOO</p>
            <p className="max-value">120 $ZOO</p>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col className="widgets">
            <Container className="widget-container">
              <input
                type="number"
                className="bnb-input"
                ref={amountRef}
                placeholder={30}
                onChange={handleInputChange}
                min={30}
              />
              <CButton
                value="MAX"
                width="46px"
                height="23px"
                fontSize="11px"
                onClick={() => {
                  setProgress(120);
                  amountRef.current.value = 120;
                }}
              />
            </Container>
            <div className="buy">
              {!pendingState ? (
                  status === 1 ? (
                      <CButton
                          value="Approve USDT"
                          width="320px"
                          height="31px"
                          onClick={approve}
                      />
                      ) : (
                <CButton
                  value="Buy ZOO with USDT"
                  width="387px"
                  height="31px"
                  onClick={buyToken}
                />)
              ) : (
                <CButton
                  value="Wait ..."
                  width="387px"
                  height="31px"
                  disabled="true"
                  onClick={buyToken}
                />
              )}
              <span className="title-txt" style={{ marginLeft: "125px" }}>
                {" "}
                1 $ZOO = 8 USDT
              </span>
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        <div className="referral-panel">
          <div className="referral-compnent-container container">
            <div className="row">
              <div className="title-section">
                <p className="referral-title">
                  Referral Link
                </p>
              </div>
              <div className="clipboard-edit">
                <Flex flexDirection="column">
                  <TextInput.Group>
                    <TextInput
                      isDisabled
                      value={refLink}
                      placeholder="Referral Link"
                      ref={referralAddress1}
                      onChange={(e) => setLinkAddress(e.target.value)}
                    />
                    <CopyButton
                      value={refLink}
                      tooltipProps={{ placement: "right", usePortal: true }}
                    />
                  </TextInput.Group>
                </Flex>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div className="main-panel-incoming">
        <Container>
          <IncomingEdit
            value={totalSaledToken}
            valueLeft={totalPrivateSaleToken - totalSaledToken}
          />
          <Flex flexDirection="row" justifyContent={'space-between'} className="mr-0">
            <p className="min-max-buy">Minimum Buy</p>
            <p className="price">30 $ZOO</p>
          </Flex>
          <Flex flexDirection="row" justifyContent={'space-between'} className="mr-0">
            <p className="min-max-buy">Maximum Buy</p>
            <p className="price">120 $ZOO</p>
          </Flex>
        </Container>
      </div>
    </>
  );
};

const PSWindow = (props) => {
  return (
    <>
      <div className="main-panel">
        <Title />
        <Widgets className="widget-container" />
      </div>
    </>
  );
};

export default PSWindow;
