import "./globals.css";

export const metadata = {
  title: "Mask Detector",
  description: "Face mask detection with TensorFlow.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui" }}>
        {children}
      </body>
    </html>
  );
}
