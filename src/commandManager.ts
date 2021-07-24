import { CommandManager } from "./base/CommandManager";

export const commandManager = new CommandManager(async (_message) => '!');