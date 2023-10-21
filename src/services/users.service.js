import { users } from "../DAO/dao/users.dao.js";
import { createHash, isValidPassword } from "../utils/passwords.js";
import { cartService } from "./cart.service.js";
import mongoose from "mongoose";

class UserService {
  async getOne(email) {
    try {
      const user = await users.getAll(email);
      if (user && isValidPassword(password, user.password)) {
        return user;
      } else {
        return false;
      }
    } catch (e) {
      return res.status(500).json({
        msg: "es un error:", e});
    }
  }

  async getAll() {
    try {
      const allUsers = await users.getAll();
      return allUsers;
    } catch (e) {
      return res.status(500).json({
        msg: "es un error:", e});
    }
  }

  async getById(_id) {
    try {
      const user = await users.getById(_id);
      return user;
    } catch (e) {
      return res.status(500).json({
        msg: "es un error:", e});
    }
  }

  async update(_id, user) {
    try {
      if (user.password) {
        //si contiene password, que lo hashee
        user.password = await bcrypt.hash(user.password, 10);
      }
      const userUpdated = await users.updateUser(_id, user);
      return userUpdated;
    } catch (e) {
        return res.status(500).json({
            status: "error",
            msg: "error al modificar",
            payload: {},
        
        })
      //logger.error(e.message);
    }
  }

  async delete(_id) {
    try {
      const userDeleted = await users.deleteUser(_id);
      return userDeleted;
    } catch (e) {
      return res.status(500).json({
        msg: "es un error:", e});
    }
  }

  /* async authenticateUser(email, password) {
    try {
      const user = await usersModel.readOne(email);

      if (!user || !isValidPassword(password, user.password)) {
        throw new Error("Invalid credentials");
      }

      return user;
    } catch (e) {
      logger.error(e.message);
      throw e;
    }
  }
*/
async createUser(firstName, lastName, email, age, password, role) {
  try {
    const existingUser = await users.getOne(email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    const cartID = new mongoose.Types.ObjectId();
    const hashed = createHash(password);
    await cartService.getCartCreated(cartID);

    const userCreated = await users.create(firstName, lastName, age, email, hashed, role, cartID);

    return userCreated;
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw error;
  }
} 
/*
  async premiumSwitch(userId) {
    try {
      const user = await this.readById(userId);
      if (!user) {
        throw new Error("Usuario inexistente");
      }
      user.premium = !user.premium;
      const updatedUser = await this.update(userId, { premium: user.premium });
      return updatedUser;
    } catch (e) {
      logger.error(e.message);
      throw e;
    }
  } */
}
export const userService = new UserService();
