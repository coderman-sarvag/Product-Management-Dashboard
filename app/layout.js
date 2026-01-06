import "./globals.css";

export const metadata = {
  title: "Admin Dashboard",
  description: "SSR Admin Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-gray-200">
        {children}
      </body>
    </html>
  );
}
