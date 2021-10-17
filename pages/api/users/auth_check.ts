const bcrypt = require('bcrypt');
const csrf = require('csrf');
const tokens = new csrf();
import LibAuth from '../../../lib/LibAuth'
//
export default async function authCheck (req, res) {
  try{
    if (req.method === "POST") {
      const retArr: any = {ret: 0, user_id:0}
      const data = req.body
//console.log(data)
      if(tokens.verify(process.env.CSRF_SECRET, data._token) === false){
        throw new Error('Invalid Token, csrf_check');
      } 
      const site_id = data.site_id
      const url = process.env.API_URL +"/api/get/find?content=users&site_id=" +site_id      
      const response = await fetch(url)    
      const json = await response.json()
console.log(json)
      const user = LibAuth.get_user( data.mail , json)
      if(user === null){
        throw new Error('error, get_user mail nothing');
      }
      if (bcrypt.compareSync(data.password,  user.password )){
          retArr.ret = 1
          user.password = ""
          retArr.user = user
          return res.json(retArr);
      }else{
        return res.json(retArr);
      } 
    }else{
      return res.status(404).send("");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }  
}
