const { response } = require("express");
const User = require("../model/userModel.js");
const fetch =(...args)=> import (`node-fetch`).then(({default:fetch}) => fetch(...args))
require('dotenv').config();


const GithubController = {

    getAccessToken: async (req, res) => {

        console.log(req.query.code)
        const params =`?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${req.query.code}`

        await fetch(`https://github/login/oauth/access_token${params}`,{
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        }).then((response)=>{
            console.log("reponsedufetchbackend",response)
            return response.json
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
    }
}
module.exports = GithubController; 