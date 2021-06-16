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

module.exports = Listener;
