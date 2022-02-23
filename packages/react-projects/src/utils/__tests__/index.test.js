import '../../__mocks__/matchMedia.mock';
import { matchesMediaQuery } from '../index';

let windowSpy;
let result;

const QUERY = '(min-width: 300px)';
describe('🌳  Utils', () => {
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'matchMedia');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  describe('🌴 matchesMediaQuery', () => {
    beforeEach(() => {
      windowSpy.mockImplementation(() => ({ matches: true }));
      result = matchesMediaQuery(QUERY);
    });

    it('🌱 returns boolean when query matches', () => {
      expect(result).toBeTruthy();
    });

    it('🌱 calls "matchMedia" with the right args', () => {
      expect(windowSpy).toHaveBeenCalled();
      expect(windowSpy).toHaveBeenCalledWith(QUERY);
    });
  });
});
