export default class Transaction {
  static TYPE_TRANSFER = Symbol('TRANSFER');
  static TYPE_EXCHANGE = Symbol('EXCHANGE');

  static STATUS_PENDING = Symbol('PENDING');
  static STATUS_SUCCESS = Symbol('SUCCESS');
  static STATUS_FAILED = Symbol('FAILED');

  #type;
  #status;
  #id;
  #amount;
  #incoming;
  #from;
  #to;
  #fee;
  #timestamp;
  #confirmations;
  #minConfirmations;
  #meta;
  #rbf;
  #development;

  constructor({
    type,
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
    // TODO validation
    this.#type = type;
    this.#status = status;
    this.#id = id;
    this.#amount = amount;
    this.#incoming = incoming;
    this.#from = from;
    this.#to = to;
    this.#fee = fee;
    this.#timestamp = timestamp || new Date();
    this.#confirmations = confirmations;
    this.#minConfirmations = minConfirmations;
    this.#meta = meta;
    this.#rbf = rbf;

    this.#development = !!development;
  }
  // transfer, exchange
  get type() {
    return this.#type;
  }
  get status() {
    return this.#status;
  }
  get id() {
    return this.#id;
  }
  get amount() {
    return this.#amount;
  }
  get incoming() {
    return !!this.#incoming;
  }
  get from() {
    return this.#from;
  }
  get to() {
    return this.#to;
  }
  get fee() {
    return this.#fee;
  }
  get timestamp() {
    return this.#timestamp;
  }
  get confirmations() {
    return this.#confirmations;
  }
  get minConfirmations() {
    return this.#minConfirmations;
  }
  get meta() {
    return this.#meta;
  }
  get rbf() {
    return this.#rbf;
  }
  get url() {
    return '';
  }
  get development() {
    return this.#development;
  }

  toString() {
    // eslint-disable-next-line max-len
    return `${this.#type.description} #${this.#id}: ${this.#from} => ${this.#to} ${this.#incoming ? '+' : '-'}${this.#amount} (fee: ${this.#fee})`;
  }

  [Symbol.for('nodejs.util.inspect.custom')]() {
    return this.toString();
  }
}
