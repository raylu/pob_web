import {LuaFactory} from 'wasmoon';

const factory = new LuaFactory();
const lua = await factory.createEngine();

async function prepareFile(path: string, url: string) {
	const resp = await fetch(url);
	if (!resp.ok)
		throw new Error('failed to fetch ' + url);
	let src = await resp.text();
	const split = src.split('\n', 1);
	if (split[0].substring(0, 2) == '#@')
		src = '--' + src; // ignore the first line
	await factory.mountFile(path, src);
}

try {
	await prepareFile('xml.lua', 'runtime/xml.lua');
	await prepareFile('HeadlessWrapper.lua', 'lua/HeadlessWrapper.lua');
	await prepareFile('Launch.lua', 'lua/Launch.lua');

	await lua.doFile('HeadlessWrapper.lua');
} finally {
	lua.global.close();
}
