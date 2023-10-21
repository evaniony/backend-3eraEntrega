import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();
program.option("--mode <mode>", "Modo de Trabajo", "DEVELOPMENT");
program.parse();

dotenv.config({
    path: process.argv[2].mode === 'DEV' ? './.env.development' : './.env.production',
});
export default{
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL
}