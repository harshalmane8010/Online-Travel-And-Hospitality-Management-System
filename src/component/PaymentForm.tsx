import React from 'react';
import { Form, Button, Card, Spinner } from 'react-bootstrap';
import type { UseFormReturn } from 'react-hook-form';
import '../styles/PaymentForm.css';

type FormData = {
  method: string;
  upiId?: string;
  cardType?: string;
  cardNumber?: string;
  cardName?: string;
  expiry?: string;
  cvv?: string;
  wallet?: string;
  bank?: string;
  couponCode?: string;
};

type Props = {
  method: string;
  isLoading: boolean;
  errors: UseFormReturn<FormData>['formState']['errors'];
  coupon: {
    message: string;
    isValid: boolean;
  };
  availableCoupons: { code: string; description: string }[];
  register: UseFormReturn<FormData>['register'];
  handleSubmit: UseFormReturn<FormData>['handleSubmit'];
  onSubmit: (data: FormData) => void;
};

const PaymentForm: React.FC<Props> = ({
  method,
  isLoading,
  errors,
  coupon,
  availableCoupons,
  register,
  handleSubmit,
  onSubmit,
}) => {
  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="payment-form">
      {/* UPI Section */}
      <Card className="payment-card">
        <Card.Body>
          <Form.Check type="radio" label="UPI" value="upi" {...register('method')} />
          {method === 'upi' && (
            <Form.Group className="payment-input-group">
              <Form.Label className="payment-label">UPI ID</Form.Label>
              <Form.Control type="text" placeholder="example@bank" {...register('upiId')} className="payment-input" />
              <Form.Text className="text-danger">{errors.upiId?.message}</Form.Text>
            </Form.Group>
          )}
        </Card.Body>
      </Card>

      {/* Card Section */}
      <Card className="payment-card">
        <Card.Body>
          <Form.Check type="radio" label="Credit/Debit Card" value="card" {...register('method')} />
          {method === 'card' && (
            <>
              <Form.Group className="payment-input-group">
                <Form.Label className="payment-label">Card Number</Form.Label>
                <Form.Control type="text" placeholder="1234567812345678" {...register('cardNumber')} className="payment-input" />
                <Form.Text className="text-danger">{errors.cardNumber?.message}</Form.Text>
              </Form.Group>
              <Form.Group className="payment-input-group">
                <Form.Label className="payment-label">Name on Card</Form.Label>
                <Form.Control type="text" {...register('cardName')} className="payment-input" />
                <Form.Text className="text-danger">{errors.cardName?.message}</Form.Text>
              </Form.Group>
              <Form.Group className="payment-input-group">
                <Form.Label className="payment-label">Expiry</Form.Label>
                <Form.Control type="text" placeholder="MM/YY" {...register('expiry')} className="payment-input" />
                <Form.Text className="text-danger">{errors.expiry?.message}</Form.Text>
              </Form.Group>
              <Form.Group className="payment-input-group">
                <Form.Label className="payment-label">CVV</Form.Label>
                <Form.Control type="password" {...register('cvv')} className="payment-input" />
                <Form.Text className="text-danger">{errors.cvv?.message}</Form.Text>
              </Form.Group>
            </>
          )}
        </Card.Body>
      </Card>

      {/* Wallet Section */}
      <Card className="payment-card">
        <Card.Body>
          <Form.Check type="radio" label="Wallet" value="wallet" {...register('method')} />
          {method === 'wallet' && (
            <Form.Group className="payment-input-group">
              <Form.Label className="payment-label">Wallet Provider</Form.Label>
              <Form.Select {...register('wallet')} className="payment-input">
                <option value="">Select</option>
                <option value="Paytm">Paytm</option>
                <option value="PhonePe">PhonePe</option>
                <option value="AmazonPay">Amazon Pay</option>
              </Form.Select>
              <Form.Text className="text-danger">{errors.wallet?.message}</Form.Text>
            </Form.Group>
          )}
        </Card.Body>
      </Card>

      {/* Net Banking Section */}
      <Card className="payment-card">
        <Card.Body>
          <Form.Check type="radio" label="Net Banking" value="netbanking" {...register('method')} />
          {method === 'netbanking' && (
            <Form.Group className="payment-input-group">
              <Form.Label className="payment-label">Select Bank</Form.Label>
              <Form.Select {...register('bank')} className="payment-input">
                <option value="">Select</option>
                <option value="HDFC">HDFC Bank</option>
                <option value="ICICI">ICICI Bank</option>
                <option value="SBI">State Bank of India</option>
              </Form.Select>
              <Form.Text className="text-danger">{errors.bank?.message}</Form.Text>
            </Form.Group>
          )}
        </Card.Body>
      </Card>

      {/* Coupon Section */}
      <Card className="payment-card">
        <Card.Body>
          <Form.Label className="payment-label">Apply Coupon</Form.Label>
          <Form.Select {...register('couponCode')} className="payment-input">
            {availableCoupons.map(c => (
              <option key={c.code} value={c.code}>
                {c.description}
              </option>
            ))}
          </Form.Select>
          {coupon.message && (
            <Form.Text className={`mt-2 ${coupon.isValid ? 'text-success' : 'text-danger'}`}>
              {coupon.message}
            </Form.Text>
          )}
        </Card.Body>
      </Card>

      {/* Submit Button */}
      <div className="text-center mt-4">
        <Button type="submit" className="payment-submit-btn" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" /> Paying…
            </>
          ) : (
            'Pay Now'
          )}
        </Button>
      </div>
    </Form>
  );
};

export default PaymentForm;
