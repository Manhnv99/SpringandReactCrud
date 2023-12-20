import axios from "axios";


const STUDENT_API_BASE_URL=`http://localhost:8080/student/listStd`;
const MẠJOR_API_BASE_URL=`http://localhost:8080/student/listMj`;
class StudentServices{

    getListStudent=()=>{
        return axios.get(STUDENT_API_BASE_URL);
    }

    getListMajor=()=>{
        return axios.get(MẠJOR_API_BASE_URL);
    }

    getMajorById=(id)=>{
        return axios.get(`http://localhost:8080/student/listMj/${id}`);
    }

    createStudent=(student)=>{
        return axios.post(`http://localhost:8080/student/addStd`,student);
    }

    getStudentById=(id)=>{
        return axios.get(`http://localhost:8080/student/listStd/${id}`);
    }

    updateStudent=(id,student)=>{
        return axios.put(`http://localhost:8080/student/updateStd/${id}`,student);
    }

    deleteStudent=(id)=>{
        return axios.delete(`http://localhost:8080/student/deleteStd/${id}`);
    }


}

export default new StudentServices()