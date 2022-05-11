const EventsService = require('../../core/services/events.service');

exports.createEvent = async function (req: any, res: any) {
    try {
        const result = await EventsService.createEvent(req.params.user_id, req.body.consents);

        return res.status(200).json(result);
    } catch (e: any) {
        return res.status(422).json({message: e.message});
    }
}