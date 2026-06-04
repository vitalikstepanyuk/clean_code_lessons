class DBConnection {
    open() {
        /*...*/
        console.log("Opened connection to the database");
    }
    close() {
        /*...*/
        console.log("Closed the connection to the database");
    }

    query(q) {
        return new Promise((resolve) => {
            /*...*/
            console.log("Queried the database");
            resolve(10);
        });
    }
};

async function dbWrapper(fn) {
    let connection = new DBConnection();
    connection.open();
    try {
        return await fn(connection);
    } finally {
        connection.close();
    }
}

module.exports = { DBConnection, dbWrapper };
