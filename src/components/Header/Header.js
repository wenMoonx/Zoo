import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import mainLogo from "./logo.png";
import "./header.css";
import CButton from "../Button";
import WalletConnect from "../WalletConnect";
// import { UserContext } from "../../utils/UserContext";
// import { useContext } from "react";

const Header = (props) => {
  // const { status } = useContext(UserContext);
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={mainLogo} alt="logo" className="logo-img" />
        </Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        {/* <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link id="home" href="/home">
              Home
            </Nav.Link>
            <Nav.Link href="/private_sale">Private Sale</Nav.Link>
            <Nav.Link href="/sw ap">Swap</Nav.Link>
            <Nav.Link href="/zooNFTs">Crazy Zoo NFT</Nav.Link>
            <Nav.Link href="/staking">Staking</Nav.Link>
            <Nav.Link href="/connect_wallet">Connect Wallet</Nav.Link>
          </Nav>
        </Navbar.Collapse> */}
        {/* <p className="income-label" style={{ float: "right" }}>
          {status.Address}
        </p> */}
        {/* <CButton value="Connect Wallet" width="156px" height="40px" /> */}
        <WalletConnect />
      </Container>
    </Navbar>
  );
};

export default Header;
