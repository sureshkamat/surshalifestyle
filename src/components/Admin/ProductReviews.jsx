import React, { Fragment, useEffect, useState } from "react";

import "./productReviews.css";
import { useSelector, useDispatch } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import { MetaData } from "../layout/MetaData";
import DeleteIcon from "@mui/icons-material/Delete";
import Star from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import SideBar from "./Sidebar";
import { clearError, deleteReviews, getAllReviews } from "../../action/productAction";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";

const ProductReviews = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();

    const { error, reviews, loading } = useSelector(
        (state) => state.productReviews
    );
 
    
    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.review
    );

    

    const [productId, setProductId] = useState("");

    const deleteReviewHandler = (reviewId) => {
        dispatch(deleteReviews(reviewId, productId));
    };

    const productReviewsSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReviews(productId));
    };

    useEffect(() => {
        if (productId.length === 24) {
            dispatch(getAllReviews(productId));
        }
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearError());
        }

        if (isDeleted) {
            alert.success("Review Deleted Successfully");
            navigate("/admin/reviews");
            dispatch({ type: DELETE_REVIEW_RESET });
        }
    }, [dispatch, alert, error, deleteError, navigate, isDeleted, productId]);





    return (
        <Fragment>
            <MetaData title={`ALL REVIEWS - Admin`} />

            <div className="dashboard">
                <SideBar />
                <div className="productReviewsContainer">
                    <form
                        className="productReviewsForm"
                        onSubmit={productReviewsSubmitHandler}
                    >
                        <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

                        <div>
                            <Star />
                            <input
                                type="text"
                                placeholder="Product Id"
                                required
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={
                                loading ? true : false || productId === "" ? true : false
                            }
                        >
                            Search
                        </Button>
                    </form>

                    {reviews && reviews.length > 0 ? (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Review ID</TableCell>
                                        <TableCell>User</TableCell>
                                        <TableCell>Comment</TableCell>
                                        <TableCell>Rating</TableCell>
                                        <TableCell>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reviews.map((row) => (
                                        <TableRow key={row._id}>
                                            <TableCell>{row._id}</TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.comment}</TableCell>
                                            <TableCell>{row.rating}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => deleteReviewHandler(row._id)}>
                                                    <DeleteIcon />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    ) : (
                        <h1 className="productReviewsFormHeading">No Reviews Found</h1>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default ProductReviews;