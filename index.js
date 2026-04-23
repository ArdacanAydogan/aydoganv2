const { Client, GatewayIntentBits, Partials } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const Discord = require("discord.js")
const db = require("croxydb")
const client = new Client({
    intents: INTENTS,
    allowedMentions: {
        parse: ["users"]
    },
    partials: PARTIALS,
    retryLimit: 3
});
client.on("ready", () => {
  client.user.setStatus("idle");
});

const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => res.status(200).send('Power By Uptime Bot'));
app.listen(port, () =>
console.log(`Okey`)
);
client.on("ready", async () => {
//BOT BAŞLADIKDAN 120 SANİYE SONRA ÇALIŞMAYA BAŞLAR VE VERİLERİ HER 120 SANİYEDE BİR YENİLER.
let csk1 = "1072889496741351526"
let csk2 = "1072889518224592986"
let csk3 = "1208446996751327292"
let csk4 = "1072895523876520066"
let csg = "1247254371469627524"

setInterval(() => {
const guild = client.guilds.cache.get(csg)
if(guild){
const c1 = guild.channels.cache.get(csk1)
const c2= guild.channels.cache.get(csk2)
const c3= guild.channels.cache.get(csk3)
const c4 = guild.channels.cache.get(csk4)
if(c1){
c1.setName("📋・Toplam Üye: "+guild.memberCount)
}
if(c2){
c2.setName("🤖・Toplam Bot: "+guild.members.cache.filter(m => m.user.bot).size)
}
if(c3){
const as = guild.channels.cache.filter(c => c.type === "GUILD_VOICE");
let count = 0;
for (const [id, voiceChannel] of as)
count += voiceChannel.members.size;
c3.setName("BİZE BÖYLE BİR EMİR GELMEDİ: "+guild.channels.voiceCount)
}
if(c4){
c4.setName("📚・Kanal Sayısı: "+guild.channels.cache.size)
}
} else {
console.log("Belirtilen Sunucu Bulunamadı!")
}
}, 120000)
})
global.client = client;
client.commands = (global.commands = []);

const { readdirSync } = require("fs")
const { TOKEN } = require("./config.json");
readdirSync('./commands').forEach(f => {
  if(!f.endsWith(".js")) return;

 const props = require(`./commands/${f}`);

 client.commands.push({
       name: props.name.toLowerCase(),
       description: props.description,
       options: props.options,
       dm_permission: props.dm_permission,
       type: 1
 });

console.log(`[COMMAND] ${props.name} komutu yüklendi.`)

});
readdirSync('./events').forEach(e => {

  const eve = require(`./events/${e}`);
  const name = e.split(".")[0];

  client.on(name, (...args) => {
            eve(client, ...args)
        });
console.log(`[EVENT] ${name} eventi yüklendi.`)
});


client.login(TOKEN)

client.on("guildMemberAdd", member => {
  const kanal = db.get(`hgbb_${member.guild.id}`)
  if(!kanal) return;
  member.guild.channels.cache.get(kanal).send({content: `:inbox_tray: | ${member} sunucuya katıldı! Sunucumuz **${member.guild.memberCount}** kişi oldu.`})
})

