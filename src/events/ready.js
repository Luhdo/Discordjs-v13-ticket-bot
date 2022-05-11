const ora = require("ora");
const fs = require("fs");
const { client, config } = require("../../index.js");

const botLoader = ora("Starting Discord.js Client").start();

module.exports = {
  event: "ready",
  oneTime: true,
  run: async (client) => {
    botLoader.succeed(`${client.user.tag} Started`);

    let msg = config.bot.message;
    if (msg.id) {
      let Channel = await client.channels.fetch(config.ids.ticketChannel);
      let Message = await Channel.messages.fetch(msg.id);
      Message.edit(msg);
    } else {
      msg.components = [
        {
          type: "ACTION_ROW",
          components: [
            {
              type: "BUTTON",
              label: "",
              customId: "ticketCreate",
              style: "SUCCESS",
              emoji: "📩",
              url: null,
              disabled: false,
            },
          ],
        },
      ];

      let message = await client.channels.cache
        .get(config.ids.ticketChannel)
        .send(msg);

      msg.id = message.id;
      fs.writeFileSync(
        "./message.json",
        JSON.stringify(msg),
        "utf-8",
        (err) => {
          if (err) console.log(err);
        }
      );
    }

    // MENUS
    const menuFiles = fs
      .readdirSync("./src/menus")
      .filter((f) => f.endsWith(".js"));
    menuFiles.forEach((file) => {
      const menu = require(`../menus/${file}`);
      client.menus.set(menu.data.name, menu);
    });

    // BUTTONS
    const buttonFiles = fs
      .readdirSync("./src/buttons")
      .filter((f) => f.endsWith(".js"));
    buttonFiles.forEach((file) => {
      const button = require(`../buttons/${file}`);
      client.buttons.set(button.data.name, button);
    });
  },
};
