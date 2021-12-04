import React, {useState, useEffect} from 'react';
import firebaseConfig from '../../Firebase';
import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs} from "@firebase/firestore";
import ReactPaginate from "react-paginate";
import {BiTable} from "react-icons/bi";
import {FiSearch} from "react-icons/fi";
import DetailPoint from "../DetailPoint/index";
import AddPoint from "../AddPoint/index";

function TablePoint(){
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

    const [pageNumber, setPageNumber] = useState(0);
    const perPage = 10;
    const pagesVisited = pageNumber * perPage;
    let count = 0;
    let renderListStudent = students.slice(pagesVisited, pagesVisited + perPage).map((student) => {
        count++;
        return (<tr key={student.id}>
            <td>{count}</td>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.class}</td>
            <td><button className="btn-detail" onClick={() => {detailPoint(student)}}><BiTable/></button></td>
        </tr>)
    })
    const pageCount = Math.ceil(students.length / perPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    const [modalDetail, setModalDetail] = useState(false);
    const [detailStudent, setDetailStudent] =useState({});
    const detailPoint = (student) => {
        setModalDetail(true);
        document.querySelector(".contain-student").style.display = "none";
        setDetailStudent(student);
    }

    const [modalAdd, setModalAdd] = useState(false);
    const addPoint = () => {
        setModalAdd(true);
        document.querySelector(".contain-student").style.display = "none";
    }

    return <div className="container-student">
        <div className="contain-student">
            <h1 style={{textAlign: 'center', marginBottom: "30px", color: "#fff", fontSize: "40px"}}>Danh sách bảng điểm</h1>
            <div className="group-search">
                    <input className="input-search" placeholder="Nhập tên học sinh cần tìm kiếm"/>
                    <FiSearch className="input-search-icon"/>
                </div>
                <button className="add-btn" onClick={addPoint}>Nhập điểm</button>
            <table>
                <thead>
                    <tr>
                        <td>STT</td>
                        <td>Mã số</td>
                        <td>Họ và tên</td>
                        <td>Lớp</td>
                        <td>Chi tiết điểm</td>
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
        {modalDetail ? <DetailPoint student = {detailStudent}/> : null}
        {modalAdd ? <AddPoint/> : null}
    </div>
}

export default TablePoint;