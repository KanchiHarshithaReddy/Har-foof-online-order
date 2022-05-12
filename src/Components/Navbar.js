import React from 'react'
import { Link } from 'react-router-dom'
import Icon from 'react-icons-kit'
import { shoppingCart } from 'react-icons-kit/feather/shoppingCart'
import { auth } from '../Config/Config'
import { useNavigate } from 'react-router-dom'
function Navbar({ user, totalProducts }) {
  const navigate = useNavigate();
  const hadleLogout = () => {
    auth.signOut().then(() => {
      navigate('/login');
    })
  }
  return (
    // <div>
    //   <nav className=' navbar navbar-expand-lg navbar-light bg-light'>
    //     <div className='navbar'>
    //       <div className='leftside'>
    //         <div className='logo'>
    //           <img src="../Assets/logo.jpg" height="60px" width="50px" alt="logo"></img>
    //         </div>
    //       </div>
    //       <div className='rightside'>
    //         {!user && <>
    //           <div> <Link className='nav-link' to={'signup'} >SignUp</Link></div>
    //           <div><Link className='nav-link' to={'login'} >Login</Link></div>
    //         </>}
    //         {user && <>
    //           <div>
    //             <Link className='nav-link' to='/'>{user}</Link>
    //           </div>
    //           <div className='cart-menu-btn'>
    //             <Link className='nav-link' to='/cart'>
    //               <Icon className='shoppingcart' icon={shoppingCart} size={20}>

    //               </Icon>
    //               <span className='cart-indicator'>{totalProducts}</span>
    //             </Link>

    //           </div>
    //           <div className='btn btn-danger btn-md' onClick={hadleLogout}>Logout</div>
    //         </>}
    //       </div>

    //     </div>
    //   </nav>
    // </div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand" > <img src="../Assets/logo.jpg" alt="logo" style={{ height: "50px", position: "relative", marginTop: "-10px" }}  ></img></Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            {!user && <>
              <Link className='nav-link' to={'signup'} >SignUp</Link>
          <Link className='nav-link' to={'login'} >Login</Link>
          </> }
          </li>
          
          <li className="nav-item">

            <Link className='nav-link' to='/'>{user}</Link>
          </li>
          <li className="nav-item">
            <Link className='nav-link' to='/cart'>
              <Icon className='shoppingcart' icon={shoppingCart} size={20}></Icon>
              <span className='cart-indicator'>{totalProducts}</span>
            </Link>
            <li className="nav-item">
              <div className='btn btn-danger btn-md' onClick={hadleLogout} id="logout">Logout</div>
            </li>
          </li>
        </ul>

      </div>
    </nav>




  )
}

export default Navbar