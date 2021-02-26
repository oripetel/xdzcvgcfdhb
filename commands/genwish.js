    const { timeStamp } = require('console');
const Discord = require('discord.js');
const fs = require('fs');
const { Stream } = require('stream');
const cooldown = new Set();
var string3 = "Wish";

function lineCount( text ) {
    var nLines = 0;
    for( var i = 0, n = text.length;  i < n;  ++i ) {
        if( text[i] === '\n' ) {
            ++nLines;
        }
    }
    return nLines;
}

module.exports.run = async (client, msg, args, config) => {
    if(cooldown.has(msg.author.id)) {
        let embed2 = new Discord.RichEmbed()
        .setDescription(`You are on cooldown (${config.COOLDOWN * 60} sec), chill down man these accounts aren't infinite lol.`)
        .setColor('#ED2828')
        msg.author.send(embed2)
            .then((m) => {
                msg.delete();

                setTimeout(() => {
                    m.delete();
                }, 600000);
        return;
            });
    } else {
        fs.readFile(`./accounts/${string3.replace(/ /g,'').toLowerCase()}.txt`, 'utf8', function(err, data) {
            if (err) throw err;

            data = data + '';
            var lines = data.split('\n');
            let account = lines[Math.floor(Math.random() * 1)];
            fs.writeFile(`./accounts/${string3.replace(/ /g,'').toLowerCase()}.txt`, lines.slice(1).join('\n'), function(err) {
                if(err) throw err;
            });
            msg.author.send(`**__𝓐𝓒𝓒𝓞𝓤𝓝𝓣  𝓘𝓝𝓕𝓞__**\nEnjoy your account, please keep in mind that sharing accounts and changing the password is prohibited and will result in you being locked out of the account:\n**-[${string3}]-** ${account}\n__*This message will be autodestructed in 10 minutes*__`,{files:["./images/add.gif"]})
            .then(m => {
                setTimeout(() => {
                    m.delete();
                }, 600000);
            });
            client.channels.get("803289056430915664").send(`<@${msg.author.id}> -__** [${string3} Account]**__-.`)
            cooldown.add(msg.author.id);
            setTimeout(() => {
                cooldown.delete(msg.author.id);
            }, config.COOLDOWN * 60 * 1000);
        });
    }
};
module.exports.help = {
    name: `${string3}`,
    description: `Sends you a ${string3} account!`
};