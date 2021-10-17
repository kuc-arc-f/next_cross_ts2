const bcrypt = require('bcrypt');
const csrf = require('csrf');
const tokens = new csrf();

//
export default async function newUser (req, res){
  try{
    const data = req.body
    let hashed_password = bcrypt.hashSync(data.password, 10);
// console.log(data);
    if(tokens.verify(process.env.CSRF_SECRET, data._token) === false){
      throw new Error('Invalid Token, csrf_check');
    }   
    const item = {
      mail: data.mail,
      password: hashed_password,
      name: data.name,
      created_at: new Date(),
    }    
console.log(item);
    const api_key = data.apikey
    const content = "users"
    const response = await fetch(process.env.API_URL + '/api/post/create/' + content, {
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
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
}
