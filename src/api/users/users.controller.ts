const UsersService = require('../../core/services/users.service');

exports.createUser = async function (req: any, res: any) {
    try {
        const result = await UsersService.createUser(req.body.email);

        return res.status(200).json(result);
    } catch (e: any) {
        return res.status(422).json(e.message);
    }
}

exports.getUser = async function (req: any, res: any) {
    try {
        const result = await UsersService.getUser(req.params.id);

        return res.status(200).json(result);
    } catch (e: any) {
        return res.status(400).json(e.message);
    }
}

exports.getAll = async function (req: any, res: any) {
    try {
        const result = await UsersService.getAllUsers();

        return res.status(200).json(result);
    } catch (e: any) {
        return res.status(400).json(e.message);
    }
}

exports.deleteUser = async function (req: any, res: any) {
    try {
        const result = await UsersService.deleteUser(req.params.id);

        return res.status(200).json(result);
    } catch (e: any) {
        return res.status(400).json(e.message);
    }
}