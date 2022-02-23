/**
 * @function aboutContentFactory
 *
 * @param {Object} opts
 * @param {Object.portfolioBucketUrl} opts.portfolioBucketUrl
 *
 */
const aboutContentFactory = ({ portfolioBucketUrl }) => ({
  carrer: {
    title: 'Carrer and aspirations',
    texts: [
      `For the past three years, I have been working as a Fullstack Developer on an
            e-commerce company. Although my main focus is in frontend development and its
            technologies, I was required to do a bit of every rol and have learned a great
            deal about software development and working in a complex team.`,
      `I have an artistic background, studying music composition in Berlin in the
            Musikschule Friedrichshain-Kreuzberg and the UdK Berlin. After a while, artistic
            endeavour wasn't enough, so I decided to learn to code. Almost five years after,
            I can see how the rigurosity of german music theory influence my love for clean
            and expresive code.`,
      `I am passionate about languages and the things that you can build with them.
            Music and software are like twins separated at birth and given to different 
            purposes, one for the soul and the divine, the other for body and finding solutions
            to the necessities we face every day as human beings.`,
    ],
  },
  tech: {
    title: 'Frontend Tech Stack',
    stack: [
      {
        imageSrc: `${portfolioBucketUrl}/images/js-logo.png`,
        heading: 'Vanilla Javascript',
      },
      {
        imageSrc: `${portfolioBucketUrl}/images/css3-logo.png`,
        heading: 'Responsive CSS styles',
      },
      {
        imageSrc: `${portfolioBucketUrl}/images/html5-logo.png`,
        heading: 'Accesibility focused HTML5',
      },
      {
        imageSrc: `${portfolioBucketUrl}/images/webapi-logo.png`,
        heading: 'Web APIs',
      },
    ],
  },
  passions: {
    title: 'Music and Software were separated at birth',
    texts: [
      `I am passionate about languages and the things that you can build with them.
            Music and software are like twins separated at birth and given to different 
            purposes, one for the soul and the divine, the other for body and finding solutions
            to the necessities we face every day as human beings.`,
    ],
  },
});

export default aboutContentFactory;
