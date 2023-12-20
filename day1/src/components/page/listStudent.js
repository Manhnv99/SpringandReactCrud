import '../css/listStudent.css'
import {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import AddStudent from "./addStudent";
import StudentServices from "../services/StudentServices";
import Loading from "./loading";

const ListStudent=()=>{
    const [show, setShow] = useState(false);


    const [idStudent,setIdStudent]=useState('')

    const [listStudent,setListStudent]=useState([]);

    const [loading,setLoading]=useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () =>{
        setShow(true);
    };




    useEffect(() => {
        const fetchData= async ()=>{
            try {
                // let response= await axios.get(`http://localhost:8080/student/listStd`);
                // let data= await response.data;
                await showData();
            }catch (e){

            }
        }
        fetchData();
    }, []);

    const showData= ()=>{
        // await setListStudent([student,...listStudent])
        let data=StudentServices.getListStudent().then((response)=>{
            setListStudent(response.data);
        })
        return data;
    }

    const getIdStudent=()=>{
        return idStudent;
    }

    useEffect(() => {
        if(idStudent!==''){
            handleShow()
        }
    }, [idStudent]);

    const setIdRong=()=>{
        setIdStudent('')
    }

    const clickToSetIdStudent=(id)=>{
        setIdStudent(id)
    }

    const handleDeleteStd=(id)=>{
        setLoading(true)
        setTimeout(async ()=>{
            await StudentServices.deleteStudent(id).then((response)=>{
                console.log(response)
                if(response && response.status===200){
                    showData();
                    setLoading(false)
                }
            });
        },500)
    }


    return(
        <>
                <div className="sdt-container">
                    <button className="add-new" onClick={handleShow}>Add New Student</button>
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>BirthDay</th>
                            <th>Phone</th>
                            <th>Major</th>
                            <th>Edit</th>
                        </tr>
                        </thead>
                        <tbody>
                        {loading && <Loading/>}
                        {listStudent.map(item => {
                            return (
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.code}</td>
                                    <td>{item.age}</td>
                                    <td>{item.gender ? "Nam" : "Nữ"}</td>
                                    <td>{item.birthDay}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.tenMajor}</td>
                                    <td>
                                        <a onClick={() => clickToSetIdStudent(item.id)} className="edit"
                                           title="Edit"
                                           data-toggle="tooltip"><i className="material-icons">&#xE254;</i></a>
                                        <a onClick={() => {
                                            handleDeleteStd(item.id)
                                        }} className="delete" title="Delete"
                                           data-toggle="tooltip"><i className="material-icons">&#xE872;</i></a>
                                    </td>
                                </tr>
                            )
                        })
                        }
                        </tbody>
                    </table>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddStudent handleClose={handleClose} showData={showData} getIdStudent={getIdStudent}
                                    setIdRong={setIdRong} clickToSetIdStudent={clickToSetIdStudent}/>
                    </Modal.Body>
                </Modal>
        </>
    )
}

export default ListStudent