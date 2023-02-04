import { fileURLToPath } from 'url';
import fp from 'fastify-plugin';
import {
  join,
  dirname,
} from '../utils/dir.js';

async function dirUtils(fastify) {
  fastify.decorate('filename', fileURLToPath);
  fastify.decorate('join', join);
  fastify.decorate('dirname', dirname);
}

export default fp(dirUtils, {
  name: 'dirUtils',
});
