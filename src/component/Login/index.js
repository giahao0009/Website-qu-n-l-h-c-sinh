import React, {useState} from 'react';
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useHistory} from "react-router-dom";

function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // funtion thực hiện login  
  const history = useHistory();
  const auth = getAuth();
  const onLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        console.log(data._tokenResponse);
        localStorage.setItem("token", data._tokenResponse.idToken);
        localStorage.setItem("username", data._tokenResponse.displayName);
        history.replace("/homepage");
      })
      .catch((err) => {
        console.log(err);
        alert("Đăng nhập thất bại !!!");
      })
  }

    return (
        <div className="login-component">
            <div className="login-form">
                  <h1>HUFLIT</h1>  
                  <h2>Đăng nhập bằng tài khoản của bạn</h2>
                  <div className="form-group">
                    <input className="form-control" placeholder="Email" type="email" onChange={(e) => {setEmail(e.target.value)}}/>
                  </div>
                  <div className="form-group">
                    <input className="form-control" placeholder="Mật khẩu" type="password" onChange={(e) => {setPassword(e.target.value)}}/>
                  </div>
                  <button type="submit" className="btn-login" onClick={onLogin}>ĐĂNG NHẬP</button>
            </div>
        </div>
    )
}

export default Login;