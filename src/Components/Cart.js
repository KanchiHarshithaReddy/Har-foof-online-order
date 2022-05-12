import React from 'react'
import Navbar from './Navbar'
import { useEffect, useState } from 'react'
import { auth, db } from '../Config/Config'
import CartProducts from './CartProducts';
// import StripeCheckout from 'react-stripe-checkout';
function Cart() {
  function GetCurrentUser() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged(user => {
        if (user) {
          db.collection('users').doc(user.uid).get().then(snapshot => {
            setUser(snapshot.data().Name);
          })
        } else {
          setUser(null);
        }
      })
    }, [])
    return user;
  }
  const user = GetCurrentUser();
  // console.log(user);
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        db.collection('Cart' + user.uid).onSnapshot(snapshot => {
          const newCartProduct = snapshot.docs.map((doc) => ({
            ID: doc.id,
            ...doc.data(),
          }));
          setCartProducts(newCartProduct);
        })
      }
      else {
        console.log('user is not signed in to retrievw cart')
      }
    })
  }, [])
  // console.log(cartProducts);
  const qty = cartProducts.map(cartProduct => {
    return cartProduct.qty;

  })
  // console.log(qty)
  const reducerOdqty = (accumulator, currentValue) => accumulator + currentValue;
  const totalQty = qty.reduce(reducerOdqty, 0)
  // console.log(totalQty);
  const price=cartProducts.map((cartProduct)=>{
    return cartProduct.TotalProductPrice;
  })
  const reducerOfPrice=(accumulator,currentValue)=>accumulator+currentValue;
  const totalPrice=price.reduce(reducerOfPrice,0);

  let Product;
  const cartProductIncrease = (cartProduct) => {
    // console.log(cartProduct)
    Product = cartProduct;
    Product.qty = Product.qty + 1;
    Product.TotalProductPrice = Product.qty * Product.ProductPrice;
    auth.onAuthStateChanged(user => {
      if (user) {
        db.collection('Cart' + user.uid).doc(cartProduct.ID).update(Product).then(() => {
          console.log('increment added successfully');
        })
      } else {
        console.log('user is not logged in to the increment')
      }
    })
  }

  const CartProductDecrease = (cartProduct) => {
    Product = cartProduct;
    if (Product.qty > 1) {
      Product.qty = Product.qty - 1;
      Product.TotalProductPrice = Product.qty * Product.ProductPrice;
      auth.onAuthStateChanged(user => {
        if (user) {
          db.collection('Cart' + user.uid).doc(cartProduct.ID).update(Product).then(() => {
            console.log('decrement added successfully');
          })
        } else {
          console.log('user is not logged in to the decrement')
        }
      })
    }
  }
  const [totalProducts,setTotalProucts]=useState(0);


  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        db.collection('Cart'+user.uid).onSnapshot(snapshot=>{
          const qty=snapshot.docs.length;
          setTotalProucts(qty);
        })
      }
    })
  },[])
  const successdelivery=(()=>{
    alert("your delivery has been  successfully placed")
  })

  return (
    <>
      <Navbar user={user} totalProducts={totalProducts} />
      <br />
      {cartProducts.length > 0 && (
        <div className='container-fluid'>
          <h1 className='text-center'>Cart</h1>
          <div className='product-box'>
            <CartProducts cartProducts={cartProducts} cartProductIncrease={cartProductIncrease} CartProductDecrease={CartProductDecrease} />
          </div>
          <div className='container '>
            <div className='summart-box'>
              <h5><b>Cart Summary</b></h5>
              <br></br>
              <div>Total no of products:<span>{totalQty}</span></div>
              <div>Total Price to pay:<span>${totalPrice}</span></div><br />
              <button type="submit" onClick={successdelivery}>submit</button>
              {/* <StripeCheckout></StripeCheckout> */}
            </div>
          </div>
        </div>
      )}
      {cartProducts.length < 1 && (
        <div className='container-fluid'>No products to show...</div>
      )}
    </>

  )
}

export default Cart