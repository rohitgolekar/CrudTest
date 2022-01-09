import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateEmployee() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [Employees, setEmployees] = useState({
        Fname: "",
        Lname: "",
        Email: ""
    });

    // Get Employee
    useEffect(() => {
        getEmployee();
    }, [id]);

    const getEmployee = async () => {
        try {
            const response = await axios.get(`http://localhost:3004/Employees/${id}`);
            setEmployees(response.data);
        } catch {
            alert("please try again")
        }
    }

    const handleChanege = (e) => {
        setEmployees({ ...Employees, [e.target.name]: e.target.value });
    }

    // Update Employee
    const UpdateEmployee = async () => {
        try {
            await axios.put(`http://localhost:3004/Employees/${id}`, Employees);
            navigate("/", { replace: true });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="container my-5" style={{boxShadow: "5px 5px 20px 0px"}}>
                <div className="row text-white bg-dark p-4 updateEmployee">
                <h4 className="text-center text-white">UPDATE - USER</h4>
                    <div className="col-md-6 mx-auto">
                        <div className="form-group my-2">
                            <label htmlFor="Fname">First Name</label>
                            <input type="text" value={Employees.Fname} className="form-control" onChange={handleChanege} id="Fname" name="Fname" placeholder="Enter First Name" />
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="Lname">Last Name</label>
                            <input type="text" className="form-control" value={Employees.Lname} onChange={handleChanege} id="Lname" name="Lname" placeholder="Enter Last Name" />
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="Email">Email</label>
                            <input type="text" className="form-control" value={Employees.Email} onChange={handleChanege} id="Email" name="Email" placeholder="Enter Email" />
                        </div>
                        <div className="form-group my-2">
                            <button className="btn btn-success" onClick={UpdateEmployee}>Update Employee</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default UpdateEmployee;
