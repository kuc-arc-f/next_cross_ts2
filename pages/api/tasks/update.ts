const csrf = require('csrf');
const tokens = new csrf();

//
export default async function TaskUpdate (req, res){
  try{
    const data = req.body
// console.log(data);
    if(tokens.verify(process.env.CSRF_SECRET, data._token) === false){
      throw new Error('Invalid Token, csrf_check');
    }  
    const id = data.id
    const api_key = data.apikey
    const item = {
      id: id,
      title: data.title ,  
      content: data.content ,
    };
//console.log(item);
    const content = "tasks"
    const response = await fetch(process.env.API_URL + '/api/post/update/' + content, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',  'apikey': api_key
      },
      body: JSON.stringify(item),
    });
    if (response.status === 200) {
      res.json(data)
    } else {
      throw new Error(await response.text());
    }
//console.log(id);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
}
