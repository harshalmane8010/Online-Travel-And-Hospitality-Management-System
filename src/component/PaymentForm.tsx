import React from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
// Use 'type' keyword for importing types when verbatimModuleSyntax is enabled
import type { UseFormRegister, FieldErrors, UseFormHandleSubmit, SubmitHandler } from 'react-hook-form';
import { Row, Col } from 'react-bootstrap';

// Define the types for the props that PaymentForm expects
interface CouponState {
  code: string;
  discount: number;
  isValid: boolean;
  message: string;
}

interface AvailableCoupon {
  code: string;
  description: string;
  discount: number;
}

// Assuming FormData structure from Payment.tsx
interface FormData {
  method: string;
  couponCode?: string;
  cardNumber?: string;
  cardHolderName?: string;
  expiryDate?: string;
  cvv?: string;
  upiId?: string;
}

interface PaymentFormProps {
  method: string; // This prop is used for conditional rendering
  isLoading: boolean;
  errors: FieldErrors<FormData>;
  coupon: CouponState;
  availableCoupons: AvailableCoupon[];
  register: UseFormRegister<FormData>;
  handleSubmit: UseFormHandleSubmit<FormData>;
  onSubmit: SubmitHandler<FormData>;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  method, // Now directly used for conditional rendering
  isLoading,
  errors,
  coupon,
  availableCoupons,
  register,
  handleSubmit,
  onSubmit,
}) => {
  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded-3 shadow-sm">
      <h5 className="fw-bold mb-4 text-primary">Choose Payment Method</h5>

      <Form.Group className="mb-3">
        <Form.Label>Payment Method</Form.Label>
        <Form.Select
          {...register('method')}
          isInvalid={!!errors.method}
          className="rounded-pill"
        >
          <option value="">Select a method</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Net Banking">Net Banking</option>
          <option value="UPI">UPI</option>
        </Form.Select>
        {errors.method && (
          <Form.Control.Feedback type="invalid">
            {errors.method.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      {/* Conditional fields for Credit/Debit Card */}
      {(method === 'Credit Card' || method === 'Debit Card') && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter 16-digit card number"
              {...register('cardNumber')}
              isInvalid={!!errors.cardNumber}
              className="rounded-pill"
              maxLength={16} // Enforce max length
            />
            {errors.cardNumber && (
              <Form.Control.Feedback type="invalid">
                {errors.cardNumber.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Card Holder Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter card holder name"
              {...register('cardHolderName')}
              isInvalid={!!errors.cardHolderName}
              className="rounded-pill"
            />
            {errors.cardHolderName && (
              <Form.Control.Feedback type="invalid">
                {errors.cardHolderName.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Expiry Date (MM/YY)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="MM/YY"
                  {...register('expiryDate')}
                  isInvalid={!!errors.expiryDate}
                  className="rounded-pill"
                  maxLength={5} // Enforce MM/YY length
                />
                {errors.expiryDate && (
                  <Form.Control.Feedback type="invalid">
                    {errors.expiryDate.message}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>CVV</Form.Label>
                <Form.Control
                  type="password" // Use password type for CVV for security
                  placeholder="CVV"
                  {...register('cvv')}
                  isInvalid={!!errors.cvv}
                  className="rounded-pill"
                  maxLength={4} // Enforce max length (3 or 4 digits)
                />
                {errors.cvv && (
                  <Form.Control.Feedback type="invalid">
                    {errors.cvv.message}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
          </Row>
        </>
      )}

      {/* Conditional field for UPI */}
      {method === 'UPI' && (
        <Form.Group className="mb-3">
          <Form.Label>UPI ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter 10-digit UPI ID"
            {...register('upiId')}
            isInvalid={!!errors.upiId}
            className="rounded-pill"
            maxLength={10} // Enforce max length
          />
          {errors.upiId && (
            <Form.Control.Feedback type="invalid">
              {errors.upiId.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      )}

      <Form.Group className="mb-3">
        <Form.Label>Coupon Code (Optional)</Form.Label>
        <InputGroup>
          <Form.Select
            {...register('couponCode')}
            className="rounded-pill"
          >
            {availableCoupons.map((c) => (
              <option key={c.code} value={c.code}>
                {c.description}
              </option>
            ))}
          </Form.Select>
        </InputGroup>
        {coupon.message && (
          <Form.Text className={coupon.isValid ? 'text-success' : 'text-danger'}>
            {coupon.message}
          </Form.Text>
        )}
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        className="w-100 mt-4 rounded-pill py-2"
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Confirm Booking & Pay'}
      </Button>
    </Form>
  );
};

export default PaymentForm;
