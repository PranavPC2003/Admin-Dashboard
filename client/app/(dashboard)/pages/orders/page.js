'use client'
import React, { Fragment } from 'react'
import MyOrders from "sub-components/dashboard/MyOrders";
import { Button } from 'react-bootstrap';


const MyOrder = () => {
    return (
        <Fragment>
            <div style={{ "display": "flex", "marginTop": "40px", "marginLeft": "5px"}}>
                <Button variant="outline-primary" className="me-1" style={{ "marginLeft": "15px" }}>Button 1</Button>
                <Button variant="outline-primary" className="me-1" style={{ "marginLeft": "15px" }}>Button 2</Button>
                <Button variant="outline-primary" className="me-1" style={{ "marginLeft": "15px" }}>Button 3</Button>
            </div>
            <MyOrders />
        </Fragment>
    )
}

export default MyOrder