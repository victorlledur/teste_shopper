import express from "express";
import requestLog from "./middlewares/requestLog";
import { prisma } from "./database/index";
import routes from "./routes/";
import cors from "cors"
import { ERRORS } from "./constants/error";
import { SUCCESS } from "./constants/success";

async function main() {
    const app = express();
    app.use(express.json());
    app.use(requestLog);
    app.use(cors())

    const port = process.env.PORT?( process.env.PORT as unknown as number) : 4000;
    app.use(express.json());
    app.use(routes);
    
    try {
      await prisma.$connect();
      console.log(`😄 ${SUCCESS.INDEX.CONNECT_SUCCESS}`);
    } catch (error) {
      console.log(`😕 ${ERRORS.INDEX.FAIL}`, error);
    }
    app.listen(port, async () => {
      console.log(`🚀 ${SUCCESS.INDEX.SERVICE_STARTED} http://127.0.0.1:${port}`);
      
    });
  }
  
  main().catch((error) => {
    console.log("Error!");
    console.log(error);
  });