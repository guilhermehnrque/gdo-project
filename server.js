const http = require('http');
const app = require('./app');
const setupHealthCheck = require('./src/routes/health');
const sequelize = require('./src/config/database');
const logger = require('./src/config/logger');

const server = http.createServer(app);

setupHealthCheck(server);

sequelize.sync().then(() => {
    console.log('Modelos sincronizados com o banco de dados.');
}).catch((error) => {
    console.error('Erro ao sincronizar modelos:', error);
});

const port = process.env.PORT;

server.listen(port, () => {
    logger.info(`Project GDO running at port: ${port}`);
    
    console.log(`Project GDO running at port: ${port}`);
});
