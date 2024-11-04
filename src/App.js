import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { toPng } from "html-to-image";

function App() {
  const [url, setUrl] = useState("");
  const qrRef = useRef();

  const generateQR = () => {
    if (!url) {
      alert("กรุณากรอก URL");
    }
  };

  const copyToClipboard = () => {
    if (qrRef.current) {
      toPng(qrRef.current)
        .then((dataUrl) => {
          fetch(dataUrl)
            .then((res) => res.blob())
            .then((blob) => {
              const item = new ClipboardItem({ "image/png": blob });
              navigator.clipboard
                .write([item])
                .then(() => {
                  alert("QR Code ถูกคัดลอกไปยังคลิปบอร์ดเรียบร้อยแล้ว");
                })
                .catch((err) => {
                  console.error("Error copying image to clipboard", err);
                });
            });
        })
        .catch((err) => {
          console.error("Error generating QR code image", err);
        });
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>QR Code Generator</h1>
      <input
        type="text"
        placeholder="กรอก URL ที่ต้องการ"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ padding: "10px", width: "300px" }}
      />
      <div>
        <button
          onClick={generateQR}
          style={{ margin: "10px", padding: "10px" }}
        >
          แปลงเป็น QR Code
        </button>
        <button
          onClick={copyToClipboard}
          style={{ margin: "10px", padding: "10px" }}
        >
          คัดลอกไปยังคลิปบอร์ด
        </button>
      </div>
      <div ref={qrRef} style={{ marginTop: "20px" }}>
        {url && (
          <QRCodeCanvas
            value={url}
            size={300}
            bgColor="#ffffff"
            fgColor="#000000"
            level="L"
            includeMargin={true}
          />
        )}
      </div>
    </div>
  );
}

export default App;
