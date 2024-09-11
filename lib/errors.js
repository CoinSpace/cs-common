export class InternalWalletError extends Error {
  name = 'InternalWalletError';
}

export class NodeError extends Error {
  name = 'NodeError';
}

export class AddressError extends TypeError {
  name = 'AddressError';
}

export class EmptyAddressError extends AddressError {
  name = 'EmptyAddressError';
  constructor(message, options) {
    super(message || 'Empty address', options);
  }
}

export class InvalidAddressError extends AddressError {
  name = 'InvalidAddressError';
  constructor(address, options) {
    super(`Invalid address "${address}"`, options);
    this.address = address;
  }
}

export class DestinationEqualsSourceError extends AddressError {
  name = 'DestinationEqualsSourceError';
  constructor(message, options) {
    super(message || 'Destination address equals source address', options);
  }
}

export class AmountError extends TypeError {
  name = 'AmountError';
}

export class SmallAmountError extends AmountError {
  name = 'SmallAmountError';
  constructor(amount, options) {
    super('Small amount', options);
    this.amount = amount;
  }
}

export class BigAmountError extends AmountError {
  name = 'BigAmountError';
  constructor(amount, options) {
    super('Big amount', options);
    this.amount = amount;
  }
}

export class BigAmountConfirmationPendingError extends AmountError {
  name = 'BigAmountConfirmationPendingError';
  constructor(amount, options) {
    super('Big amount, confirmation pending', options);
    this.amount = amount;
  }
}

export class MinimumReserveDestinationError extends AmountError {
  name = 'MinimumReserveDestinationError';
  constructor(amount, options) {
    super('Less than minimum reserve on destination address', options);
    this.amount = amount;
  }
}

export class InsufficientCoinForTransactionFeeError extends AmountError {
  name = 'InsufficientCoinForTransactionFeeError';
  constructor(amount, options) {
    super('Insufficient funds to pay the transaction fee', options);
    this.amount = amount;
  }
}

export class InvalidMetaError extends TypeError {
  name = 'InvalidMetaError';
  constructor(message, options) {
    super(message, options);
    this.meta = options.meta;
  }
}

export class InactiveAccountError extends TypeError {
  name = 'InactiveAccountError';
  constructor(message, options) {
    super(message || 'Inactive account', options);
  }
}

export class InvalidPrivateKeyError extends TypeError {
  name = 'InvalidPrivateKeyError';
  constructor(message, options) {
    super(message || 'Invalid private key', options);
  }
}
