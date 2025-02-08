import React, { useState, useRef, useEffect, useCallback } from "react";
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
  Palette,
  Square,
  Circle,
  Triangle,
  Hexagon,
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import QRCodeStyling from "qr-code-styling";

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

const QRStyleOptions = {
  dots: [
    { value: "square", label: "Square", icon: Square },
    { value: "dots", label: "Dots", icon: Circle },
    { value: "rounded", label: "Rounded", icon: Square },
    { value: "classy", label: "Classy", icon: Triangle },
    { value: "classy-rounded", label: "Classy Rounded", icon: Hexagon },
  ],
  cornerSquares: [
    { value: "square", label: "Square", icon: Square },
    { value: "dots", label: "Dots", icon: Circle },
    { value: "extra-rounded", label: "Extra Rounded", icon: Circle },
  ],
  cornerDots: [
    { value: "square", label: "Square", icon: Square },
    { value: "dots", label: "Dots", icon: Circle },
  ],
};

const ColorPicker = ({ label, color, onChange }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="flex items-center space-x-2">
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-8 rounded cursor-pointer"
      />
      <input
        type="text"
        value={color.toUpperCase()}
        onChange={(e) => onChange(e.target.value)}
        className="w-24 px-2 py-1 text-sm border border-gray-300 rounded-md"
        placeholder="#000000"
      />
    </div>
  </div>
);

const QRPresets = [
  {
    id: "classic",
    name: "Classic",
    style: {
      type: "square",
      dotsOptions: { type: "square", color: "#000000" },
      cornerSquareOptions: { type: "square", color: "#000000" },
      cornerDotOptions: { type: "square", color: "#000000" },
      backgroundColor: "#FFFFFF",
    },
  },
  {
    id: "colorful",
    name: "Colorful",
    style: {
      type: "square",
      dotsOptions: { type: "dots", color: "#FF3B30" },
      cornerSquareOptions: { type: "extra-rounded", color: "#5856D6" },
      cornerDotOptions: { type: "dot", color: "#007AFF" },
      backgroundColor: "#FFFFFF",
    },
  },
  {
    id: "modern",
    name: "Modern",
    style: {
      type: "rounded",
      dotsOptions: { type: "dots", color: "#4F46E5" },
      cornerSquareOptions: { type: "extra-rounded", color: "#4F46E5" },
      cornerDotOptions: { type: "dot", color: "#4F46E5" },
      backgroundColor: "#F3F4F6",
    },
  },
  {
    id: "elegant",
    name: "Elegant",
    style: {
      type: "rounded",
      dotsOptions: { type: "rounded", color: "#1F2937" },
      cornerSquareOptions: { type: "extra-rounded", color: "#1F2937" },
      cornerDotOptions: { type: "dot", color: "#1F2937" },
      backgroundColor: "#FFFFFF",
    },
  },
  {
    id: "minimal",
    name: "Minimal",
    style: {
      type: "dots",
      dotsOptions: { type: "dots", color: "#6B7280" },
      cornerSquareOptions: { type: "dot", color: "#6B7280" },
      cornerDotOptions: { type: "dot", color: "#6B7280" },
      backgroundColor: "#F9FAFB",
    },
  },
  {
    id: "corporate",
    name: "Corporate",
    style: {
      type: "classy",
      dotsOptions: { type: "classy", color: "#0369A1" },
      cornerSquareOptions: { type: "extra-rounded", color: "#0284C7" },
      cornerDotOptions: { type: "dot", color: "#0EA5E9" },
      backgroundColor: "#F0F9FF",
    },
  },
  {
    id: "gradient",
    name: "Gradient",
    style: {
      type: "rounded",
      dotsOptions: { type: "rounded", color: "#6366F1" },
      cornerSquareOptions: { type: "extra-rounded", color: "#8B5CF6" },
      cornerDotOptions: { type: "dot", color: "#EC4899" },
      backgroundColor: "#FFFFFF",
    },
  },
  {
    id: "nature",
    name: "Nature",
    style: {
      type: "dots",
      dotsOptions: { type: "dots", color: "#059669" },
      cornerSquareOptions: { type: "extra-rounded", color: "#047857" },
      cornerDotOptions: { type: "dot", color: "#065F46" },
      backgroundColor: "#ECFDF5",
    },
  },
  {
    id: "sunset",
    name: "Sunset",
    style: {
      type: "rounded",
      dotsOptions: { type: "rounded", color: "#F59E0B" },
      cornerSquareOptions: { type: "extra-rounded", color: "#D97706" },
      cornerDotOptions: { type: "dot", color: "#B45309" },
      backgroundColor: "#FFFBEB",
    },
  },
  {
    id: "dark",
    name: "Dark Mode",
    style: {
      type: "dots",
      dotsOptions: { type: "dots", color: "#E5E7EB" },
      cornerSquareOptions: { type: "extra-rounded", color: "#F3F4F6" },
      cornerDotOptions: { type: "dot", color: "#F9FAFB" },
      backgroundColor: "#111827",
    },
  },
];

