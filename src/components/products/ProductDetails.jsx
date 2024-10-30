import Loader from '../loader/Loader';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Controller, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/controller';
import 'swiper/css/scrollbar';
import Header from '../header/Header';

export default function ProductDetails() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(null);
    const [mainSwiper, setMainSwiper] = useState(null);
    const [thumbSwiper, setThumbSwiper] = useState(null);

    const [priceRange, setPriceRange] = useState([0, 6000]);
    const [sortOption, setSortOption] = useState(""); // New state for sorting
    const [searchQuery, setSearchQuery] = useState(""); // New state for search query

    const getProduct = async () => {
        try {
            const { data } = await axios.get('https://ecommerce-node4.onrender.com/products?page=1&limit=10');
            setProducts(data.products);
            setFilteredProducts(data.products);
            setLoader(false);
            setError(null);
        } catch (err) {
            setError("Error fetching products");
            setLoader(false);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    // Filter products based on price range and search query
    useEffect(() => {
        let filtered = products.filter(
            item => item.finalPrice >= priceRange[0] && item.finalPrice <= priceRange[1]
        );

        if (searchQuery) {
            filtered = filtered.filter(item => 
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply sorting based on the selected sortOption
        if (sortOption === "priceHighLow") {
            filtered.sort((a, b) => b.finalPrice - a.finalPrice);
        } else if (sortOption === "priceLowHigh") {
            filtered.sort((a, b) => a.finalPrice - b.finalPrice);
        } else if (sortOption === "nameAZ") {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOption === "nameZA") {
            filtered.sort((a, b) => b.name.localeCompare(a.name));
        }

        setFilteredProducts(filtered);
    }, [priceRange, products, sortOption, searchQuery]);

    const handlePriceChange = (e) => {
        const value = Number(e.target.value);
        setPriceRange([0, value]);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    if (loader) {
        return <Loader />;
    }

    return (
        <div className=''>
            <Header title="Products" sec="Scroll right and left to showcase" />
            {error ? <div className="error">{error}</div> : null}

            {/* Search Input */}
            <div className="container my-4 ">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="form-control mb-3 w-25"
                />
            </div>

            {/* Price Filter */}
            <div className="container my-4">
                <label>Filter by Price: 0 - {priceRange[1]}$</label>
                <input
                    type="range"
                    min="0"
                    max="6000"
                    step="10"
                    value={priceRange[1]}
                    onChange={handlePriceChange}
                    className="form-range"
                />
            </div>

            {/* Sorting Options */}
            <div className="container my-4">
                
                <select onChange={handleSortChange} className="form-select w-25 bg-secondary-subtle">
                    <option value="">Featured</option>
                    <option value="priceHighLow">Price: High to Low</option>
                    <option value="priceLowHigh">Price: Low to High</option>
                    <option value="nameAZ">Name: A to Z</option>
                    <option value="nameZA">Name: Z to A</option>
                </select>
            </div>

            <div className='container'>
                <Swiper
                    modules={[Controller]}
                    spaceBetween={50}
                    slidesPerView={1}
                    onSwiper={setMainSwiper}
                    controller={{ control: thumbSwiper }}
                >
                    {filteredProducts.map((item) => (
                        <SwiperSlide key={item._id}>
                            <div className="h-100 d-flex align-items-center justify-content-center gap-5">
                                <img src={item.mainImage.secure_url} alt={item.name} className="img-fluid" />
                                <div>
                                    <h5>{item.name}</h5>
                                    <p className='text-success fw-bold'>{item.finalPrice}$</p>
                                    <p className='text-secondary'>{item.description}</p>
                                    <Link key={item._id} to={`/product/${item._id}`} className='btn btn-primary'>
                                        Details
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <Swiper
                    modules={[Controller, Scrollbar]}
                    spaceBetween={10}
                    slidesPerView={3}
                    onSwiper={setThumbSwiper}
                    controller={{ control: mainSwiper }}
                    scrollbar={{ draggable: true }}
                    className="mt-4"
                >
                    {filteredProducts.map((item) => (
                        <SwiperSlide key={item._id}>
                            <div className='d-flex flex-column align-items-center justify-content-center mt-5 mb-5 pro'>
                                <img src={item.mainImage.secure_url} alt={item.name} className="img-fluid w-50" />
                                <h5 className='h5'>{item.name.substring(0, 20)}</h5>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
