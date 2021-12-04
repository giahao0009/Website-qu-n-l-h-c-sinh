import React, {useState} from 'react';
import {getFirestore, collection, addDoc} from "firebase/firestore";

function AddTeacher() {
    const db = getFirestore();
    const [teacher, setTeacher] = useState({});

    const onChangeInput = (e) => {
        setTeacher({ ...teacher, [e.target.name]: e.target.value});
    }

    const addTeacher = async () => {
        if(window.confirm("Bạn có muốn thêm giáo viên ???")){
            await addDoc(collection(db, "teachers"), teacher);
            window.location.reload();
        }
    }

    const onReturn = () => {
        window.location.reload();
    }

    return <div className="container-teacher-detail">
        <h1>THÊM GIÁO VIÊN</h1>
        <div className="form-detail-teacher">
            <div className="form-group">
                <label>Họ và tên</label>
                <input  name="fullname"
                        className="form-control"
                        required
                        onChange={(e) => {onChangeInput(e)}}/>
            </div>
            <div className="form-group">
                <label>Ngày sinh</label>
                <input  name="dateOfBirth"
                        type="date"
                        required
                        className="form-control" 
                        onChange={(e) => {onChangeInput(e)}}/>
            </div>
            <div className="form-group">
                <label>Địa chỉ</label>
                <input  name="address"
                        required
                        className="form-control" 
                        onChange={(e) => {onChangeInput(e)}}/>
            </div>
            <div className="form-group">
                <label>Lớp học</label>
                <select name="class" className="form-control" onChange={(e) => {onChangeInput(e)}}>
                    <option>Không phải giáo viên chủ nhiệm</option>
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
            <div className="form-group">
                <label>Môn học</label>
                <select name="subject" className="form-control" onChange={(e) => {onChangeInput(e)}}>
                    <option value="Toán học">Toán học</option>
                    <option value="Vật lý">Vật lý</option>
                    <option value="Hóa học">Hóa học</option>
                    <option value="Sinh học">Sinh học</option>
                    <option value="Lịch sử">Lịch sử</option>
                    <option value="Địa lí">Địa lí</option>
                    <option value="Văn học">Văn học</option>
                    <option value="Đạo đức">Đạo đức</option>
                    <option value="Thể dục">Thể dục</option>
                </select>
            </div>
            <div className="form-group">
                <p>Giới tính</p>
                <input  type="radio"  
                        name="gender" 
                        value="Nam"
                        onChange={(e) => {onChangeInput(e)}}/>
                <label style={{"marginLeft": "5px", "fontSize": "20px"}}>Nam</label>
                <input  type="radio" 
                        style={{"marginLeft": "20px"}} 
                        name="gender" 
                        value="Nữ"
                        onChange={(e) => {onChangeInput(e)}}/>
                <label style={{"marginLeft": "5px", "fontSize": "20px"}}>Nữ</label>
            </div>
            <div className="group-btn-control">
                <button className="btn-change" onClick={addTeacher}>Thêm giáo viên</button>
                <button className="btn-return" onClick={onReturn}>Quay lại</button>
            </div>
        </div>
    </div>
}

export default AddTeacher;