import React, { useState } from 'react';
import Draggable from 'react-draggable';

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
                <div>
                    <input type="text" name="title" value={editedTask.title} onChange={handleInputChange} className="flex grid grid-cols-2 gap-4 border border-gray-400 rounded p-2 mb-2" />
                    <input type="text" name="body" value={editedTask.body} onChange={handleInputChange} className="flex grid grid-cols-2 gap-4 border border-gray-400 rounded p-2 mb-2" />
                    <button onClick={handleSaveClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Save</button>
                    <button onClick={handleCancelClick} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Cancel</button>
                </div>
            );
        } else {
            return (
                <div className='relative'>
                    <div className='absolute top-0 right-0 mt-1 mr-1 flex space-x-2'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="fill-green-500 h-6 w-6 cursor-pointer" onClick={handleEditClick}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-amber-600 object-right-top cursor-pointer" onClick={() => func_delete_task(task.id)}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                            </svg>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 pt-6" >{task.id}: {task.title}</h3>
                    <p className="text-gray-700 mb-2" >{task.body}</p>
                </div>
            );
        }
    };
//defaultPosition={{x:0,y:0}} bounds={{left: window.innerWidth/2-400, top:0, right: 200, bottom: 200}}
    return (
        <Draggable  >
        <div className="p-4 border border-gray-300 rounded mb-4">
            {renderTaskContent()}
        </div>
        </Draggable>
    );
}

export default Task;
