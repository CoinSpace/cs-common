export default class Amount {
  constructor(value, decimals) {
    this.value = BigInt(value);
    this.decimals = parseInt(decimals);
  }

  toString() {
    const str = this.value.toString().padStart(this.decimals + 1, '0');
    return `${str.slice(0, -1 * this.decimals)}.${str.slice(-1 * this.decimals)}`
      // leading zeroes
      .replace(/0+$/, '')
      // leading dot
      .replace(/\.$/, '');
  }
  static fromString(str, decimals) {
    const [integer, fraction = ''] = str.split('.');
    return new Amount(`${integer}${fraction.padEnd(decimals, '0').slice(0, decimals)}`, decimals);
  }

  [Symbol.for('nodejs.util.inspect.custom')]() {
    return `${this.value} / 10^${this.decimals}`;
  }
}
