export const BASE_URL = '/projects/react';

const routes = {
  home: {
    path: BASE_URL,
  },

  projects: {
    children: {
      drumMachine: {
        path: 'drum-machine',
      },
      markdownPreviewer: {
        path: 'markdown-previewer',
      },
      calculator: {
        path: 'calculator',
      },
    },
  },
};

export const projectsRoutes = routes.projects.children;

export default routes;
