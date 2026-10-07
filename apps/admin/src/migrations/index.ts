import * as migration_20261005_200141_init from './20261005_200141_init';
import * as migration_20261007_211054_posts from './20261007_211054_posts';

export const migrations = [
  {
    up: migration_20261005_200141_init.up,
    down: migration_20261005_200141_init.down,
    name: '20261005_200141_init',
  },
  {
    up: migration_20261007_211054_posts.up,
    down: migration_20261007_211054_posts.down,
    name: '20261007_211054_posts'
  },
];
