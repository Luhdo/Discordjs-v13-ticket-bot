const { client, config } = require("../../index.js");

module.exports = {
  data: { name: "ticketClose" },
  run: async (interaction) => {
    if (interaction.channel.name.split("-")[1] !== "ticket") return;

    interaction.reply({
      content: "**Are you sure you want to close this ticket?**",
      ephemeral: true,
      components: [
        {
          type: "ACTION_ROW",
          components: [
            {
              type: "SELECT_MENU",
              customId: "ticketCloseMenu",
              placeholder: "Please select an option...",
              minValues: null,
              maxValues: null,
              options: [
                {
                  label: "Yes, close the ticket!",
                  value: "ticketCloseYes",
                  emoji: "✅",
                  default: false,
                },
                {
                  label: "Noo, don't close this ticket!",
                  value: "ticketCloseNo",
                  emoji: "❌",
                  default: false,
                },
              ],
              disabled: false,
            },
          ],
        },
      ],
    });
  },
};
