import React, {useState, useEffect} from 'react';
import firebaseConfig from '../../Firebase';
import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs} from "@firebase/firestore";
import {BiTable} from "react-icons/bi";
import StudentDetail from "../StudentDetail/index";

function ClassDetail(props) {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const [students, setStudents] = useState([]);
    const studentCollectionRef = collection(db, "students");
    const [classDetail, setClassDetail] = useState(props.classDetail);
    const [modalDetail, setModalDetail] = useState(false);
    const [studentDetail, setStudentDetail] = useState({});
    

    useEffect(() => {
        const getStudents = async () => {
            const data = await getDocs(studentCollectionRef);
            setStudents(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }
        getStudents();
    },[])
    
    let listStudent = [];
    const filterStudent = () => {
        listStudent = students.filter((student) => {
            return student.class == classDetail.name;
        })
    }
    filterStudent();

    const openDetail = (student) => {
        setModalDetail(true);
        setStudentDetail(student);
        document.querySelector('.contain-student').style.display = 'none';
    }


    let count = 0;
    let renderListStudent = listStudent.map((student) => {
        return (<tr key= {student.id}>
            <td>{++count}</td>
            <td>{student.name}</td>
            <td>{student.id}</td>
            <td>{student.gender}</td>
            <td><button className="btn-detail" onClick={() => {openDetail(student)}}><BiTable/></button></td>
        </tr>)
    })


    return <div className="container-student" style={{paddingTop: "0px"}}>
            <div className="contain-student">
                <h1>Danh sách lớp {classDetail.name}</h1>
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Họ và tên</th>
                            <th>Mã số</th>
                            <th>Giới tính</th>
                            <th>Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderListStudent}
                    </tbody>
                </table>
            </div>
            {modalDetail ? <StudentDetail student={studentDetail}/> : null}
        </div>
}

export default ClassDetail;