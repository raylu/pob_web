import {unpack} from 'msgpackr/unpack';
import {LuaFactory} from 'wasmoon';

const factory = new LuaFactory();
const lua = await factory.createEngine();

async function prepareFile(url: string, msgpack: boolean) {
	const resp = await fetch(url);
	if (!resp.ok)
		throw new Error('failed to fetch ' + url);
	if (msgpack) {
		const pack = unpack(new Uint8Array(await resp.arrayBuffer()));
		for (const filename in pack)
			await factory.mountFile(filename, pack[filename]);
	} else
		await factory.mountFile(url, await resp.text());
}

try {
	await prepareFile('runtime.msgpack', true);
	await prepareFile('globals.lua', false);
	await prepareFile('src.msgpack', true);

	await lua.doFile('globals.lua');
	await lua.doFile('HeadlessWrapper.lua');
} finally {
	lua.global.close();
}
