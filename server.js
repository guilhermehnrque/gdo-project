const http = require('http');
const app = require('./app');
const setupHealthCheck = require('./src/routes/health');
const sequelize = require('./src/config/database');

const server = http.createServer(app);

setupHealthCheck(server);

sequelize.sync().then(() => {
    console.log('Modelos sincronizados com o banco de dados.');
}).catch((error) => {
    console.error('Erro ao sincronizar modelos:', error);
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Project GDO running at port: ${port}`);
});
