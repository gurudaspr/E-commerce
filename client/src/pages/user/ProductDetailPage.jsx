import React from 'react'
import ProductDetail from '../../components/user/product/ProductDetail'
import { useParams } from 'react-router-dom'

const ProductDetailPage = () => {
    const { id } = useParams();

    return (
        <ProductDetail productId={id} />
    )
}

export default ProductDetailPage