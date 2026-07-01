import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-4 gap-8">

          {/* Company Info */}
          <div>

            <h2 className="text-3xl font-bold text-green-500">
              Bushel
            </h2>

            <p className="mt-4 text-gray-400">
              Fresh fruits, juices and healthy meals delivered
              directly to your doorstep every day.
            </p>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-xl font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2">

              <Link to="/">Home</Link>

              <Link to="/plans">
                Plans
              </Link>

              <Link to="/products">
                Products
              </Link>

              <Link to="/login">
                Login
              </Link>

            </div>

          </div>

          {/* Support */}
          <div>

            <h3 className="text-xl font-semibold mb-4">
              Support
            </h3>

            <div className="flex flex-col gap-2">

              <Link to="/faq">
                FAQ
              </Link>

              <Link to="/contact">
                Contact Us
              </Link>

              <Link to="/support">
                Help Center
              </Link>

            </div>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-xl font-semibold mb-4">
              Contact
            </h3>

            <p>Email: support@bushel.com</p>

            <p className="mt-2">
              Phone: +91 9580826129
            </p>

            <p className="mt-2">
              India
            </p>

          </div>

        </div>

        <hr className="my-8 border-gray-700" />

        <div className="flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-400">
            © 2026 Bushel. All Rights Reserved.
          </p>

          <div className="flex gap-5 mt-4 md:mt-0">

            <Link to="/terms">
              Terms
            </Link>

            <Link to="/privacy">
              Privacy
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;