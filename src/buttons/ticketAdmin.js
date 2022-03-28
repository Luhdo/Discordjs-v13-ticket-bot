const { client, config } = require("../../index.js");

module.exports = {
  data: { name: "ticketAdmin" },
  run: async (interaction) => {
    if (interaction.channel.name.split("-")[1] !== "ticket") return;

    let TheArray = [];
    const Perms = await interaction.channel.permissionOverwrites.cache.filter(
      (perm) => (perm.type = "role")
    );
    await Perms.map((m) => TheArray.push(m));
    TheArray.forEach((mem) => {
      interaction.channel.permissionOverwrites
        .edit(
          mem.id,
          {
            VIEW_CHANNEL: false,
          },
          { type: 0, reason: "AdminOnly Ticket" }
        )
        .catch((err) => {
          return err;
        });
    });

    interaction.reply({
      content: "**Ticket  has been changed to admin only**",
      ephemeral: true,
    });

    interaction.channel.send({
      embeds: [
        {
          description: `ticket state has been changed to AdminOnly mode by :<@${interaction.member.id}> `,
          timestamp: new Date(),
        },
      ],
    });
  },
};
