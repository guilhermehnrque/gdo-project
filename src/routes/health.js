const { createTerminus } = require('@godaddy/terminus');
const sequelize = require('../config/database');
const startTime = Date.now();

async function onHealthCheck() {
    try {
        await sequelize.authenticate();

        const uptime = Date.now() - startTime;

        return {
            status: 'ok',
            database: 'connected',
            uptime: `${uptime}ms`,
        };
    } catch (error) {
        return {
            status: 'error',
            database: 'disconnected',
            uptime: `${Date.now() - startTime}ms`,
            error: error.message,
        };
    }
}

function onSignal() {
    console.log('Servidor está desligando...');
    return Promise.resolve();
}

function setupHealthCheck(server) {
    createTerminus(server, {
        healthChecks: {
            '/health': onHealthCheck,
        },
        onSignal,
    });
}

module.exports = setupHealthCheck;
