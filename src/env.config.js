import dotenv from 'dotenv';

export const enviroment = {
    MODE: process.argv[2]
}

if(process.argv[2] != "DEV" && process.argv[2] != "PROD") {
    console.log("indique si es prod o dev");
    process.exit();
}

dotenv.config({
    path: enviroment.MODE === 'DEV' ?  './.env.development' : './.env.production',
});

enviroment.PORT = process.env.PORT;
enviroment.MONGO_URL = process.env.MONGO_URL;

export default{
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL
};
