require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { startBot, pauseBot, stopBot, getStatus } = require('./botEngine');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/bot/start', async (req, res) => {
    const { strategy, moneyManagement, stake, stopWin, stopLoss } = req.body;
    startBot({ strategy, moneyManagement, stake, stopWin, stopLoss });
    res.json({ status: 'started' });
});

app.post('/api/bot/pause', (req, res) => {
    pauseBot();
    res.json({ status: 'paused' });
});

app.post('/api/bot/stop', (req, res) => {
    stopBot();
    res.json({ status: 'stopped' });
});

app.get('/api/bot/status', (req, res) => {
    res.json(getStatus());
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`SthawBot backend running on port ${PORT}`);
});
