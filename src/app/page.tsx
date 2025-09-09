'use client';

import ProductList from '../components/ProductList';
import CartSummary from '../components/CartSummary';
import { useCart } from '../hooks/useCart';

export default function HomePage() {
  const {
    products,
    selectedProductIds,
    selectedCount,
    toggleProductSelection,
    toggleSelectAll,
    updateProductQuantity,
    removeProduct,
    productTotal,
    deliveryFee,
    totalPayment,
    isAllSelected,
  } = useCart();

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <main className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          상품 구매 페이지
        </h1>

        <ProductList
          products={products}
          selectedProductIds={selectedProductIds}
          selectedCount={selectedCount}
          toggleProductSelection={toggleProductSelection}
          toggleSelectAll={toggleSelectAll}
          updateProductQuantity={updateProductQuantity}
          removeProduct={removeProduct}
          isAllSelected={isAllSelected}
        />

        <CartSummary
          productTotal={productTotal}
          deliveryFee={deliveryFee}
          totalPayment={totalPayment}
        />
      </main>
    </div>
  );
}