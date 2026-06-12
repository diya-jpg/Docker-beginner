require('dotenv').config({ path: '../.env' });

const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();

app.use(express.json());

const mongoUrl = process.env.MONGO_URL;

// Home Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Get Profile
app.get('/get-profile', async (req, res) => {
    try {
        const client = await MongoClient.connect(mongoUrl);

        const db = client.db('user-account');

        const result = await db.collection('users').findOne({
            userid: 1
        });

        await client.close();

        res.send(result);

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

// Update Profile
app.post('/update-profile', async (req, res) => {
    try {
        const client = await MongoClient.connect(mongoUrl);

        const db = client.db('user-account');

        const userObj = {
            ...req.body,
            userid: 1
        };

        await db.collection('users').updateOne(
            { userid: 1 },
            { $set: userObj },
            { upsert: true }
        );

        await client.close();

        res.send(userObj);

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});