const nats = require('node-nats-streaming');

const stan = nats.connect('portfolio', 'random', {
  url: 'http://localhost:4222',
});

// stan.on('connect', () => {
//   const opts = stan.subscriptionOptions().setDeliverAllAvailable();

//   const subscription = stan.subscribe('user:created', opts);

//   subscription.on('message', (msg) => {
//     console.clear();
//     const receivedMessage = JSON.parse(msg.getData());
//     console.log('Message received:', receivedMessage);
//   });
// });

class Listener {
  constructor(client, subject) {
    this.client = client;
    this.subject = subject;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(5000);
  }

  listen(callback) {
    this.client.on('connect', () => {
      const subscription = this.client.subscribe(
        this.subject,
        this.subscriptionOptions()
      );

      subscription.on('message', (msg) => {
        console.log(`
        Message received:
          ${this.subject}
          ${msg.getData()}
        `);

        // Invoke callback function
        callback(this.parseData(msg), msg);

        // Ackowledge receipt of message
        msg.ack();
      });
    });
  }

  parseData(msg) {
    const data = msg.getData();

    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf8'));
  }
}

const listener = new Listener(stan, 'user:created');
const cb = (msg, rawData) => {
  console.log('Callback received message', msg);
  console.log(rawData.subscription.subject);
  rawData.ack();
};
listener.listen(cb);
