const Dev = require('../models/Devs').

module.exports = {
    async store(req, res) {
        //req.params.devId
        //req.headers.user

        const { devId } = req.params;
        const { user } = req.heaers;

        //usuario logado
        const loggedDev = await Dev.findById(user);

        //usuario alvo
        const targetDev = await Dev.findById(devId);

        if (!targetDev) {
            return res.status(400).json({ error: 'Dev not exists' });
        }

        if (targetDev.likes.includes(loggedDev._id)) {
            console.log('DEU MATCH');
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return res.json({ok: true});
        
    }
};