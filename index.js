const Discord = require('discord.js');
const client = new Discord.Client();
var request = require('request');
var fs = require('fs')
  , gm = require('gm');
let com = require('./commands.js');

client.on('message', msg => {
    let commandQueue = msg.content.split(' ');
    if(commandQueue.shift() == 'scrunt')
    {
        //Step 1: get the url, setup the chain
        let attach = msg.attachments.first();
        let url = attach.url;
        let chain = gm(request(url));
        //Step 2: loop through the commands
        while(commandQueue.length > 0)
        {
            let command = commandQueue.shift();
            try
            {
                //calls command by string name
                com[command](chain, commandQueue);
            }
            catch(e)
            {
                msg.channel.send("Failed Command: " + command);
                console.error(e);
            }
        }
        //Step 3: write to buffer and send
        chain.toBuffer('PNG',function (err, buffer) 
        {
            if (!err)
            {
                console.log('Image Processed!');
                msg.channel.send({
                    files: [buffer]
                  });
            }
            else
            {
                console.error(err);
            }
        });
    }
});

try {
    let data = fs.readFileSync('secret.txt', 'utf8');
    client.login(data);  
    console.log("logged in correctly! Awaiting commands");
} catch(e) {
    console.log('Error:', e.stack);
}