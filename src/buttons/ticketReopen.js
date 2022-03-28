const { client, config } = require("../../index.js");

module.exports = {
  data: { name: "ticketReopen" },
  run: async (interaction) => {
    if (interaction.channel.name.split("-")[1] !== "ticket") return;

    await interaction.deferReply({ ephemeral: false });

    let TheArray = [];
    const Perms = await interaction.channel.permissionOverwrites.cache.filter(
      (perm) => (perm.type = "member")
    );
    await Perms.map((m) => TheArray.push(m));
    TheArray.forEach((mem) => {
      interaction.channel.permissionOverwrites
        .edit(
          mem.id,
          {
            VIEW_CHANNEL: true,
          },
          { type: 1, reason: "Reopening Ticket" }
        )
        .catch((err) => {
          return err;
        });
    });

    await interaction.editReply({
      embeds: [
        {
          description: `🔓 **Ticket has been reopened by: <@${interaction.member.id}>**.`,
          timestamp: new Date(),
        },
      ],
      ephemeral: false,
    });
  },
};
