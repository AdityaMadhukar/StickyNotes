import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import deleteIcon from './delete.png';
import editIcon from './edit.png';
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate();
    const [myNotes, setMyNotes] = useState([]);
    const [publicNotes, setPublicNotes] = useState([]);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedNoteId, setSelectedNoteId] = useState();
    const [role, setRole] = useState("user");
    const [formData, setFormData] = useState({
        privacy: '',
        note: ''
    });

    useEffect(() => {
        const cookieRole = getRole('role');;
        setRole(cookieRole);
        const fetchNotes = async () => {
            try {
                // Retrieve token from cookie
                const token = getCookie('token');
                if (!token) {
                    console.error('Token not found');
                    navigate("/login");
                }

                // Fetch My Notes
                const myNotesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/notes/mynotes`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setMyNotes(myNotesResponse.data);
                // Fetch Public Notes
                const publicNotesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/notes`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setPublicNotes(publicNotesResponse.data);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };

        fetchNotes();
    }, []);

    // Function to get cookie by name
    const getCookie = (name) => {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : null;
    };

    const getRole = (name) => {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : null;
    };

    const handleAddModal = () => {
        setAddModal(!addModal);
    };

    const handleEditModal = (note) => {
        setEditModal(!editModal);
        setSelectedNoteId(note.id);
        setFormData({
            privacy: note.status,
            note: note.note
        });
    };


    const handleDeleteModal = (id) => {
        setDeleteModal(!deleteModal);
        setSelectedNoteId(id);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddNote = async () => {
        const token = getCookie('token');
        if (!token) {
            console.error('Token not found');
            return;
        }
        try {
            // Send a request to add a new note
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/notes/addnote`,
                {
                    status: formData.privacy,
                    note: formData.note
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            try {
                // Retrieve token from cookie
                const token = getCookie('token');
                if (!token) {
                    console.error('Token not found');
                    navigate("/login");
                }

                // Fetch My Notes
                const myNotesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/notes/mynotes`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setMyNotes(myNotesResponse.data);
                // Fetch Public Notes
                const publicNotesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/notes`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setPublicNotes(publicNotesResponse.data);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
            handleAddModal();
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    const handleEditNote = async () => {
        const token = getCookie('token');
        if (!token) {
            console.error('Token not found');
            return;
        }
        try {
            // Send a request to add a new note
            const response = await axios.patch(`${process.env.REACT_APP_API_URL}/notes/editnote`,
                {
                    id: selectedNoteId,
                    status: formData.privacy,
                    note: formData.note
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            try {
                // Retrieve token from cookie
                const token = getCookie('token');
                if (!token) {
                    console.error('Token not found');
                    navigate("/login");
                }

                // Fetch My Notes
                const myNotesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/notes/mynotes`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setMyNotes(myNotesResponse.data);
                // Fetch Public Notes
                const publicNotesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/notes`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setPublicNotes(publicNotesResponse.data);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
            handleEditModal();
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    const handleDeleteNote = async () => {
        const token = getCookie('token');
        if (!token) {
            console.error('Token not found');
            return;
        }
        try {
            // Send a request to add a new note
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/notes/deletenote`, {
                data: {
                    id: selectedNoteId
                },
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            try {
                // Retrieve token from cookie
                const token = getCookie('token');
                if (!token) {
                    console.error('Token not found');
                    navigate("/login");
                }

                // Fetch My Notes
                const myNotesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/notes/mynotes`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setMyNotes(myNotesResponse.data);
                // Fetch Public Notes
                const publicNotesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/notes`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setPublicNotes(publicNotesResponse.data);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
            handleDeleteModal();
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    return (
        <div className='m-3 p-3'>

            <button onClick={handleAddModal} className="absolute right-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Note</button>
            {addModal &&
                <div className="overflow-y-auto flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Create New Note
                                </h3>
                                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" onClick={handleAddModal}>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <form className="p-4 md:p-5">
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="privacy" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Privacy</label>
                                        <select value={formData.privacy} id="privacy" name="privacy" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange}>
                                            <option value="">Select privacy</option>
                                            <option value="public">Public</option>
                                            <option value="private">Private</option>
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="note" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Note</label>
                                        <textarea id="note" name="note" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write Note here" onChange={handleChange}></textarea>
                                    </div>
                                </div>
                                <button type="button" onClick={handleAddNote} className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                    Add new note
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            }

            {editModal &&
                <div className="overflow-y-auto flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Edit Note
                                </h3>
                                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" onClick={handleEditModal}>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <form className="p-4 md:p-5">
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="privacy" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Privacy</label>
                                        <select value={formData.privacy} id="privacy" name="privacy" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange}>
                                            <option value="">Select privacy</option>
                                            <option value="public">Public</option>
                                            <option value="private">Private</option>
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="note" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Note</label>
                                        <textarea id="note" name="note" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write Note here" onChange={handleChange}>{formData.note}</textarea>
                                    </div>
                                </div>
                                <button type="button" onClick={handleEditNote} className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                    Edit note
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            }

            {deleteModal && <>
                <div id="popup-modal" tabindex="-1" class="overflow-y-auto overflow-x-hidden flex fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div class="relative p-4 w-full max-w-md max-h-full">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal" onClick={handleDeleteModal}>
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                            <div class="p-4 md:p-5 text-center">
                                <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                                <button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center" onClick={handleDeleteNote}>
                                    Yes, I'm sure
                                </button>
                                <button data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={handleDeleteModal}>No, cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>}
            {/* My Notes */}
            <div>
                <div className='flex justify-center items-center text-white text-xl'>My Notes</div>
                <div class="mx-auto container py-20 px-6">
                    <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {myNotes?.length==0?<div className='text-dark text-lg bg-blue-300 p-5'>You have no Notes. Click on Add notes to create notes of your own.</div>:null}
                        {myNotes?.map((note, index) => (
                            <div class="w-full h-64 flex flex-col justify-between odd:bg-pink-300 even:bg-blue-300 rounded-lg border even:border-pink-300 odd:border-blue-300 mb-6 py-5 px-4">
                                <div>
                                    <p class="text-gray-800 text-sm">{note.note}</p>
                                </div>
                                <div>
                                    <div class="flex items-center justify-between text-gray-800">
                                        <p class="text-sm">{note.status}</p>
                                        <div className='flex gap-1'>
                                            <button class="w-8 h-8 text-xs rounded-full text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-blue-300  focus:ring-black" aria-label="edit note" role="button" onClick={() => { handleEditModal(note) }}>
                                                <img src={editIcon}/>
                                            </button>
                                            <button class="w-8 h-8 text-xs rounded-full text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-blue-300  focus:ring-black" aria-label="edit note" role="button" onClick={() => { handleDeleteModal(note.id) }}>
                                                <img src={deleteIcon}/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Public Notes */}
            <div>
                <div className='flex justify-center items-center text-white text-xl'>Public Notes</div>
                <div class="mx-auto container py-20 px-6">
                    <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {publicNotes?.map((note, index) => (
                            <div class="w-full h-64 flex flex-col justify-between odd:bg-pink-300 even:bg-blue-300 rounded-lg border even:border-pink-300 odd:border-blue-300 mb-6 py-5 px-4">
                                <div>
                                    <h4 className='text-xl font-bold mb-2'>{note.name}</h4>
                                    <p class="text-gray-800 text-sm">{note.note}</p>
                                </div>
                                <div>
                                    <div class="flex items-center justify-between text-gray-800">
                                        {role=='admin'?<p class="text-sm">{note.status}</p>:null}
                                        {role == 'admin' ?
                                            <>
                                                <div className='flex gap-1'>
                                                    <button class="w-9 h-9 text-xs rounded-full text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-blue-300  focus:ring-black" aria-label="edit note" role="button" onClick={() => { handleEditModal(note) }}>
                                                        <img src={editIcon}/>
                                                    </button>
                                                    <button class="w-9 h-9 text-xs rounded-full text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-blue-300  focus:ring-black" aria-label="edit note" role="button" onClick={() => { handleDeleteModal(note.id) }}>
                                                        <img src={deleteIcon}/>
                                                    </button>
                                                </div>
                                            </> : null}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Home;
