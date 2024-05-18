app.post('/checkValidity', (req, res) => {
    

    // Query to check if the data matches in your MySQL table
    const query = `SELECT * FROM meter WHERE custCNIC = ? AND meterNum = ?`;
console.log('query'+query);
    connection.query(query, [userID, connection], (error, results) => {
        if (error) {
            console.error('Error executing MySQL query: ' + error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (results.length > 0) {
            // If data matches, send a success response
            window.location.href('customerPage.html');
        } else {
            // If data doesn't match, send a failure response
            res.redirect('/billLog.js');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});