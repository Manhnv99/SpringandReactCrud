import "../css/addStudent.css"
import {useEffect, useState} from "react";
import StudentServices from "../services/StudentServices";
import Loading from "./loading";

const AddStudent=(params)=>{

    const[listMj,setListMj]=useState([]);
    const [name,setName]=useState('')
    const [age,setAge]=useState('')
    const [code,setCode]=useState('')
    const [phone,setPhone]=useState('')
    const [gender,setGender]=useState('')
    const [birthday,setBirthDay]=useState('')
    const [majorid,setIdMajor]=useState('')
    let   [id,setId]=useState(params.getIdStudent())
    const [showData,setShowData]=useState(params.showData())
    const [click,setClick]=useState(params.clickToSetIdStudent())
    const [loading,setLoading]=useState(false)
    // let showData=params.showData();


    // Lấy data list major để truyền vào select option
    useEffect(() => {
        const fetchData= async ()=>{
            try {
                await StudentServices.getListMajor().then((response)=>{
                    setListMj(response.data)
                })
                // set text for Student to update
                if(typeof id ==="number"){
                    await StudentServices.getStudentById(params.getIdStudent()).then((response=> {
                        let student = response.data;
                        let nam=document.querySelector(`input[name="gender"][value="true"]`)
                        let nu=document.querySelector(`input[name="gender"][value="false"]`)
                        let major=document.querySelectorAll('select option')
                        if(student.gender===true){
                            nam.checked=true;
                        }else{
                            nu.checked=true;
                        }
                        setName(student.name);
                        setAge(student.age);
                        setCode(student.code);
                        setPhone(student.phone);
                        setBirthDay(student.birthDay);
                        for(let i=0;i<major.length;i++){
                            if(student.major.id==major[i].value){
                                major[i].selected=true;
                            }
                        }
                    }));
                }
            }catch (e){

            }
        }

        fetchData();
        return()=>{
            window.removeEventListener('click',click)
        }
    }, []);


    //set Student để add update
    const handleAddStudent=()=>{
        setLoading(true)
        setTimeout(async ()=>{
            if(typeof id === "number"){
                await StudentServices.getMajorById(majorid).then((response=>{
                    let student={
                        code:code,
                        name:name,
                        age:age,
                        gender:gender,
                        birthDay:birthday,
                        phone:phone,
                        major:response.data
                    }
                    StudentServices.updateStudent(id,student);
                }));
                console.log(showData)
                await showData;
                await params.handleClose();
                setLoading(false);
            }else{
                await StudentServices.getMajorById(majorid).then((response=>{
                    let student={
                        code:code,
                        name:name,
                        age:age,
                        gender:gender,
                        birthDay:birthday,
                        phone:phone,
                        major:response.data
                    }
                    StudentServices.createStudent(student);
                }));
                await showData;
                await params.handleClose();
                setLoading(false);
            }
        },500)
    }



    const changeNameHandler=(event)=>{
        setName(event.target.value)
    }
    const changeAgeHandler=(event)=>{
        setAge(event.target.value)
    }
    const changeCodeHanler=(event)=>{
        setCode(event.target.value)
    }

    const changeGenderHanler=(event)=>{
        setGender(event.target.value)
    }


    const changePhoneHanler=(event)=>{
        setPhone(event.target.value)
    }

    const changeBirthDayHandler=(event)=>{
        setBirthDay(event.target.value)
    }

    const changeIdMajorHandler=(event)=>{
        setIdMajor(event.target.value)
    }

    return(
        <>
                {loading && <Loading/>}
                <div className="model__container">
                    <div className="model__card">
                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <input type="text" className="inputText" value={name} onChange={(e)=>{changeNameHandler(e)}}/>
                                <p>Your name</p>
                            </div>
                            <div className="col-md-6 mb-4">
                                <input type="text" className="inputText" value={age} onChange={(e)=>{changeAgeHandler(e)}}/>
                                <p>Your Age</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <input type="text" className="inputText" value={code} onChange={(e)=>{changeCodeHanler(e)}}/>
                                <p>Code</p>
                            </div>
                            <div className="gioiTinh col-md-6 mb-4">
                                <div className="gioiTinh1">
                                    <input type="radio" name="gender" value="false" className="inputRa" onChange={(e)=>{changeGenderHanler(e)}}/>
                                    <span>Female</span>
                                </div>
                                <div className="gioiTinh2">
                                    <input type="radio" name="gender" value="true" className="inputR inputRa" onChange={(e)=>{changeGenderHanler(e)}}/>
                                    <span>Male</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <input type="date" className="inputText" value={birthday} onChange={(e)=>{changeBirthDayHandler(e)}}/>
                                <p>Birth Day</p>
                            </div>
                            <div className="col-md-6 mb-4">
                                <input type="text" className="inputText" value={phone} onChange={(e)=>{changePhoneHanler(e)}}/>
                                <p>Phone Number</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <select onChange={(e)=>{changeIdMajorHandler(e)}}>
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
                        <button onClick={handleAddStudent}>Submit</button>
                    </div>
                </div>
        </>
    )
}

export default AddStudent