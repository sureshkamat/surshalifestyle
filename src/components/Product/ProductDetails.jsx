import React, { useEffect ,useState} from 'react';
import Carousel from 'react-material-ui-carousel';


import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearError, getProductDetails, newReview } from '../../action/productAction';
import "./productDetails.css";
import { ReviewCard } from './ReviewCard';
import { Loader } from '../layout/Loader/Loader';
import {useAlert} from 'react-alert';
import { MetaData } from '../layout/MetaData';
import { addItemsToCart } from '../../action/cartAction';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
  } from "@mui/material";
  import { Rating } from "@mui/material";
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
export const ProductDetails = () => {


    const [quantity,setQuantity]=useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");


    const dispatch = useDispatch();
    const { id } = useParams();
    const alert=useAlert();
    const { product, loading, error } = useSelector(state => state.productDetails)

    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
      );
    
      const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
      };
    
    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
      };
    
      const reviewSubmitHandler = () => {
        const myForm = new FormData();
    
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);
    
        dispatch(newReview(myForm));
    
        setOpen(false);
      };

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearError())
           }
           if (reviewError) {
            alert.error(reviewError);
            dispatch(clearError());
          }
      
          if (success) {
            alert.success("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET });
          }   
        dispatch(getProductDetails(id))

    }, [dispatch, id,error,alert, reviewError, success])

    // const options = {
    //     edit: false,
    //     color: "rgba(20,20,20,0.1)",
    //     activeColor: "tomato",
    //     size: window.innerWidth > 600 ? 20 : 25,
    //     value: product.ratings,
    //     isHalf: true

    // }
    const decQuantity=()=>{
        if(1<=quantity) return;
        setQuantity(quantity-1);
    }
    const incQuantity=()=>{
        if(product.stock<=quantity) return;
        setQuantity(quantity+1);
    }
    const addtoCartHandler=(id)=>{
        dispatch(addItemsToCart(id,quantity));
        alert.success("Item added to Cart");
    }
    return (
        <>
            {loading ? (<Loader />) : (
                <>
                <MetaData title={`${product.name} --Sursha Lifestyle`} />
                    <div className="productDetails">
                        <div className='left'>
                            <Carousel >
                                {product.images &&
                                    product.images.map((item, i) => (
                                        <img
                                            className='carouselImage'
                                            key={item.url}
                                            src={item.url}
                                            alt={`${i} Slide`}
                                        />
                                    ))}
                            </Carousel>
                        </div>
                        <div className='right'>
                            <div className='detailBlock-1'>
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className='detailBlock-2'>
                                <Rating {...options} />
                                <span>({product.numOfReviews} Reviews)</span>
                            </div>
                            <div className='detailBlock-3'>
                                <h1>{`RS.${product.price}`}</h1>
                                <div className='detailBlock-3-1'>
                                    <div className='detailBlock-3-1-1'>
                                        <button onClick={decQuantity} disabled={quantity===1}>-</button>
                                        <input readOnly type="Number" value={quantity} />
                                        <button onClick={incQuantity}>+</button>
                                    </div>
                                    <button disabled={product.stock < 1 ? true : false} onClick={() => addtoCartHandler(product._id)}>Add to Cart</button>
                                </div>
                                <p>Status:
                                    <b className={product.stock < 1 ? "redColor" : "greenColor"} >
                                        {product.stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                            </div>
                            <div className='detailBlock-4'>
                                Description:<p>{product.description}</p>
                            </div>
                            <button onClick={submitReviewToggle} className='submitReview'>Submit Review</button>
                        </div>
                    </div>
                    <h3 className='reviewHeading'>Reviews</h3>
                    <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
                    {product.reviews && product.reviews[0] ? (
                        <div className='reviews'>
                            {product.reviews &&
                                product.reviews.map((review) => <ReviewCard review={review} />)}
                        </div>
                    ) : (
                        <p className='noReviews'>No Reviews Yet</p>
                    )}
                </>
            )}
        </>
    )
}
