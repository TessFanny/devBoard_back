const authRouter = require('./app/router/authRouter')
const supertest = require('supertest')
//const { describe } = require('./app/schema/userBody')
const request = require("request")
const app = require('./index')
const pool =require('./app/services/dbClient')
const Post = require('./app/model/postModel')
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgxOTc1NDJ9.S4T0Iz4jon8kXbbVI0XmQG_qnREvVfZnws3r1t2Z4b4'

describe(" posts", ()=>{
    
beforeAll(async ()=>{
 await pool.connect()
});

//  afterAll(async ()=>{
//      await pool.end()
//     })

    describe("get post route", ()=>{
        // should save the username and password to the database
        // if post doesn't exist 
        describe("given the post doesn't exists", ()=>{
            it("should return 404", async ()=>{
                const user_id = 7;
               await supertest(app).get(`/api/users/${user_id}`).expect(404)
            })
        })
        // if post does exists 
        describe("given the post does exists", ()=>{
            it("should return 200 status and the post", async ()=> {
                 const post_id = 51;
                 const post = await Post.findAll({ $where: { id: post_id } })
                const {body, statusCode}  = await supertest(app).get(`/api/post/${post_id}`).set('Authorization', `Bearer ${TOKEN}`);
                expect(body.id).toBe(post_id)
                expect(statusCode).toBe(200)
            })
        })
    })
    describe("when the username and password are missing", ()=>{
        // should response with a status code of 400
        //
    })

})

describe("POST /login", ()=>{
    
    beforeAll(async ()=>{
     await pool.connect()
    });
    
    //  afterAll(async ()=>{
    //      await pool.end()
    //     })
    
        describe("given a username and password", ()=>{
            // should save the email and password to the database
            // 
            test("should respond with a 200 status code", async ()=>{
                const response = await supertest(app).post("/login").send({
                    email: "hello1@gmail.com",
                    password: "hello"
                })
                expect(response.statusCode).toBe(200)
            })
            
        })
        describe("when the username and password are missing", ()=>{
            // should response with a status code of 400
            //
        })
    
    })