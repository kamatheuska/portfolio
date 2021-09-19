const routes = {
  home: {
    path: '/'
  },

  projects: {
    children: {
      drumMachine: {
        path: '/projects/drum-machine'
      }
    }
  }
}

export const projectsRoutes = routes.projects.children;

export default routes;
