import React  from 'react';
//import { Link } from 'react-router-dom';
//import LibFlash from '../../../lib/LibFlash';
//import LibAuth from '../../../lib/LibAuth';
import LibContent from '../../../lib/LibContent';
import Layout from '../../../components/layout'

interface IProps {
  history: string[],
  csrf: any,
  apikey: string,
}
class TaskCreate extends React.Component<IProps> {
  constructor(props) {
    super(props);
    this.state = { user_id: 0 };
  }
  async componentDidMount(){
    /*
    const valid = LibAuth.valid_login(this.props)
    if(valid){
      const uid = LibAuth.get_uid()
      this.setState({user_id: uid })
    }    
    */
  }
  async clickHandler(){
    try {
      const title = document.querySelector<HTMLInputElement>('#title');
      const content = document.querySelector<HTMLInputElement>('#content');
      const values = {
        "title": title.value,
        "content": content.value,
      }
      const result = await LibContent.add_item("tasks", values, "")
console.log(result)
//      var flash = {success:"Conmplete, save", error:""}
//      await LibFlash.set_flash( this.state.user_id , flash)
      alert("Complete, save");
      location.href = '/apollo/tasks';
    } catch (error) {
      alert("Error, save item")
      console.error(error);
    }
  }
  render() {
    return (
    <Layout>
      <div className="container py-2">
        <h3>Tasks - Create</h3>
        <hr />
        <label>Title:</label>
        <input type="text" name="title" id="title" />
        <hr />
        <label>Content:</label>
        <input type="text" name="content" id="content" />
        <hr />
        <button onClick={() => {this.clickHandler()}}>
        Save
        </button>        
      </div>      
    </Layout>
    );
  }
}
export default TaskCreate;
