import assert from 'assert/strict';

import {
  Amount,
} from '@coinspace/cs-common';


describe('Amount', () => {
  describe('#constructor', () => {
    it('should create valid small amount with decimals', () => {
      const amount = new Amount(1, 6);
      assert.equal(amount.value, 1n);
      assert.equal(amount.decimals, 6);
      assert.equal(amount.toString(), '0.000001');
    });

    it('should create valid big amount with decimals', () => {
      const amount = new Amount(1234567890, 6);
      assert.equal(amount.value, 1234567890n);
      assert.equal(amount.decimals, 6);
      assert.equal(amount.toString(), '1234.56789');
    });

    it('should create valid amount without decimals', () => {
      const amount = new Amount(1234567890, 0);
      assert.equal(amount.value, 1234567890n);
      assert.equal(amount.decimals, 0);
      assert.equal(amount.toString(), '1234567890');
    });

    it('should create valid small negative amount with decimals', () => {
      const amount = new Amount(-1, 6);
      assert.equal(amount.value, -1n);
      assert.equal(amount.decimals, 6);
      assert.equal(amount.toString(), '-0.000001');
    });

    it('should create valid big negative amount with decimals', () => {
      const amount = new Amount(-1234567890, 6);
      assert.equal(amount.value, -1234567890n);
      assert.equal(amount.decimals, 6);
      assert.equal(amount.toString(), '-1234.56789');
    });

    it('should create valid negative amount without decimals', () => {
      const amount = new Amount(-1234567890, 0);
      assert.equal(amount.value, -1234567890n);
      assert.equal(amount.decimals, 0);
      assert.equal(amount.toString(), '-1234567890');
    });

    it('should create valid 0 amount with decimals', () => {
      const amount = new Amount(0n, 6);
      assert.equal(amount.value, 0n);
      assert.equal(amount.decimals, 6);
      assert.equal(amount.toString(), '0');
    });
  });

  describe('#fromString', () => {
    it('should create valid small amount with decimals', () => {
      const amount = Amount.fromString('0.000001', 6);
      assert.equal(amount.value, 1n);
      assert.equal(amount.decimals, 6);
      assert.equal(amount.toString(), '0.000001');
    });

    it('should create valid big amount with decimals', () => {
      const amount = Amount.fromString('1234.567890', 6);
      assert.equal(amount.value, 1234567890n);
      assert.equal(amount.decimals, 6);
      assert.equal(amount.toString(), '1234.56789');
    });

    it('should create valid amount without decimals', () => {
      const amount = Amount.fromString('1234567890', 0);
      assert.equal(amount.value, 1234567890n);
      assert.equal(amount.decimals, 0);
      assert.equal(amount.toString(), '1234567890');
    });

    it('should create valid small negative amount with decimals', () => {
      const amount = Amount.fromString('-0.000001', 6);
      assert.equal(amount.value, -1n);
      assert.equal(amount.decimals, 6);
      assert.equal(amount.toString(), '-0.000001');
    });

    it('should create valid big negative amount with decimals', () => {
      const amount = Amount.fromString('-1234.567890', 6);
      assert.equal(amount.value, -1234567890n);
      assert.equal(amount.decimals, 6);
      assert.equal(amount.toString(), '-1234.56789');
    });

    it('should create valid negative amount without decimals', () => {
      const amount = Amount.fromString('-1234567890', 0);
      assert.equal(amount.value, -1234567890n);
      assert.equal(amount.decimals, 0);
      assert.equal(amount.toString(), '-1234567890');
    });

    it('should create valid 0 amount with decimals', () => {
      const amount = Amount.fromString('0', 6);
      assert.equal(amount.value, 0n);
      assert.equal(amount.decimals, 6);
      assert.equal(amount.toString(), '0');
    });
  });
});
