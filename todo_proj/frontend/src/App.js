import React, {useState, useEffect} from 'react'
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/';

/*important note:
based on whether localStorage has token of current user the render of App component
will either display log in page or if token is present will display main page
*/

function App({onLogout}){

  const [tasklist, SetTasklist] = useState([])
  const [formData, setFormData] = useState({title:'',body:''})
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
      if (localStorage.getItem('token')) {//to access user.data via token
          axios.get(`${API_BASE_URL}users/api/dj-rest-auth/user`, {
              headers: {
                  'Authorization': `Token ${localStorage.getItem('token')}`
              }
          })//requesting user via its token
            .then(response => {
                console.log(response.data)
                setCurrentUser(response.data);
            })
            .then(()=>{
              get_tasks();
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
        }
      
    }, []);


  const get_tasks = ()=>{
    axios
    .get(`${API_BASE_URL}tasks/`,{
    headers:{
      'Authorization':`Token ${localStorage.getItem('token')}`
    }})
    .then(response=>{
      SetTasklist(response.data)
      console.log('tasks fetched successfully :)')
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const add_task =(event)=>
  { 
    event.preventDefault();
    formData.author = currentUser.pk

    axios.post(`${API_BASE_URL}tasks/`,formData,{
      headers:{
        'Authorization':`Token ${localStorage.getItem('token')}`
      }})
    .then(response => {
      get_tasks();
      setFormData({
        title:'',
        body:''
      })
      console.log('task added!')
    })
    .catch(err => {
      console.log(err);
    });
  }
  
  const delete_task =(id)=>
  { 
    axios.delete(`${API_BASE_URL}tasks/${id}`,{
      headers:{
        'Authorization':`Token ${localStorage.getItem('token')}`
      }})
    .then(response => {
      get_tasks();
    })
    .catch(err => {
      console.log(err);
    });
  }

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setFormData({//adds previous input to the specific field(via alias 'name')
      ...formData,
      [name]: value
    })
  }


    return(
    
    <div>
      <form onSubmit={add_task}>
        <label>
          New task:
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
        </label>
        <label>
          Details:
          <input type="text" name="body" value={formData.body} onChange={handleInputChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <div>
        </div>
          <p>Your Tasklist:</p>
        <div>
            {tasklist.map(task=>(
              <div key={task.id}>
                <h3>Task N{task.id}: {task.title}</h3>
                <p>{task.body}</p>
                <button onClick={()=>delete_task(task.id)}>Remove Task</button>
              </div>
            ))}
       </div>
       <button onClick={()=>onLogout()}>Logout</button>
    </div>
    ) 
  
}

export default App;
