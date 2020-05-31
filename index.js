const Discord = require("discord.js")
const client = new Discord.Client();
const low = require('lowdb') //banco de dados

const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('banco.json')
const db = low(adapter)


client.on("ready", () => {
  console.log(`Bot foi iniciado!`); 
});

client.on("message", async massage => {
  if(massage.author.bot) return;
  if(massage.channel.type == 'dm') return;

  const args = massage.content.slice("!").trim().split(/ +/g);
  const comando = args.shift().toLowerCase();

  if(comando == "!pedidos"){
    array = db.get(massage.guild.id).value();
    var printar = "";

    for (i = 0; i < array.length; i++) {
      x = array[i]["comida"][0];
      
      printar = (printar + String(x) + "\n");
    }

    massage.channel.send("Aqui está a sua lista de pedidos: " +"\n" + printar) 

  }
  if(comando == "!pedir"){
      db.get(massage.guild.id).push({ comida: args}).write();
      massage.channel.send("Você adicionou o Pedido: " + args );
  }
  if(comando == "!cancelar"){
    console.log(args);
    db.get(massage.guild.id).remove({ comida: args }).write();
    massage.channel.send("Removido da lista o Pedido: " + args );
  }
})
client.login("NzE2NzI4MzAzMDcxMDAyNjg0.XtQBPg.7zP0UVPkK-X-j0fLt69ats-OSX0");