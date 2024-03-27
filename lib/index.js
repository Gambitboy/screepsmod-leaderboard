const path = require('path');
const express = require('express');

const IGNORE_LIST = [
    "Source Keeper",
    "Invader",
    "Screeps",
    "CaptureBot",
];

module.exports = function(config) {
    if (!config.backend || !config.common) {
        return;
    }

    config.backend.router.get('/leaderboard', async (request, response) => {
        const data = await config.common.storage.db.users.find({}, { _id: 0, username: 1, gcl: 1, badge: 1 });
        const filtered = data.filter(item => !IGNORE_LIST.includes(item.username));
        const sorted = filtered.sort((a, b) => b.gcl - a.gcl);
        const remap = sorted.map(({ username, gcl, badge }, index) => ({ position: index + 1, username, gcl, badge }))

        response.json({ data: remap });
    });

    config.backend.on('expressPreConfig', app => {
        app.use('/leaderboard', (req, res, next) => { next(); }, express.static(path.join(__dirname, '../public')));
    })
}
