import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useForm, type SubmitHandler, type Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import axiosInstance from '../api/axiosInstance';
import PaymentForm from './PaymentForm';
import PaymentSummary from './PaymentSummary';
import '../styles/Payment.css';
 
const oceanBlue = '#0077be';
 
type CouponState = {
  code: string;
  discount: number;
  isValid: boolean;
  message: string;
};
 
const availableCoupons = [
  { code: '', description: 'Select a coupon', discount: 0 },
  { code: 'SAVE200', description: 'Save ₹200 on your',discount: 200 },
  { code: 'FLYHIGH500', description: 'Get ₹500 off on domestic flights', discount: 500 },
  { code: 'HOTEL300', description: 'Flat ₹300 off on hotel bookings', discount: 300 },
  { code: 'TRAVEL1000', description: 'Save ₹1000 on international packages', discount: 1000 },
  { code: 'WEEKEND250', description: '₹250 off on weekend getaways', discount: 250 },
  { code: 'SUMMER600', description: '₹600 off on summer vacation bookings', discount: 600 },
  { code: 'FAMILY750', description: '₹750 off on family travel packages', discount: 750 },
  { code: 'LUXE400', description: '₹400 off on luxury hotel stays', discount: 400 },
  { code: 'EARLYBIRD350', description: '₹350 off for early flight bookings', discount: 350 },
  { code: 'MONSOON500', description: '₹500 off on monsoon travel deals', discount: 500 }
];

 
// Define the FormData structure including new payment fields
type FormData = {
  method: string;
  couponCode?: string;
  cardNumber?: string;
  cardHolderName?: string;
  expiryDate?: string;
  cvv?: string;
  upiId?: string;
};

