import { packageDependencies } from '../src/utils';

describe('faketest', () => {
  it('test', () => {
    expect(packageDependencies.dotenv).toBe('^8.2.0');
  });
});
