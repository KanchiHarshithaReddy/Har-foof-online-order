import React from 'react'
import Icon from 'react-icons-kit'
import { plus } from 'react-icons-kit/feather/plus';
import { minus } from 'react-icons-kit/feather/minus'
import {auth,db} from '../Config/Config'
function IndividualCartProducts({ cartProduct,cartProductIncrease ,CartProductDecrease}) {
  const handleCartProductIncrease=()=>{
    cartProductIncrease(cartProduct);
  }
  const handleCartProductDecrease=()=>{
    CartProductDecrease(cartProduct);
  }
  const handleCartProductsDelete=()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        db.collection('Cart'+user.uid).doc(cartProduct.ID).delete().then(()=>{
          console.log('successfully deleted')
        })
      }
    })
  }
  return (
 
    // <div className='row'>
    //   <div className='col-sm-6'>
    //     <div className='card1'>
    //       <div className='card-image'>
    //         <img src={cartProduct.ProductImg} height="200px" width='300px' alt='product-img' /></div>
    //       <div className='card-title'>{cartProduct.ProductName}</div>
    //       <div className='cart-text'>Rs : {cartProduct.ProductPrice}.00</div>
    //       <span>Quantity</span>
    //       <div className='product-text quantity-box'>
    //         <div className='action-btns minus' onClick={handleCartProductDecrease}>
    //           <Icon icon={minus} size={20} 
    //            onClick={handleCartProductDecrease}
    //           ></Icon>
    //         </div>
    //         <div>{cartProduct.qty}</div>
    //         <div className='action-btns plus' >
    //           <Icon icon={plus} size={20} onClick={handleCartProductIncrease}></Icon>
    //         </div>
    //       </div>
    //       <div className='product-text cart-price'>${cartProduct.TotalProductPrice}</div>
    //       <div className='btn btn-danger btn-md cart-btn' onClick={handleCartProductsDelete}>Delete</div>
    //     </div>

    //   </div>
    // </div>
    <div className='col-md-3' style={{ padding: "5px" }} >
    <div className='card' style={{ height: "40rem", width: "18rem", padding: "3px" }} >
    <img src={cartProduct.ProductImg}  alt='product-img' />
        <div className='card-body'>
            <h5 className='card-title'><b>ProductName:</b>{cartProduct.ProductName}</h5>
            <div className='card-text'><b>$</b> {cartProduct.ProductPrice}</div>
            <span>Quantity</span>
            <div className='action-btns minus' onClick={handleCartProductDecrease}>
            <Icon icon={minus} size={20} 
               onClick={handleCartProductDecrease}
             ></Icon>
         </div>
         <div>{cartProduct.qty}</div>
         <div className='action-btns plus' >
              <Icon icon={plus} size={20} onClick={handleCartProductIncrease}></Icon>
          </div>
          <div className='product-text cart-price'>${cartProduct.TotalProductPrice}</div>
          <div className='btn btn-danger btn-md cart-btn' onClick={handleCartProductsDelete}>Delete</div>
        </div>
    </div>
</div >
  )
}

export default IndividualCartProducts