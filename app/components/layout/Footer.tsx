export default function Footer() {
  return (
    <footer className="sticky bottom-0 z-50 w-full bg-dark border-t border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <p className="text-center text-sm text-white">
          © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
}
