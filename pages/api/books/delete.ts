//
export default async function bookDelete (req, res){
  try{
//console.log(req.body);
    const data = req.body
    const api_key = data.apikey
    const item = {
      id: data.id,
    };    
    const content = "books"
    const response = await fetch(process.env.API_URL + '/api/post/delete/' + content, {
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
