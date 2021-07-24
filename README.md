# discord.js-ts-template
This is a new version of my *really* old Discord.js template, [n3oney/discord.js-typescript-template](n3oney/discord.js-typescript-template).

**Discord.js version**: 12

## Installation
```sh
npx degit n3oney/discord.js-ts-template projectname
cd projectname
npm install
```

## Project structure
* `.eslintrc.js` - you can set your eslint rules here
* `src/` - the source TypeScript files
    * `index.ts` - the entry file
    * `discord.ts` - global instance of the Discord.js client
    * `environment.ts` - wrapper over `process.env` - can offer you strict types other than `string | undefined`, i recommend using it
    * `commandManager.ts` - global instance of the command manager
    * `eventManager.ts` - global instance of the event manager
    * `events/` - the directory where you can put your Discord.js events
        ### Naming
        An event's name should be UpperCamelCase it should end with `.event.ts`.
        A good example is `Ready.event.ts`.
        You can stop an event from loading by prefixing the file's name with an underscore `_`.
    * `commands/` - the directory where you can put commands for the command handler
        ### Naming
        A commands's name should be UpperCamelCase it should end with `.command.ts`.
        A good example is `Ping.command.ts`.
        You can stop a command from loading by prefixing the file's name with an underscore `_`.
    * `base/` - the directory containing the helper classes from this template
        * `BaseCommand.ts` - abstract class definition for commands, your commands should extend it
        * `BaseEvent.ts` - abstract class definition for events, your events should extend it
        * `CommandManager.ts` - class definition for the command manager. The command manager handles loading new commands, unloading them and running them. It also stores the commands. You can pass an async function that returns a string to the constructor in order have a dynamic prefix. The function provides the message it's running for.
        * `EventManager.ts` - class definition for the event manager. The event manager handles loading new events and unloading them. It also stores the events.
* `dist/` - the output directory for TypeScript