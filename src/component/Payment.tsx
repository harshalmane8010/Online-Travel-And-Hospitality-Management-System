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
  { code: 'SAVE200', description: 'Save ₹200 on your booking', discount: 200 }
];

const schema = yup.object({
  method: yup.string().required('Select a payment method'),
  couponCode: yup.string().optional()
});

type FormData = yup.InferType<typeof schema>;

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pkg = location.state?.pkg;
  const flight = location.state?.flight;
  const hotel = location.state?.hotel;

  const bookingType = pkg ? 'TravelPackage' : flight ? 'Flight' : hotel ? 'Hotel' : 'Other';

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
      packageId: pkg?.packageID ?? null // ✅ Correct mapping for TravelPackage
    };

    try {
      const bookingRes = await axiosInstance.post('/bookings', bookingPayload);

      setPaymentStatus('success');
      setTimeout(() => {
        navigate('/invoice', {
          state: {
            booking: bookingRes.data,
            baseAmount,
            gstAmount,
            discountAmount: coupon.discount,
            couponApplied: coupon.code || undefined,
            paymentMethod: data.method,
            pkg,
            flight,
            hotel,
            status: 'Confirmed'
          }
        });
      }, 1500);
    } catch (error: any) {
      setPaymentStatus('failed');
      setErrorMessage(error.response?.data?.message || 'Booking failed.');
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
            method={method}
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
