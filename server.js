const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Larkana@321',
    database: 'mysqld'
});


connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL database');
});


app.get('/getData', (req, res) => {
    connection.query('SELECT * FROM Customer', (err, results, fields) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Process the results
        console.log('Query results:', results);

        res.json(results);
    });
});

// Add Customer:
app.post('/authenticate', (req, res) => {
    const { username, password } = req.body;

    connection.query(
        'CALL AuthenticateUser(?, ?, ?)',
        [username, password, 'employee'],
        (error, results) => {
            if (error) {
                console.error('Error during authentication:', error);
                return res.status(500).json({
                    isAuthenticated: false,
                    authMessage: 'Error during authentication',
                });
            }
            
            console.log("test" + JSON.stringify(results));

            if (results[0] && results[0][0]) {
                var isAuthenticated = results[0][0].IsAuthenticated;
                var authMessage = results[0][0].AuthMessage;
                
            } else {
                console.error('No data returned from the stored procedure');
                return res.status(500).json({
                    isAuthenticated: false,
                    authMessage: 'Error during authentication',
                });
            }

            if (isAuthenticated) {
                console.log('Login Successful!');
            } else {
                console.log('Login Failed!');
            }
            res.json({
                isAuthenticated,
                authMessage,
            });

        }
    );
});
app.post('/updateTerrif', (req, res) => {
    const { comTerrif, domTerrif } = req.body;

    // Query to update data in MySQL table
    const query = "UPDATE tarrif SET rate = CASE WHEN tarrifType = 'Commercial' THEN ? WHEN tarrifType = 'Domestic' THEN ? END WHERE tarrifType IN ('Commercial', 'Domestic')";
    // Executing the query with parameters
    connection.query(query, [comTerrif, domTerrif], (error, results) => {
        if (error) {
            console.error('Error executing MySQL query: ' + error);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Check if any rows were affected
        if (results.affectedRows === 0) {
            console.log('No rows were updated');
            return res.status(404).json({ error: 'No rows were updated' });
        }

        res.json({ success: true });
    });
});






app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app; // Export the app for testing purposes


// Close the database connection when the server is stopped
process.on('SIGINT', () => {
    connection.end((err) => {
        if (err) {
            console.error('Error closing MySQL connection:', err);
            process.exit(1);
        }
        console.log('MySQL connection closed');
        process.exit(0);
    });
});

