const routes = {
  home: {
    path: '/',
  },

  projects: {
    children: {
      drumMachine: {
        path: '/projects/drum-machine',
      },
      markdownPreviewer: {
        path: '/projects/markdown-previewer',
      },
      calculator: {
        path: '/projects/calculator',
      },
    },
  },
};

export const projectsRoutes = routes.projects.children;

export default routes;
