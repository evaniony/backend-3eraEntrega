import { users } from "../DAO/dao/users.dao.js";
import { userService } from "../services/users.service.js";
import { isValidPassword } from "../utils/passwords.js";

class LoginController {

    async loginUser(req, res) {
        const {email, password} = req.body;
        if(!email || !password){
          return res.status(401).render(
          "error-page",
           {msg: "Error: faltan datos;"}
           );
        }
        try {
          const foundUser = await users.getOne(email);
            //esto no lo hace el controller
          if(foundUser && isValidPassword(password, foundUser.password)){
            req.session.user = {
                firstName: foundUser.firstName,
                email: foundUser.email,
                role: foundUser.role,
                cartID: foundUser.cartID
                };
                //console.log(req.session.user);
                return res.render("products", req.session.user);
            }else{
                return res.status(400).render(
                    "error-page",
                    {msg: "El email o password esta incorrecto."}
                    );  
            };
          }catch(e){
            return res.status(400).render(
            "error-page",
            {msg: "Espera, ocurrio un error."}
            );
            }  

          /* if (!req.user) {
            return res.status(400).render("error", { msg: "Usuario Inexistente" });
          }
          req.session.user = {
            _id: req.user._id,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            age: req.user.age,
            email: req.user.email,
            role: req.user.role,
            premium: req.user.premium,
            cartId: req.user.cartID,
            purchase_made: req.user.purchase_made,
          };
          return res.redirect("/products");
        } catch (e) {
            console.log(e);
            res.status(501).send(
              { status: "error",
              msg: "Error en el servidor",
              error: e.msg });
        } */
    }
    
      async registerUser(req, res) {
        const { firstName, lastName, email, age, password } = req.body;
          if(!firstName || !lastName || !email || !age || !password){
            return res.status(400).render(
            "error-page",
            {msg: "Hubo un error al ingresar."}
            );
          };
        try {
          const userCreated = await userService.createUser(firstName, lastName, email, age, password, cartID);
          req.session.user = userCreated;

          //return res.redirect("/products");
          return res.render("products");
          
        } catch (error) {
          return res.status(401).render(
            "error-page",
            {msg: "Hubo un error! try again."}
            );
        };
        /* try {
          if (!req.user) {
            return res.status(500).render("error");
          }
          req.session.user = {
            _id: req.user._id,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            age: req.user.age,
            email: req.user.email,
            role: req.user.role,
            premium: req.user.premium,
            cartId: req.user.cartID,
            purchase_made: req.user.purchase_made,
          };
          return res.redirect("/products");
        } catch (e) {
            console.log(e);
            res.status(501).send(
              { status: "error",
              msg: "Error en el servidor",
              error: e.msg });
        } */
      }
};

export const loginController = new LoginController();