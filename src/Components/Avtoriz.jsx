import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap/dist/js/bootstrap.bundle.min";
import './Components.css';
import {Link} from 'react-router-dom';

const Avtoriz = (props) => {

    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    
    const [dirtyname,setDirtyname] = useState('false')
    const [dirtypassword,setDirtypassword] = useState('false')

    const [errorname,setErrorname] = useState('Имя не может быть пустым')
    const [errorpassword,setErrorpassword] = useState('Пароль не может быть пустым')

    const [formvalid,setFormvalid] = useState('false')

    useEffect(() =>  {
        if(errorname || errorpassword){
            setFormvalid('false') 
        } else {
            setFormvalid('true')
        }
    }, [errorname, errorpassword]   )

    const nameHandler = (e) => {
        setName(e.target.value)
        const re = /^[a-z0-9_-]{3,16}$/
        if(!re.test(String(e.target.value).toLowerCase())){
            setErrorname('Некорректный id/name')
        }else {
            setErrorname('')
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        const re2 = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/
        if(!re2.test(String(e.target.value).toLowerCase())) {
            setErrorpassword('Некорректный id/name')
         } if(!e.target.value){
            setErrorpassword('Пароль не может быть пустым')
         } else {
            setErrorpassword('')
        }
    }

    const blurHandler = (e) => {      //Эта функция вызывается, когда пользователь убирает фокус с элемента формы 
        switch (e.target.name) {
            case 'name':
                setDirtyname(true)
            break
            case 'password':
                setDirtypassword(true)
            break
        }
    }

    
    return (
        
      <div className="container h-100  ">
            <div className="screen">
                <div class="screen__content">
                    <img src="https://avatars.mds.yandex.net/get-altay/6529816/2a0000018f56f57906f839c77f96640ef5ef/XS" alt="" />
                    <form class="login">
                        
                        <div class="login__field">
                        {(dirtyname && errorname) && <div style={{color: 'red'}}>{errorname}</div>}
                        <i class="login__icon fas fa-user"></i>
                        <input class="login__input" onChange={e => nameHandler(e)} value={name} onBlur={e => blurHandler(e)} name="name" type="text" placeholder="Enter your id/name" />
                        </div>
                        <div class="login__field">
                        {(dirtypassword && errorpassword) && <div style={{color: 'red'}}>{errorpassword}</div>}
                        <i class="login__icon fas fa-lock"></i>
                        <input class="login__input" onChange={e => passwordHandler(e)} value={password} onBlur={e => blurHandler(e)} name="password" type="password" placeholder="Enter your password"/>
                        </div>
                        <Link to="/glavnai" className="link"><button  class="button login__submit" disabled={!formvalid} type="submit">
                        <span class="button__text ">Log In Now</span>
                        <i class="button__icon fas fa-chevron-right"></i>
                        </button></Link>
                    
                    </form>
                
                </div>
                <div class="screen__background">
                    <span class="screen__background__shape screen__background__shape4"></span>
                    <span class="screen__background__shape screen__background__shape3"></span>		
                    <span class="screen__background__shape screen__background__shape2"></span>
                    <span class="screen__background__shape screen__background__shape1"></span>
                </div>		
            </div>
      </div>
    );
  }

export  {Avtoriz};