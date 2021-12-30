import Client from './bot/client/Client';
import * as dotenv from 'dotenv';
const client: Client = new Client();

// Configuration
dotenv.config();

client.start();