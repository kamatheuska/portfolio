import * as migration_20261005_200141_init from './20261005_200141_init';

export const migrations = [
  {
    up: migration_20261005_200141_init.up,
    down: migration_20261005_200141_init.down,
    name: '20261005_200141_init'
  },
];
