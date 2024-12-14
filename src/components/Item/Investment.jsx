import React from 'react';

const Investment = ({ investmentAmount, setInvestmentAmount }) => (
  <div>
    <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>Инвестиции:</div>
    <input
      type="number"
      value={investmentAmount}
      onChange={(e) => setInvestmentAmount(e.target.value)}
      placeholder="Сумма"
      style={{
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '8px',
        minHeight: '30px',
        backgroundColor: '#fff',
        width: '100%',
      }}
    />
  </div>
);

export default Investment;