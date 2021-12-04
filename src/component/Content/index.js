import React, { useState }  from 'react';
import {FaUsers, FaUserEdit, FaSchool} from "react-icons/fa";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Content(props) {
    const [value, onChange] = useState(new Date());
    return (
        <div className="container-content">
            <div className="count-list">
                <div className="count-item count-student">
                    <div className="count-icon">
                        <FaUsers className="icon icon-student"/>
                        <p>Học sinh</p>
                    </div>
                    <hr/>
                    <p>{props.countStudent}</p>
                </div>
                <div className="count-item count-student">
                    <div className="count-icon">
                        <FaUserEdit className="icon icon-teacher"/>
                        <p>Giáo viên</p>
                    </div>
                    <hr/>
                    <p>60</p>
                </div>
                <div className="count-item count-student">
                    <div className="count-icon">
                        <FaSchool className="icon icon-school"/>
                        <p>Lớp học</p>
                    </div>
                    <hr/>
                    <p>9</p>
                </div>
            </div>
            <Calendar
                className="calendar"
                onChange={onChange}
                value={value}
            />
        </div>
    )
}

export default Content;