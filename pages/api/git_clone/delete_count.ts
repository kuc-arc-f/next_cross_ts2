const csrf = require('csrf');
const tokens = new csrf();
import LibHeadless from "../../../lib/LibHeadless"
//
export default async function deleteCount (req, res){
  try{
    if(typeof req.headers.token =='undefined'){
      throw new Error('Invalid header , token');
    }    
console.log(req.body);
//    var data = req.body
    const token = req.headers.token
    const url =process.env.API_URL + "/api/get/find?content=counts&site_id="+ process.env.MY_SITE_ID
console.log("token=" , token);
console.log("url=" , url);
    const request = await fetch( url );
    const json = await request.json();
    let items = json
//console.log(items);
    items = await LibHeadless.delete_count_items(items)
    res.json({})
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
}
