import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Users() {
    const [userData, setUserData] = useState([]);

    const fetchData = () => {
        axios.get('http://localhost:3000/users')
            .then((res) => {
                // Filter the data where type is equal to 'user'
                const filteredData = res.data.filter(item => item.type === 'user');
                setUserData(filteredData);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-3">Users</h2>
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Sr. No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
