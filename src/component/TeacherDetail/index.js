import React, {useState} from 'react';
import {getFirestore, doc, updateDoc} from 'firebase/firestore';

function TeacherDetail(props) {
    const db = getFirestore();
    const [teacher, setTeacher] = useState(props.teacher);
    const teacherRef = doc(db, "teachers", teacher.id);

    const onClickReturn = () => {
        window.location.reload();
    }

    const updateTeacher = async () => {
        if(window.confirm("Bạn có muốn cập nhật thông tin giáo viên ???")){
            await updateDoc(teacherRef, teacher);
            window.location.reload();
        }
    }

    const onChangeInput = (e) => {
        setTeacher({ ...teacher, [e.target.name]: e.target.value});
    }

    console.log(teacher);
    return <div className="container-teacher-detail">
        <h1>THÔNG TIN GIÁO VIÊN</h1>
        <div className="form-detail-teacher">
            <div className="form-group">
                <label>Họ và tên</label>
                <input  name="fullname"
                        className="form-control" 
                        defaultValue={teacher.fullname}
                        onChange={(e) => {onChangeInput(e)}}/>
            </div>
            <div className="form-group">
                <label>Mã số giáo viên</label>
                <input  className="form-control" 
                        defaultValue={props.teacher.id} 
                        disabled 
                        style={{"opacity": "50%"}}
                        onChange={(e) => {onChangeInput(e)}}/>
            </div>
            <div className="form-group">
                <label>Ngày sinh</label>
                <input  name="dateOfBirth"
                        type="date" 
                        className="form-control" 
                        defaultValue={props.teacher.dateOfBirth} 
                        onChange={(e) => {onChangeInput(e)}}/>
            </div>
            <div className="form-group">
                <label>Địa chỉ</label>
                <input  name="address"
                        className="form-control" 
                        defaultValue={props.teacher.address}
                        onChange={(e) => {onChangeInput(e)}}/>
            </div>
            <div className="form-group">
                <label>Lớp học</label>
                <select name="class" className="form-control" defaultValue={props.teacher.class} onChange={(e) => {onChangeInput(e)}}>
                    <option value="false">Không phải giáo viên chủ nhiệm</option>
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
                <select name="subject" className="form-control" defaultValue={props.teacher.subject} onChange={(e) => {onChangeInput(e)}}>
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
                        checked={props.teacher.gender === "Nam" ? true : null}  
                        name="gender" 
                        value="Nam"
                        onChange={(e) => {onChangeInput(e)}}/>
                <label style={{"marginLeft": "5px", "fontSize": "20px"}}>Nam</label>
                <input  type="radio" 
                        checked={props.teacher.gender === "Nữ" ? true : null} 
                        style={{"marginLeft": "20px"}} 
                        name="gender" 
                        value="Nữ"
                        onChange={(e) => {onChangeInput(e)}}/>
                <label style={{"marginLeft": "5px", "fontSize": "20px"}}>Nữ</label>
            </div>
            <div className="group-btn-control">
                <button className="btn-change" onClick={updateTeacher}>Thay đổi</button>
                <button className="btn-return" onClick={onClickReturn}>Quay lại</button>
            </div>
        </div>
    </div>
}

export default TeacherDetail;