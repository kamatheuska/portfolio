import * as migration_20261005_200141_init from './20261005_200141_init';
import * as migration_20261007_211054_posts from './20261007_211054_posts';
import * as migration_20261102_225545_cloudinary_storage from './20261102_225545_cloudinary_storage';

export const migrations = [
  {
    up: migration_20261005_200141_init.up,
    down: migration_20261005_200141_init.down,
    name: '20261005_200141_init',
  },
  {
    up: migration_20261007_211054_posts.up,
    down: migration_20261007_211054_posts.down,
    name: '20261007_211054_posts',
  },
  {
    up: migration_20261102_225545_cloudinary_storage.up,
    down: migration_20261102_225545_cloudinary_storage.down,
    name: '20261102_225545_cloudinary_storage'
  },
];
