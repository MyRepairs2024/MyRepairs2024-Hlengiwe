import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const PaymentSuccess = () => {
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    const storedPaymentDetails = localStorage.getItem('paymentDetails');

    if (storedPaymentDetails) {
      const parsedPaymentDetails = JSON.parse(storedPaymentDetails);
      setPaymentDetails(parsedPaymentDetails);

      fetch("/api/submitPayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cus_email: parsedPaymentDetails.email,
          pro_email: parsedPaymentDetails.serviceProviderEmail,
          service: parsedPaymentDetails.serviceType,
          price: parseFloat(parsedPaymentDetails.pricePerHour),
          cus_address: parsedPaymentDetails.deliveryAddress,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const saveAsImage = () => {
    const receiptContainer = document.getElementById('receipt-container');

    html2canvas(receiptContainer).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      pdf.save('payment_receipt.pdf');
    });
  };

  return (
    <div>
      {paymentDetails ? (
        <div id="receipt-container" style={styles.receiptContainer}>
          <h2 style={styles.heading}>Payment Successful</h2>
          <p>Your payment has been processed successfully.</p>
          {/* Display payment details */}
          <p style={styles.detail}>Service: {paymentDetails.serviceType}</p>
          <p style={styles.detail}>Provider Email: {paymentDetails.serviceProviderEmail}</p>
          <p style={styles.detail}>Price: ${paymentDetails.pricePerHour}/hr</p>
          <p style={styles.detail}>Address: {paymentDetails.deliveryAddress}</p>
          <p style={styles.detail}>Email: {paymentDetails.email}</p>

          <button style={styles.button} onClick={saveAsImage}>
            Save as Image/PDF
          </button>
        </div>
      ) : (
        <div>
          <h2>Payment Details Not Found</h2>
          <p>No payment details were found in localStorage.</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  receiptContainer: {
    backgroundColor: '#f5f5f5',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    maxWidth: '500px',
    margin: '0 auto',
  },
  heading: {
    color: '#333',
  },
  detail: {
    marginBottom: '5px',
  },
  button: {
    backgroundColor: '#ff0066',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default PaymentSuccess;