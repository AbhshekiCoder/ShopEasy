import mongoose from "mongoose"


const MongoDBConnect = () =>{
    mongoose.connect(process.env.MONGODBURL).then(()=>{
        console.log("connected to database")
    }).catch(err =>{
        console.log(err.mesage)
    })
}
export default MongoDBConnect