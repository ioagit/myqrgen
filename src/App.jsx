import React, { useState, useRef, useEffect } from "react";
import { Share2, Download } from "lucide-react";
import QRCode from "qrcode";

const QRGenerator = () => {
  const [qrData, setQrData] = useState("");
  const [qrType, setQrType] = useState("text");
  const [qrImage, setQrImage] = useState("");
  const qrRef = useRef();

  const qrTypes = [
    { value: "text", label: "Text" },
    { value: "url", label: "URL" },
    { value: "email", label: "Email" },
    { value: "tel", label: "Phone Number" },
    { value: "sms", label: "SMS" },
    { value: "wifi", label: "WiFi" },
  ];

  const formatQRData = (type, data) => {
    switch (type) {
      case "email":
        return `mailto:${data}`;
      case "tel":
        return `tel:${data}`;
      case "sms":
        return `sms:${data}`;
      case "wifi":
        const [ssid, password] = data.split(",");
        return `WIFI:T:WPA;S:${ssid};P:${password};;`;
      default:
        return data;
    }
  };

  useEffect(() => {
    const generateQR = async () => {
      try {
        const formattedData = formatQRData(qrType, qrData);
        if (formattedData) {
          const url = await QRCode.toDataURL(formattedData, {
            width: 256,
            margin: 2,
            color: {
              dark: "#000000",
              light: "#ffffff",
            },
          });
          setQrImage(url);
        }
      } catch (err) {
        console.error("Error generating QR code:", err);
      }
    };

    generateQR();
  }, [qrData, qrType]);

  const downloadQR = () => {
    if (qrImage) {
      const link = document.createElement("a");
      link.href = qrImage;
      link.download = "qr-code.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const shareQR = async () => {
    if (qrImage && navigator.share) {
      try {
        const response = await fetch(qrImage);
        const blob = await response.blob();
        const file = new File([blob], "qr-code.png", { type: "image/png" });
        await navigator.share({
          files: [file],
          title: "QR Code",
          text: "Check out this QR code!",
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <select
          value={qrType}
          onChange={(e) => setQrType(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          {qrTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={qrData}
          onChange={(e) => setQrData(e.target.value)}
          placeholder={`Enter ${qrType}...`}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div
        ref={qrRef}
        className="flex justify-center p-4 bg-white rounded-lg shadow-md"
      >
        {qrImage && <img src={qrImage} alt="QR Code" className="w-64 h-64" />}
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={downloadQR}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          disabled={!qrImage}
        >
          <Download className="w-5 h-5" />
          <span>Download</span>
        </button>
        <button
          onClick={shareQR}
          className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          disabled={!qrImage}
        >
          <Share2 className="w-5 h-5" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex items-center text-xl font-bold text-gray-800">
                QR Generator
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-10">
        <QRGenerator />
      </main>

      <footer className="bg-white mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            Created with React and Vite
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
