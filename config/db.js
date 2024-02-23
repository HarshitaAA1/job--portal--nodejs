import mongoose from "mongoose";
import colors from 'colors';
const connectdb = async ()=>{
try{
  const con=await mongoose.connect(process.env.db_connection_url)
   console.log(`connected to mongodb database ${mongoose.connection.host}`.bgMagenta.white)

}
catch(error)
{
    console.log(`mongodb error ${ error}`.bgRed.white)
}


}

export default connectdb;