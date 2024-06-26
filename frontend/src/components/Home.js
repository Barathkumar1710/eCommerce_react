import { Fragment, useEffect, useState } from "react"
import MetaData from "./layouts/MetaData";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from "../actions/productsActions";
import Loader from "./layouts/Loader";
import Product from "./product/Product";
import { toast } from "react-toastify";
import Pagination from 'react-js-pagination';


export default function Home() {
    const dispatch = useDispatch();
    const { products, loading, error, productsCount, resPerPage } = useSelector((state) => state.productsState);
    const [currentPage, setCurrentPage] = useState(1);

    console.log(currentPage,'curr');
    const setCurrentPageNo = (pageNo) => {
        setCurrentPage(pageNo)
    }
    useEffect(() => {
        if (error) {
            return toast.error(error, {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }

        dispatch(getProducts(null,currentPage))
    }, [error, dispatch, currentPage]);
    console.log(products);

    return (
        <Fragment>
            {loading ? <Loader></Loader> : <Fragment>
                <MetaData title={'Buy Best Products'} />
                <h1 id="products_heading">Latest Products</h1>
                <section id="products" className="container mt-5">
                    <div className="row">
                        {products && products.map(product => (
                            <Product key={product._id} product={product}></Product>
                        ))}
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