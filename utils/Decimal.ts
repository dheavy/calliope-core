import { BigNumber } from 'ethers';

export default class Decimal {
  static new(val: number) {
    const decimalPlaces = countDecimals(val);
    const diff = 18 - decimalPlaces;
    const zeros = BigNumber.from(10).pow(diff);
    const abs = BigNumber.from(`${val.toString().replace('.', '')}`);
    return { value: abs.mul(zeros) };
  }

  static raw(val: number) {
    return { value: BigNumber.from(val) };
  }
}

function countDecimals(val: number): number {
  if (Math.floor(val) !== val) {
    return val.toString().split('.')[1].length || 0;
  }
  return 0;
}
