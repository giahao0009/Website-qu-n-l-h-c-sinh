import React, {useState} from "react";

function TermPoint(props){
    const [point15P, setPoint15P] = useState(props.point15P);
    const [point1T, setPoint1T] = useState(props.point1T);

    const avgCal = () => {
        let avg = (((point15P[0] + point1T[0])/2)
         + ((point15P[1] + point1T[1])/2)
         + ((point15P[2] + point1T[2])/2)
         + ((point15P[3] + point1T[3])/2)
         + ((point15P[4] + point1T[4])/2)
         + ((point15P[5] + point1T[5])/2)
         + ((point15P[6] + point1T[6])/2)
         + ((point15P[7] + point1T[7])/2)
         + ((point15P[8] + point1T[8])/2)) / 9;
         return avg.toFixed(2);
    }

    return <tbody>
            <tr style={{borderBottom: '1px solid #000'}}>
                <td>Toán</td>
                <td>{point15P[0]}</td>
                <td>{point1T[0]}</td>
                <td>{(point15P[0] + point1T[0])/2}</td>
            </tr>
            <tr style={{borderBottom: '1px solid #000'}}>
                <td>Vật lý</td>
                <td>{point15P[1]}</td>
                <td>{point1T[1]}</td>
                <td>{(point15P[1] + point1T[1])/2}</td>
            </tr>
            <tr style={{borderBottom: '1px solid #000'}}>
                <td>Hóa học</td>
                <td>{point15P[2]}</td>
                <td>{point1T[2]}</td>
                <td>{(point15P[2] + point1T[2])/2}</td>
            </tr>
            <tr style={{borderBottom: '1px solid #000'}}>
                <td>Sinh học</td>
                <td>{point15P[3]}</td>
                <td>{point1T[3]}</td>
                <td>{(point15P[3] + point1T[3])/2}</td>
            </tr>
            <tr style={{borderBottom: '1px solid #000'}}>
                <td>Lịch sử</td>
                <td>{point15P[4]}</td>
                <td>{point1T[4]}</td>
                <td>{(point15P[4] + point1T[4])/2}</td>
            </tr>
            <tr style={{borderBottom: '1px solid #000'}}>
                <td>Địa lí</td>
                <td>{point15P[5]}</td>
                <td>{point1T[5]}</td>
                <td>{(point15P[5] + point1T[5])/2}</td>
            </tr>
            <tr style={{borderBottom: '1px solid #000'}}>
                <td>Ngữ văn</td>
                <td>{point15P[6]}</td>
                <td>{point1T[6]}</td>
                <td>{(point15P[6] + point1T[6])/2}</td>
            </tr>
            <tr style={{borderBottom: '1px solid #000'}}>
                <td>Đạo đức</td>
                <td>{point15P[7]}</td>
                <td>{point1T[7]}</td>
                <td>{(point15P[7] + point1T[7])/2}</td>
            </tr>
            <tr style={{borderBottom: '1px solid #000'}}>
                <td>Thể dục</td>
                <td>{point15P[8]}</td>
                <td>{point1T[8]}</td>
                <td>{(point15P[8] + point1T[8])/2}</td>
            </tr>
            <tr>
                <td>Trung bình học kỳ</td>
                <td colSpan="3">{avgCal()}</td>
            </tr>
        </tbody>
}

export default TermPoint;