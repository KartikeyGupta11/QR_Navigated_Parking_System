export const generateEntryHTML = ({ carNumber, slot }) => {
  return `
    <div style="font-family: Arial, sans-serif; background: #f4f6f8; padding: 20px;">
      <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 25px; border-radius: 10px;">

        <h2 style="text-align: center; color: #2c3e50;">
          🚗 Welcome to Smart Parking
        </h2>

        <p style="font-size: 16px; color: #333;">
          Hello,
        </p>

        <p style="font-size: 15px; color: #555;">
          Your parking entry has been successfully recorded.
        </p>

        <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <p><strong>Car Number:</strong> ${carNumber}</p>
          <p><strong>Assigned Slot:</strong> ${slot}</p>
        </div>

        <p style="font-size: 14px; color: #555;">
          Please ensure safe parking and proceed to exit using the QR when leaving.
        </p>

        <hr style="margin: 20px 0;" />

        <p style="text-align: center; font-size: 13px; color: #888;">
          Thank you for choosing our parking service 🙏
        </p>

      </div>
    </div>
  `;
};

export const generateReceiptHTML = ({
  carNumber,
  slotNumber,
  entryTime,
  exitTime,
  amount,
}) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;">
      <div style="max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 10px;">
        
        <h2 style="text-align: center; color: #333;">🚗 Parking Receipt</h2>
        
        <hr />

        <p><strong>Car Number:</strong> ${carNumber}</p>
        <p><strong>Slot:</strong> ${slotNumber}</p>
        <p><strong>Entry Time:</strong> ${new Date(entryTime).toLocaleString()}</p>
        <p><strong>Exit Time:</strong> ${new Date(exitTime).toLocaleString()}</p>

        <hr />

        <h3 style="text-align: right; color: green;">Amount Paid: ₹${amount}</h3>

        <p style="text-align: center; margin-top: 20px;">
          Thank you for choosing our parking service 🙏
        </p>

      </div>
    </div>
  `;
};
