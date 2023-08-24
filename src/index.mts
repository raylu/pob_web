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
	// runtime
	for (const path of [
		'base64.lua',
		'sha1/common.lua',
		'sha1/init.lua',
		'sha1/pure_lua_ops.lua',
		'xml.lua',
	])
		await prepareFile(path, 'runtime/' + path);
	await prepareFile('globals.lua', 'globals.lua');
	// actual PoB code
	for (const path of [
		'GameVersions.lua',
		'HeadlessWrapper.lua',
		'Launch.lua',
		'UpdateCheck.lua',

		'Data/Bases/amulet.lua',
		'Data/Bases/axe.lua',
		'Data/Bases/belt.lua',
		'Data/Bases/body.lua',
		'Data/Bases/boots.lua',
		'Data/Bases/bow.lua',
		'Data/Bases/claw.lua',
		'Data/Bases/dagger.lua',
		'Data/Bases/fishing.lua',
		'Data/Bases/flask.lua',
		'Data/Bases/gloves.lua',
		'Data/Bases/helmet.lua',
		'Data/Bases/jewel.lua',
		'Data/Bases/mace.lua',
		'Data/Bases/quiver.lua',
		'Data/Bases/ring.lua',
		'Data/Bases/shield.lua',
		'Data/Bases/staff.lua',
		'Data/Bases/sword.lua',
		'Data/Bases/wand.lua',
		'Data/BossSkills.lua',
		'Data/Bosses.lua',
		'Data/ClusterJewels.lua',
		'Data/Costs.lua',
		'Data/Crucible.lua',
		'Data/EnchantmentBelt.lua',
		'Data/EnchantmentBody.lua',
		'Data/EnchantmentBoots.lua',
		'Data/EnchantmentFlask.lua',
		'Data/EnchantmentGloves.lua',
		'Data/EnchantmentHelmet.lua',
		'Data/EnchantmentWeapon.lua',
		'Data/Essence.lua',
		'Data/Gems.lua',
		'Data/Global.lua',
		'Data/Minions.lua',
		'Data/Misc.lua',
		'Data/ModCache.lua',
		'Data/ModFlask.lua',
		'Data/ModItem.lua',
		'Data/ModJewel.lua',
		'Data/ModJewelAbyss.lua',
		'Data/ModJewelCluster.lua',
		'Data/ModMap.lua',
		'Data/ModMaster.lua',
		'Data/ModVeiled.lua',
		'Data/Pantheons.lua',
		'Data/QueryMods.lua',
		'Data/Rares.lua',
		'Data/SkillStatMap.lua',
		'Data/Skills/act_dex.lua',
		'Data/Skills/act_int.lua',
		'Data/Skills/act_str.lua',
		'Data/Skills/glove.lua',
		'Data/Skills/minion.lua',
		'Data/Skills/other.lua',
		'Data/Skills/spectre.lua',
		'Data/Skills/sup_dex.lua',
		'Data/Skills/sup_int.lua',
		'Data/Skills/sup_str.lua',
		'Data/Spectres.lua',
		'Data/StatDescriptions/active_skill_gem_stat_descriptions.lua',
		'Data/StatDescriptions/aura_skill_stat_descriptions.lua',
		'Data/StatDescriptions/banner_aura_skill_stat_descriptions.lua',
		'Data/StatDescriptions/beam_skill_stat_descriptions.lua',
		'Data/StatDescriptions/brand_skill_stat_descriptions.lua',
		'Data/StatDescriptions/buff_skill_stat_descriptions.lua',
		'Data/StatDescriptions/curse_skill_stat_descriptions.lua',
		'Data/StatDescriptions/debuff_skill_stat_descriptions.lua',
		'Data/StatDescriptions/gem_stat_descriptions.lua',
		'Data/StatDescriptions/minion_attack_skill_stat_descriptions.lua',
		'Data/StatDescriptions/minion_skill_stat_descriptions.lua',
		'Data/StatDescriptions/minion_spell_damage_skill_stat_descriptions.lua',
		'Data/StatDescriptions/minion_spell_skill_stat_descriptions.lua',
		'Data/StatDescriptions/monster_stat_descriptions.lua',
		'Data/StatDescriptions/offering_skill_stat_descriptions.lua',
		'Data/StatDescriptions/secondary_debuff_skill_stat_descriptions.lua',
		'Data/StatDescriptions/single_minion_spell_skill_stat_descriptions.lua',
		'Data/StatDescriptions/skill_stat_descriptions.lua',
		'Data/StatDescriptions/stat_descriptions.lua',
		'Data/StatDescriptions/variable_duration_skill_stat_descriptions.lua',
		'Data/TimelessJewelData/LegionPassives.lua',
		'Data/TimelessJewelData/LegionTradeIds.lua',
		'Data/TimelessJewelData/NodeIndexMapping.lua',
		'Data/Uniques/Special/Generated.lua',
		'Data/Uniques/Special/New.lua',
		'Data/Uniques/Special/WatchersEye.lua',
		'Data/Uniques/Special/race.lua',
		'Data/Uniques/amulet.lua',
		'Data/Uniques/axe.lua',
		'Data/Uniques/belt.lua',
		'Data/Uniques/body.lua',
		'Data/Uniques/boots.lua',
		'Data/Uniques/bow.lua',
		'Data/Uniques/claw.lua',
		'Data/Uniques/dagger.lua',
		'Data/Uniques/fishing.lua',
		'Data/Uniques/flask.lua',
		'Data/Uniques/gloves.lua',
		'Data/Uniques/helmet.lua',
		'Data/Uniques/jewel.lua',
		'Data/Uniques/mace.lua',
		'Data/Uniques/quiver.lua',
		'Data/Uniques/ring.lua',
		'Data/Uniques/shield.lua',
		'Data/Uniques/staff.lua',
		'Data/Uniques/sword.lua',
		'Data/Uniques/wand.lua',

		'Modules/Build.lua',
		'Modules/BuildList.lua',
		'Modules/BuildSiteTools.lua',
		'Modules/CalcActiveSkill.lua',
		'Modules/CalcBreakdown.lua',
		'Modules/CalcDefence.lua',
		'Modules/CalcOffence.lua',
		'Modules/CalcPerform.lua',
		'Modules/CalcSections.lua',
		'Modules/CalcSetup.lua',
		'Modules/CalcTools.lua',
		'Modules/Calcs.lua',
		'Modules/Common.lua',
		'Modules/ConfigOptions.lua',
		'Modules/Data.lua',
		'Modules/DataLegionLookUpTableHelper.lua',
		'Modules/ItemTools.lua',
		'Modules/Main.lua',
		'Modules/ModParser.lua',
		'Modules/ModTools.lua',
		'Modules/PantheonTools.lua',
		'Modules/StatDescriber.lua',
	])
		await prepareFile(path, 'lua/' + path);

	await lua.doFile('globals.lua');
	await lua.doFile('HeadlessWrapper.lua');
} finally {
	lua.global.close();
}
