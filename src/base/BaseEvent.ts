import { ClientEvents } from 'discord.js';
import { discord } from '../discord';

export abstract class BaseEvent<K extends keyof ClientEvents> {
  abstract readonly event: K;

  abstract listener(...args: ClientEvents[K]): Promise<unknown>;

  register(): void {
    discord.on(this.event, this.listener);
  }

  unregister(): void {
    discord.off(this.event, this.listener);
  }
}