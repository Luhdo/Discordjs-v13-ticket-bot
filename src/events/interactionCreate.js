module.exports = {
  event: "interactionCreate",
  oneTime: false,
  run: async (i) => {
    if (i.isCommand()) {
      const commandCheck = i.client.commands?.get(i.commandName);
      if (!commandCheck) {
        return console.log(`Could not find command" '${i.commandName}'`);
      } else {
        await commandCheck.run(i);
      }
    } else if (i.isSelectMenu()) {
      const menuCheck = i.client.menus.get(i.customId);
      if (!menuCheck) {
        return console.log(`Could not find command" '${i.customId}'`);
      } else {
        await menuCheck.run(i);
      }
    } else if (i.isButton()) {
      const buttonCheck = i.client.buttons.get(i.customId);
      if (!buttonCheck) {
        return console.log(`Could not find command" '${i.customId}'`);
      } else {
        await buttonCheck.run(i);
      }
    }
  },
};
