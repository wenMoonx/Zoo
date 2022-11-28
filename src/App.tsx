import "./App.scss";
import "react-notifications/lib/notifications.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import BackImg from "components/BackImg/BackImg";
import TotalContainer from "./components/TotalContainer/TotalContainer";

import Web3ModalProvider from "./contexts/Web3ModalProvider";
import Web3WrapperProvider from "contexts/Web3WrapperProvider";

import { NotificationContainer } from "react-notifications";

const App = () => (
  <Providers>
    <BrowserRouter>
      <BackImg />
      <Switch>
        <Route exact path="/" component={TotalContainer} />
      </Switch>

      {/* <Footer /> */}
    </BrowserRouter>
    <NotificationContainer />
  </Providers>
);

const Providers = (props: any) => {
  return (
    <Web3ModalProvider>
      <Web3WrapperProvider>{props.children}</Web3WrapperProvider>
    </Web3ModalProvider>
  );
};

export default App;
