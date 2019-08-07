const axios = require('axios');
const Dev = require('../models/Devs');

module.exports = {

    async index(req, res) {
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({

            $and: [
                { _id: { $ne: user } },
                { _id: { $nin: loggedDev.likes } },
                { _id: { $nin: loggedDev.dislikes } }
            ],

        });

        return res.json(users);

    },

   async store(req, res){
        //   return res.json({..});

        const { username } = req.body;
        
        //verifica se nao existe usuario ja na Base
        const useExists = await Dev.findOne({ user: username });

        if(useExists) {
            return res.json(useExists);
        }

        //api
        const response = await axios.get(`https://api.github.com/users/${username}`);

        const { name, bio, avatar_url: avatar } = response.data;

        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        });

        return res.json(dev);
    }
};