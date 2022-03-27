const { client, config } = require("../../index.js");

module.exports = {
  data: { name: "ticketClose" },
  run: async (interaction) => {
    if (interaction.channel.name.split("-")[1] !== "ticket") return;

    interaction.reply({
      content: "**آیا از بستن تیکت اطمینان دارید؟**",
      ephemeral: true,
      components: [
        {
          type: "ACTION_ROW",
          components: [
            {
              type: "SELECT_MENU",
              customId: "ticketCloseMenu",
              placeholder: "لطفا یک گزینه را انتخاب کنید...",
              minValues: null,
              maxValues: null,
              options: [
                {
                  label: "بله! تیکت رو ببند!",
                  value: "ticketCloseYes",
                  emoji: "✅",
                  default: false,
                },
                {
                  label: "نه، تیکت رو نبند!",
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
