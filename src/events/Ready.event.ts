import { BaseEvent } from "../base/BaseEvent";
import { discord } from "../discord";

export default class ReadyEvent extends BaseEvent<'ready'> {
  readonly event = 'ready';

  async listener(): Promise<void> {
    console.log(`Ready as ${discord.user?.tag ?? '...idk who'}.`);
  }
}