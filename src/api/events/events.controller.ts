const EventsService = require('../../core/services/events.service');

// Create a new event for a user
exports.createEvent = async function (req: any, res: any) {
    try {
        const result = await EventsService.createEvent(req.params.user_id, req.body.consents);

        return res.status(200).json(result);
    } catch (e: any) {
        return res.status(422).json({message: e.message});
    }
}

// Find events
// user_id is not mandatory
exports.find = async function (req: any, res: any) {
    try {
        const result = await EventsService.find(req.query.user_id);

        return res.status(200).json(result);
    } catch (e: any) {
        return res.status(422).json({message: e.message});
    }
}