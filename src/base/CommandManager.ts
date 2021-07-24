import {promises as fs} from "fs";
import path from "path";
import { BaseCommand } from "./BaseCommand";
import { Message } from "discord.js";
import { eventManager } from "../eventManager";
import { BaseEvent } from "./BaseEvent";
import { discord } from "../discord";

export const COMMAND_REGEX = /^(?!_)[A-Z][a-zA-Z]*\.command\.ts$/g;

export class CommandManager {
  commands: [string[], BaseCommand][] = [];

  constructor(public prefixGetter: (message: Message) => Promise<string>) {
    eventManager.add(this.messageEvent);
  }

  messageEvent: BaseEvent<'message'> = {
    event: 'message',
    listener: async (message: Message) => {
      if(message.author.bot || !message.content || message.channel.type !== 'text') return;
      const prefix = await this.prefixGetter(message);
      if(!message.content.startsWith(prefix)) return;

      const [commandName, ...args] = message.content.split(/\s+/g);

      const command = this.commands.find(cmd => cmd[0].includes(commandName.slice(prefix.length)));

      if(command) command[1].run(message, args);
    },
    register(): void {
      discord.on(this.event, this.listener);
    },
    unregister(): void {
      discord.off(this.event, this.listener);
    }
  }

  find(name: string): [string[], BaseCommand] | undefined {
    return this.commands.find(cmd => cmd[0].includes(name));
  }

  async loadDirectory(directory = 'commands'): Promise<void> {
    const fullPath = path.join(__dirname, '..', directory)
    const files = await fs.readdir(fullPath);
    const loadableFiles = files.filter(name => name.match(COMMAND_REGEX));
    const imports: {default: new () => BaseCommand}[] = await Promise.all(loadableFiles.map(f => import(path.join(fullPath, f))));
    for(const cmd of imports) {
      this.add(new cmd.default());
    }
  }

  add(command: BaseCommand): void {
    this.commands.push([command.names, command]);
  }

  remove(name: string): void {
    const i = this.commands.findIndex(cmd => cmd[0].includes(name));
    this.commands.splice(i, 1);
  }
}