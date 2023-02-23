const { response } = require("express");
const User = require("../model/userModel.js");
const fetch =(...args)=> import (`node-fetch`).then(({default:fetch}) => fetch(...args))
require('dotenv').config();


const GithubController = {

    getAccessToken: async (req, res) => {

        const params =`?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${req.query.code}`

        await fetch(`https://github.com/login/oauth/access_token${params}`,{
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        }).then((response)=>{
            return response.json()
        }).then((data)=>{
            console.log(data)
            res.json(data)
        })
    },
    getUserdata: async (req, res) => {

        req.get("Authorization"); // Bearer ACCESSTOKEN
        await fetch("https://api.github.com/user", {
            method: "GET",
            headers: {
                "Authorization" : req.get("Authorization")
            }
        }).then((response) => {
            return response.json();
        }).then((data) =>{
            console.log(data);
            res.status(200).json(data)
        })
    },
    updateOrCreate: async (req, res)=> {
        try {
            req.get("Authorization"); // Bearer ACCESSTOKEN
            await fetch("https://api.github.com/user", {
                method: "GET",
                headers: {
                    "Authorization" : req.get("Authorization")
                }
            }).then((response) => {

                return response.json();

            }).then( async (data) => {
                console.log("withoutjson",data);
                console.log(data.json())
                const profile = data.profile
                console.log(profile)
                let user = null;
                user = await savedUser.findByField("githubid", data.profile.id)
                if (!user) {
                    // create new user in database
                    const savedUser =  new User()
                    user = await savedUser.create({
                        githubId: profile.id,
                        name: profile.displayName,
                        })
                    return user
                }
            const token =jwt.sign({id: user._id}, process.env.JWT_SECRET);
            res.status(200).json({token, user});
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = GithubController; 