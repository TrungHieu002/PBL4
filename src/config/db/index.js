const mongoose = require('mongoose');
 async function connect(){
     try {
        await mongoose.connect('mongodb+srv://trantrunghieu:0888141688@btf8.todnxxk.mongodb.net/test'),{
         useNewUrlParser : true,
         useUnifielTopology : true,
         useCreateIndex : true,
        }
     } catch (error) {
        console.log("Connect failure");
     }
}
module.exports = {connect};