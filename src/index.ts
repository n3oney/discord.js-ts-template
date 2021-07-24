import { commandManager } from "./commandManager";
import { discord } from "./discord";
import { Environment } from "./environment";
import { eventManager } from "./eventManager";

eventManager.loadDirectory().then(async () => {
  await commandManager.loadDirectory();

  await discord.login(Environment.discordToken);
});