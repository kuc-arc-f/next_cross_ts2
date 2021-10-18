import React  from 'react';
//import LibFlash from '../../../lib/LibFlash';
import LibAuth from '../../../lib/LibAuth';
import LibContent from '../../../lib/LibContent';
import Layout from '../../../components/layout'

interface IState {
  user_id: string,
  categoryItems: Array<any>,
  tagItems: Array<any>,
  radioItems: Array<any>,
  radio_1: string,
}
interface IProps {
  history: string[],
  csrf: any,
  apikey: string,
}
//
class NoteCreate extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "" , categoryItems: [], tagItems:[], radioItems: [], radio_1: '',
    };
  }
  async componentDidMount(){
    const valid = LibAuth.valid_login(this.props)
    if(valid){
      const uid = LibAuth.get_uid()
//console.log(uid);
      const categoryItems = await LibContent.get_items("categoryItems");
      const tagItems = await LibContent.get_items("tagItems");
      const radioItems = await LibContent.get_items("radioItems");
console.log(radioItems);
      this.setState({
        user_id: uid ,categoryItems: categoryItems, tagItems: tagItems,
        radioItems: radioItems,
      })
    }
  }
  async clickHandler(){
    try {
      const title = document.querySelector<HTMLInputElement>('#title');
      const content = document.querySelector<HTMLInputElement>('#content');
      const category = document.querySelector<HTMLInputElement>('#category');
      const arrChecked = [] 
      const check_items = this.state.tagItems;  
      check_items.forEach(function(item, index){
console.log(item.values.name) 
        let checkedName = "check_" + index;
        let elemChecked = document.querySelector<HTMLInputElement>('#'+ checkedName);
        if(elemChecked.checked){
          arrChecked.push(item.values.name)
        }
      });      
console.log(arrChecked)      
      const values = {
        title: title.value,
        content: content.value,
        category: category.value,
        radio_1: this.state.radio_1,
      }
console.log(values);      
      let noteId = "";
      const result = await LibContent.add_item("notes", values, "")
      if(result.data.addContent.id !== 'undefined'){
        noteId = result.data.addContent.id;
console.log("noteId=", noteId);
        for (let item of arrChecked) {
console.log(item);
          let row:any = {note_id: noteId, name: item}
          await LibContent.add_item("noteTags", row, "")
        }
        alert("Complete, save");
      }else{
        throw new Error('nothing, noteId add_item');
      }
      location.href = '/apollo/notes';
    } catch (error) {
      console.error(error);
      alert("Error, save item")
    }
  }
  checkRow(){
    const check_items = this.state.tagItems;
    return check_items.map((item: any, index: number) => {
console.log(item.values.name );
      let name = "check_" + index;
      return(
        <label key={index}>
          <input type="checkbox" name={name} id={name}/>
          <span className="px-2">{item.values.name}</span>
        </label>           
      )      
    })
  }
  handleChangeRadio(e){
    this.setState({radio_1: e.target.value})
  }
  render() {
console.log(this.state.tagItems);
    return (
    <Layout>
      <div className="container py-2">
        <h3>Notes - Create</h3>
        <hr />
        <label>Title:</label>
        <input type="text" name="title" id="title" />
        <hr />
        <label>Content:</label>
        <input type="text" name="content" id="content" />
        <hr />
        <div className="col-md-6 form-group">
          <label>BookType:</label>
          <select className="form-select" name="category" id="category">
          {this.state.categoryItems.map((item ,index) => (
            <option key={index} value={item.values.name}>{item.values.name}</option>
          ))
          }
          </select>
        </div>
        <hr />
        <label>RadioType:</label><br />
        {this.state.radioItems.map((item ,index) => {
console.log(item);
          return (
            <span key={index}>
              <input type="radio" name="radio_1" id="radio_1" value={item.values.name}
              onChange={this.handleChangeRadio.bind(this)} />
                {item.values.name}<br />
            </span>
          );
        })
        }         
        <br />
        Tag:<br />
        {this.checkRow()}
        <hr />
        <button onClick={() => {this.clickHandler()}}>
        Save
        </button>        
      </div>      
    </Layout>
    );
  }
}
export default NoteCreate;
