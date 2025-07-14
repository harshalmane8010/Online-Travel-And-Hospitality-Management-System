import React, { useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';



const ViewQrButtonWithScanner: React.FC = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);

  const handleViewQRClick = () => {
    setIsScanning(true);

    setTimeout(() => {
      setIsScanning(false);
      navigate('/payment');
    }, 2500);
  };

  return (
    <>
      <div className="d-flex justify-content-center mb-3">
        <Button className="btn btn-primary" onClick={handleViewQRClick} disabled={isScanning}>
          {isScanning ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Scanning...
            </>
          ) : (
            'VIEW QR'
          )}
        </Button>
      </div>

      {/* Scanner Modal with QR Code */}
      <Modal show={isScanning} centered backdrop="static" keyboard={false}>
        <Modal.Body className="text-center">
        <QRCode value="https://your-payment-url.com" size={128} />
          <p className="mt-3">Scanning QR Code...</p>
          <p className="text-muted">Redirecting to payment page shortly.</p>
        </Modal.Body>
      </Modal>
      
              {/* <Image
                src="https://placehold.co/150x150/E0F2FE/000000?text=UPI+QR"
                alt="UPI QR Scanner"
                fluid
                className="d-block mx-auto rounded"
              /> */}
        </>   
  );
}

export default ViewQrButtonWithScanner;
