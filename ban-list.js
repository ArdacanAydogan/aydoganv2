const { Client, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ban-list",
  description: "Banlı Olan Kullanıcıları Görürsün!",
  type: 1,
  options: [],

  run: async(client, interaction) => {

    var userlist = interaction.guild.bans.fetch()
    userlist.then(collection => {
    if(collection.first() == null){
      
    const embed = new EmbedBuilder()
    .setDescription("Sunucunuzda Banlanan Kimse Yok!")      
    .setColor("Red")
    .setTitle(":x: Hata!")
    interaction.reply({embeds: [embed]})
      
    } else {
    const data = collection.map(mr => "`"+mr.user.username+"`").slice(0, 60).join(", ")
    const embed2 = new EmbedBuilder()
    .setTitle("AYDOĞAN - Ban List")
    .setColor("#ff0000")
    .setImage("https://cdn.discordapp.com/attachments/783055798229401660/929398238459617331/standard_2.gif")
    .setDescription(data)
    interaction.reply({embeds: [embed2]})
}

  })
}

};
