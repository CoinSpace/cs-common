import Amount from './Amount.js';

export default class Transaction {
  static STATUS_PENDING = Symbol('PENDING');
  static STATUS_SUCCESS = Symbol('SUCCESS');
  static STATUS_FAILED = Symbol('FAILED');

  static STATUSES = [
    Transaction.STATUS_PENDING,
    Transaction.STATUS_SUCCESS,
    Transaction.STATUS_FAILED,
  ];

  constructor({
    status,
    id,
    amount,
    incoming,
    from,
    to,
    fee,
    timestamp,
    confirmations,
    minConfirmations,
    meta = undefined,
    rbf = false,
    development = false,
  }) {
    if (!this.constructor.STATUSES.includes(status)) {
      throw new TypeError(`unsupported status: ${status}`);
    }
    this.status = status;
    this.id = id;
    if (!(amount instanceof Amount)) {
      throw new TypeError(`amount must be an instance of Amount, ${typeof amount} provided`);
    }
    this.amount = amount;
    this.incoming = incoming;
    this.from = from;
    this.to = to;
    if (!(fee instanceof Amount || fee === undefined)) {
      throw new TypeError(`fee must be an instance of Amount or undefined, ${typeof fee} provided`);
    }
    this.fee = fee;
    this.timestamp = timestamp || new Date();
    this.confirmations = confirmations;
    this.minConfirmations = minConfirmations;
    this.meta = meta;
    this.rbf = rbf;

    this.development = !!development;
  }

  get url() {
    return '';
  }

  toString() {
    // eslint-disable-next-line max-len
    return `#${this.id}: ${this.from} => ${this.to} ${this.incoming ? '+' : '-'}${this.amount} (fee: ${this.fee})`;
  }

  [Symbol.for('nodejs.util.inspect.custom')]() {
    return this.toString();
  }
}
