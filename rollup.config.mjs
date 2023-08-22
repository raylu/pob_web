import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import ignore from 'rollup-plugin-ignore';

export default {
	input: 'src/index.mjs',
	output: {
		dir: 'www',
		format: 'es',
	},
	plugins: [
		nodeResolve(),
		commonjs(),
		ignore(['path', 'fs', 'child_process', 'crypto', 'url', 'module']),
	],
};
