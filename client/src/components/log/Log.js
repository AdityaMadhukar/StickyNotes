import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Log = () => {
    const navigate = useNavigate();
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = getCookie('token');
                if (!token) {
                    console.error('Token not found');
                    navigate("/login");
                    return;
                }

                // Fetch My Notes
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/log`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setLogs(response.data); // Assuming your API returns an array of log objects
            } catch (error) {
                console.error('Error fetching data:', error);
                // Optionally, you can handle errors and display appropriate messages to the user
            }
        };

        fetchData();
    }, []);

    const getCookie = (name) => {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : null;
    };

    return (
        <div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                User
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Activity
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Time
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log, index) => (
                            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4">
                                    {log.name}
                                </th>
                                <td className="px-6 py-4">
                                    {log.description}
                                </td>
                                <td className="px-6 py-4">
                                    {log.timestamp}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Log;
