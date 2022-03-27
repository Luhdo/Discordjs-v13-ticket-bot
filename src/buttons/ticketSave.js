const { client, config } = require("../../index.js");

module.exports = {
  data: { name: "ticketSave" },
  run: async (interaction) => {
    if (interaction.channel.name.split("-")[1] !== "ticket") return;

    // await interaction.deferReply({ ephemeral: false });
    let TheArray = [];
    await interaction.channel.messages.cache.map((msg) => TheArray.push(msg));

    let Final = TheArray.map((message) => {
      message;
    });

    console.log(Final);
  },
};
