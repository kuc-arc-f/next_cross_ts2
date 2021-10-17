
// export default const LibHeadless = {
const LibHeadless = {
  add_count: async function(items){
    try{
      const len = items.length
      for(let i=0; i < len; i++){
        let item = items[i]
//console.log(item)
        let data = {
          repo_id: item.id, name: item.name,
          count: item.count, uniques: item.uniques,
        }
        let api_key = process.env.MY_API_KEY
        let content = "counts"
        const response = await fetch(process.env.API_URL + '/api/post/create/' + content, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',  'apikey': api_key
          },
          body: JSON.stringify(data),
        });
        if (response.status !== 200) {
          throw new Error(await response.text());
        }  
      }
    } catch (err) {
      console.log(err);
      throw new Error('error, add_count');
    }
  },
  get_count_items: async function(items){
    try{
      const ret = []
      const len = items.length
      for(let i=0; i < len; i++){
//console.log(items[i].name );
let item = items[i]
        let name = items[i].name
        let url = process.env.GIT_API_URL + `/repos/${process.env.GIT_OWNER}/${name}/`
        url += "traffic/clones?per=week"
//console.log(url)
        let response = await fetch(url, {
          method: 'GET', headers: { 'Authorization': 'token ' + process.env.GIT_TOKEN },
        });
        let status = await response.status
        if (status === 200) {
          let json =  await response.json()
          item.count = json.count
          item.uniques = json.uniques
//console.log(json );
          ret.push(item)
        }
      }
//console.log(ret );
      return ret
    } catch (err) {
      console.log(err);
      throw new Error('error, get_count_items');
    } 
  },
  delete_count_items: async function(items){
    try{
      const api_key = process.env.MY_API_KEY
      const content = "counts"
      const len = items.length
      for(let i=0; i < len; i++){
        let item = items[i]
//console.log(item.id)
        let delete_item = {
          id: item.id,
        }
        const response = await fetch(process.env.API_URL + '/api/post/delete/' + content, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',  'apikey': api_key
          },
          body: JSON.stringify(delete_item),
        });
        if (response.status !== 200) {
          throw new Error(await response.text());
        }        
      }
    } catch (err) {
      console.log(err);
      throw new Error('error, delete_count_items');
    }    
  },
}
export default LibHeadless;