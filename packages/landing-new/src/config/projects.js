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
        meta: {
            title: 'lidl-content-team',
        },
    },
];

export default getProjects;
