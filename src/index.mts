import {LuaFactory} from 'wasmoon';

const factory = new LuaFactory();
const lua = await factory.createEngine();

const files = new Map<string, string>();
async function prepareFile(path: string) {
	const resp = await fetch('lua/' + path);
	if (!resp.ok)
		throw new Error('failed to fetch ' + path);
	let src = await resp.text();
	const split = src.split('\n', 1);
	if (split[0].substring(0, 2) == '#@')
		src = '--' + src; // ignore the first line
	files.set(path, src);
}

function runFile(path: string) {
	const src = files.get(path);
	if (!src)
		throw new Error;
	lua.doStringSync(src);
}

try {
	await prepareFile('HeadlessWrapper.lua');
	await prepareFile('Launch.lua');
	lua.global.set('dofile', runFile);
	runFile('HeadlessWrapper.lua');
} finally {
	lua.global.close();
}
