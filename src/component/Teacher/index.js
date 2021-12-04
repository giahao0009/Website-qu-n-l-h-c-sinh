import React, {useState, useEffect} from "react";
import {FiSearch} from "react-icons/fi";
import {AiFillDelete} from "react-icons/ai";
import {BiTable} from "react-icons/bi";
import firebaseConfig from '../../Firebase';
import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs, deleteDoc, doc} from "@firebase/firestore";
import TeacherDetail from "../TeacherDetail/index";
import AddTeacher from "../AddTeacher";

function Teacher(){
    const [modalDetail, openModalDetail] = useState(false);
    const [modalAdd, openModalAdd] = useState(false);
    const [detailTeacher, setDetailTeacher] = useState({});

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const [teachers, setTeachers] = useState([]); 
    const teacherCollectionRef = collection(db, "teachers");
    useEffect(() => {
        const getTeacher = async () => {
            const data = await getDocs(teacherCollectionRef);
            setTeachers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
            
        }
        getTeacher();
    },[])
    
    // detail teachers
    const openDetailTeacher = (teacher) => {
        openModalAdd(false);
        openModalDetail(true);
        setDetailTeacher(teacher);
        document.querySelector(".teacher-contain").style.display = "none";
    }

    // open add teacher dialog
    const openAddTeacher = () => {
        openModalDetail(false);
        openModalAdd(true);
        document.querySelector(".teacher-contain").style.display = "none";
    }

    // delete teacher
    const deleteTeacher = async (id) => {
        if(window.confirm('Bạn có muốn xóa giáo viên này ???')){
            await deleteDoc(doc(db, "teachers", id));
            window.location.reload();
        }
    }

    // render list teacher
    let count = 0;
    let renderListTeacher = teachers.map((teacher) => {
        count++;
        return (<tr key={teacher.id}>
            <td>{count}</td>
            <td>{teacher.fullname}</td>
            <td>{teacher.id}</td>
            <td>{teacher.gender}</td>
            <td><button className="btn-detail" onClick={() => {openDetailTeacher(teacher)}}><BiTable/></button></td>
            <td><button className="btn-delete" onClick={() => {deleteTeacher(teacher.id)}}><AiFillDelete/></button></td>
        </tr>)
    })

    

    return (<div className="container-teacher">
       <div className="teacher-contain">
            <div className="group-search">
                <input className="input-search" placeholder="Nhập tên giáo viên cần tìm kiếm"/>
                <FiSearch className="input-search-icon"/>
            </div>
            <button className="add-btn" onClick={openAddTeacher}>Thêm giáo viên</button>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Họ và tên</th>
                        <th>Mã số</th>
                        <th>Giới tính</th>
                        <th>Chi tiết</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {renderListTeacher}
                </tbody>
            </table>
       </div>
        {modalDetail ? <TeacherDetail teacher={detailTeacher}/> : null}
        {modalAdd ? <AddTeacher /> : null}
    </div>)
}

export default Teacher;