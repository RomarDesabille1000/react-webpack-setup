import React from 'react'
import logo from '../images/webpack-logo.svg'
import style from './Logo.module.css'

const Logo = () => (
    <img className={style.logo} src={logo} alt="logo"/>
)

export default Logo