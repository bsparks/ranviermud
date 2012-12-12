var l10n_file = __dirname + '/../l10n/commands/inventory.yml';
var l10n = require('../src/l10n')(l10n_file);
var linq = require('../src/lib/linq');
exports.command = function (rooms, items, players, npcs, Commands)
{
	Commands.alias('backpack', 'inventory');
	Commands.alias('bags', 'inventory');

	return function (args, player)
	{
		player.sayL10n(l10n, 'INV');

		// See how many of an item a player has so we can do stuff like (2) apple
		var backpack = linq.from(player.getInventory())
			.where("!$.isEquipped()")
			.groupBy('$.getVnum()', '', function(vnum, items) {
				var out = items.select('$.getShortDesc("' + player.getLocale() + '")').first(),
					count = items.count();
				if(count > 1) {
					out = '(' + count + ') ' + out;
				}
				return out;
			});

		backpack.forEach(function(item) {
			player.say(item);
		});
	};
};
