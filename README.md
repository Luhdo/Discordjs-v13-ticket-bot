# Discord v13 Ticket Bot

The Discord v13 Ticket Bot is a ticketing system written in Node.js using the discord.js library. This bot allows users to create tickets in a designated category, and administrators can manage these tickets using interactive buttons.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Ticket Channel](#ticket-channel)
- [Managing Tickets](#managing-tickets)
- [Closing a Ticket](#closing-a-ticket)
- [Changing Ticket Admins](#changing-ticket-admins)
- [Permissions](#permissions)
- [Contributing](#contributing)
- [License](#license)

## Features

- User-friendly ticket creation with a button interface.
- Dynamic creation of a ticket channel in a specified category.
- Interactive buttons for ticket management (save, delete, pin) available to administrators only.
- Users can close their tickets, while administrators can delete them.
- Ticket admin role dynamically assigned based on category permissions.

## Installation

1. Clone this repository to your local machine.
2. Install the required dependencies using npm:

```bash
npm install
```

3. Create an `.env` file in the root directory of the project and add your Discord bot token:

```plaintext
token=YOUR_DISCORD_BOT_TOKEN
```

Replace `YOUR_DISCORD_BOT_TOKEN` with the actual token of your Discord bot, which you can obtain from the Discord Developer Portal.

## Configuration

Before running the bot, you need to configure the `config.js` file:

```js
module.exports = { 
  bot: { 
    token: process.env.token, 
    intents: [ 
      Intents.FLAGS.GUILDS, 
      Intents.FLAGS.GUILD_MEMBERS, 
      Intents.FLAGS.GUILD_MESSAGES, 
    ], 
    guildId: "YOUR_SERVER_ID", 
    message: require("./message.json"), 
  }, 
  ids: { 
    ticketCategory: "YOUR_TICKET_CATEGORY_ID", // category Id which tickets will get created 
    ticketChannel: "YOUR_TICKET_CHANNEL_ID", // Channel Id which ticket create message is sent 
    modsRole: "YOUR_MODS_ROLE_ID", // role Id which gets mentioned when a new ticket gets created 
  }, 
};
```

- Replace `YOUR_SERVER_ID` with the ID of your Discord server (guild).
- Replace `YOUR_TICKET_CATEGORY_ID` with the ID of the category where the bot will create new ticket channels.
- Replace `YOUR_TICKET_CHANNEL_ID` with the ID of the text channel where the bot will send the initial ticket creation message.
- Replace `YOUR_MODS_ROLE_ID` with the ID of the role that should be mentioned when a new ticket is created.

## Usage

Once the bot is configured and running, it will listen for a command (e.g., a button click) in the specified text channel. When users click the button, the bot will create a new ticket channel in the designated category. The user who initiated the ticket and administrators will have access to the ticket channel.

## Ticket Channel

The ticket channel is a private channel where users can interact with administrators regarding specific issues. Users and administrators can exchange messages and work together to resolve the issue. The ticket channel will be created automatically when a user clicks the "Create Ticket" button.

## Managing Tickets

The ticket channel will contain interactive buttons that administrators can use to perform various actions:

- **Save Ticket**: This button allows administrators to save important information from the ticket for future reference.
- **Delete Ticket**: This button enables administrators to delete the ticket channel when the issue is resolved.
- **Pin Ticket**: This button lets administrators pin the ticket to keep it at the top of the channel list for quick access.

Please note that only administrators will have access to these buttons.

## Closing a Ticket

Users can close their tickets by sending a request in the ticket channel. When the issue is resolved or no longer requires attention, the user can request to close the ticket. An administrator will review the request and, if appropriate, proceed to close the ticket.

## Changing Ticket Admins

Ticket admins are dynamically assigned based on the category permissions. To change the ticket admin, update the "View Channels" and "Manage Messages" permissions for the desired role or user in the ticket category. The bot will automatically treat them as administrators.

## Permissions

To ensure the bot functions correctly, the bot should have the following permissions:

- Read and Send Messages in the text channel specified in `config.js` (ticketChannel).
- Create Channels in the category specified in `config.js` (ticketCategory).
- Mention the role specified in `config.js` (modsRole) when creating a new ticket.

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, feel free to open an issue or create a pull request.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use and modify the bot as per the license terms.
