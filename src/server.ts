import 'dotenv/config';
import app from './app';
import healthCheck from './application/routes/health';
import { createServer } from 'http';

const server = createServer(app);

healthCheck(server);

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
