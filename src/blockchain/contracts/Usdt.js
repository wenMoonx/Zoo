import Contract from "./Contract";
import abi from "../abi/usdt.json";

class Usdt extends Contract {
  constructor(options, address) {
    super(options, "Usdt", abi, address);
  }
}

export default Usdt;
