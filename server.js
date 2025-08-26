const dotenv = require("dotenv");
const app = require("./app");
const { default: mongoose } = require("mongoose");




const isProductionMode = process.env.Node_ENV == 'production';
if (!isProductionMode) {
    dotenv.config();
}


async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    } catch (err) {
        console.error(`Connection Error in mongoose: ${err}`);
        process.exit(1);
    }
}

async function startServer() {
    const port = +process.env.PORT || 4000;

    app.listen(port, () => {
        console.log(
            `Server is running ${isProductionMode ? 'production': 'development'} mode on port ${port}`);
    });
}

async function run() {
    await connectToDB();
    await startServer();
}

run();