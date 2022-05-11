const { Permissions } = require("discord.js");
const { client, config } = require("../../index.js");

module.exports = {
  data: { name: "ticketCloseMenu" },
  run: async (interaction) => {
    if (interaction.channel.name.split("-")[1] !== "ticket") return;

    await interaction.deferUpdate({ ephemeral: true });

    switch (interaction.values[0]) {
      case "ticketCloseYes": {
        if (!interaction.values[0] === "ticketCloseYes") return;

        let TheArray = [];
        const Perms =
          await interaction.channel.permissionOverwrites.cache.filter(
            (perm) => (perm.type = "member")
          );
        await Perms.map((m) => TheArray.push(m));
        TheArray.forEach((mem) => {
          interaction.channel.permissionOverwrites
            .edit(
              mem.id,
              {
                VIEW_CHANNEL: false,
              },
              { type: 1, reason: "Closing Ticket" }
            )
            .catch((err) => {
              return err;
            });
        });

        interaction.channel.send({
          embeds: [
            {
              description: `Ticket has been closed by: <@${interaction.member.id}>.`,
              timestamp: new Date(),
            },
          ],
          components: [
            {
              type: "ACTION_ROW",
              components: [
                {
                  type: "BUTTON",
                  label: "Delete Ticket",
                  customId: "ticketDelete",
                  style: "DANGER",
                  emoji: "⛔",
                  url: null,
                  disabled: false,
                },
                {
                  type: "BUTTON",
                  label: "Save Ticket",
                  customId: "ticketSave",
                  style: "PRIMARY",
                  emoji: "📑",
                  url: null,
                  disabled: false,
                },
                {
                  type: "BUTTON",
                  label: "Reopen Ticket",
                  customId: "ticketReopen",
                  style: "SECONDARY",
                  emoji: "🔓",
                  url: null,
                  disabled: false,
                },
              ],
            },
          ],
        });

        await interaction.editReply({
          content: "Ticket has been closed.",
          ephemeral: true,
          components: [
            {
              type: "ACTION_ROW",
              components: [
                {
                  type: "SELECT_MENU",
                  customId: "ticketCloseMenu",
                  placeholder: "Please choose an option...",
                  minValues: null,
                  maxValues: null,
                  options: [
                    {
                      label: "Yes, close the ticket",
                      value: "ticketCloseYes",
                      emoji: "✅",
                      default: true,
                    },
                    {
                      label: "No, don't close the ticket",
                      value: "ticketCloseNo",
                      emoji: "❌",
                      default: false,
                    },
                  ],
                  disabled: true,
                },
              ],
            },
          ],
        });
      }
      case "ticketCloseNo": {
        if (!interaction.values[0] === "ticketCloseNo") return;

        await interaction.editReply({
          content: "The closing operation was canceled",
          ephemeral: true,
          components: [
            {
              type: "ACTION_ROW",
              components: [
                {
                  type: "SELECT_MENU",
                  customId: "ticketCloseMenu",
                  placeholder: "Please choose an option...",
                  minValues: null,
                  maxValues: null,
                  options: [
                    {
                      label: "Yes, close the ticket",
                      value: "ticketCloseYes",
                      emoji: "✅",
                      default: false,
                    },
                    {
                      label: "No, don't close the ticket",
                      value: "ticketCloseNo",
                      emoji: "❌",
                      default: true,
                    },
                  ],
                  disabled: true,
                },
              ],
            },
          ],
        });
      }
    }
  },
};
