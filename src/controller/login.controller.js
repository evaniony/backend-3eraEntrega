class LoginController {

    async loginUser(req, res) {
        try {
          if (!req.user) {
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
        }
      }
    
      async registerUser(req, res) {
        try {
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
        }
      }
};

export const loginController = new LoginController();