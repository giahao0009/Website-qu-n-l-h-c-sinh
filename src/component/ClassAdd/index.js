import React, {useState, useEffect} from 'react';
import firebaseConfig from '../../Firebase';
import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs, doc, update, updateDoc} from "@firebase/firestore";

function ClassAdd() {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const [students, setStudents] = useState([]);
    const studentCollectionRef = collection(db, "students");


    const [sortCl, setSortCl] = useState({});
    const updateStudent = async (id) => {
        const studentRef = doc(db, "students", id)
        if(window.confirm("Bạn có muốn phân lớp cho học sinh ???")){
            await updateDoc(studentRef, sortCl);
            window.location.reload();
        }
    }

    const onChangeInput = (e) => {
        setSortCl({[e.target.name]: e.target.value});
        console.log(sortCl);
    }

    useEffect(() => {
        const getStudents = async () => {
            const data = await getDocs(studentCollectionRef);
            setStudents(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }
        getStudents();
    },[])

    const filterList = students.filter((student) => {
        return !student.class;
    })

    const renderList = filterList.map((student) => {
        if(student.grade === "Khối 12"){
            return (<tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.birthDay}</td>
            <td>{student.gender}</td>
            <td>{student.grade}</td>
            <td>
                <select className="select-control" name="class" onChange={(e) => onChangeInput(e)}>
                    <option>-- Lựa chọn --</option>
                    <option value="12A1">12A1</option>
                    <option value="12A2">12A2</option>
                </select>
                <button className="add-btn" onClick={() => {updateStudent(student.id)}}>Phân lớp</button>
            </td>
        </tr>)
        }
        else if(student.grade === "Khối 11"){
            return (<tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.birthDay}</td>
            <td>{student.gender}</td>
            <td>{student.grade}</td>
            <td>
                <select className="select-control" name="class" onChange={(e) => onChangeInput(e)}>
                    <option>-- Lựa chọn --</option>
                    <option value="11A1">11A1</option>
                    <option value="11A2">11A2</option>
                    <option value="11A3">11A3</option>
                </select>
                <button className="add-btn" onClick={()  => {updateStudent(student.id)}}>Phân lớp</button>
            </td>
        </tr>)
        }
        else if(student.grade === "Khối 10"){
            return (<tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.birthDay}</td>
            <td>{student.gender}</td>
            <td>{student.grade}</td>
            <td>
                <select className="select-control" name="class" onChange={(e) => onChangeInput(e)}>
                    <option>-- Lựa chọn --</option>
                    <option value="10A1">10A1</option>
                    <option value="10A2">10A2</option>
                    <option value="10A3">10A3</option>
                    <option value="10A3">10A4</option>
                </select>
                <button className="add-btn" onClick={() => {updateStudent(student.id)}}>Phân lớp</button>
            </td>
        </tr>)
        }
    })


    return <div className="container-addClass">
        <h1>Danh sách học sinh cần xếp lớp</h1>
        <table>
            <thead>
                <tr>
                    <td>Mã học sinh</td>
                    <td>Họ và tên</td>
                    <td>Ngày sinh</td>
                    <td>Giới tính</td>
                    <td>Khối lớp</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {renderList}
            </tbody>
        </table>
    </div>
}

export default ClassAdd;