import { useContext, useEffect } from "react";
import { Web3ModalContext } from "contexts/Web3ModalProvider";
import { NotificationManager } from "react-notifications";
import { defaultChainId, networkNames } from "blockchain/constants";
// import Main from "../components/Main";
import Grid from "@material-ui/core/Grid";
import { Box, Typography } from "@mui/material";

const Landing = () => {
  const { account } = useContext(Web3ModalContext);
  const { chainId } = useContext(Web3ModalContext);

  useEffect(() => {
    if (chainId !== null && Number(chainId) !== Number(defaultChainId)) {
      NotificationManager.error(`Try on ${networkNames[defaultChainId]}`, "Wrong Network");
    }
  }, [chainId]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} style={{ display: "flex", justifyContent: "center" }}>
          <Box>
            {!account ? (
              <Typography fontSize={{ lg: 60, md: 50, sm: 45, xs: 35 }} style={{ color: "black", marginTop: "40%" }}>
                Please Connect Wallet!
              </Typography>
            ) : Number(chainId) !== Number(defaultChainId) ? (
              <Typography fontSize={{ lg: 60, md: 50, sm: 45, xs: 35 }} style={{ color: "black", marginTop: "40%" }}>
                Try on BSC Testnet
              </Typography>
            ) : (
              <></>
              // <Main />
            )}
          </Box>
        </Grid>
        <Grid item sm={4} style={{ marginTop: "10%" }}>
          <img src="./cryptosend.png" alt="CryptSend" width={"100%"} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Landing;
