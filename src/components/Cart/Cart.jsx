import React from 'react';
import {Grid, Typography, Container, Button} from '@material-ui/core';
import useStyles from './cartStyles';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';

const Cart = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
  const classes = useStyles();  

  const EmptyCart = () => (
    <Typography variant='subtitle1'>Your have no items in your shopping cart,
        <Link to="/" className={classes.link}> start adding some!</Link>
    </Typography>
  )

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
            <Grid item xs={12} sm={4} key={item.id}>
                <CartItem item={item} onUpdateCartQty={onUpdateCartQty} onRemoveFromCart={onRemoveFromCart}/>
            </Grid>            
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant='h4'>Subtotal:{cart.subtotal.formatted_with_symbol}</Typography>
        <div>
            <Button className={classes.emptyButton} variant='contained' color='secondary' size='large' type='button' onClick={onEmptyCart}>
                Empty Cart
            </Button>
            <Button component={Link} to="/checkout" className={classes.checkoutButton} variant='contained' color='primary' size='large' type='button' >
                Checkout
            </Button>
        </div>
      </div>
    </>

  );

  if(!cart.line_items) return 'Loading...'

  return (
    <Container>
        <div className={classes.toolbar}/>
        <Typography variant='h3' className={classes.title} gutterBottom>Your Shopping Cart</Typography>
        {!cart.line_items.length ? <EmptyCart/> : <FilledCart/>}
    </Container>
  )
}

export default Cart;