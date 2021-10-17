// LibAuth
//
//export default  {
const LibAuth = {
  get_user: function(mail , users){
    try{
      let ret = null
      users.forEach(function(item){
//            console.log(item.id );
        if(item.mail === mail){
          ret = item
        }
      });      
//console.log(items)
      return ret
    } catch (e) {
      console.error(e);
      throw new Error('Error , get_user');
    }        
  },
}
export default LibAuth;
