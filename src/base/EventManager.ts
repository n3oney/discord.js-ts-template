import {promises as fs} from "fs";
import path from "path";
import { BaseEvent } from "./BaseEvent";
import { ClientEvents } from "discord.js";

export const EVENT_REGEX = /^(?!_)[A-Z][a-zA-Z]*\.event\.ts$/g;

export class EventManager {
  events: [string, BaseEvent<keyof ClientEvents>][] = [];

  find(name: string): [string, BaseEvent<keyof ClientEvents>] | undefined {
    return this.events.find(evt => evt[0].includes(name));
  }

  async loadDirectory(directory = 'events'): Promise<void> {
    const fullPath = path.join(__dirname, '..', directory)
    const files = await fs.readdir(fullPath);
    const loadableFiles = files.filter(name => name.match(EVENT_REGEX));
    const imports: {default: new () => BaseEvent<keyof ClientEvents>}[] = await Promise.all(loadableFiles.map(f => import(path.join(fullPath, f))));
    for(const evt of imports) {
      this.add(new evt.default());
    }
  }

  add(event: BaseEvent<keyof ClientEvents>): void {
    event.register();
    this.events.push([event.event, event]);
  }

  remove(name: string): void {
    const i = this.events.findIndex(evt => evt[0].includes(name));
    this.events.splice(i, 1);
  }
}