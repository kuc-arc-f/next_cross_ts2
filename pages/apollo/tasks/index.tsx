import React  from 'react';
import Link from 'next/link';
import { gql } from "@apollo/client";
import Layout from '../../../components/layout'
import client from '../../../apollo-client'
import LibCookie from '../../../lib/LibCookie'
//import LibContent from '../../../lib/LibContent';
import LibApiFind from '../../../lib/LibApiFind';
import IndexRow from './IndexRow';

interface IProps {
  items: Array<object>,
  history:string[],
}
interface IObject {
  id: number,
  title: string
}
//
class TasksIndex extends React.Component<IProps> {
  static async getInitialProps(ctx) {
    const site_id = process.env.MY_SITE_ID;
    const data = await client.query({
      query: gql`
      query {
        contents(site_id: "${site_id}" , content_name:"tasks") {
          id
          name
          values
          user_id
          created_at
        }
      }      
      `,
      fetchPolicy: "network-only"
    });
    const items = LibApiFind.convert_items(data.data.contents)
//console.log(data.data);  
//console.log(items);  
    return {
      items: items,
    }
  }
  constructor(props){
    super(props)
//console.log(props);   
  }       
  async componentDidMount(){
    const key = process.env.COOKIE_KEY_USER_ID;
    if(LibCookie.get_cookie(key) === null){
      location.href = '/login';
    }    
  }
  render() {
    const data = this.props.items;
//console.log(data);
    return (
    <Layout>
    <div className="container py-4">
      <h3>Tasks - index</h3>
      <Link href="/apollo/tasks/Create">
        <a className="btn btn-primary mt-2">New</a>
      </Link>
      <hr />
      {data.map((item: any ,index: number) => {
//console.log(item.values.title);
        return (
          <IndexRow key={index} id={item.id} title={item.values.title} />
        )
      })}      
    </div>
    </Layout>
    );
  }
}
export default TasksIndex;
