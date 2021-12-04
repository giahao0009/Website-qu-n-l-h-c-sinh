import React, {useState, useEffect} from "react";
import firebaseConfig from '../../Firebase';
import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs, doc, updateDoc } from "@firebase/firestore";

function ListStudentAddPoint(props) {
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

    
    const getSubjectId = () => {
        if(props.filter.subject == "Toán học"){
            return 0;
        }
        if(props.filter.subject == "Vật lý"){
            return 1;
        }
        if(props.filter.subject == "Hóa học"){
            return 2;
        }
        if(props.filter.subject == "Sinh học"){
            return 3;
        }
        if(props.filter.subject == "Lịch sử"){
            return 4;
        }
        if(props.filter.subject == "Địa lí"){
            return 5;
        }
        if(props.filter.subject == "Ngữ văn"){
            return 6;
        }
        if(props.filter.subject == "Đạo đức"){
            return 7;
        }
        if(props.filter.subject == "Thể dục"){
            return 8;
        }
    }

    let studentFilter = students.filter((student) =>{
       return student.class == props.filter.class;
    })

    const [studentUpdate, setStudentUpdate] = useState({});
    const [changePoint15P, setChangePoint15P] = useState(0);
    const [changePoint1T, setChangePoint1T] = useState(0);

    const updatePoint = async (student) => {
        setStudentUpdate(student);
        let subjectId = getSubjectId();
        let bangDiem15P = student.bangDiem15P;
        let bangDiem1T = student.bangDiem1T;
        bangDiem15P[subjectId] = parseInt(changePoint15P);
        bangDiem1T[subjectId] = parseInt(changePoint1T);
        setStudentUpdate({... studentUpdate, bangDiem15P, bangDiem1T});
        const studentRef = doc(db, "students", student.id);
        if(window.confirm("Bạn có muốn cập nhật điểm của học sinh ???")){
            await updateDoc(studentRef, studentUpdate);
        }
    }

    const onChangeInput = (e) => {
        if(e.target.name == "point15P"){
            setChangePoint15P(e.target.value);
        }
        if(e.target.name == "point1T"){
            setChangePoint1T(e.target.value);
        }
    }

    let renderStudentFilter = studentFilter.map((student) => {
        let subjectId = getSubjectId();
        let point15p;
        let point1T;
        if(props.filter.term == "Học kỳ 1"){
            point15p = student.bangDiem15P[subjectId];
            point1T = student.bangDiem1T[subjectId];
        }
        if(props.filter.term == "Học kỳ 2"){
            point15p = student.bangDiem15P2[subjectId];
            point1T = student.bangDiem1T2[subjectId];
        }
        return (<tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td><input type="number" name = "point15P" className="input-point-add" min="0" max="10" onChange={(e) => onChangeInput(e)} defaultValue={point15p}/></td>
            <td><input type="number" name = "point1T" className="input-point-add" min="0" max="10" onChange={(e) => onChangeInput(e)} defaultValue={point1T}/></td>
            <td><input type="number" className="input-point-add" min="0" max="10" disabled="disabled" /></td>
            <td><button className="add-btn" onClick={() => updatePoint(student)}>Lưu</button></td>
        </tr>)
    })

    return <tbody>
        {renderStudentFilter}
    </tbody>
}

export default ListStudentAddPoint;