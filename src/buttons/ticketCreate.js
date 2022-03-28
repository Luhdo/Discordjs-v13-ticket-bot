const { Permissions } = require("discord.js");
const { client, config } = require("../../index.js");

module.exports = {
  data: { name: "ticketCreate" },
  run: async (interaction) => {
    await interaction.deferReply({ ephemeral: true });

    const num = Math.round(Math.random() * 100 + 1);
    const Channel = await interaction.guild.channels.create(
      `${num}-ticket-${interaction.member.displayName.split(" ").join("")}`,
      {
        reason: `Ticket created by ${interaction.user.tag}`,
        type: "GUILD_TEXT",
        parent: config.ids.ticketCategory,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [Permissions.FLAGS.VIEW_CHANNEL],
          },
        ],
      }
    );
    await Channel.setParent(
      await interaction.guild.channels.cache.get(config.ids.ticketCategory),
      { lockPermissions: true }
    );
    await Channel.permissionOverwrites.create(interaction.member, {
      VIEW_CHANNEL: true,
      SEND_MESSAGES: true,
    });

    const MSG = await Channel.send({
      content: `Welcome <@${interaction.member.id}> ، <@${config.ids.modsRole}>`,
      embeds: [
        {
          description: `Soon a <@${config.ids.modsRole}> will talk to you! For now, you can start telling us what's the issue, so that we can help you faster! :)
In case you dont need help anymore, or you want to close this ticket, click on the 🔒 and then on the ✅ that will show up!`,
          color: "#ffe0e6",
        },
      ],
      components: [
        {
          type: "ACTION_ROW",
          components: [
            {
              type: "BUTTON",
              label: "Close Ticket",
              customId: "ticketClose",
              style: "DANGER",
              emoji: "🔒",
              url: null,
              disabled: false,
            },
            {
              type: "BUTTON",
              label: "Admin Only Ticket",
              customId: "ticketAdmin",
              style: "PRIMARY",
              emoji: "🛡",
              url: null,
              disabled: false,
            },
            {
              type: "BUTTON",
              label: "Pin Ticket",
              customId: "ticketPin",
              style: "SECONDARY",
              emoji: "📌",
              url: null,
              disabled: true,
            },
          ],
        },
      ],
    });
    await MSG.pin();

    await interaction.editReply({
      content: `Ticket has been created, <#${Channel.id}>`,
      ephemeral: true,
    });
  },
};
