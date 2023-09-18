import express from "express";
import { __dirname } from "./utils/dirname.js";
import handlebars from 'express-handlebars';
import { routerProducts } from "./routes/products.routes.js";
import { routerCart } from "./routes/cart.routes.js"
import { connectMongo } from "./utils/connect.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));


connectMongo();

//handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

//routes
app.use("/products", routerProducts);
app.use("/carts", routerCart);



app.listen(8080, () =>{
    console.log("port is on 8080!");
});

app.use("*", (req, res)=>{
    res.status(400).send(
        {status: "error",
        msg: "Error, la ruta no existe;",
        data: {}})
})