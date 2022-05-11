const { Intents } = require("discord.js");
require("dotenv").config();

const config = {
  bot: {
    token: process.env.token,
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_MESSAGES,
    ],
    guildId: "854044193811202108",
    message: require("./message.json"),
  },
  ids: {
    ticketCategory: "854044194019999783", // category Id which tickets will get created
    ticketChannel: "854044194401419318", // Channel Id which ticket create message is sent
    modsRole: "797728539860008991", // role Id which gets mentioned when a new ticket gets created
  },
};

module.exports = config;
