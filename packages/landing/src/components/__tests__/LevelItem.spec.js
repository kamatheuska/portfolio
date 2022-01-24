import LevelItem from '../LevelItem.vue';

let context;
let result;
const beforeEnterMock = jest.fn();

describe('🌳  LevelSection component', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('🌴 computed', () => {
    describe('🍉 route', () => {
      beforeEach(() => {
        context = {
          link: '/some/link',
          isInternalLink: false,
          navigateBeforeEnter: beforeEnterMock,
        };
      });

      it('🌱 returns a route with beforeRoute function if isInternalLink is false', () => {
        result = LevelItem.computed.route.call(context);

        expect(result).toStrictEqual({
          path: context.link,
          beforeEnter: beforeEnterMock,
        });
      });

      it('🌱 returns a route without beforeRoute function if isInternalLink is true', () => {
        context.isInternalLink = true;

        result = LevelItem.computed.route.call(context);

        expect(result).toStrictEqual({
          path: context.link,
        });
      });
    });
  });

  describe('🌴 methods', () => {
    describe('🍉 navigateBeforeEnter', () => {
      beforeEach(() => {
        context = {
          link: '/some/link',
          isInternalLink: false,
          navigateBeforeEnter: beforeEnterMock,
        };

        Object.defineProperty(window, 'location', {
          value: {
            href: 'https://www.example.com',
          },
        });
      });

      it('🌱 sets window.location.href to link', () => {
        LevelItem.methods.navigateBeforeEnter.call(context);
        expect(window.location.href).toBe(context.link);
      });
    });
  });
});
