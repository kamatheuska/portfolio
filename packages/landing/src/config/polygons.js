const getPolygonSpecs = () => [
    {
        gradientSpecs: {
            colors: ['#95BCCC', '#DDD4D4'],
        },
        polygon: {
            points: [
                ['0', '10%'],
                ['100%', '0'],
                ['100%', '90%'],
                ['0', '100%'],
            ],
        },
    },
    {
        gradientSpecs: {
            colors: ['#FCDCDC', '#988080'],
            angle: 'to right top',
        },
        polygon: {
            points: [
                ['0', '10%'],
                ['100%', '30%'],
                ['100%', '80%'],
                ['0', '100%'],
            ],
        },
        marginTop: '15rem',
    },
    {
        gradientSpecs: {
            colors: ['#95BCCC', '#DDD4D4'],
            angle: 'to left top',
        },
        polygon: {
            points: [
                ['0', '10%'],
                ['100%', '15%'],
                ['100%', '80%'],
                ['0', '100%'],
            ],
        },
        height: '130vh',
        marginTop: '15rem',
    },
];

export default getPolygonSpecs;
