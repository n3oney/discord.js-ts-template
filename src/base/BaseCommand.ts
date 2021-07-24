import { Message } from "discord.js";

export abstract class BaseCommand {
  abstract names: string[];

  abstract run(message: Message, args: string[]): Promise<unknown>;
}