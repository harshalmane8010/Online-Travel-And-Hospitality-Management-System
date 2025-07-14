import React from 'react';
import { Card } from 'react-bootstrap';
import ViewQrButtonWithScanner from './ViewQRButtonWithScanner';
import '../styles/Payment.css';
type Props = {
  baseAmount: number;
  gstAmount: number;
  finalPaidAmount: number;
  coupon: any;
};

const PaymentSummary: React.FC<Props> = ({ baseAmount, gstAmount, finalPaidAmount, coupon }) => (
  <Card className="mb-4 flex-grow-1">
    <Card.Body>
      <Card.Title className="text-center fw-bold text-primary">Grand Total Payment</Card.Title>
      <hr />
      <div className="d-flex justify-content-between mb-2">
        <span>Total Amount:</span>
        <span>₹{baseAmount.toFixed(2)}</span>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <span>GST (12%):</span>
        <span>₹{gstAmount.toFixed(2)}</span>
      </div>
      {coupon.isValid && (
        <div className="d-flex justify-content-between mb-2 text-success fw-bold">
          <span>Coupon ({coupon.code}):</span>
          <span>- ₹{coupon.discount.toFixed(2)}</span>
        </div>
      )}
      <div className="d-flex justify-content-between fw-bold mb-4">
        <span>Amount to Pay:</span>
        <span>₹{finalPaidAmount.toFixed(2)}</span>
      </div>
      <h5 className="text-center fw-bold">Scan to Pay</h5>
      <p className="text-center">Instant Refund & High Success Rate</p>
      <div className="d-flex justify-content-center mb-3">
        <ViewQrButtonWithScanner />
      </div>
      <div className="d-flex justify-content-around align-items-center">
        <img src="https://d6xcmfyh68wv8.cloudfront.net/assets/upi-autopay/logo-desktop.png" style={{ height: '80px' }} />
      </div>
    </Card.Body>
  </Card>
);

export default PaymentSummary;
