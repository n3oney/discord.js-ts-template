export class Environment {
  static get discordToken(): string | undefined {
    return process.env.DISCORD_TOKEN;
  }
}