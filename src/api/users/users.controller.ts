const UsersService = require('../../core/services/users.service');

// Create a new user
// email is mandatory
exports.createUser = async function (req: any, res: any) {
    try {
        const email = req.body.email;
        if (!email){
            return res.status(422).json('Email is mandatory.');
        }

        const result = await UsersService.createUser(email);

        return res.status(200).json(result);
    } catch (e: any) {
        return res.status(422).json(e.message);
    }
}

// Find a user
// User id is mandatory
exports.getUser = async function (req: any, res: any) {
    try {
        const user_id = req.params.id;
        if (!user_id){
            return res.status(400).json('User identifier is missing.');
        }

        const result = await UsersService.getUser(user_id);

        return res.status(200).json(result);
    } catch (e: any) {
        return res.status(400).json(e.message);
    }
}

// Get all users
exports.getAll = async function (req: any, res: any) {
    try {
        const result = await UsersService.getAllUsers();

        return res.status(200).json(result);
    } catch (e: any) {
        return res.status(400).json(e.message);
    }
}

// Delete a user
// User id is mandatory
exports.deleteUser = async function (req: any, res: any) {
    try {
        const user_id = req.params.id;
        if (!user_id){
            return res.status(400).json('User identifier is missing.');
        }

        const result = await UsersService.deleteUser(user_id);

        return res.status(200).json(result);
    } catch (e: any) {
        return res.status(400).json(e.message);
    }
}