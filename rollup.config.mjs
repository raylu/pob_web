import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import ignore from 'rollup-plugin-ignore';

export default {
	input: 'src/index.mts',
	output: {
		dir: 'www',
		format: 'es',
		sourcemap: true,
	},
	plugins: [
		esbuild({
			loaders: {'.mts': 'ts'},
			minify: false,
		}),
		nodeResolve(),
		commonjs(),
		ignore(['path', 'fs', 'child_process', 'crypto', 'url', 'module']),
	],
};
