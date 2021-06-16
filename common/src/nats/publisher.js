class Publisher {
  // this.client = nats connection
  constructor(client, subject) {
    this.client = client;
    this.subject = subject;

    client.on('connect', () => {
      console.log('Publisher connected to NATS server...');
    });
  }

  publish(data) {
    this.client.publish(this.subject, this.parseData(data), (err, guid) => {
      console.log('Event published GUID:', guid);
      console.log('Data published:', this.parseData(data));
    });
  }

  parseData(data) {
    if (typeof data !== 'string') {
      return JSON.stringify(data);
    }

    return data;
  }
}

module.exports = Publisher;
