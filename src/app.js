import  express  from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

//settings
app.set("port",3000);

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));

export default app;