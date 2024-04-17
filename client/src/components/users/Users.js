import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Users = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [confirmModal, setConfirmModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState();

    useEffect(() => {
        const fetchUsers = async () => {
            const token = getCookie('token');
            if (!token) {
                console.error('Token not found');
                navigate('/login');
                return;
            }
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/users`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                // Optionally, you can handle errors and display appropriate messages to the user
            }
        };

        fetchUsers();
    }, []);

    const getCookie = (name) => {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : null;
    };

    const handleConfirmModal = (id) => {
        setConfirmModal(!confirmModal);
        setSelectedUserId(id);
    }

    const handlePromote = async () => {
        try {
            const token = getCookie('token');
            if (!token) {
                console.error('Token not found');
            }
            // Send a request to your backend API to promote the user
            const response = await axios.patch(`${process.env.REACT_APP_API_URL}/admin/promoteuser`,
                {
                    id: selectedUserId
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/users`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
            handleConfirmModal();
        } catch (error) {
            console.error('Error promoting user:', error);
        }
    };

    return (
        <div className='min-h-[90vh] p-5'>
            {confirmModal && <>
                <div id="popup-modal" tabindex="-1" class="overflow-y-auto overflow-x-hidden flex fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div class="relative p-4 w-full max-w-md max-h-full">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal" onClick={handleConfirmModal}>
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                            <div class="p-4 md:p-5 text-center">
                                <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to promote this user?</h3>
                                <button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center" onClick={handlePromote}>
                                    Yes, I'm sure
                                </button>
                                <button data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={handleConfirmModal}>No, cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>}
            <div className='flex justify-center items-center text-white text-xl'>Users</div>
            <div class="mx-auto container py-20 px-6">
                <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {users?.map((user, index) => (
                        <div key={index} className="w-full m-3 p-3 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700">
                            <div className="flex flex-col items-center pb-10">
                                {/* <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={user.profilePicture} alt={user.name} /> */}
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.name}</h5>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{user.role}</span>
                                {user.role=='user'?<div className="flex mt-4 md:mt-6">
                                    <button onClick={() => { handleConfirmModal(user.id) }} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Promote</button>
                                    {/* Add more buttons or actions here */}
                                </div>:null}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Users;
