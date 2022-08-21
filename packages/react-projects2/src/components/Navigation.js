import { useResolvedPath, useMatch, Link } from 'react-router-dom';

function PortfolioLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  let baseUrlMatch = useMatch({ path: '/projects/react', end: true });

  const isActiveClass = (isMatch) => (isMatch ? 'navigation__link--hide' : '');
  const isWhite = (isMatch) => (isMatch ? 'has-text-white' : '');

  return (
    <Link className={`navigation__link ${isActiveClass(match)} ${isWhite(baseUrlMatch)}`} to={to} {...props}>
      {children}
    </Link>
  );
}

export default function Navigation() {
  return (
    <nav className="navigation mt-2">
      <PortfolioLink to="/projects/react">Back</PortfolioLink>

      <PortfolioLink to="/" reloadDocument>
        Portfolio
      </PortfolioLink>
    </nav>
  );
}