const CustomStyleForm = ({ style, onChange }) => {
  const handleChange = (key, value) => {
    onChange({ ...style, [key]: value });
  };

  const handleNestedChange = (section, key, value) => {
    onChange({
      ...style,
      [section]: { ...style[section], [key]: value },
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Colors</h3>
        <div className="grid grid-cols-1 gap-4">
          <ColorPicker
            label="Background"
            color={style.backgroundColor}
            onChange={(color) => handleChange("backgroundColor", color)}
          />
          <ColorPicker
            label="Dots"
            color={style.dotsOptions.color}
            onChange={(color) =>
              handleNestedChange("dotsOptions", "color", color)
            }
          />
          <ColorPicker
            label="Corner Squares"
            color={style.cornerSquareOptions.color}
            onChange={(color) =>
              handleNestedChange("cornerSquareOptions", "color", color)
            }
          />
          <ColorPicker
            label="Corner Dots"
            color={style.cornerDotOptions.color}
            onChange={(color) =>
              handleNestedChange("cornerDotOptions", "color", color)
            }
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Patterns</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dots Style
            </label>
            <select
              value={style.dotsOptions.type}
              onChange={(e) =>
                handleNestedChange("dotsOptions", "type", e.target.value)
              }
              className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="square">Square</option>
              <option value="dots">Dots</option>
              <option value="rounded">Rounded</option>
              <option value="classy">Classy</option>
              <option value="classy-rounded">Classy Rounded</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Corner Squares Style
            </label>
            <select
              value={style.cornerSquareOptions.type}
              onChange={(e) =>
                handleNestedChange(
                  "cornerSquareOptions",
                  "type",
                  e.target.value
                )
              }
              className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="square">Square</option>
              <option value="dot">Dots</option>
              <option value="extra-rounded">Extra Rounded</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Corner Dots Style
            </label>
            <select
              value={style.cornerDotOptions.type}
              onChange={(e) =>
                handleNestedChange("cornerDotOptions", "type", e.target.value)
              }
              className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="square">Square</option>
              <option value="dot">Dots</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

const QRGenerator = () => {
  const [qrData, setQrData] = useState("");
  const [debouncedQrData, setDebouncedQrData] = useState("");
  const [qrType, setQrType] = useState("text");
  const [selectedPreset, setSelectedPreset] = useState("classic");
  const [qrStyle, setQrStyle] = useState(QRPresets[0].style);
  const [customStyle, setCustomStyle] = useState(false);
  const qrRef = useRef(null);
  const qrCodeRef = useRef(null);
  const debounceTimeout = useRef(null);

  // Debounce the QR data updates
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Only generate QR code if data is not empty and has minimum length based on type
    const shouldGenerateQR = () => {
      switch (qrType) {
        case "url":
          return qrData.length >= 4; // At least "http"
        case "email":
          return qrData.includes("@");
        case "tel":
          return qrData.length >= 6; // Minimum phone number length
        case "wifi":
          return qrData.includes("WIFI:") && qrData.includes(";;");
        default:
          return qrData.length > 0;
      }
    };

    if (shouldGenerateQR()) {
      debounceTimeout.current = setTimeout(() => {
        setDebouncedQrData(qrData);
      }, 500); // 500ms delay
    } else {
      setDebouncedQrData("");
    }

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [qrData, qrType]);

  useEffect(() => {
    if (qrCodeRef.current) {
      qrCodeRef.current.remove();
    }

    if (debouncedQrData) {
      const qr = new QRCodeStyling({
        width: 300,
        height: 300,
        data: debouncedQrData,
        margin: 10,
        qrOptions: {
          errorCorrectionLevel: "Q",
        },
        imageOptions: {
          hideBackgroundDots: true,
          imageSize: 0.4,
          margin: 0,
        },
        ...qrStyle,
      });

      // Clear previous content
      while (qrRef.current.firstChild) {
        qrRef.current.removeChild(qrRef.current.firstChild);
      }

      qr.append(qrRef.current);
      qrCodeRef.current = qrRef.current.querySelector("canvas");
    }
  }, [debouncedQrData, qrStyle]);

  const downloadQR = () => {
    if (qrCodeRef.current) {
      const link = document.createElement("a");
      link.download = `qr-code-${qrType}.png`;
      link.href = qrCodeRef.current.toDataURL();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const shareQR = async () => {
    if (qrCodeRef.current && navigator.share) {
      try {
        const blob = await new Promise((resolve) =>
          qrCodeRef.current.toBlob(resolve)
        );
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

  const handlePresetChange = (presetId) => {
    const preset = QRPresets.find((p) => p.id === presetId);
    if (preset) {
      setSelectedPreset(presetId);
      setQrStyle(preset.style);
      setCustomStyle(false);

      // Force QR code update with new style
      if (qrCodeRef.current) {
        const qr = new QRCodeStyling({
          width: 300,
          height: 300,
          data: debouncedQrData,
          margin: 10,
          qrOptions: {
            errorCorrectionLevel: "Q",
          },
          imageOptions: {
            hideBackgroundDots: true,
            imageSize: 0.4,
            margin: 0,
          },
          ...preset.style,
        });

        // Clear previous content
        while (qrRef.current.firstChild) {
          qrRef.current.removeChild(qrRef.current.firstChild);
        }

        qr.append(qrRef.current);
        qrCodeRef.current = qrRef.current.querySelector("canvas");
      }
    }
  };

  const handleCustomStyleToggle = () => {
    if (!customStyle) {
      // When enabling custom style, use the current preset as starting point
      const preset = QRPresets.find((p) => p.id === selectedPreset);
      if (preset) {
        setQrStyle(preset.style);
      }
    }
    setCustomStyle(!customStyle);
  };

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

  const selectedType = qrTypes.find((type) => type.value === qrType);
  const FormComponent = selectedType?.component;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="grid md:grid-cols-3 gap-8">
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

        {/* Middle Column - Style Options */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <Palette className="w-6 h-6 mr-2 text-blue-500" />
              Style Options
            </h2>

            {/* Preset Styles */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">
                Preset Styles
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {QRPresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetChange(preset.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedPreset === preset.id && !customStyle
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div
                      className="w-full aspect-square rounded-lg mb-2 overflow-hidden"
                      style={{ backgroundColor: preset.style.backgroundColor }}
                    >
                      <div className="w-full h-full grid grid-cols-3 gap-1 p-2">
                        {[...Array(9)].map((_, i) => (
                          <div
                            key={i}
                            className="rounded-sm"
                            style={{
                              backgroundColor:
                                i < 3
                                  ? preset.style.cornerSquareOptions.color
                                  : i === 4
                                  ? preset.style.cornerDotOptions.color
                                  : preset.style.dotsOptions.color,
                              borderRadius:
                                preset.style.dotsOptions.type === "dots"
                                  ? "50%"
                                  : "2px",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {preset.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <button
                onClick={handleCustomStyleToggle}
                className={`w-full p-3 rounded-lg border-2 transition-all ${
                  customStyle
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                }`}
              >
                <span className="text-sm font-medium">Custom Style</span>
              </button>
            </div>

            {customStyle && (
              <div className="space-y-6">
                <CustomStyleForm style={qrStyle} onChange={setQrStyle} />
              </div>
            )}
          </div>
        </div>

        {/* Right Column - QR Code Display */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Generated QR Code
            </h2>
            <div
              className={`flex justify-center items-center bg-gray-50 rounded-lg p-6 ${
                debouncedQrData ? "border-2 border-dashed border-gray-200" : ""
              }`}
              style={{ backgroundColor: qrStyle.backgroundColor }}
            >
              <div ref={qrRef} className="w-full max-w-[300px]">
                {!debouncedQrData && (
                  <div className="flex flex-col items-center text-gray-400">
                    <QrCode className="w-16 h-16 mb-2" />
                    <p>Enter content to generate QR code</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={downloadQR}
                disabled={!debouncedQrData}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Download className="w-5 h-5 mr-2" />
                <span>Download</span>
              </button>
              <button
                onClick={shareQR}
                disabled={!debouncedQrData || !navigator.share}
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
