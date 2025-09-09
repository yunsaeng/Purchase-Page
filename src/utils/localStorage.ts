import { Product } from '../types/product';

// 더미 상품 데이터 - 서버와 클라이언트에서 동일하게 사용
const DUMMY_PRODUCTS: Product[] = [
  { id: 'p1', name: '상품 1', price: 10000, quantity: 1, image: '/images/product1.svg' },
  { id: 'p2', name: '상품 2', price: 20000, quantity: 1, image: '/images/product2.svg' },
  { id: 'p3', name: '상품 3', price: 5000, quantity: 1, image: '/images/product3.svg' },
];

const LOCAL_STORAGE_KEY = 'cartProducts';

// 서버와 클라이언트에서 동일한 데이터 반환 (SSR/CSR 불일치 방지)
export const getInitialProducts = (): Product[] => {
  if (typeof window === 'undefined') {
    // 서버 사이드에서는 항상 더미 데이터 반환
    return DUMMY_PRODUCTS;
  }
  
  // 클라이언트 사이드에서는 localStorage 확인 후 더미 데이터 반환
  try {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : DUMMY_PRODUCTS;
  } catch {
    return DUMMY_PRODUCTS;
  }
};

// localStorage에 저장 (클라이언트에서만)
export const saveProducts = (products: Product[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.warn('Failed to save products to localStorage:', error);
  }
};
