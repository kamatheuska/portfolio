const getProjects = ({ portfolioBucketUrl }) => [
  {
    id: '1001',
    highlights: [
      'Development of a DEMO environment for the recommendations vertical that would allow E2E processes and Data Scientist Analitics test to be done within the product.',
    ],
    imageSrc: `${portfolioBucketUrl}/images/projects/lidl-reco-square.jpg`,
    imageAlt: 'Lidl Reco Slider',
    title: 'Recommendations Team',
    company: 'LIDL Digital',
    tags: ['VueJS', 'TypeScript', 'Express', 'Nuxt', 'SpringBoot'],
    links: [
      {
        text: 'Project URL',
        url: 'https://www.lidl.de',
      },
      {
        text: 'Team Feedback',
        url: 'https://www.linkedin.com/in/nicolasramirezdev',
      },
    ],
    isTransparent: true,
    loading: 'lazy',
    styles: {
      softShadow: true,
    },
    meta: {
      title: 'lidl-recommendations-team',
    },
  },
  {
    id: '1002',
    highlights: [
      'Development and maintenance of a CMS, home page and content pages, with high performance and internationalization, scalable for different countries.',
    ],
    imageSrc: `${portfolioBucketUrl}/images/projects/lidl-content-square.jpg`,
    imageAlt: 'Lidl Reco Slider',
    title: 'Content Team',
    company: 'LIDL Digital',
    tags: ['VueJS', 'TypeScript', 'Express', 'Nuxt', 'SpringBoot', 'Docker', 'Kubernetes', 'GoogleCloud'],
    links: [
      {
        text: 'Project URL',
        url: 'https://www.lidl.de',
      },
      {
        text: 'Team Feedback',
        url: 'https://www.linkedin.com/in/nicolasramirezdev',
      },
    ],
    isTransparent: true,
    loading: 'lazy',
    styles: {
      softShadow: true,
    },
    meta: {
      title: 'lidl-content-team',
    },
  },
  {
    id: '1003',
    highlights: [
      'React based mini projects that I have build in my free time over the years',
    ],
    imageSrc: `${portfolioBucketUrl}/images/projects/react-projects.jpg`,
    imageAlt: 'React Projects',
    title: 'React Projects',
    company: 'Personal',
    tags: ['React', 'HTML', 'SASS'],
    links: [
      {
        text: 'Project URL',
        url: '/projects/react',
      },
    ],
    isTransparent: true,
    loading: 'lazy',
    styles: {
      softShadow: false,
    },
    meta: {
      title: 'react-projects',
    },
  },
  {
    id: '1004',
    highlights: [
      'Search engine for itunes albums. Done for a technical exercise some time ago...',
    ],
    imageSrc: `${portfolioBucketUrl}/images/projects/itunes-server.jpg`,
    imageAlt: 'Itunes Search - Jobim',
    title: 'Itunes Search',
    company: 'Personal',
    tags: ['Vuejs', 'Express', 'Jest'],
    links: [
      {
        text: 'Project URL',
        url: 'https://itunes-server.herokuapp.com/',
      },
      {
        text: 'Github',
        url: 'https://github.com/kamatheuska/itunes-search',
      },
    ],
    isTransparent: true,
    loading: 'lazy',
    styles: {
      softShadow: false,
    },
    meta: {
      title: 'itunes-search',
    },
  },
];

export default getProjects;
