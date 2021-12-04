import React, {useEffect, useState} from "react";
import {FiSearch} from "react-icons/fi";
import {BiTable} from "react-icons/bi";
import {AiFillDelete} from "react-icons/ai";
import ReactPaginate from "react-paginate";
import StudentDetail from "../StudentDetail/index";
import AddStudent from "../AddStudent/index";
import firebaseConfig from '../../Firebase';
import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs, deleteDoc, doc} from "@firebase/firestore";

function Student(){    
    const [detailStudent, setDetailStudent] = useState({});
    const [modalDetail, openModalDetail] = useState(false);
    const [modalAdd, openModalAdd] = useState(false);

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const [students, setStudents] = useState([]);
    const studentCollectionRef = collection(db, "students");
    useEffect(() => {
        const getStudents = async () => {
            const data = await getDocs(studentCollectionRef);
            setStudents(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }
        getStudents();
    },[])

    const openDetail = (student) => {
        setDetailStudent(student)
        openModalDetail(true);
        document.querySelector(".contain-student").style.display = 'none';
    }

    const openAdd = () => {
        openModalDetail(false);
        openModalAdd(true);
        document.querySelector(".contain-student").style.display = "none";
    }

    const deleteStudent = async (id) => {
        if(window.confirm('Bạn có muốn xóa học sinh này ???')){
            await deleteDoc(doc(db, "students", id));
            window.location.reload();
        }
    }

    const [pageNumber, setPageNumber] = useState(0);
    const perPage = 10;
    const pagesVisited = pageNumber * perPage;
    // Render list student
    let count = 0;
    let renderListStudent = students.slice(pagesVisited, pagesVisited + perPage).map((student) => {
        count++;
        return (<tr key={student.id}>
            <td>{count}</td>
            <td>{student.name}</td>
            <td>{student.id}</td>
            <td>{student.gender}</td>
            <td><button className="btn-detail" onClick={() => {openDetail(student)}}><BiTable/></button></td>
            <td><button className="btn-delete" onClick={() => {deleteStudent(student.id)}}><AiFillDelete/></button></td>
        </tr>)
    })

    const pageCount = Math.ceil(students.length / perPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }


    return <div className="container-student">
            <div className="contain-student">
                <div className="group-search">
                    <input className="input-search" placeholder="Nhập tên học sinh cần tìm kiếm"/>
                    <FiSearch className="input-search-icon"/>
                </div>
                <button className="add-btn" onClick={openAdd}>Thêm học sinh</button>
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
                        {renderListStudent}
                    </tbody>
                </table>
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}/>
            </div>
            {modalDetail ? <StudentDetail student={detailStudent}/> : null}
            {modalAdd ? <AddStudent/> : null}
    </div>
}

export default Student;