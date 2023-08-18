import assert from 'assert';

import { atomToRoundUnit } from '../lib/utils.js';

describe('utils', () => {
  describe('atomToRoundUnit', () => {
    it('int', () => {
      const unit = atomToRoundUnit(1000n, 3, 1);
      assert.strictEqual(unit, '1');
    });

    it('decimal', () => {
      const unit = atomToRoundUnit(123456789n, 8, 1);
      assert.strictEqual(unit, '1.23');
    });

    it('high value, low price', () => {
      const unit = atomToRoundUnit(100020003000400050006000700080009000n, 18, 0.000000000000000001);
      assert.strictEqual(unit, '100020003000400050');
    });

    it('high value, high price', () => {
      const unit = atomToRoundUnit(100020003000400050006000700080009000n, 18, 100000000000);
      assert.strictEqual(unit, '100020003000400050.00600070008');
    });

    it('low value, low price', () => {
      const unit = atomToRoundUnit(1n, 18, 0.000000000000000001);
      assert.strictEqual(unit, '0');
    });

    it('low value, high price', () => {
      const unit = atomToRoundUnit(1n, 8, 10000000000000000);
      assert.strictEqual(unit, '0.00000001');
    });
  });

});
