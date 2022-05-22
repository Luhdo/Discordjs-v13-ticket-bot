const { client, config } = require("../../index.js");
const fs = require("fs");

module.exports = {
  data: { name: "ticketSave" },
  run: async (interaction) => {
    if (interaction.channel.name.split("-")[1] !== "ticket") return;

    // await interaction.deferReply({ ephemeral: false });
    let TheArray = [];
    await interaction.channel.messages.cache.map((msg) => {
      let message = {
        author: msg.author.tag,
        content: msg.content || "",
        time: msg.createdAt,
      };
      let string = `${message.author} : ${message.content} | ${message.time}`;
      TheArray.push(string);
    });

    fs.writeFileSync(
      `./Database/${interaction.channel.name}.txt`,
      TheArray.join("\n_____________________________\n"),
      { encoding: "utf-8" }
    );
  },
};
