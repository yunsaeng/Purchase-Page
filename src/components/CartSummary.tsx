'use client';

interface CartSummaryProps {
  productTotal: number;
  deliveryFee: number;
  totalPayment: number;
}

export default function CartSummary({
  productTotal,
  deliveryFee,
  totalPayment,
}: CartSummaryProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-gray-900 mb-4">주문 요약</h2>
      
      <div className="space-y-3">
        {/* 상품 금액 */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">상품 금액</span>
          <span className="font-medium">{productTotal.toLocaleString()}원</span>
        </div>

        {/* 배송비 */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">배송비</span>
          <span className="font-medium">
            {deliveryFee > 0 ? `${deliveryFee.toLocaleString()}원` : '무료'}
          </span>
        </div>

        {/* 구분선 */}
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">총 결제금액</span>
            <span className="text-2xl font-bold text-indigo-600">
              {totalPayment.toLocaleString()}원
            </span>
          </div>
        </div>

        {/* 구매하기 버튼 */}
        <button className="w-full mt-6 bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors duration-200">
          구매하기
        </button>

        {/* 배송비 안내 */}
        {deliveryFee > 0 && (
          <p className="text-sm text-gray-500 text-center mt-2">
            5만원 이상 구매 시 배송비 무료
          </p>
        )}
      </div>
    </div>
  );
}
