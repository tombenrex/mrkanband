// src/components/layout/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 w-full text-center flex justify-center text-sm">
      <p>&copy; {new Date().getFullYear()} My Company. All rights reserved.</p>
    </footer>
  );
}
