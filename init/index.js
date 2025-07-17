const mongoose=require("mongoose");
const initData=require("./data.js");
const listing=require("../models/listing.js");
const review=require("../models/review.js");
let MONGO_URL="mongodb+srv://varshneydeeksha71:munmun@cluster0.4qjgo.mongodb.net/wondolust?retryWrites=true&w=majority&appName=Cluster0";
async function main(){
       await mongoose.connect(MONGO_URL)
       
}
main()
.then(() => console.log('Connected! to db'))
.catch((err)=>console.log(err));

const init=async ()=>{
    await listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"6878cb559817d898d671ca53"}));
    await listing.insertMany(initData.data);
    console.log("succesfully insert");
}
init();
