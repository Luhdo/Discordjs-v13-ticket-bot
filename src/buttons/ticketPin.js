const { Permissions } = require("discord.js");
const { client, config } = require("../../index.js");

module.exports = {
  data: { name: "ticketPin" },
  run: async (interaction) => {
    const Channel = await interaction.channel;
    console.log(Channel);
  },
};
