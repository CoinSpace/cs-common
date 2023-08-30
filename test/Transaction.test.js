import assert from 'assert';
import {
  Amount,
  Transaction,
} from '@coinspace/cs-common';

describe('Transaction', () => {
  it('should create valid transaction', () => {
    const tx = new Transaction({
      status: Transaction.STATUS_SUCCESS,
      amount: new Amount(10, 1),
      fee: new Amount(1, 1),
      from: 'from',
      to: 'to',
      id: '123',
    });
    assert.strictEqual(tx.toString(), '#123: from => to -1 (fee: 0.1)');
  });

  it('should throw invalid status', () => {
    assert.throws(() => {
      new Transaction({
        status: 'foo',
      });
    }, {
      name: 'TypeError',
      message: 'unsupported status: foo',
    });
  });

  it('should throw invalid amount', () => {
    assert.throws(() => {
      new Transaction({
        status: Transaction.STATUS_SUCCESS,
        amount: 'foo',
      });
    }, {
      name: 'TypeError',
      message: 'amount must be an instance of Amount, string provided',
    });
  });

  it('should throw invalid fee', () => {
    assert.throws(() => {
      new Transaction({
        status: Transaction.STATUS_SUCCESS,
        amount: new Amount(10, 1),
        fee: 'foo',
      });
    }, {
      name: 'TypeError',
      message: 'fee must be an instance of Amount or undefined, string provided',
    });
  });
});
