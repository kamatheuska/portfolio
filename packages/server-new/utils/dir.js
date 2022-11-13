import { fileURLToPath } from 'url';
import path from 'path';

export function dirname(url) {
	return path.dirname(fileURLToPath(url));
}

export function join(url, ...str) {
	return path.join(dirname(url), ...str);
}
