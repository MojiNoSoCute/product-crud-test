import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router"
import ProductHeader from '../components/ProductHeader'
import ProductList from '../components/ProductList'
import { deleteProduct, getProduct } from '../services/productService'
import { confirmDelete, showError, showSuccess } from '../services/alertService'
import { error } from 'sweetalert2/src/utils/utils';

const ProductPage = () => {
    const navigate = useNavigate();
    const [products, setProduct] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, setError] = useState("")
    useEffect(() => {
        const loadingProduct = async () => {
            setloading(true);
            setError("");
            try {
                setProduct(await getProduct());
            } catch (error) {
                setError(error.message);
            } finally {
                setloading(false);
            }
        };
        loadingProduct();
    }, []);

    const handelDelete = async (id) => {
        if  (!(await confirmDelete())) return;
        try {
            await deleteProduct(id);
            setProduct((currentProduct) =>
                currentProduct.filter((product) => product.id !== id),
            );
            showSuccess("ลบสินค้าสำเร็จ")
        } catch (error) {
            showError(error);
        }
    };

    return (
        <main className='min-h-screen px-4 py-6 sm:px-6 lg:px-8'>
            <div className='mx-auto max-w-6xl space-y-6'>
                <ProductHeader />
                <div className='flex justify-end'>
                    <Link className='btn btn-primary' to='/product/new'>
                        เพิ่มสินค้า
                    </Link>
                </div>
                {!loading && (
                    <ProductList products={products} onEdit={(products) => navigate(`/product/${products.id}/edit`)}/>
                )}
            </div>
        </main>
    )
}

export default ProductPage