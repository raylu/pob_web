import * as fs from 'fs';
import {Packr} from 'msgpackr';

function* iterLua(dir: string): Iterable<string> {
	for (const path of fs.readdirSync('PathOfBuilding/' + dir, {recursive: true, encoding: 'utf-8'})) {
		if (!path.endsWith('.lua'))
			continue;
		if (path.startsWith('TreeData/') && !path.startsWith('TreeData/3_22/'))
			continue;
		yield path;
	}
}

const packr = new Packr({useRecords: true, bundleStrings: true});

function writePack(dir: string, filename: string) {
	const pack = {};
	for (const path of iterLua(dir)) {
		let src = fs.readFileSync(`PathOfBuilding/${dir}/${path}`, {encoding: 'utf-8'});
		const split = src.split('\n', 1);
		if (split[0].substring(0, 2) == '#@')
			src = '--' + src; // ignore the first line
		pack[path] = src;
	}
	console.log(`writing ${Object.keys(pack).length} lua files to www/${filename}.msgpack`);
	fs.writeFileSync(`www/${filename}.msgpack`, packr.pack(pack));
}

writePack('src', 'src');
writePack('runtime/lua', 'runtime');
