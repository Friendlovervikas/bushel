import { useAuth } from "../context/AuthContext";

import {
  downloadOrdersReport,
  downloadPaymentsReport,
  downloadCustomersReport,
  downloadProductsReport,
  downloadSubscriptionsReport,
} from "../services/reportService";

function Reports() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const downloadFile = (
    blob,
    filename
  ) => {
    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download = filename;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);
  };

  const handleOrders = async () => {
    try {
      const blob =
        await downloadOrdersReport(
          user.token
        );

      downloadFile(
        blob,
        "orders-report.pdf"
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayments = async () => {
    try {
      const blob =
        await downloadPaymentsReport(
          user.token
        );

      downloadFile(
        blob,
        "payments-report.pdf"
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleCustomers = async () => {
    try {
      const blob =
        await downloadCustomersReport(
          user.token
        );

      downloadFile(
        blob,
        "customers-report.pdf"
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleProducts = async () => {
    try {
      const blob =
        await downloadProductsReport(
          user.token
        );

      downloadFile(
        blob,
        "products-report.pdf"
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubscriptions =
    async () => {
      try {
        const blob =
          await downloadSubscriptionsReport(
            user.token
          );

        downloadFile(
          blob,
          "subscriptions-report.pdf"
        );
      } catch (error) {
        console.log(error);
      }
    };
      return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Reports
        </h1>

        <div className="bg-white rounded-xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">
            Download PDF Reports
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

           {isAdmin && (
  <button
    onClick={handleOrders}
    className="bg-green-600 text-white py-4 rounded-lg hover:bg-green-700"
  >
    📦 Orders Report
  </button>
)}

            <button
              onClick={handlePayments}
              className="bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700"
            >
              💳 Payments Report
            </button>

            <button
              onClick={handleCustomers}
              className="bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700"
            >
              👥 Customers Report
            </button>

            <button
              onClick={handleProducts}
              className="bg-orange-600 text-white py-4 rounded-lg hover:bg-orange-700"
            >
              🥬 Products Report
            </button>

            <button
              onClick={handleSubscriptions}
              className="bg-red-600 text-white py-4 rounded-lg hover:bg-red-700 md:col-span-2"
            >
              📅 Subscriptions Report
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Reports;