app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            const user = results[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                res.send('Login Successful!');
            } else {
                res.status(401).send('Invalid Password!');
            }
        } else {
            res.status(404).send('User Not Found!');
        }
    });
});
