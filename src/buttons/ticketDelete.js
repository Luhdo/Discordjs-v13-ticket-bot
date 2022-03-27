const { client, config } = require("../../index.js");

module.exports = {
  data: { name: "ticketDelete" },
  run: async (interaction) => {
    if (interaction.channel.name.split("-")[1] !== "ticket") return;
    await interaction.reply({
      content:
        "<a:Loading:907558077287497729> **Ticket will be deleted in a moment...**",
      ephemeral: false,
    });

    await interaction.channel.delete(
      `Ticket deleted by ${interaction.user.tag}`
    );
  },
};
