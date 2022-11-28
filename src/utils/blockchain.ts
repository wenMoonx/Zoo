import BigNumber from "bignumber.js";

export function ellipseAddress(
    address: string = "",
    width: number = 4
  ): string {
    return `${address.slice(0, width + 2)}...${address.slice(-width)}`;
  }

export const NumToBN = (value, decimal = 8) => {
  return new BigNumber(value).shiftedBy(decimal);
}