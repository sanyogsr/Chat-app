const Messages = require("../models/message.model")

module.exports.addMessages = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await Messages.create({
            message: { text: message },
            to: [from, to],
            from: from,
        });
        if (data) return res.json({ msg: "message added successfully" });
        else return res.json({ msg: "Failed to add message to the database" });
    } catch (ex) { next(ex); }
};

module.exports.getMessages = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        const messages = await Messages.find({ users: { $all: [from, to] } }).sort({ updatedAt: 1 });
        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: MIDIMessageEvent.sender.toString() === from,
                message: msg.message.text
            }
        })
        res.json(projectedMessages);

    } catch (ex) {
        next(ex);
    }
}