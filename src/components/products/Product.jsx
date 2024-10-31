import Loader from '../loader/Loader';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './product.css';
import Counter from '../counter/Counter';
import Choose from '../choose/Choose';
import { toast, Slide } from 'react-toastify';

export default function Product() {
  const [product, setProduct] = useState({});
  const [productImages, setProductImages] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);
  const { productId } = useParams();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`https://ecommerce-node4.onrender.com/products/${productId}`);
      setProduct(data.product);
      setProductImages(data.product.subImages || []);
      setError(null);
    } catch (error) {
      setError("Error loading product data");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const addToCart = async () => {
    const token = localStorage.getItem('userToken');
    setLoader(true);
    try {
      const { data } = await axios.post(
        'https://ecommerce-node4.onrender.com/cart/',
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      if (data.message === 'success') {
        toast.success('Added successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
      }
    } catch (error) {
      toast.error("You must log in or the item is already in your cart!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    } finally {
      setLoader(false);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 2;

  const lastReviewIndex = currentPage * reviewsPerPage;
  const firstReviewIndex = lastReviewIndex - reviewsPerPage;
  const currentReviews = product.reviews ? product.reviews.slice(firstReviewIndex, lastReviewIndex) : [];
  const totalPages = product.reviews ? Math.ceil(product.reviews.length / reviewsPerPage) : 0;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loader) {
    return <Loader />;
  }

  return (
    <section className="">
      {error && <div className=" d-flex justify-content-center align-items-center">{error}</div>}

      <header className="mt-5 mb-5 pt-5 pb-5"></header>
      <div className="container">
        <div className="d-flex flex-wrap gap-5">
          <div className="col-md-5 flex-wrap d-flex justify-content-start align-items-start">
            {productImages.map((img, idx) => (
              <img key={idx} src={img.secure_url} className="bigger w-50" alt="Product" />
            ))}
          </div>

          <div className="col-md-6 d-flex justify-content-start align-items-center gap-5 text-center flex-column">
            <h3 className="real">{product.name}</h3>
            <p className="text-secondary">
              {product.description ? product.description.substring(0, 40) : "No description available"}...
            </p>
            <div className="price d-flex justify-content-center gap-5">
              {product.finalPrice === product.price ? (
                <h5 className="real text-success text-center">{product.finalPrice}$</h5>
              ) : (
                <>
                  <p className="text-body-secondary text-decoration-line-through">{product.price}$</p>
                  <h5 className="real text-success text-center">{product.finalPrice}$</h5>
                  <h5 className="dis">{product.discount}% off</h5>
                </>
              )}
            </div>
            <Choose />
            <button className="btn btn-primary" onClick={addToCart}>Add to Cart</button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="container my-4 d-flex flex-column justify-content-center align-items-center">
        <h3 className="text-center mb-4 pros">Customer Reviews</h3>

        {product.reviews && product.reviews.length > 0 ? (
          <>
            {currentReviews.map((review, index) => (
              <div key={index} className="card mb-3 w-50">
                <div className="card-body">
                  <div className="text-warning mb-2">
                    {Array.from({ length: review.rating }, (_, i) => (
                      <span key={i}><i className="bi bi-star-fill"></i></span>
                    ))}
                  </div>
                  <h5 className="card-title mb-4">{review.comment}</h5>
                  <footer className="blockquote-footer">
                    <cite>{review.createdBy.userName}</cite>
                  </footer>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <nav>
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => paginate(currentPage - 1)}>&laquo;</button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => paginate(currentPage + 1)}>&raquo;</button>
                </li>
              </ul>
            </nav>
          </>
        ) : (
          <div className="text-center">No reviews for this product.</div>
        )}
      </div>
    </section>
  );
}
