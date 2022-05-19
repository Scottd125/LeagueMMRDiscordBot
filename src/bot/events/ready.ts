import Event from '../struct/Event';

abstract class ReadyEvent extends Event {
  constructor() {
    super({
      name: 'ready',
      once: true,
    });
  }

  async exec() {
    if (this.client.user) {
      this.client.user.setActivity('ARAM MMR', { type: "WATCHING" });
    }
    console.log('Ready!');
  }
}

export default ReadyEvent;