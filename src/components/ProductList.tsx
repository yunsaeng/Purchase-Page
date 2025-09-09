'use client';

import Image from 'next/image';
import { Product } from '../types/product';

interface ProductListProps {
  products: Product[];
  selectedProductIds: Set<string>;
  selectedCount: number; // 추가: 선택된 상품 수
  toggleProductSelection: (productId: string) => void;
  toggleSelectAll: () => void;
  updateProductQuantity: (productId: string, newQuantity: number) => void;
  removeProduct: (productId: string) => void;
  isAllSelected: boolean;
}

export default function ProductList({
  products,
  selectedProductIds,
  selectedCount,
  toggleProductSelection,
  toggleSelectAll,
  updateProductQuantity,
  removeProduct,
  isAllSelected,
}: ProductListProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg mb-6">
      {/* 전체 선택 헤더 */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={toggleSelectAll}
            className="form-checkbox h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
          />
          <span className="text-lg font-medium text-gray-900">
            전체 선택
          </span>
        </div>
        <span className="text-sm text-gray-500">
          {selectedCount} / {products.length} 상품 선택
        </span>
      </div>

      {/* 상품 목록 */}
      <div className="divide-y divide-gray-200">
        {products.map((product) => {
          const isSelected = selectedProductIds.has(product.id);
          const totalPrice = product.price * product.quantity;

          return (
            <div key={product.id} className="p-4 flex items-center space-x-4">
              {/* 체크박스 */}
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleProductSelection(product.id)}
                className="form-checkbox h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
              />

              {/* 상품 이미지 */}
              <div className="flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
              </div>

              {/* 상품 정보 */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900 truncate">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {product.price.toLocaleString()}원
                </p>
              </div>

              {/* 수량 조절 */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateProductQuantity(product.id, product.quantity - 1)}
                  disabled={product.quantity <= 1}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">
                  {product.quantity}
                </span>
                <button
                  onClick={() => updateProductQuantity(product.id, product.quantity + 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                >
                  +
                </button>
              </div>

              {/* 총 가격 및 삭제 버튼 */}
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    {totalPrice.toLocaleString()}원
                  </p>
                </div>
                <button
                  onClick={() => removeProduct(product.id)}
                  className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center text-red-600 transition-colors duration-200"
                  title="상품 삭제"
                >
                  ×
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
