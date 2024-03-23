// // 
// import React, { useState } from 'react';

// function Task({ task, func_delete_task, func_edit_task }) {
//     const [isEditing, setIsEditing] = useState(false);
//     const [editedTask, setEditedTask] = useState({ ...task });

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setEditedTask({
//             ...editedTask,
//             [name]: value
//         });
//     };

//     const handleEditClick = () => {
//         setIsEditing(true);
//     };

//     const handleSaveClick = () => {
//         func_edit_task(editedTask);
//         console.log(editedTask)
//         setIsEditing(false);
//     };

//     const handleCancelClick = () => {
//         setEditedTask({ ...task });
//         setIsEditing(false);
//     };

//     const renderTaskContent = () => {
//         if (isEditing) {
//             return (
//                 <>
//                     <input type="text" name="title" value={editedTask.title} onChange={handleInputChange} />
//                     <input type="text" name="body" value={editedTask.body} onChange={handleInputChange} />
//                     <button onClick={handleSaveClick}>Save</button>
//                     <button onClick={handleCancelClick}>Cancel</button>
//                 </>
//             );
//         } else {
//             return (
//                 <>
//                     <h3 className='text-yellow-400' onClick={handleEditClick}>{task.id}: {task.title}</h3>
//                     <p onClick={handleEditClick}>{task.body}</p>
//                     <button onClick={()=>func_delete_task(task.id)}>Remove Task</button>
//                 </>
//             );
//         }
//     };

//     return (
//         <div>
//             {renderTaskContent()}
//         </div>
//     );
// }

// export default Task;
import React, { useState } from 'react';

function Task({ task, func_delete_task, func_edit_task }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({ ...task });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedTask({
            ...editedTask,
            [name]: value
        });
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        func_edit_task(editedTask);
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setEditedTask({ ...task });
        setIsEditing(false);
    };

    const renderTaskContent = () => {
        if (isEditing) {
            return (
                <>
                    <input type="text" name="title" value={editedTask.title} onChange={handleInputChange} className="border border-gray-400 rounded p-2 mb-2" />
                    <input type="text" name="body" value={editedTask.body} onChange={handleInputChange} className="border border-gray-400 rounded p-2 mb-2" />
                    <button onClick={handleSaveClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Save</button>
                    <button onClick={handleCancelClick} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Cancel</button>
                </>
            );
        } else {
            return (
                <>
                    <h3 className="text-xl font-bold mb-2 cursor-pointer" onClick={handleEditClick}>{task.id}: {task.title}</h3>
                    <p className="text-gray-700 mb-2 cursor-pointer" onClick={handleEditClick}>{task.body}</p>
                    <button onClick={() => func_delete_task(task.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Remove Task</button>
                </>
            );
        }
    };

    return (
        <div className="p-4 border border-gray-300 rounded mb-4">
            {renderTaskContent()}
        </div>
    );
}

export default Task;
