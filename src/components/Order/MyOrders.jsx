
import React, { Fragment, useEffect } from "react";





import { useDispatch, useSelector } from "react-redux";
import "./myOrders.css";
import { Link } from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useAlert } from "react-alert";
import { Loader } from "../layout/Loader/Loader";
import LaunchIcon from "@mui/icons-material/Launch";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Typography } from "@mui/material";
import { clearErrors, myOrders } from "../../action/orderAction";
import { MetaData } from "../layout/MetaData";

const MyOrders = () => {
    const dispatch = useDispatch();

    const alert = useAlert();

    const { loading, error, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(myOrders());
    }, [dispatch, alert, error]);

    return (
        <Fragment>
            <MetaData title={`${user.name} - Orders`} />

            {loading ? (
                <Loader />
            ) : (
                <div className="myOrdersPage1">
                    <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
                    <div>
                        
                        {orders.map((order) => <AccordionExpandIcon order={order} />)}

                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default MyOrders;
function AccordionExpandIcon({ order }) {
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <div style={{ display: "flex", justifyContent: "space-around", gap: "15px" }}>
                        <div><Typography>Order ID: {order._id}</Typography></div>
                        <div style={{ color: order.status === 'Delivered' ? 'green' : 'red' }}><Typography >Order Status: {order.orderStatus}</Typography></div>
                        <div><Typography>Items: {order.orderItems.length}</Typography></div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{ display: "flex", gap: "10px",backgroundColor:"whitesmoke" ,padding:"10px"}}>
                        <div>
                            <p>Total Price: RS. {order.totalPrice}</p>
                            <p>Payment Info: {order.paymentInfo.status === 'succeeded' ? "PAID" : "NOT PAID"}</p>
                        </div>
                        <div>
                            <p>Shipping Info:</p>
                            <p>Address: {order.shippingInfo.address}</p>
                            <p>City: {order.shippingInfo.city}  State: {order.shippingInfo.state} Country: {order.shippingInfo.country}</p>
                            <p>Pin Code: {order.shippingInfo.pinCode}</p>
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <Link to={`/orderdetails/${order._id}`}>
                                <LaunchIcon /> View order Details
                            </Link>
                        </div>
                    </div>


                </AccordionDetails>
            </Accordion>

        </div>
    );
}