import { packageDepencencies } from '../src/utils';

describe('faketest', function() {
  it('test', function() {
    expect(packageDepencencies.dotenv).toBe('^8.2.0');
  });
});
