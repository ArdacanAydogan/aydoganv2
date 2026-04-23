const { Client, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Botun pingini görürsün!",
  type: 4,
  options: [],

  run: async(client, interaction) => {

    const { user, guildId, channel } = interaction;
const guild = client.guilds.cache.get()


    
    interaction.reply({ embeds: [ new EmbedBuilder().setDescription(`AYDOĞAN BOTUN PİNG DEĞERİ ***${client.ws.ping}ms***`).setColor("Random") ], ephemeral: true })
.setImage("https://cdn.discordapp.com/attachments/783055798229401660/929390925501825024/standard.gif")
  }

};
