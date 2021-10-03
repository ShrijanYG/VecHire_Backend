const Registration = require('../models/registrationModel');
const Work = require('../models/workModel');
const mongoose = require('mongoose');
const ProfessionRequest = require('../models/requestModel');



const url = 'mongodb://localhost:27017/proHire';

beforeAll(async()=>{
    await mongoose.connect(url,
        {
            useNewUrlParser:true,
            useCreateIndex:true
        }
    )
})

afterAll(async()=>{
    await mongoose.connection.close();
})

describe("User Work and host Request Testing",()=>{
    
    //testing for user registration
    it("Registration Testing",()=>{
        const user = {
            "first_name":"Srijan",
            "last_name":"Kumar",
            "username":"srijan",
            "password":"123456",
            "userType":"Admin",
            "profileImg":"abcd.jpg",
            'email':"srijan@gmail.com"
        
        }

        return Registration.create(user)
        .then((reg_ret)=>{
            expect(reg_ret.first_name).toEqual("Srijan")
        })
    })

    //testing for work addition
    it("Work Addition Testing",()=>{
        const work = {
            
            WorkImg:"abc.jpg",
            WorkName:"Jello",
            Code:"acadas",
            Description:"sdajshd",
            AvgRating:4


        } 

        return Work.create(work)
        .then((work_ret)=>{
            expect(work_ret.WorkName).toEqual("Jello")
        })
    })


    //testing for work update
    it("Testing work update",async ()=>{
       const status = await Work.updateOne({_id:Object("607145d90a00e9216cb591a2")},{
            $set:{
                "WorkName":"Hello"
            }
        })
      
        expect(status.ok).toBe(1)
    })

//     //testing for work delete
    it("Testing for Work Delete",async ()=>{
        const status = await Work.deleteOne({
            "_id":Object("607145d90a00e9216cb591a2")
        })
     expect(status.ok).toBe(1);
        
    })

//     //testing for request to professional
    it("Testing for Request model",()=>{
            const requests = {
                "user_id":"607143710a00e9216cb591a0",
                "profession":"Plumber",
                "requestDate":"2020-10-12",
                "cv":"no-img.jpg",
                "citizenShip":"no-img.jpg",
                "userPhoto":"no-img.jpg",
                "experience":2,
                "currentAddress":"Swyambhu",
                "contact":"9803609163"

            }

            return ProfessionRequest.create(requests)
            .then((profession_ret)=>{
                expect(profession_ret.currentAddress).toEqual("Swyambhu")
            })
    })

    //testing for request delete
    it("Testing for Request Delete",async ()=>{
        const status = await Work.deleteOne({
            "_id": Object("607d86f0104a462e682ebd8b")
        })
        expect(status.ok).toBe(1);
    })



   // testing for user details update
    it("Testing user details update",async ()=>{
        const status = await Registration.updateOne({
            "_id":Object("607143710a00e9216cb591a0")
        },
        {
            $set:{
                "first_name":"Srijan",
                "last_name":"Budhathoki"
            }
        })

        expect(status.ok).toBe(1)
        
    })

    
   // testing for user delete
    it("Testing user delete",async ()=>{
        const status = await Registration.deleteOne({
            "_id":Object("607143710a00e9216cb591a0")
        })

        expect(status.ok).toBe(1)
        
    })



})