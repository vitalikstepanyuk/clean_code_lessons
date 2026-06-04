class SQLClient {
    #service;
    #port;
    constructor(service, port) {
        this.#service = service;
        this.#port = port;
    }
    connectSmell() { /*...*/ }
    closeSmell() { /*...*/ } 

    querySmell(query) {
        return new Promise((resolve) => {
            // query the database
            resolve("{[{name: John Connar, mother: Sarah Connor, father: Kyle Reese, ...}]}");
        });
    }
};

class NoSQLClient {
    #service;
    #port;
    constructor(service, port) {
        this.#service = service;
        this.#port = port;
    }
    connectSmell() { /*...*/ }
    closeSmell() { /*...*/ } 

    querySmell(query) {
        return new Promise((resolve) => {
            // get the value from the database
            resolve("{name: John Connar, mother: Sarah Connor, father: Kyle Reese, ...}");
        });
    }
};

module.exports = { SQLClient, NoSQLClient };
