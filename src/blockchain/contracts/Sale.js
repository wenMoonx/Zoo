import Contract from "./Contract";
import abi from "../abi/sale.json";

class Sale extends Contract {
  constructor(options, address) {
    super(options, "Sale", abi, address);
  }
}

export default Sale;
