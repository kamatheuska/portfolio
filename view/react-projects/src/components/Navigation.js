import { Link } from '@reach/router';

import routes from 'routes';

const getIsCurrentClasses = (isCurrent) => (isCurrent ? 'navigation-link--is-active' : '');

const getNoProjectTextColorClass = (pathname) => (/projects\/react$/.test(pathname) ? 'has-text-white' : '');

const getLinkCssClasses = ({ isCurrent, pathname }) => {
  const defaultClasses = 'navigation-link is-size-5';
  const custom = `${getIsCurrentClasses(isCurrent)} ${getNoProjectTextColorClass(pathname)}`;

  return `${defaultClasses} ${custom}`;
};

const NavigationLink = (props) => (
  <Link
    {...props}
    getProps={({ isCurrent, location }) => {
      return {
        className: getLinkCssClasses({ isCurrent, pathname: location.pathname }),
      };
    }}
  />
);

export default function Navigation({ location }) {
  return (
    <nav className="navigation mt-2">
      <NavigationLink to={routes.home.path}>Back</NavigationLink>
      <a
        href="/"
        className={getLinkCssClasses({
          isCurrent: false,
          pathname: location.pathname,
        })}
      >
        Portfolio
      </a>
    </nav>
  );
}
