import React, { useState, useRef, useEffect } from "react";
import {
  Share2,
  Download,
  QrCode,
  Mail,
  Phone,
  MessageSquare,
  Wifi,
  Globe,
  Type,
} from "lucide-react";
import QRCode from "qrcode";

const QRGenerator = () => {
  const [qrData, setQrData] = useState("");
  const [qrType, setQrType] = useState("text");
  const [qrImage, setQrImage] = useState("");
  const qrRef = useRef();

  const qrTypes = [
    {
      value: "text",
      label: "Text",
      icon: Type,
      placeholder: "Enter any text...",
    },
    {
      value: "url",
      label: "URL",
      icon: Globe,
      placeholder: "Enter website URL...",
    },
    {
      value: "email",
      label: "Email",
      icon: Mail,
      placeholder: "Enter email address...",
    },
    {
      value: "tel",
      label: "Phone Number",
      icon: Phone,
      placeholder: "Enter phone number...",
    },
    {
      value: "sms",
      label: "SMS",
      icon: MessageSquare,
      placeholder: "Enter phone number...",
    },
    {
      value: "wifi",
      label: "WiFi",
      icon: Wifi,
      placeholder: "Enter SSID,password...",
    },
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
            width: 400,
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
      link.download = `qr-code-${qrType}.png`;
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
        const file = new File([blob], `qr-code-${qrType}.png`, {
          type: "image/png",
        });
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

  const selectedType = qrTypes.find((type) => type.value === qrType);
  const TypeIcon = selectedType?.icon;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Input Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">
              QR Code Settings
            </h2>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {qrTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.value}
                      onClick={() => setQrType(type.value)}
                      className={`flex items-center justify-center p-3 rounded-lg border-2 transition-all ${
                        qrType === type.value
                          ? "border-blue-500 bg-blue-50 text-blue-600"
                          : "border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-2" />
                      <span className="text-sm font-medium">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {selectedType?.label} Content
              </label>
              <div className="relative">
                {TypeIcon && (
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <TypeIcon className="h-5 w-5 text-gray-400" />
                  </div>
                )}
                <input
                  type="text"
                  value={qrData}
                  onChange={(e) => setQrData(e.target.value)}
                  placeholder={selectedType?.placeholder}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {qrType === "wifi" && (
                <p className="text-sm text-gray-500">
                  Format: NetworkName,Password
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - QR Code Display */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Generated QR Code
            </h2>
            <div
              ref={qrRef}
              className={`flex justify-center items-center bg-gray-50 rounded-lg p-6 ${
                qrImage ? "border-2 border-dashed border-gray-200" : ""
              }`}
            >
              {qrImage ? (
                <img
                  src={qrImage}
                  alt="QR Code"
                  className="w-64 h-64 object-contain"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <QrCode className="w-16 h-16 mb-2" />
                  <p>Enter content to generate QR code</p>
                </div>
              )}
            </div>

            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={downloadQR}
                disabled={!qrImage}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Download className="w-5 h-5 mr-2" />
                <span>Download</span>
              </button>
              <button
                onClick={shareQR}
                disabled={!qrImage || !navigator.share}
                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Share2 className="w-5 h-5 mr-2" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <QrCode className="w-8 h-8 text-blue-500 mr-3" />
              <div className="text-xl font-bold text-gray-800">
                QR Code Generator
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-10">
        <QRGenerator />
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            Generate QR codes for text, URLs, WiFi, and more
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
