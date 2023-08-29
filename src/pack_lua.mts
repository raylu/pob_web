import * as fs from 'fs';
import {Packr} from 'msgpackr';

function *iterLua(dir: string): Iterable<string> {
	for (const path of fs.readdirSync('PathOfBuilding/' + dir, {recursive: true, encoding: 'utf-8'})) {
		if (!path.endsWith('.lua'))
			continue;
		if (path.startsWith('TreeData/') && !path.startsWith('TreeData/3_22/'))
			continue;
		yield path;
	}
}

const packr = new Packr({ useRecords: true, bundleStrings: true });

(() => {
	const src = {};
	for (const path of iterLua('src'))
		src[path] = fs.readFileSync('PathOfBuilding/src/' + path);
	console.log(`writing ${Object.keys(src).length} lua files to www/src.msgpack`);
	fs.writeFileSync('www/src.msgpack', packr.pack(src));
})();

(() => {
	const runtime = {};
	for (const path of iterLua('runtime/lua'))
		runtime[path] = fs.readFileSync('PathOfBuilding/runtime/lua/' + path);
	console.log(`writing ${Object.keys(runtime).length} lua files to www/runtime.msgpack`);
	fs.writeFileSync('www/runtime.msgpack', packr.pack(runtime));
})();
