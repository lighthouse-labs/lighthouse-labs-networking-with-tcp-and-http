const net = require('net');

const PORT = 3000;

const server = net.createServer();

const connections = [];

server.on('connection', (connection) => {
    connection.setEncoding('utf-8');
    console.log('A client connected!');

    connections.push(connection);

    // Handle receiving data from clients.
    connection.on('data', (data) => {
        console.log(
            'A client submitted:',
            data
        );

        if (data.startsWith('name: ')) {
            return connection.username = (data + ' ').split(' ')[1].trim();
        }

        // console.log(connections);

        for (const conn of connections) {
            if (conn !== connection) {
                conn.write(`${connection.username}: ${data.trim()}`);
            }
        }
    });

    connection.write('Hello client, you are now connected.');
});

server.listen(PORT, () => {
    console.log(
        'Server listening on port:',
        PORT
    );
});
