import React, {useState} from 'react';
import TermPoint from "../TermPoint/index";

function DetailPoint(props){
    const [student, setStudent] = useState(props.student);
    const [hocKy1, setHocKy1] = useState(true);
    const [hocKy2, setHocKy2] = useState(false);

    const changeHK2 = () => {
        setHocKy1(false);
        setHocKy2(true);
    }

    const changeHK1 = () => {
        setHocKy2(false);
        setHocKy1(true);
    }

    const returnTablePoint = () => {
        window.location.reload();
    }

    return <div className="container-detail-point">
        <p>Tên học sinh: {student.name}</p>
        <p>Mã số: {student.id}</p>
        <button className="add-btn" onClick={changeHK2}>Học kỳ 2</button>
        <button className="add-btn" onClick={changeHK1} style={{marginRight: "10px", marginBottom: "10px"}}>Học kỳ 1</button>
        <table>
            <thead>
                <tr>
                    <td></td>
                    <td>Điểm 15P</td>
                    <td>Điểm 1 tiết</td>
                    <td>Điểm trung bình</td>
                </tr>
            </thead>
            {hocKy1 ? <TermPoint point15P = {student.bangDiem15P} point1T={student.bangDiem1T}/> : null}
            {hocKy2 ? <TermPoint point15P = {student.bangDiem15P2} point1T={student.bangDiem1T2} /> : null}
        </table>
        <button className="btn-return" style={{marginTop: "10px"}} onClick={returnTablePoint}>Quay lại</button>
    </div>
}

export default DetailPoint;