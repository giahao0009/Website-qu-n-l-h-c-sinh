import React, {useState} from 'react';
import ListStudentAddPoint from "../ListStudentAddPoint/index";

function AddPoint() {
    const [filterList, setFilterList] = useState({});
    const [openList, setOpenList] = useState(false);
    const onChangeInput = (e) => {
        setFilterList({ ...filterList, [e.target.name]: e.target.value });
    }

    const openModal = () => {
        setOpenList(true);
    }

    return <div>
        <select className="select-control" name="subject" style={{marginRight: "20px"}} onChange={(e) => {onChangeInput(e)}}>
            <option>--Môn học--</option>
            <option value="Toán học">Toán</option>
            <option value="Vật lý">Vật lý</option>
            <option value="Hóa học">Hóa học</option>
            <option value="Sinh học">Sinh học</option>
            <option value="Lịch sử">Lịch sử</option>
            <option value="Địa lí">Địa lí</option>
            <option value="Ngữ văn">Ngữ văn</option>
            <option value="Đạo đức">Đạo đức</option>
            <option value="Thể dục">Thể dục</option>
        </select>
        <select className="select-control" name="class" style={{marginRight: "20px"}} onChange={(e) => {onChangeInput(e)}}>
            <option>--Lớp học--</option>
            <option value="12A1">12A1</option>
            <option value="12A2">12A2</option>
            <option value="11A1">11A1</option>
            <option value="11A2">11A2</option>
            <option value="11A3">11A3</option>
            <option value="10A1">10A1</option>
            <option value="10A2">10A2</option>
            <option value="10A3">10A3</option> 
            <option value="10A3">10A4</option>
        </select>
        <select className="select-control" name="term" style={{marginRight: "20px"}} onChange={(e) => {onChangeInput(e)}}>
            <option>--Học kỳ--</option>
            <option value="Học kỳ 1">Học kỳ 1</option>
            <option value="Học kỳ 2">Học kỳ 2</option>
        </select>
        <button className="btn-return" onClick={openModal}>Lọc</button>
        <table>
            <thead>
                <tr>
                    <td>Mã số</td>
                    <td>Họ và tên</td>
                    <td>Điểm 15P</td>
                    <td>Điểm 1T</td>
                    <td>Điểm TB</td>
                    <td>Lưu</td>
                </tr>
            </thead>
            { openList ? <ListStudentAddPoint filter = {filterList}/> : null}
        </table>
    </div>
}

export default AddPoint;