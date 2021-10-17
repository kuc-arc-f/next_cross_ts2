const csrf = require('csrf');
const tokens = new csrf();

//
export default async function BookNew (req, res){
  try{
//console.log(req.body);
    const data = req.body
    const token = data._token
    if(tokens.verify(process.env.CSRF_SECRET, token) === false){
      throw new Error('Invalid Token, csrf_check');
    }    
    const api_key = data.apikey
    const content = "books"
    const response = await fetch(process.env.API_URL + '/api/post/create/' + content, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',  'apikey': api_key
      },
      body: JSON.stringify(data),
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
