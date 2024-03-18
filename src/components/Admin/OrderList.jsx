import React, { Fragment, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import { MetaData } from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";

import { clearErrors, deleteOrder, getAllOrders } from "../../action/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";



const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

 const { error,orders} = useSelector((state) => state.allOrders);
 

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);


  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

console.log(orders)



  return (
    <Fragment>
      <MetaData title={`ALL Orders - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS </h1>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>ItemsQty</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Update</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders && orders.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>{row._id}</TableCell>
                    <TableCell style={{ color: row.orderStatus === "Delivered" ? "green" : "red" }}>{row.orderStatus}</TableCell>
                    <TableCell>{row.orderItems.length}</TableCell>
                    <TableCell>{row.totalPrice}</TableCell>
                    <TableCell><Link to={`/admin/order/${row._id}`}>
                      <EditIcon />
                    </Link>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => deleteOrderHandler(row._id)}>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </div>
      </div>
    </Fragment >
  );
};

export default OrderList;