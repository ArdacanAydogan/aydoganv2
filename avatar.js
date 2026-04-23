const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
module.exports = {
    name:"avatar",
    description: 'Birinin Avatarına Bakarsın!',
    type:1,
    options: [
        {
            name:"user",
            description:"Avatarına Bakmak İstediğin Kullanıcıyı Etiketle!",
            type:6,
            required:true
        },
      
    ],
  run: async(client, interaction) => {
const link = interaction.user.avatarURL()
    const user = interaction.options.getMember('user')
   const embed = new EmbedBuilder()
   .setDescription(link)
   .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
   interaction.reply({embeds: [embed]})
}

};
