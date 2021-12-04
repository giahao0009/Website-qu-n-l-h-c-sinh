import React, {useState} from 'react';
import {getFirestore, collection, addDoc} from "firebase/firestore";

function AddStudent(){
    const db = getFirestore();
    const [student, setStudent] = useState({ bangDiem15P : [0, 0, 0 ,0 , 0, 0, 0, 0, 0], 
                                             bangDiem15P2 : [0, 0, 0 ,0 , 0, 0, 0, 0, 0],
                                             bangDiem1T: [0, 0, 0 ,0 , 0, 0, 0, 0, 0],
                                             bangDiem1T2: [0, 0, 0 ,0 , 0, 0, 0, 0, 0]});

    const addStudent = async () => {
        if(window.confirm("Bạn có muốn thêm học sinh ???")){
            await addDoc(collection(db, "students"), student);
            window.location.reload();
        }
    }

    const onChangeInput = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value});
    }

    const onReturn = () => {
        window.location.reload();
    }

    return <div className="container-student-detail">
        <h1>Thêm học sinh mới</h1>
        <div className="form-detail-student">
            <div className="form-group">
                <label>Họ và tên</label>
                <input name="name" defaultValue={student.name} className="form-control" onChange={(e) => {onChangeInput(e)}}/>
            </div>
            <div className="form-group">
                <label>Ngày sinh</label>
                <input name="birthDay" type="date" defaultValue={student.birthDay} className="form-control" onChange={(e) => {onChangeInput(e)}}/>
            </div>
            <div className="form-group">
                <label>Địa chỉ</label>
                <input name="address" className="form-control" onChange={(e) => {onChangeInput(e)}}/>
            </div>
            <div className="form-group">
                <p>Giới tính</p>
                <input  type="radio"  
                        checked = {student.gender == "Nam" ? true : null}
                        name="gender" 
                        value="Nam"
                        onChange={(e) => {onChangeInput(e)}}/>
                <label style={{"marginLeft": "5px", "fontSize": "20px"}}>Nam</label>
                <input  type="radio" 
                        style={{"marginLeft": "20px"}}
                        checked = {student.gender == "Nữ" ? true : null} 
                        name="gender" 
                        value="Nữ"
                        onChange={(e) => {onChangeInput(e)}}/>
                <label style={{"marginLeft": "5px", "fontSize": "20px"}}>Nữ</label>
            </div>
            <div className="form-group">
                <label>Khối lớp</label>
                <select name="grade" className="form-control"  onChange={(e) => {onChangeInput(e)}}>
                    <option>-- Lựa chọn khối lớp --</option>
                    <option>Khối 12</option>
                    <option>Khối 11</option>
                    <option>Khối 10</option>
                </select>
            </div>
            
            <div className="group-btn-control">
                <button className="btn-change" onClick={addStudent}>Thêm học sinh</button>
                <button className="btn-return" onClick={onReturn}>Quay lại</button>
            </div>
        </div>
    </div>  
}

export default AddStudent;