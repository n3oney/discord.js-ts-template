import { Message } from "discord.js";
import { BaseCommand } from "../base/BaseCommand";
import { discord } from "../discord";

export default class PingCommand extends BaseCommand {
  names = ['ping', 'pingpong'];

  async run(message: Message, _args: string[]): Promise<void> {
    await message.reply(`Pong! Current ping is ${discord.ws.ping} ms.`);
  }
}