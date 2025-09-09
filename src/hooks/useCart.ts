'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Product } from '../types/product';
import { getInitialProducts, saveProducts } from '../utils/localStorage';

const DELIVERY_FEE_THRESHOLD = 50000;
const DELIVERY_FEE = 3000;

export const useCart = () => {
  // 더미 데이터를 직접 사용하여 SSR/CSR 불일치 완전 회피
  const DUMMY_PRODUCTS: Product[] = [
    { id: 'p1', name: '상품 1', price: 10000, quantity: 1, image: '/images/product1.svg' },
    { id: 'p2', name: '상품 2', price: 20000, quantity: 1, image: '/images/product2.svg' },
    { id: 'p3', name: '상품 3', price: 5000, quantity: 1, image: '/images/product3.svg' },
  ];

  const [products, setProducts] = useState<Product[]>(DUMMY_PRODUCTS);
  const [selectedProductIds, setSelectedProductIds] = useState<Set<string>>(
    new Set(['p1', 'p2', 'p3']) // 하드코딩된 ID로 확실한 일치 보장
  );

  // 클라이언트에서 localStorage 데이터 로드 (Hydration 후)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedProducts = getInitialProducts();
      if (storedProducts.length > 0) {
        setProducts(storedProducts);
        setSelectedProductIds(new Set(storedProducts.map(p => p.id)));
      }
    }
  }, []);

  // localStorage 동기화 (클라이언트에서만)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      saveProducts(products);
    }
  }, [products]);

  const toggleProductSelection = useCallback((productId: string) => {
    setSelectedProductIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (selectedProductIds.size === products.length) {
      setSelectedProductIds(new Set());
    } else {
      setSelectedProductIds(new Set(products.map(p => p.id)));
    }
  }, [selectedProductIds, products]);

  const updateProductQuantity = useCallback((productId: string, newQuantity: number) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === productId ? { ...p, quantity: Math.max(1, newQuantity) } : p
      )
    );
  }, []);

  const removeProduct = useCallback((productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    setSelectedProductIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(productId);
      return newSet;
    });
  }, []);

  const selectedProducts = useMemo(
    () => products.filter(p => selectedProductIds.has(p.id)),
    [products, selectedProductIds]
  );

  const productTotal = useMemo(
    () => selectedProducts.reduce((sum, p) => sum + p.price * p.quantity, 0),
    [selectedProducts]
  );

  const deliveryFee = useMemo(
    () => (productTotal < DELIVERY_FEE_THRESHOLD && selectedProducts.length > 0 ? DELIVERY_FEE : 0),
    [productTotal, selectedProducts.length]
  );

  const totalPayment = useMemo(
    () => productTotal + deliveryFee,
    [productTotal, deliveryFee]
  );

  const isAllSelected = useMemo(
    () => products.length > 0 && selectedProductIds.size === products.length,
    [products.length, selectedProductIds.size]
  );

  const selectedCount = useMemo(
    () => selectedProductIds.size,
    [selectedProductIds.size]
  );

  return {
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
  };
};
