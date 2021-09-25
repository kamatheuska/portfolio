import drumMachineThumbnail from 'assets/images/thumbnails/drum-machine.gif';
import markdownPreviewerThumbnail from 'assets/images/thumbnails/markdown-previewer.gif';

const projects = [
  {
    id: 'drum-machine',
    title: 'Drum Machine',
    thumbnailImage: drumMachineThumbnail,
    description: `
      A digital drummer to play with your keyboard.
      To really rock it, please turn on the volume of your speakers!
    `,
    path: 'projects/drum-machine',
  },
  {
    id: 'markdown-previewer',
    title: 'Markdown Previewer',
    thumbnailImage: markdownPreviewerThumbnail,
    description: `
      A simple editor to preview your valuable and unreadable docs
    `,
    path: 'projects/markdown-previewer',
  },
  {
    id: 'calculator',
    title: 'JS Calculator',
    thumbnailImage: markdownPreviewerThumbnail,
    description: `
      Would you ever wonder if you needed yet another calculator? Wonder no more!
    `,
    path: 'projects/calculator',
  },
];

export default projects;
