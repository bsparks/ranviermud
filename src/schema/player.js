// player.js

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    l10n = require('./l10n.js').l10nSchema,
    ansi = require('sty');

var PlayerSchema = new Schema({
    name: { type: String, required: true, index: { unique: true} },
    password: {type: String, required: true},
    shortDescr: String,
    descr: String,
    location: {type: Number, "default": -1},
    attributes: {
        level: {type: Number, "default": 1},
        health: {type: Number, "default": 1},
        max_health: {type: Number, "default": 1},
        speed: {type: Number, "default": 1},
        experience: {type: Number, "default": 0}
    },
    inventory: [Schema.Types.ObjectId],
    equipment: {type: Object},
    locale: {type: String, "default": 'en'},
    prompts: {
        normal: {type: String, "default": '%health/%max_healthHP>'},
        combat: {type: String, "default": "<bold>[%health/%max_healthHP] 0--{======> %target_name: [%target_health/%target_max_health]</bold>\r\n>"}
    }
});

// virtuals get called every time in a stack, dont do them here!
PlayerSchema.methods.setSocket = function(socket) {
    this.socket = socket;
};

PlayerSchema.methods.getSocket = function() {
    return this.socket;
};

/**
 * Write to a player's socket
 * @param string data Stuff to write
 */
PlayerSchema.methods.write = function(data, color) {
    if(!this.socket) return; // must not be online? todo: better error handling/logs?

    color = color || true;
    if (!color) ansi.disable();
    this.socket.write(ansi.parse(data));
    ansi.enable();
};

/**
 * Write based on player's locale
 * @param Localize l10n
 * @param string   key
 * @param ...
 */
PlayerSchema.methods.writeL10n = function(l10n, key) {
    var locale = l10n.locale;
    if (this.locale) {
        l10n.setLocale(this.locale);
    }

    this.write(l10n.translate.apply(null, [].slice.call(arguments).slice(1)));

    if (locale) l10n.setLocale(locale);
};

/**
 * write() + newline
 * @see write
 */
PlayerSchema.methods.say = function(data, color) {
    if(!this.socket) return; // must not be online? todo: better error handling/logs?

    color = color || true;
    if (!color) ansi.disable();
    this.socket.write(ansi.parse(data) + "\r\n");
    ansi.enable();
};

/**
 * writeL10n() + newline
 * @see self.writeL10n
 */
PlayerSchema.methods.sayL10n = function(l10n, key) {
    var locale = l10n.locale;
    if (this.locale) {
        l10n.setLocale(this.locale);
    }

    this.say(l10n.translate.apply(null, [].slice.call(arguments).slice(1)));
    if (locale) l10n.setLocale(locale);
};

/**
 * Display the configured prompt to the player
 * @param type of prompt to use i.e. "normal" or "combat"
 * @param object extra Other data to show
 */
PlayerSchema.methods.prompt = function(prompt, extra) {
    var self = this;

    if(!prompt || !(prompt in self.prompts)) {
        prompt = "normal";
    }

    var pstring = self.prompts[prompt];

    for (var attr in self.attributes) {
        pstring = pstring.replace("%" + attr, self.attributes[attr]);
    }

    if(extra) {
        for (var data in extra) {
            pstring = pstring.replace("%" + data, extra[data]);
        }
    }

    pstring = pstring.replace(/%[a-z_]+?/, '');
    self.write("\r\n" + pstring);
};

var Player = mongoose.model('Player', PlayerSchema);

exports.PlayerSchema = PlayerSchema;
exports.Player = Player;