import React, { useState, useEffect } from 'react';
import './Nav.css';

function Nav(props) {
    const [show, handleShow] = useState(false);                  //State for showing background color of nav as 'Black' when scrollY > 100 px 

    useEffect(() => {
        window.addEventListener('scroll', () => {                //Adding 'scroll' event for making nav black when scrollY > 100px
            if (window.scrollY > 100) {
                handleShow(true)
            }
            else
                handleShow(false)
        });
        return () => {
            window.removeEventListener('scroll');               //Removing 'scroll' event after useEffect executes
        }
    }, []);

    return (
        <div className={`nav ${show && 'nav__black'}`}>
            <img
                className='nav__logo'
                src='https://pngimg.com/uploads/netflix/netflix_PNG6.png'
            />
            <img
                className='nav__avatar'
                src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
            />
        </div>
    );
}

export default Nav;