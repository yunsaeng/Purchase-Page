# 🛒 상품 구매 페이지

온라인 쇼핑몰에서 상품을 선택하고 구매하는 과정을 체험할 수 있는 페이지입니다.

## 🌐 체험해보기

**🔗 [https://purchase-page-jet.vercel.app/](https://purchase-page-jet.vercel.app/)**

## 🎯 이 페이지에서 할 수 있는 것들

### 🛍️ 쇼핑하기
- **상품 둘러보기**: 3개의 다양한 상품을 확인하고 가격을 비교해보세요
- **상품 선택**: 원하는 상품을 체크박스로 선택하거나 해제할 수 있습니다
- **전체 선택**: 한 번에 모든 상품을 선택하거나 해제할 수 있습니다

### 📦 수량 조절하기
- **수량 증가**: + 버튼을 눌러 원하는 만큼 수량을 늘려보세요
- **수량 감소**: - 버튼을 눌러 수량을 줄일 수 있습니다 (최소 1개)
- **실시간 가격 확인**: 수량이 변경될 때마다 총 가격이 즉시 업데이트됩니다

### 🗑️ 상품 관리하기
- **상품 삭제**: 더 이상 필요하지 않은 상품은 × 버튼으로 삭제할 수 있습니다
- **장바구니 정리**: 선택한 상품들을 자유롭게 관리해보세요

### 💰 가격 계산하기
- **상품 금액**: 선택한 상품들의 총 가격을 확인하세요
- **배송비 계산**: 5만원 미만 구매 시 배송비 3천원이 추가됩니다
- **총 결제금액**: 최종 결제해야 할 금액을 미리 확인할 수 있습니다

### 🎨 사용자 경험
- **즉시 로딩**: 페이지를 열면 바로 상품들이 표시됩니다
- **반응형 디자인**: 모바일과 데스크톱에서 모두 편리하게 사용할 수 있습니다
- **직관적인 UI**: 체크박스, 버튼, 가격 표시가 명확하게 구분되어 있습니다

## 🚀 시작하기

페이지에 접속하면 바로 사용할 수 있습니다! 별도의 회원가입이나 로그인 없이 상품 구매 과정을 체험해보세요.

---

## 💡 이 프로젝트는 어떻게 만들어졌나요?

이 상품 구매 페이지는 **싱글톤 프롬프트**를 활용한 바이브 코딩으로 구현되었습니다. 

### 🎯 싱글톤 프롬프트

```
상품 구매 페이지 모듈화 설계

Next.js App Router, TypeScript, Tailwind CSS를 사용하여 상품 구매 페이지를 구현하세요.

핵심 요구사항
1. 즉시 표시: 페이지 로드 시 로딩 없이 바로 상품 목록 표시
2. 상품 선택: 개별 체크박스 및 전체 선택 기능
3. 수량 조절: +/- 버튼으로 수량 변경 (최소 1개)
4. 상품 삭제: 각 상품마다 삭제 버튼 (×) 제공
5. 실시간 계산: 상품 금액, 배송비, 총 결제금액 자동 계산
6. 배송비 로직: 5만원 미만 시 3천원, 이상 시 무료
7. 상태 유지: localStorage를 통한 장바구니 상태 저장
8. Hydration 안정성: SSR/CSR 불일치 문제 완전 해결

기술적 제약사항
- Next.js App Router 사용
- TypeScript 필수
- Tailwind CSS 스타일링
- localStorage 상태 관리
- Hydration 문제 해결 필수

파일 구조
src/
├── types/product.ts          # Product 인터페이스
├── utils/localStorage.ts     # localStorage 유틸리티
├── hooks/useCart.ts          # 장바구니 비즈니스 로직
├── components/
│   ├── ProductList.tsx       # 상품 목록 컴포넌트
│   └── CartSummary.tsx       # 장바구니 요약 컴포넌트
└── app/page.tsx              # 메인 페이지

정확한 타입 정의
// src/types/product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

초기 더미 데이터
const DUMMY_PRODUCTS: Product[] = [
  { id: 'p1', name: '상품 1', price: 10000, quantity: 1, image: '/images/product1.svg' },
  { id: 'p2', name: '상품 2', price: 20000, quantity: 1, image: '/images/product2.svg' },
  { id: 'p3', name: '상품 3', price: 5000, quantity: 1, image: '/images/product3.svg' },
];

핵심 구현 포인트
1. Hydration 문제 해결: 
   - useState 초기값을 하드코딩된 더미 데이터로 설정
   - selectedProductIds를 new Set(['p1', 'p2', 'p3'])로 초기화
   - useEffect에서 localStorage 데이터를 클라이언트에서만 로드

2. 모듈화 설계: 
   - Presentational 컴포넌트: UI만 담당
   - Business Logic 훅: 상태 관리 및 비즈니스 로직

3. 타입 안전성: 
   - 모든 Props와 함수에 정확한 타입 정의
   - selectedCount를 useMemo로 계산하여 props로 전달

4. 상태 관리: 
   - useState, useEffect, useMemo, useCallback 활용
   - localStorage 동기화

5. 에러 방지: 
   - typeof window === 'undefined' 체크
   - SSR 환경에서 안전한 상태 전달

예상 결과
- 모든 상품이 기본적으로 선택된 상태로 시작
- 수량 조절 시 실시간 가격 업데이트
- 삭제 시 선택 상태에서도 자동 제거
- 배송비 로직 정확한 적용 (5만원 미만 시 3천원)
- Hydration 에러 완전 해결
- localStorage 상태 유지
```