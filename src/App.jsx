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
  Lock,
  User,
  MessageCircle,
} from "lucide-react";
import QRCode from "qrcode";

// Form Components for each QR type
const TextForm = ({ value, onChange }) => (
  <div className="space-y-4">
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter your text message..."
      className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
    />
  </div>
);

const URLForm = ({ value, onChange }) => {
  const [isValid, setIsValid] = useState(true);

  const validateURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleChange = (url) => {
    setIsValid(url === "" || validateURL(url));
    onChange(url);
  };

  return (
    <div className="space-y-2">
      <input
        type="url"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="https://example.com"
        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          !isValid ? "border-red-500" : "border-gray-300"
        }`}
      />
      {!isValid && (
        <p className="text-sm text-red-500">Please enter a valid URL</p>
      )}
    </div>
  );
};

const EmailForm = ({ value, onChange }) => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    body: "",
  });

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onChange(
      `mailto:${newData.email}${
        newData.subject ? "?subject=" + encodeURIComponent(newData.subject) : ""
      }${newData.body ? "&body=" + encodeURIComponent(newData.body) : ""}`
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="recipient@example.com"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Subject (optional)
        </label>
        <input
          type="text"
          value={formData.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
          placeholder="Email subject"
          className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Message (optional)
        </label>
        <textarea
          value={formData.body}
          onChange={(e) => handleChange("body", e.target.value)}
          placeholder="Email body"
          className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
        />
      </div>
    </div>
  );
};

const PhoneForm = ({ value, onChange }) => {
  const [isValid, setIsValid] = useState(true);

  const validatePhone = (phone) => {
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (phone) => {
    setIsValid(phone === "" || validatePhone(phone));
    onChange(phone);
  };

  return (
    <div className="space-y-2">
      <input
        type="tel"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="+1 (234) 567-8900"
        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          !isValid ? "border-red-500" : "border-gray-300"
        }`}
      />
      {!isValid && (
        <p className="text-sm text-red-500">
          Please enter a valid phone number
        </p>
      )}
    </div>
  );
};

const SMSForm = ({ value, onChange }) => {
  const [formData, setFormData] = useState({
    phone: "",
    message: "",
  });

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onChange(
      `sms:${newData.phone}${
        newData.message ? "?body=" + encodeURIComponent(newData.message) : ""
      }`
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+1 (234) 567-8900"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Message (optional)
        </label>
        <div className="relative">
          <MessageCircle className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <textarea
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            placeholder="Enter your message"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
};

const WiFiForm = ({ value, onChange }) => {
  const [formData, setFormData] = useState({
    ssid: "",
    password: "",
    encryption: "WPA",
    hidden: false,
  });

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onChange(
      `WIFI:T:${newData.encryption};S:${newData.ssid};P:${newData.password};H:${
        newData.hidden ? "true" : "false"
      };;`
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Network Name (SSID)
        </label>
        <div className="relative">
          <Wifi className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={formData.ssid}
            onChange={(e) => handleChange("ssid", e.target.value)}
            placeholder="WiFi network name"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="WiFi password"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Encryption Type
        </label>
        <select
          value={formData.encryption}
          onChange={(e) => handleChange("encryption", e.target.value)}
          className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">No Password</option>
        </select>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="hidden-network"
          checked={formData.hidden}
          onChange={(e) => handleChange("hidden", e.target.checked)}
          className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label
          htmlFor="hidden-network"
          className="ml-2 block text-sm text-gray-700"
        >
          Hidden Network
        </label>
      </div>
    </div>
  );
};

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
      component: TextForm,
    },
    {
      value: "url",
      label: "URL",
      icon: Globe,
      component: URLForm,
    },
    {
      value: "email",
      label: "Email",
      icon: Mail,
      component: EmailForm,
    },
    {
      value: "tel",
      label: "Phone",
      icon: Phone,
      component: PhoneForm,
    },
    {
      value: "sms",
      label: "SMS",
      icon: MessageSquare,
      component: SMSForm,
    },
    {
      value: "wifi",
      label: "WiFi",
      icon: Wifi,
      component: WiFiForm,
    },
  ];

  useEffect(() => {
    const generateQR = async () => {
      try {
        if (qrData) {
          const url = await QRCode.toDataURL(qrData, {
            width: 400,
            margin: 2,
            color: {
              dark: "#000000",
              light: "#ffffff",
            },
          });
          setQrImage(url);
        } else {
          setQrImage("");
        }
      } catch (err) {
        console.error("Error generating QR code:", err);
        setQrImage("");
      }
    };

    generateQR();
  }, [qrData]);

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
  const FormComponent = selectedType?.component;

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
                      onClick={() => {
                        setQrType(type.value);
                        setQrData("");
                      }}
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
                {selectedType?.label} Details
              </label>
              {FormComponent && (
                <FormComponent value={qrData} onChange={setQrData} />
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
