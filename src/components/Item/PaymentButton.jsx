import React from 'react';

const PaymentButton = ({ handlePayment }) => (
  <button
    onClick={handlePayment}
    style={{
      marginTop: '10px',
      padding: '8px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    }}
  >
    Оплатить
  </button>
);

export default PaymentButton;