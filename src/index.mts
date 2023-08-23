import {LuaFactory} from 'wasmoon';

const factory = new LuaFactory();
const lua = await factory.createEngine();

async function runFile(path: string) {
	const resp = await fetch(path);
	await lua.doString(await resp.text());
}

try {
	// Set a JS function to be a global lua function
	lua.global.set('sum', (x, y) => x + y);
	runFile('lua/Launch.lua');
} finally {
	lua.global.close();
}
