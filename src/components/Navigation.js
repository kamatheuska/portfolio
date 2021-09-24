import { Link } from '@reach/router';
import routes from 'routes';

const NavigationLink = props => (
  <Link
    {...props}

    getProps={({ isCurrent }) => {
      return isCurrent
        ? { className: 'navigation-link navigation-link--is-active' }
        : { className: 'navigation-link' }
    }}
  />
)

export default function Navigation() {
  return (
    <nav className="navigation">
      <NavigationLink
        to={ routes.home.path }
      >
        Go Home
      </NavigationLink>
    </nav>
  )
}