import React, {useState} from 'react';
import {getFirestore, doc, updateDoc} from 'firebase/firestore';

function StudentDetail(props) {
    const db = getFirestore();
    const [student, setStudent] = useState(props.student);
    const studentRef = doc(db, "students", student.id);

    const updateStudent = async () => {
        if(window.confirm("Bạn có muốn cập nhật thông tin học sinh ???")){
            await updateDoc(studentRef, student);
            window.location.reload();
        }
    }

    const onReturn = () => {
        window.location.reload();
    }

    const onChangeInput = (e) => {  
        setStudent({ ...student, [e.target.name]: e.target.value});
    }

    return <div className="container-student-detail">
        <h1>Thông tin học sinh</h1>
        <div className="form-detail-student">
            <div className="form-group">
                <label>Họ và tên</label>
                <input name="name" defaultValue={student.name} className="form-control" onChange={(e) => {onChangeInput(e)}}/>
            </div>
            <div className="form-group">
                <label>Mã số học sinh</label>
                <input disabled className="form-control" value={student.id} style={{"opacity": "50%"}} />
            </div>
            <div className="form-group">
                <label>Ngày sinh</label>
                <input name="birthDay" type="date" defaultValue={student.birthDay} className="form-control" onChange={(e) => {onChangeInput(e)}}/>
            </div>
            <div className="form-group">
                <label>Địa chỉ</label>
                <input name="address" className="form-control" defaultValue={student.address} onChange={(e) => {onChangeInput(e)}}/>
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
                <select name="grade" className="form-control" defaultValue={student.grade}  onChange={(e) => {onChangeInput(e)}}>
                    <option>Khối 12</option>
                    <option>Khối 11</option>
                    <option>Khối 10</option>
                </select>
            </div>
            <div className="form-group">
                <label>Lớp học</label>
                <select name="class" className="form-control" defaultValue={student.class} onChange={(e) => {onChangeInput(e)}}>
                    <option>Chưa thực hiện sắp lớp</option>
                    <option value="12A1">12A1</option>
                    <option value="12A2">12A2</option>
                    <option value="11A1">11A1</option>
                    <option value="11A2">11A2</option>
                    <option value="11A3">11A3</option>
                    <option value="10A1">10A1</option>
                    <option value="10A2">10A2</option>
                    <option value="10A3">10A3</option>
                    <option value="10A4">10A4</option>
                </select>
            </div>
            <div className="group-btn-control">
                <button className="btn-change" onClick={updateStudent}>Thay đổi</button>
                <button className="btn-return" onClick={onReturn}>Quay lại</button>
            </div>
        </div>
    </div>
}

export default StudentDetail;