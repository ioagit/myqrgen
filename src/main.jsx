import React, { useState, useRef } from "react";
import { Share2, Download } from "lucide-react";

// A simple QR-like pattern generator for demonstration
const SimpleQRPattern = ({ value, size = 256 }) => {
  // Create a deterministic pattern based on the input string
  const getPattern = () => {
    const cells = [];
    const hash = Array.from(value).reduce(
      (acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0,
      0
    );

    // Create a 20x20 grid
    const gridSize = 20;
    const cellSize = size / gridSize;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        // Use the hash to determine if a cell should be filled
        const shouldFill = ((hash >> (i * j)) & 1) === 1;
        if (shouldFill) {
          cells.push(
            <rect
              key={`${i}-${j}`}
              x={j * cellSize}
              y={i * cellSize}
              width={cellSize}
              height={cellSize}
              fill="black"
            />
          );
        }
      }
    }

    // Add fixed position markers (corners)
    const markerSize = cellSize * 3;
    const markers = [
      // Top-left marker
      <g key="tl">
        <rect x={0} y={0} width={markerSize} height={markerSize} fill="black" />
        <rect
          x={cellSize}
          y={cellSize}
          width={cellSize}
          height={cellSize}
          fill="white"
        />
      </g>,
      // Top-right marker
      <g key="tr">
        <rect
          x={size - markerSize}
          y={0}
          width={markerSize}
          height={markerSize}
          fill="black"
        />
        <rect
          x={size - markerSize + cellSize}
          y={cellSize}
          width={cellSize}
          height={cellSize}
          fill="white"
        />
      </g>,
      // Bottom-left marker
      <g key="bl">
        <rect
          x={0}
          y={size - markerSize}
          width={markerSize}
          height={markerSize}
          fill="black"
        />
        <rect
          x={cellSize}
          y={size - markerSize + cellSize}
          width={cellSize}
          height={cellSize}
          fill="white"
        />
      </g>,
    ];

    return [...markers, ...cells];
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill="white" />
      {getPattern()}
    </svg>
  );
};

const QRGenerator = () => {
  const [qrData, setQrData] = useState("");
  const [qrType, setQrType] = useState("text");
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

  const downloadQR = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "qr-code.svg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const shareQR = async () => {
    const svg = qrRef.current?.querySelector("svg");
    if (svg && navigator.share) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: "image/svg+xml" });
      const file = new File([blob], "qr-code.svg", { type: "image/svg+xml" });
      try {
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
        <SimpleQRPattern value={formatQRData(qrType, qrData)} size={256} />
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={downloadQR}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Download className="w-5 h-5" />
          <span>Download</span>
        </button>
        <button
          onClick={shareQR}
          className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
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
