import React, {useState, useEffect} from "react";
import {BiTable} from "react-icons/bi";
import firebaseConfig from '../../Firebase';
import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs} from "@firebase/firestore";
import ClassDetail from "../ClassDetail/index";
import ClassAdd from "../ClassAdd/index";

function ClassList() {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const [classes, setClasses] = useState([]);
    const classesRef = collection(db, "classes");

    const [modalDetail, openModalDetail] = useState(false);
    const [detailClass, setDetailClass] = useState({});
    const [modalAdd, setModalAdd] = useState(false);

    useEffect(() => {
        const getClasses = async () => {
            const data = await getDocs(classesRef);
            setClasses(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }
        getClasses();
    },[])

    const openAdd = () => {
        document.querySelector(".contain-classes").style.display = "none";
        setModalAdd(true);
    }

    let count = 0;

    let renderList = classes.map((classItem) => {
        return (<tr key={classItem.id}>
            <td>{++count}</td>
            <td>{classItem.name}</td>
            <td>{classItem.teacher}</td>
            <td><button className="btn-detail" onClick={() => {openDetail(classItem)}}><BiTable/></button></td>
        </tr>)
    })

    
    const openDetail = (classDetail) => {
        document.querySelector(".contain-classes").style.display = "none";
        openModalDetail(true);
        setDetailClass(classDetail);
        
    }

    return <div className="container-classes">
        <div className="contain-classes">
            <h1>Danh sách các lớp học</h1>
            <button className="btn-class" onClick={openAdd}>Xếp lớp</button>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Lớp học</th>
                        <th>Giáo viên chủ nhiệm</th>
                        <th>Danh sách lớp</th>
                    </tr>
                </thead>
                <tbody>
                    {renderList}
                </tbody>
            </table>
        </div>
        {modalDetail ? <ClassDetail classDetail = {detailClass}/> : null}
        {modalAdd ? <ClassAdd /> : null}
    </div>
}

export default ClassList;