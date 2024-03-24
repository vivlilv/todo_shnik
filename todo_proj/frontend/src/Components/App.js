import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Task from './Task'


const API_BASE_URL = 'http://localhost:8000/';

function App(){
  const navigate = useNavigate();
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

  const edit_task =(updatedTaskData)=>
  { 
    axios.put(`${API_BASE_URL}tasks/${updatedTaskData.id}/`, updatedTaskData,{
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

  function onLogout(){
    localStorage.removeItem('token');
    navigate('/');
  }

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setFormData({//adds previous input to the specific field(via alias 'name')
      ...formData,
      [name]: value
    })
  }


    return(
    localStorage.getItem('token')
    ?
    <div className='bg-[url("https://player.hu/uploads/2020/10/Jean-Claude-Van-Damme.jpg")] h-screen bg-cover'>
    <div className='flex flex-col items-center justify-center '>
    <form className='flex flex-col w-full items-center' onSubmit={add_task}>
        <div className='flex gap-16 justify-items-center'>
            <div>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                    New task:
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        type="text" name="title" value={formData.title} onChange={handleInputChange} />
                </label>
            </div>
            <div>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                    Details:
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        type="text" name="body" value={formData.body} onChange={handleInputChange} />
                </label>
            </div>
            
        </div>
        <button className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type="submit">Add Task</button>
    </form>

    <div className="absolute top-0 right-0 mt-4 mr-4 lg:mt-0 lg:mr-0">
        <button className='bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            onClick={onLogout}>Logout</button>
    </div>

    <p className='mt-4'>Your Tasklist:</p>
    <div className="grid grid-cols-3 gap-4">
        {tasklist.map(task => (
            <Task key={task.id} task={task} func_delete_task={delete_task} func_get_tasks={get_tasks} func_edit_task={edit_task} />
        ))}
    </div>
</div>
</div>

    :
    navigate('/')
    ) 
  
}

export default App;