// Define the validation schema
const schema = yup.object({
  method: yup.string().required('Select a payment method'),
  couponCode: yup.string().optional(),
  
  // Conditional validation for Credit/Debit Card
  cardNumber: yup.string().when('method', {
    is: (val: string) => val === 'Credit Card' || val === 'Debit Card',
    then: (schema) => schema
      .required('Card number is required')
      .matches(/^\d{16}$/, 'Card number must be 16 digits'),
    otherwise: (schema) => schema.notRequired(),
  }),
  cardHolderName: yup.string().when('method', {
    is: (val: string) => val === 'Credit Card' || val === 'Debit Card',
    then: (schema) => schema.required('Card holder name is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  expiryDate: yup.string().when('method', {
    is: (val: string) => val === 'Credit Card' || val === 'Debit Card',
    then: (schema) => schema
      .required('Expiry date is required')
      .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date (MM/YY)'),
    otherwise: (schema) => schema.notRequired(),
  }),
  cvv: yup.string().when('method', {
    is: (val: string) => val === 'Credit Card' || val === 'Debit Card',
    then: (schema) => schema
      .required('CVV is required')
      .matches(/^\d{3,4}$/, 'CVV must be 3 or 4 digits'),
    otherwise: (schema) => schema.notRequired(),
  }),

  // Conditional validation for UPI
  upiId: yup.string().when('method', {
    is: 'UPI',
    then: (schema) => schema
      .required('UPI ID is required')
      .matches(/^[\w.-]{2,256}@[a-zA-Z]{2,64}$/,'Enter a valid UPI ID (e.g., username@bankname)'),
    otherwise: (schema) => schema.notRequired(),
  }),
});
 
const Payment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
 
  const pkg = location.state?.pkg;
  const flight = location.state?.flight;
  const hotel = location.state?.hotel;
 
  const bookingType = pkg ? 'Package' : flight ? 'Flight' : hotel ? 'Hotel' : 'Other';
 
  const baseAmount = pkg?.price
    ? parseFloat(pkg.price)
    : flight?.price
    ? flight.price
    : hotel?.pricePerNight
    ? hotel.pricePerNight * (hotel.roomsBooked ?? 1)
    : 7500;
 
  const gstRate = 0.12;
  const gstAmount = baseAmount * gstRate;
  const finalBaseAmount = baseAmount + gstAmount;
 
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(schema) as Resolver<FormData> });
 
  const method = watch('method');
  const selectedCouponCode = watch('couponCode');
 
  const [coupon, setCoupon] = useState<CouponState>({
    code: '',
    discount: 0,
    isValid: false,
    message: ''
  });
 
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'failed'>('idle');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userId, setUserId] = useState<number>(0);
 
  let finalPaidAmount = finalBaseAmount;
  if (coupon.isValid) {
    finalPaidAmount =
      coupon.discount < 1
        ? finalPaidAmount * (1 - coupon.discount)
        : finalPaidAmount - coupon.discount;
  }
  finalPaidAmount = Math.max(0, finalPaidAmount);
 
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
 
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const email: string = payload.email || payload.sub;
 
      axiosInstance
        .get(`/user-api/users/email/${email}`)
        .then((res) => {
          setUserId(res.data?.userId || 0);
        })
        .catch((err) => {
          console.error('Error fetching user ID:', err);
        });
    } catch (err) {
      console.error('JWT decode error:', err);
    }
  }, []);
 
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setErrorMessage(null);
 
    const bookingId = Date.now();
    // The paymentId here is a client-side placeholder; backend will generate its own.
    // However, it's passed to bookingPayload for potential linking on frontend before backend payment creation.
    const paymentId = bookingId + 5000; 
 
    const bookingPayload = {
      bookingId,
      userId,
      type: bookingType,
      status: 'Confirmed',
      paymentId,
      bookingDate: new Date().toISOString().split('T')[0],
      flightId: flight?.flightId ?? null,
      hotelId: hotel?.hotelId ?? null,
      roomsBooked: hotel?.roomsBooked ?? null,
      packageId: pkg?.packageID ?? null
    };
 
    try {
      // Step 1: Create the booking
      const bookingRes = await axiosInstance.post('/bookings', bookingPayload);
      const createdBooking = bookingRes.data;
 
      // Step 2: Create the payment after successful booking
      const paymentPayload = {
        userId: createdBooking.userId,
        bookingId: createdBooking.bookingId,
        totalAmount: finalPaidAmount,
        status: 'Completed', // Set a default status, backend can update if needed
        paymentMethod: data.method,
        // Include specific payment details based on method
        cardNumber: data.method === 'Credit Card' || data.method === 'Debit Card' ? data.cardNumber : undefined,
        cardHolderName: data.method === 'Credit Card' || data.method === 'Debit Card' ? data.cardHolderName : undefined,
        expiryDate: data.method === 'Credit Card' || data.method === 'Debit Card' ? data.expiryDate : undefined,
        cvv: data.method === 'Credit Card' || data.method === 'Debit Card' ? data.cvv : undefined,
        upiId: data.method === 'UPI' ? data.upiId : undefined,
      };
 
      await axiosInstance.post('/api/payments', paymentPayload); // API call to your payment backend
 
      setPaymentStatus('success');
      setTimeout(() => {
        navigate('/invoice', {
          state: {
            booking: createdBooking,
            baseAmount,
            gstAmount,
            discountAmount: coupon.discount,
            couponApplied: coupon.code || undefined,
            paymentMethod: data.method,
            pkg,
            flight,
            hotel,
            status: 'Confirmed',
            totalAmount: finalPaidAmount, // Pass finalPaidAmount to invoice
            timestamp: new Date().toLocaleString() // Add timestamp for invoice
          }
        });
      }, 1500);
    } catch (error: any) {
      setPaymentStatus('failed');
      // More detailed error handling for both booking and payment
      if (error.response?.config.url.includes('/bookings')) {
        setErrorMessage(error.response?.data?.message || 'Booking failed.');
      } else if (error.response?.config.url.includes('/api/payments')) {
        setErrorMessage(error.response?.data?.message || 'Payment processing failed.');
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };
 
  useEffect(() => {
    const selectedCoupon = availableCoupons.find((c) => c.code === selectedCouponCode);
    if (selectedCoupon && selectedCoupon.code !== '') {
      const discount =
        selectedCoupon.discount < 1
          ? baseAmount * selectedCoupon.discount
          : selectedCoupon.discount;
      setCoupon({
        code: selectedCoupon.code,
        discount,
        isValid: true,
        message: `Coupon applied: ${selectedCoupon.description}`
      });
    } else {
      setCoupon({ code: '', discount: 0, isValid: false, message: '' });
    }
  }, [selectedCouponCode, baseAmount]);
 
  return (
    <Container fluid className="py-4">
      <Row>
        <Col>
          <h3 className="text-center fw-bold" style={{ color: oceanBlue }}>
            Confirm Your {bookingType}
          </h3>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          {paymentStatus === 'success' && (
            <Alert variant="success">✅ Booking successful! Redirecting to invoice...</Alert>
          )}
          {paymentStatus === 'failed' && (
            <Alert variant="danger">❌ Booking failed: {errorMessage}</Alert>
          )}
          <PaymentForm
            method={method} // Pass the selected method to PaymentForm
            isLoading={isLoading}
            errors={errors}
            coupon={coupon}
            availableCoupons={availableCoupons}
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        </Col>
        <Col lg={6}>
          <PaymentSummary
            baseAmount={baseAmount}
            gstAmount={gstAmount}
            finalPaidAmount={finalPaidAmount}
            coupon={coupon}
          />
        </Col>
      </Row>
    </Container>
  );
};
 
export default Payment;
