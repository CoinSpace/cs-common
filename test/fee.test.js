import assert from 'assert';
import { calculateCsFee, calculateCsFeeForMaxAmount } from '../lib/fee.js';

const config = {
  fee: 0.005,
  minFee: 0.3,
  maxFee: 100,
  price: 10_000,
  decimals: 8,
  dustThreshold: 1n,
};

describe('fee', () => {
  describe('cs fee calculation', () => {
    it('to be zero if fee is off', () => {
      const value = 1_00000000n;
      const fee = calculateCsFee(value, {
        disabled: true,
      });
      assert.strictEqual(fee, 0n);
    });

    it('to be minimum fee (bigger then value)', () => {
      const value = 1n;
      const fee = calculateCsFee(value, config);
      assert.strictEqual(fee, 3000n);
    });

    it('to be minimum fee', () => {
      const value = 10000n;
      const fee = calculateCsFee(value, config);
      assert.strictEqual(fee, 3000n);
    });

    it('to be right', () => {
      const value = 1_00000000n;
      const fee = calculateCsFee(value, config);
      assert.strictEqual(fee, 500000n);
    });

    it('to be maximum fee', () => {
      const value = 100_00000000n;
      const fee = calculateCsFee(value, config);
      assert.strictEqual(fee, 1000000n);
    });

    it('to be dust if less then dust', () => {
      const value = 10000n;
      const fee = calculateCsFee(value, {
        ...config,
        dustThreshold: 5000n,
      });
      assert.strictEqual(fee, 5000n);
    });
  });

  describe('cs fee calculation for max amount', () => {
    it('to be zero if fee is off', () => {
      const value = 1_00000000n;
      const fee = calculateCsFeeForMaxAmount(value, {
        disabled: true,
      });
      assert.strictEqual(fee, 0n);
    });

    it('to be minimum fee (bigger then value)', () => {
      const value = 1n;
      const fee = calculateCsFeeForMaxAmount(value, config);
      assert.strictEqual(fee, 3000n);
    });

    it('to be minimum fee', () => {
      const value = 10000n;
      const fee = calculateCsFeeForMaxAmount(value, config);
      assert.strictEqual(fee, 3000n);
    });

    it('to be right', () => {
      const value = 1_00500000n;
      const fee = calculateCsFeeForMaxAmount(value, config);
      assert.strictEqual(fee, 500000n);
    });

    it('to be maximum fee', () => {
      const value = 100_00000000n;
      const fee = calculateCsFeeForMaxAmount(value, config);
      assert.strictEqual(fee, 1000000n);
    });
  });

  describe('cs fee self check reverse calculation', () => {
    const config = {
      fee: 0.005,
      minFee: 0.3, // 3 atom from 600
      maxFee: 10, // 100 atom from 20_000
      price: 10,
      decimals: 2,
      dustThreshold: 1n,
    };
    it('calculation should match reverse calculation for value', () => {
      for (let total = 500n; total < 21_000n; total++) {
        const reverse = calculateCsFeeForMaxAmount(total, config);
        const fee = calculateCsFee(total - reverse, config);
        assert((fee === reverse) || (reverse - fee === 1n),
          `Expected ${fee} (?+1) === ${reverse}  for value ${total}`);
      }
    });
  });
});
