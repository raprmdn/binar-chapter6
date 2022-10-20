const { UserGame } = require('../models');
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt.utils");

module.exports = {
    register: async (attr) => {
        const { name, username, email, password } = attr;
        const hashedPassword = await bcrypt.hash(password, 10);

        return await UserGame.create({ name, username, email, password: hashedPassword });
    },
    login: async (attr) => {
        const { email, password } = attr;

        const user = await UserGame.findOne({ where: { email: email } });
        if (!user) throw { status: 404, message: "These credentials do not match our records" };

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw { status: 404, message: "These credentials do not match our records" };

        const token = generateToken(user);

        return { id: user.id, name: user.name, username: user.username, email: user.email, token };
    },
    me: async (user) => {
        const auth = await UserGame.findByPk(user.id);
        if (!auth) throw { status: 404, message: "User not found" };

        return { id: auth.id, name: auth.name, username: auth.username, email: auth.email };
    },
    changePassword: async (user, attr) => {
        const auth = await UserGame.findByPk(user.id);
        if (!auth) throw { status: 404, message: "User not found" };

        const { current_password, new_password } = attr;
        const isMatch = await bcrypt.compare(current_password, auth.password);
        if (!isMatch) throw { status: 422, message: "Wrong current password" };

        const hashedPassword = await bcrypt.hash(new_password, 10);
        return await auth.update({ password: hashedPassword });
    }
};