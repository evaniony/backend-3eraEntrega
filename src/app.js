import express from "express";
import { __dirname } from "./dirname.js";
import handlebars from 'express-handlebars';
import { routerProducts } from "./routes/products.routes.js";
import { routerCart } from "./routes/cart.routes.js"
import { connectMongo } from "./utils/connect.js";
import { usersRouter } from "./routes/users.routes.js";
import { ticketRouter } from "./routes/ticket.routes.js";
import { loginRouter } from "./routes/login.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import session from "express-session";
import MongoStore from "connect-mongo";
//import { env } from "./config.js";

const app = express();
const PORT = 8080 /* env.port; */
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));

//app.use(session({ secret: 'un-re-secreto', resave: true, saveUninitialized: true }));
app.use(
    session({
      store: MongoStore.create(
        { mongoUrl: "mongodb+srv://evaniony:rPapt8OncnP10D43@ebi-cluster.lazfhch.mongodb.net/?retryWrites=true&w=majority" /* process.env.MONGO_URL */}),
      secret: 'un-re-secreto',
      ttl: 8700*7,
      resave: true,
      saveUninitialized: true,
    })
  );


connectMongo();

//handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

//routes
app.use("/products", routerProducts);
app.use("/carts", routerCart);
app.use("/users", usersRouter);
app.use("/ticket", ticketRouter);

app.use("/shop", loginRouter);
//app.use("/shop", loginRouter);

app.use("/", viewsRouter);



app.listen(PORT, () =>{
    console.log(`port is on ${PORT}!`);
});

app.use("*", (req, res)=>{
    res.status(400).send(
        {status: "error",
        msg: "Error, la ruta no existe;",
        data: {}})
})