client.on("messageCreate", async message => {
  const db = require("croxydb");

  if (await db.get(`afk_${message.author.id}`)) {
   
    db.delete(`afk_${message.author.id}`);

    message.reply("Afk Modundan Başarıyla Çıkış Yaptın!");
  }

  var kullanıcı = message.mentions.users.first();
  if (!kullanıcı) return;
  var sebep = await db.get(`afk_${kullanıcı.id}`);

  if (sebep) {
    message.reply("Etiketlediğin Kullanıcı **"+sebep+"** Sebebiyle Afk Modunda!");
  }
});
client.on("guildMemberAdd", member => {
  const rol = db.get(`otorol_${member.guild.id}`)
  if(!rol) return;
  member.roles.add(rol).catch(() => {})

})
client.on("guildMemberAdd", member => {
  const tag = db.get(`ototag_${member.guild.id}`)
  if(!tag) return;
  member.setNickname(`${tag} | ${member.displayName}`)
})
client.on("guildMemberRemove", member => {
  const kanal = db.get(`hgbb_${member.guild.id}`)
  if(!kanal) return;
  member.guild.channels.cache.get(kanal).send({content: `:outbox_tray: | ${member} sunucudan ayrıldı! Sunucumuz **${member.guild.memberCount}** kişi oldu.`})
})
client.on("guildCreate", async guild => {
  let { EmbedBuilder } = require("discord.js"); //bu satır hata verirse sizde zaten tanımlıdır silebilirsiniz.
  let user = await guild.fetchAuditLogs({ limit: 1, type: 28})
  let embed = new EmbedBuilder()
    .setTitle("Merhaba!")
    .setDescription("Beni sunucuna eklediğin için teşekkürler komutlarımı görmek için /yardım yazarak görebilirsin.")
    .setFooter({ text: "AYDOĞAN" })
  .setImage("https://cdn.discordapp.com/attachments/783055798229401660/929390925501825024/standard.gif")
  .setColor("RANDOM")
  user.entries.first().executor.send({ embeds: [embed] })
})
client.on("messageCreate", (message) => {
  const db = require("croxydb")
  let kufur = db.fetch(`kufurengel_${message.guild.id}`)
  if(!kufur) return;
  
  if(kufur) {
  const kufurler = [
    "amk",
    "piç",
    "yarrak",
    "oç",
    "göt",
    "amq",
    "yavşak",
    "amcık",
    "amcı",
    "orospu",
    "sikim",
    "sikeyim",
    "aq",
    "mk"
       
  ]
  
if(kufurler.some(alo => message.content.toLowerCase().includes(alo))) {
message.delete()
message.channel.send(`Hey <@${message.author.id}>, Bu Sunucuda Küfür Engel Sistemi Aktif! `)
}
}
})
client.on("messageCreate", (message) => {
  const db = require("croxydb")
  let reklamlar = db.fetch(`reklamengel_${message.guild.id}`)
  if(!reklamlar) return;
  
  if(reklamlar) {

  const linkler = [
    
    ".com.tr",
    ".net",
    ".org",
    ".tk",
    ".cf",
    ".gf",
    "https://",
    ".gq",
    "http://",
    ".com",
    ".gg",
    ".porn",
    ".edu"
       
  ]
  
if(linkler.some(alo => message.content.toLowerCase().includes(alo))) {
message.delete()
message.channel.send(`Hey <@${message.author.id}>, Bu Sunucuda Reklam Engel Sistemi Aktif! `)
}
}
})
client.on("message", (message) => {
  if (message.content.toLowerCase == `<@AYDOĞAN#5412>`)
    return message.channel.send(`ARTIK BANA SLASH KOMUTUYLA ULAŞMAN GEREKİYOR :( . \n Bize 1-2 Dakikanı Ayırıp Oy Verebilir Misin ? :pleading_face: \n https://top.gg/bot/584513444066099210/vote`);
});  

client.on("messageCreate", (message) => {
  
  let saas = db.fetch(`saas_${message.guild.id}`)
  if(!saas) return;
  
  if(saas) {
  
  let selaamlar = message.content.toLowerCase()  
if(selaamlar === 'sa' || selaamlar === 'slm' || selaamlar === 'sea' || selaamlar === ' selamünaleyküm' || selaamlar === 'Selamün Aleyküm' || selaamlar === 'selam'){

message.reply(`Aleykümselam, Hoşgeldin`)
}
}
})


client.on("messageCreate", (message) => {
  
  let saas = db.fetch(`saas_${message.guild.id}`)
  if(!saas) return;
  
  if(saas) {
  
  let selaamlar = message.content.toLowerCase()  
if(selaamlar === 'günaydın' || selaamlar === 'gnydn' || selaamlar === 'güno'){

message.reply(`Sanada günaydın cano, Hoşgeldin`)
}
}
})// SUNUCU EKLENME 


