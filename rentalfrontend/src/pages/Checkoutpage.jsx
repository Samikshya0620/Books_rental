import React, { Fragment } from 'react';
import Checkout from '../components/Checkout';
import Navbar from '../components/Navbar';
import Announce from '../components/announcement';

const CheckoutPage = () => {
    return ( 
        <Fragment>
            <Navbar/>
            <Checkout/>
        </Fragment>
     );
}
 
export default CheckoutPage;