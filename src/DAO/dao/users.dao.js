import { userModel } from "../models/users.model.js";
import { createHash, isValidPassword } from "../../utils/passwords.js";

class Users {
	async getAll() {
			const users = await userModel.find(
				{},
				{
					_id: true,
					firstName: true,
					lastName: true,
					age: true,
					email: true,
					password: true,
					role: true,
					cartID: true,
					purchase_made: true,
				}
			);
			return users;
	}

	async getById(_id) {
			const userById = await userModel.findOne({ _id });
			return userById;
	}

	async getOne(email) {
			const user = await userModel.findOne({ email });
			return user;
	}

	async create(firstName, lastName, age, email, password, role, cartID) {
			const userCreated = await userModel.create({
				firstName,
				lastName,
				age,
				email,
				password,
				role,
				cartID,
				purchase_made: [],
			});
			return userCreated;
	}

	async updateUser(_id, user) {
			const userUpdated = await userModel.findByIdAndUpdate(_id, user, {
				new: true,
			});
			return userUpdated;
	}

	async deleteUser(_id) {
			const deletedUser = await userModel.deleteOne({ _id: _id });
			return deletedUser;
	}
}

export const users = new Users();