client.on("message", async (message) => {
  if (message.author.id === client.user.id) return;
  if (message.guild) return;
  client.channels.cache
    .get("900426450195329095")
    .send(
      new Discord.EmbedBuilder()
        .setAuthor("YİNE BİR DM MESAJI VARR", client.user.avatarURL)
        .setFooter(message.author.tag, message.author.avatarURL)
        .setDescription(`**Gönderenin KİŞİ:** ${message.author , message.author.id}`)
        .setTimestamp()
        .addFields("Mesaj", message.content)
        .setColor("RANDOM")
    );
});
client.on("messageCreate", (message) => {
  
  let saas = db.fetch(`saas_${message.guild.id}`)
  if(!saas) return;
  
  if(saas) {
  
  let selaamlar = message.content.toLowerCase()  
if(selaamlar === 'iyi geceler' || selaamlar === 'ii geceler' || selaamlar === 'iyigeceler'){

message.reply(`İyi Geceler Uyumadın mı ?`)
}
}
})
client.on("interactionCreate", async interaction => {
  if (!interaction.isButton()) return;
  let message = await interaction.channel.messages.fetch(interaction.message.id)  
  if(interaction.customId == "moderasyon") {
const embed = new Discord.EmbedBuilder()
.setTitle("AYDOĞAN - Yardım Menüsü!")
.setDescription("/ban-list - **Banlı Kullanıcıları Gösterir!**\n/ban - **Bir Üyeyi Yasaklarsın!**\n/emojiler - **Emojileri Görürsün!**\n/forceban - **ID İle Bir Kullanıcıyı Yasaklarsın!**\n/giriş-çıkış - **Giriş çıkış kanalını ayarlarsın!**\n/kanal-açıklama - **Kanalın Açıklamasını Değiştirirsin!**\n/kick - **Bir Üyeyi Atarsın!**\n/küfür-engel - **Küfür Engel Sistemini Açıp Kapatırsın!**\n/oto-rol - **Otorolü Ayarlarsın!**\n/oto-tag - **Oto Tagı Ayarlarsın!**\n/oylama - **Oylama Açarsın!**\n/reklam-engel - **Reklam Engel Sistemini Açarsın!**\n/rol-al - **Rol Alırsın**\n/rol-oluştur - **Rol Oluşturursun!**\n/rol-ver - **Rol Verirsin!**\n/sa-as - **Selam Sistemine Bakarsın!**\n/temizle - **Mesaj Silersin!**\n/unban - **Bir üyenin yasağını kaldırırsın!**")
.setColor("Random")
interaction.reply({embeds: [embed], components: [], ephemeral: true})
  }
  if(interaction.customId == "kayıt") {
    const embed = new Discord.EmbedBuilder()
    .setTitle("AYDOĞAN - Yardım Menüsü!")
    .setDescription("/kayıtlı-rol - **Kayıtlı Rolünü Ayarlarsın!**\n/kayıt-et - **Bir Üyeyi Kayıt Edersin!**")
    .setColor("Random")
        .setImage("https://cdn.discordapp.com/attachments/783055798229401660/929390925501825024/standard.gif")
    interaction.reply({embeds: [embed], components: [], ephemeral: true})
  }
  if(interaction.customId == "kullanıcı") {
    const embed = new Discord.EmbedBuilder()
    .setTitle("AYDOĞAN - Yardım Menüsü!")
    .setDescription("/avatar - **Bir Kullanıcının Avatarına Bakarsın!**\n/afk - **Sebepli Afk Olursun!**\n/emoji-yazı - **Bota Emoji İle Yazı Yazdırırsın!**\n/istatistik - **Bot istatistiklerini gösterir!**\n/kurucu-kim - **Kurucuyu Gösterir!**\n/ping - **Botun pingini gösterir!**\n/yardım - **Yardım Menüsünü Gösterir!**")
    .setColor("Random")
        .setImage("https://cdn.discordapp.com/attachments/783055798229401660/929390925501825024/standard.gif")
    interaction.reply({embeds: [embed], components: [], ephemeral: true})
  }
})