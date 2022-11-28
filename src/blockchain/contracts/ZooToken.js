import Contract from "./Contract";
import abi from "../abi/zooToken.json";

class ZooToken extends Contract {
  constructor(options, address) {
    super(options, "ZooToken", abi, address);
  }
}

export default ZooToken;
