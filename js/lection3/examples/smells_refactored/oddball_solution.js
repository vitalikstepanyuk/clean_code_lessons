class DBClient {
    #service;
    #port;
    constructor(service, port) {
        this.#service = service;
        this.#port = port;
    }
    connect() { /*...*/ console.log("Connected to the database"); }
    close() { /*...*/ console.log("Closed the connection to the database"); } 

    request(query) {}
};

class SQLClient extends DBClient {
    constructor(service, port) {
        super(service, port);
    }

    request(query) {
        return new Promise((resolve) => {
            // query the database
            resolve("{[{name: John Connar, mother: Sarah Connor, father: Kyle Reese, ...}]}");
        });
    }
};

class NoSQLClient extends DBClient {
    constructor(service, port) {
        super(service, port);
    }

    request(query) {
        return new Promise((resolve) => {
            // get the value from the database
            resolve("{name: John Connar, mother: Sarah Connor, father: Kyle Reese, ...}");
        });
    }
};

async function connectionWrapper(client, fn) {
    try {
        client.connect();
        return await fn(client);
    } finally {
        client.close();
    }
}

// Extract Class
// Rename Method
// Introduce Foreign Method

module.exports = { SQLClient, NoSQLClient, connectionWrapper };
