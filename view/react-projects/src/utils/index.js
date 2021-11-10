const breakpoints = {
  TABLET: 769,
  DESKTOP: 1024,
};

const matchesMediaQuery = (query) => window.matchMedia(query).matches;

export const isMobile = () => matchesMediaQuery(`(max-width: ${breakpoints.TABLET}px)`);
export const isGreaterThanTablet = () => matchesMediaQuery(`(min-width: ${breakpoints.DESKTOP}px)`);
export const isGreaterThanTabletPlus = (addedWidth) =>
  matchesMediaQuery(`(min-width: ${breakpoints.DESKTOP + addedWidth}px)`);
