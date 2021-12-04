import React from 'react';

function Subject() {
    return (<div className ="container-subject">
        <h1>Danh sách môn học</h1>
        <table>
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Mã số</th>
                    <th>Tên môn học</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>MH0001</td>
                    <td>Toán học</td>
                </tr>
                 <tr>
                    <td>2</td>
                    <td>MH0002</td>
                    <td>Vật lý</td>
                </tr>
                 <tr>
                    <td>3</td>
                    <td>MH0003</td>
                    <td>Hóa học</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>MH0004</td>
                    <td>Sinh học</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>MH0005</td>
                    <td>Lịch sử</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>MH0006</td>
                    <td>Địa lí</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>MH0007</td>
                    <td>Văn học</td>
                </tr>
                <tr>
                    <td>8</td>
                    <td>MH0008</td>
                    <td>Đạo đức</td>
                </tr>
                <tr>
                    <td>9</td>
                    <td>MH0009</td>
                    <td>Thể dục</td>
                </tr>
            </tbody>
        </table>
    </div>)
}

export default Subject;