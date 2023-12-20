import '../css/listStudent.css'
import {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import {Button} from "react-bootstrap";
import AddStudent from "./addStudent";
import axios from "axios";
import StudentServices from "../services/StudentServices";

const UpdateStudent=()=>{

    const[listMj,setListMj]=useState([]);

    return(
        <>
            <div className="model__container">
                <div className="model__card">
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <input type="text" className="inputText"/>
                            <p>Your name</p>
                        </div>
                        <div className="col-md-6 mb-4">
                            <input type="text" className="inputText"/>
                            <p>Your Age</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <input type="text" className="inputText"/>
                            <p>Code</p>
                        </div>
                        <div className="gioiTinh col-md-6 mb-4">
                            <div className="gioiTinh1">
                                <input type="radio" name="gender" value="false" className="inputRa"/>
                                <span>Female</span>
                            </div>
                            <div className="gioiTinh2">
                                <input type="radio" name="gender" value="true" className="inputR inputRa" />
                                <span>Male</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <input type="date" className="inputText" />
                            <p>Birth Day</p>
                        </div>
                        <div className="col-md-6 mb-4">
                            <input type="text" className="inputText"/>
                            <p>Phone Number</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <select>
                                {listMj.map(item=>{
                                    return(
                                        <option value={item.id}>{item.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="submit">
                    <button>Submit</button>
                </div>
            </div>
        </>
    )
}

export default UpdateStudent;