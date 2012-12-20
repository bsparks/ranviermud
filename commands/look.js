var CommandUtil = require('../src/command_util').CommandUtil;
var l10n_file = __dirname + '/../l10n/commands/look.yml';
var l10n = new require('localize')(require('js-yaml').load(require('fs').readFileSync(l10n_file).toString('utf8')), undefined, 'zz');
var Deferred = require('promised-io/promise').Deferred;

exports.command = function(rooms, items, players, npcs, Commands, GameSchema)
{
	Commands.alias('l', 'look');

	return function LookCmd(args, player)
	{
		var deferred = new Deferred();

		if(args && args.length > 0) {
			// then we are attempting to look "at" something not just the room, i.e. "look sword"

		}

		GameSchema.room.Room.findOne({location: player.getLocation()}, function(err, room) {
			//console.log("LOOK: ", player.getLocation(), room);

			if(!room) {
				player.sayL10n(l10n, 'LIMBO');
				deferred.resolve(true);
			} else {
				// grab all npcs in room
				GameSchema.npc.Npc.find({location: room.location}, function(err, npcs) {
					if(npcs.length > 0) {
						// search args for looking "at" npc
					}

					// render room
					player.say(room.title);
					player.say(room.descr[0][player.locale]); //todo cycle or random instead of 0?

					// display players in the same room
					players.eachIf(function (p) {
						return (p.getName() !== player.getName() && p.getLocation() === player.getLocation());
					}, function (p) {
						player.sayL10n(l10n, 'IN_ROOM', p.getName());
					});

					// display npcs in same room
					npcs.forEach(function(npc) {
						var color = 'white',
							diff = npc.getAttribute('level') - player.getAttribute('level');

						if(diff > 3) {
							color = 'red';
						} else if(diff >= 1) {
							color = 'yellow';
						} else if(diff >= -3 && diff < 0) {
							color = 'green';
						}

						player.say('<' + color + '>' + npc.getShortDesc(player.getLocale()) + '</' + color + '>');
					});

					// render exits
					player.write('[');
					player.writeL10n(l10n, 'EXITS');
					player.write(': ');
					room.exits.forEach(function(exit) {
						player.write(exit.direction + ' ');
					});
					player.say(']');

					deferred.resolve(true);
				});
			}
		});

		// because we need to do some other async biz, return a promise
		return deferred.promise;

		var room = rooms.getAt(player.getLocation());
		if (args) {
			// Look at items in the room first
			var thing = CommandUtil.findItemInRoom(items, args, room, player, true);

			if (!thing) {
				// Then the inventory
				thing = CommandUtil.findItemInInventory(args, player, true);
			}

			if (!thing) {
				// then for an NPC
				thing = CommandUtil.findNpcInRoom(npcs, args, room, player, true);
			}

			// TODO: look at players

			if (!thing) {
				player.sayL10n(l10n, 'ITEM_NOT_FOUND');
				return;
			}

			player.say(thing.getDescription(player.getLocale()));
			return;
		}

		// show all the items in the rom
		room.getItems().forEach(function (id) {
			player.say('<magenta>' + items.get(id).getShortDesc(player.getLocale()) + '</magenta>');
		});

		// show all npcs in the room
		room.getNpcs().forEach(function (id) {
			var npc = npcs.get(id);
			if (npc) {
				var color = 'cyan';
				switch (true) {
					case ((npc.getAttribute('level') - player.getAttribute('level')) > 3):
						color = 'red';
						break;
					case ((npc.getAttribute('level') - player.getAttribute('level')) >= 1):
						color = 'yellow';
						break;
					default:
						color = 'green'
						break;
				}
				player.say('<'+color+'>' + npcs.get(id).getShortDesc(player.getLocale()) + '</'+color+'>');
			}
		});
		player.say(']');
	};
};
