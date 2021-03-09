import React,{useEffect, useState} from "react";
import {login,authenticate} from "../../util/studentApi";
import {useHistory} from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import redImage from '../student/Dashboard/raspberries.jpg'
import greenImage from '../student/Dashboard/grapes.jpg'
import blueImage from '../student/Dashboard/blueberry2.jpg'
import orangeImage from '../student/Dashboard/pasta.jpg'
import yellowImage from '../student/Dashboard/mango1.jpg'
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import './Login.css'

const Login=()=>{

  const  history= useHistory();
  //initialised state
  const [student,setStudent]=useState({
    email:"",
    password:"",
    errors:{}
  });

  //destructured
  const {email,password,errors}=student;

//handle changes in form
  const handleChange=(name)=>(event)=>{
    setStudent({...student,errors:false,[name]:event.target.value});
  };

//handle submit of form
  const handleSubmit=(event)=>{
  event.preventDefault()
  setStudent({...student,errors:false});
  login({email,password})
  .then(data=>{
    //console.log(data);
    if(data.errors){
      setStudent({...student,errors:data.errors})
    }else{
      //on success authenticate by adding token to localstorage
    authenticate(data,()=>{
  setStudent({
        ...student,
        email:"",
        password:"",
        errors:{}
    })
    history.push('/dashboard/student');
    });
  }
})
}

useEffect(() => {
  applyAccent()
  console.log("yaya dfsdfjkjs");
}, []);

//ugly demo
  return(
    <div>
      <div id='dashboard-wrapper'>
      <div className="dashboard__title__wrapper">
        <div>Messmate</div>
        <div>
          STUDENT
          <div>
          <IconButton aria-label="delete" onClick={()=>{
              history.push("/");
            }}>
            <HomeIcon
            className="logoutButton"
        />
          </IconButton>
          </div>
        </div>
      </div>
      <div id='cardgrid'>
        <div className='cardgrid__card' id='card4'>
        <div className="Loginheader">
            <h3 className="student-card-heading">Student Login</h3>
        </div>
          <form className="signin_form">
              <input placeholder="Email" name="email" type="email" value={email} onChange={handleChange("email")}/>
                {errors.email&& (<Typography variant="body2" className="customError">
                 {errors.email}
                   </Typography>)}
              <input placeholder="Password" name="password" type="password" value={password} onChange={handleChange("password")}/>
                {errors.password&& (<Typography variant="body2" className="customError">
                 {errors.password}
                   </Typography>)}
                 {errors.general&& (<Typography variant="body2" className="customError">
                  {errors.general}
                    </Typography>)}
              <Button className="login_button" variant="contained" color="primary" onClick={handleSubmit} >Login  </Button>
          <p>Don't have an account? <span className="redirect" onClick={() => history.push('/signup/student')}>Sign up</span></p>
          </form>
        </div>
      </div>
    </div>
    <div id='messImg-wrapper'>
        <div></div>
      </div>

    </div>
  )
}

function applyAccent() {
  let accentNum = localStorage.getItem('accentNum') || 0
  let accentCodes = ['235, 50, 50', '0, 200, 33', '232, 232, 0', '0, 96, 206', '255, 61, 12']
  let backgroundImages = [redImage, greenImage, yellowImage, blueImage, orangeImage]
  document.querySelector(':root').style.setProperty('--accent', accentCodes[accentNum])
  document.getElementById('messImg-wrapper').style.backgroundImage = `url(${backgroundImages[accentNum]})`
  document.getElementById('messImg-wrapper').style.backgroundSize = "cover"

  if(window.innerWidth <= 1300) {
    document.body.style.backgroundImage = `url(${backgroundImages[accentNum]})`
    document.body.style.backgroundSize = "cover"
  }
  document.body.onresize = () => {
    if(window.innerWidth <= 1300) {
      document.body.style.backgroundImage = `url(${backgroundImages[accentNum]})`
      document.body.style.backgroundSize = "cover"
    }
    else document.body.style.backgroundImage = "none"
  }
}

export default Login;
