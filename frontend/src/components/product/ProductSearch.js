import { Fragment, useEffect, useState } from "react"
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from "../../actions/productsActions";
import Loader from "../layouts/Loader";
import Product from "../product/Product";
import { toast } from "react-toastify";
import Pagination from 'react-js-pagination';
import { useParams } from "react-router-dom";


export default function ProductSearch() {
    const dispatch = useDispatch();
    const { products, loading, error, productsCount, resPerPage } = useSelector((state) => state.productsState);
    const [currentPage, setCurrentPage] = useState(1);
    const { keyword } = useParams();

    console.log(currentPage, 'curr');
    const setCurrentPageNo = (pageNo) => {
        setCurrentPage(pageNo)
    }
    useEffect(() => {
        if (error) {
            return toast.error(error, {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }

        dispatch(getProducts(keyword, currentPage))  // changed keyword to be enter in getProducts
    }, [error, dispatch, currentPage, keyword]);
    console.log(products);

    return (
        <Fragment>
            {loading ? <Loader></Loader> : <Fragment>
                <MetaData title={'Buy Best Products'} />
                <h1 id="products_heading">Search Products</h1>
                <section id="products" className="container mt-5">
                    <div className="row">
                        <div className="col-6 col-md-3 mb-5 mt-5">
                            <div className="px-5">

                            </div>
                        </div>
                        <div className="col-6 col-md-9">
                            <div className="row">
                                {products && products.map(product => (
                                    <Product key={product._id} product={product}></Product>
                                ))}
                            </div>
                        </div>

                    </div>
                </section>
                {productsCount > 0 && productsCount > resPerPage ? <div className="d-flex justify-content-center mt-5">
                    <Pagination
                        activePage={currentPage}
                        onChange={setCurrentPageNo}
                        totalItemsCount={productsCount}
                        itemsCountPerPage={resPerPage}
                        nextPageText={'Next'}
                        firstPageText={'First'}
                        lastPageText={'Last'}
                        itemClass={"page-item"}
                        linkClass={'page-link'}>

                    </Pagination>
                </div> : null}

            </Fragment>}

        </Fragment>

    )
}