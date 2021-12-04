import React, {useState,useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Link, useHistory} from 'react-router-dom';
import {FaHome, FaUserGraduate, FaChalkboardTeacher, FaUserTag, FaTable, FaTasks} from "react-icons/fa";
import firebaseConfig from '../../Firebase';
import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs} from "@firebase/firestore";
import Content from "../Content/index";
import Subject from "../Subject/index";
import Teacher from "../Teacher/index";
import Student from "../Student/index";
import ClassList from "../ClassList/index";
import TablePoint from "../TablePoint/index";

function Homepage() {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const [students, setStudents] = useState([]);
    const studentsCollectionRef = collection(db, "students");
    useEffect(() => {
        const getStudents = async () => {
            const data = await getDocs(studentsCollectionRef);
            setStudents(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }
        getStudents();
    },[])
    

    // Btn logout
    const history = useHistory();
    const onSignOut = () => {
        localStorage.removeItem("token");
        history.replace("/");
    }

    return (
        <Router>
            <div className="homepage-component">
                <div className="sidebar-menu">
                    <div className="avatar-img"></div>
                    <div className="avatar-name">
                        <p className="username">Nguyễn Văn Quyết</p>
                        <p className="sub-name">Giáo viên</p>
                    </div>
                    <hr/>
                    <nav className="navigation-menu">
                        <Link className="navigation-link" to="/homepage"> <FaHome className="navi-icon"/>Trang chủ</Link>
                        <Link className="navigation-link" to="/homepage/student"> <FaUserGraduate className="navi-icon"/> Học sinh</Link>
                        <Link className="navigation-link" to="/homepage/teacher"><FaChalkboardTeacher className="navi-icon"/>Giáo viên</Link>
                        <Link className="navigation-link" to="/homepage/classes"><FaUserTag className="navi-icon"/>Lớp học</Link>
                        <Link className="navigation-link" to="/homepage/tablePoint"><FaTable className="navi-icon"/>Bảng điểm</Link>
                        <Link className="navigation-link" to="/homepage/subject"><FaTasks className="navi-icon"/>Môn học</Link>
                        <button className="btn-signOut" onClick = {onSignOut}>Đăng xuất</button>
                    </nav>
                
                </div>
                <div className="content">                
                    <Switch >
                        <Route exact path="/homepage">
                            <Content countStudent = {students.length}/>
                        </Route>
                        <Route path="/homepage/student">
                            <Student students = {students}/>
                        </Route>
                        <Route path="/homepage/teacher" >
                            <Teacher/>
                        </Route>
                        <Route path="/homepage/classes">
                            <ClassList/>
                        </Route>
                        <Route path="/homepage/tablePoint">
                            <TablePoint/>
                        </Route>
                        <Route path="/homepage/subject">
                            <Subject/>
                        </Route>
                        
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default Homepage;