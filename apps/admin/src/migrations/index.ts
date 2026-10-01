import * as migration_20261001_215009_init from './20261001_215009_init';

export const migrations = [
  {
    up: migration_20261001_215009_init.up,
    down: migration_20261001_215009_init.down,
    name: '20261001_215009_init'
  },
];
