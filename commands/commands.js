var sprintf = require('sprintf').sprintf;
exports.command = function (rooms, items, players, npcs, Commands)
{
	return function commandHelp(args, player)
	{
		var help = args && args.length ? args[0] : null;

		if(!help) {
			// display list of valid commands
			var commands = [];
			var maxlength = 0;
			for (var command in Commands.player_commands) {
				// todo: hide and/or color aliases?
				command += (Commands.player_commands[command].isAlias ? '[A]' : '');
				if (command.length > maxlength) maxlength = command.length;
				commands.push(command);
			}

			commands.sort();

			for (var i = 1; i < commands.length+1; i++) {
				player[i % 5 === 0? 'say' : 'write'](sprintf('%-' + (maxlength + 1) + 's', commands[i-1]));
			}
		} else {
			// display help for specific command
			if(help in Commands.player_commands) {
				var theCmd = Commands.player_commands[help];

				if(!theCmd.commandHelp) {
					if(theCmd.isAlias) {
						if(!Commands.player_commands[theCmd.aliasOf].commandHelp) {
							player.say("Sorry there doesn't appear to be any help for you on this matter");
						} else {
							player.say(Commands.player_commands[theCmd.aliasOf].commandHelp);
						}
					} else {
						player.say("Sorry there doesn't appear to be any help for you on this matter.");
					}
				} else {
					player.say(theCmd.commandHelp);
				}
			} else {
				player.say(help + ' does not appear to be a valid command.');
			}
		}

		return true;
	};
};
exports.commandHelp = "Displays a list of commands or help for a specific command.";