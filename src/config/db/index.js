const mongoose = require('mongoose');
 async function connect(){
     try {
        await mongoose.connect('mongodb+srv://PBL4:PBL4@pbl4.djabw9g.mongodb.net/PBL4'),{
         useNewUrlParser : true,
         useUnifielTopology : true,
         useCreateIndex : true,
        }
     } catch (error) {
        console.log("Connect failure");
     }
}
module.exports = {connect};