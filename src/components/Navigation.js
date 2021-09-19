import { Link } from '@reach/router';
import routes from 'routes';

const NavigationLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      return isCurrent ? { className: 'navigation-link--is-active' } : {}
    }}
  />
)

export default function Navigation() {
  return (
    <nav>
      <NavigationLink
        to={ routes.home.path }
      >
        Go Home
      </NavigationLink>
    </nav>
  )
}