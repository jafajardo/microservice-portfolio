const nats = require('node-nats-streaming');

const stan = nats.connect('portfolio', 'nats-test', {
  url: 'http://localhost:4222',
});

// stan.on('connect', () => {
//   console.log('Publisher connected to NATS');

//   const data = JSON.stringify({
//     id: 'fakj234jkfsk',
//     email: 'test1@test.com',
//   });

//   stan.publish('user:created', data, (err, guid) => {
//     if (err) {
//       console.log('Publish failed', err);
//     }
//     console.log('Event published GUID:', guid);
//   });
// });

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

const publisher = new Publisher(stan, 'user:created');

setInterval(
  () => publisher.publish({ id: 'asdasdasd', email: 'myemail@email.com' }),
  8000
);
//publisher.publish({ id: 'asdasdasd', email: 'myemail@email.com' });
