const { Permissions } = require("discord.js");
const { client, config, Webhook } = require("../../index.js");
const fs = require("fs");

module.exports = {
  data: { name: "ticketCreate" },
  run: async (interaction) => {
    await interaction.deferReply({ ephemeral: true });
    let DataBase = JSON.parse(fs.readFileSync("./Database/tickets.json"));

    if (DataBase[interaction.user.id]?.channel)
      return interaction.editReply({
        content: `شما هم اکنون یک تیکت باز دارید,\n<:right:899620946992857148> <#${
          DataBase[interaction.user.id].channel
        }>`,
      });

    const num = Math.round(Math.random() * 100 + 1);
    const Channel = await interaction.guild.channels.create(
      `${num}-ticket-${interaction.member.user.username.split(" ").join("")}`,
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
      content: `خوش اومدید <@${interaction.member.id}> ، <@&968917259722575883><@&968917311555768432>`,
      embeds: [
        {
          description: `اگر کارتون تموم شده و دیگه نیازی به کمک ما ندارید میتونید بر روی دکمه ی **{Close Ticket🔒}** کلیک کنید تا تیکت بسته بشه

اگر میخواهید که توی این تیکت فقط با اونر این سرور صحبت بکنید ومادریتورها به این تیکت دسترسی نداشته باشند بر روی دکمه ی **{:shield: Admin Only Ticket}** کلیک کنید`,
          color: "#ffe0e6",
          author: {
            name: "به زودی یک مادریتور با شما صحبت خواهد کرد؛ شما از الان میتونید مشکل خودتون رو بیان کنید تا ما بتونیم سریعتر بهتون کمک کنیم!",
          },
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
      content: `تیکت شما ایجاد شد, <#${Channel.id}>`,
      ephemeral: true,
    });

    let msg = await client.channels.cache
      .get(config.ids.ticket.logChannel)
      .send({
        embeds: [
          {
            color: "#00aa00",
            title: `تیکت ایجاد شده توسط: ${interaction.user.tag}`,
            fields: [
              {
                name: "شخص بن شده",
                value: `${interaction.member.roles.cache.has(
                  config.ids.handCuffRole
                )} `,
              },
            ],
          },
        ],
        components: [
          {
            type: "ACTION_ROW",
            components: [
              {
                type: "BUTTON",
                label: "وضعیت: باز",
                customId: "ticketIsOpen",
                style: "SUCCESS",
                emoji: "✔",
                url: null,
                disabled: true,
              },
              {
                type: "BUTTON",
                label: "رفتن به تیکت",
                style: "LINK",
                url: MSG.url,
                disabled: false,
              },
            ],
          },
        ],
      });

    DataBase[interaction.user.id] = { channel: Channel.id };
    DataBase[interaction.user.id].message = msg.id;
    fs.writeFileSync(
      "./Database/tickets.json",
      JSON.stringify(DataBase),
      "utf-8"
    );
  },
};
