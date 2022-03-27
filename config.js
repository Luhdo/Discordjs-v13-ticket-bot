const { Intents } = require("discord.js");
require("dotenv").config();

const config = {
  bot: {
    token: process.env.token,
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS],
    guildId: "854044193811202108",
    message: require("./message.json"),
  },
  ids: {
    ticketCategory: "793455524746100766",
    ticketChannel: "854044194401419318",
  },
};

module.exports = config;
