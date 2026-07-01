import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OtpLogin from "./pages/OtpLogin";

import Plans from "./pages/Plans";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import RenewPlan from "./pages/RenewPlan";
import MyOrders from "./pages/MyOrders";
import MySubscription from "./pages/MySubscription";

import AdminDashboard from "./pages/AdminDashboard";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import AdminProducts from "./pages/AdminProducts";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Subscriptions from "./pages/Subscriptions";
import Deliveries from "./pages/AdminDeliveries";
import Payments from "./pages/Payments";
import AdminPlans from "./pages/AdminPlans";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";

import PaymentHistory from "./pages/PaymentHistory";
import ManageStaff from "./pages/ManageStaff";

import DeliveryDashboard from "./pages/DeliveryDashboard";
import DeliveryRoute from "./components/DeliveryRoute";

import AssignedDeliveries from "./pages/AssignedDeliveries";
import DeliveryHistory from "./pages/DeliveryHistory";
import SuperAdminRoute from "./routes/SuperAdminRoute";
import MyDeliveries from "./pages/MyDeliveries";


function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/otp-login"
          element={<OtpLogin />}
        />

        <Route
          path="/plans"
          element={<Plans />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/verify-email/:token"
          element={<VerifyEmail />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />


        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />
                {/* ================= USER ROUTES ================= */}
                <Route
  path="/my-deliveries"
  element={
    <ProtectedRoute>
      <MyDeliveries />
    </ProtectedRoute>
  }
/>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
 

        <Route
          path="/my-subscription"
          element={
            <ProtectedRoute>
              <MySubscription />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/renew-plan"
          element={
            <ProtectedRoute>
              <RenewPlan />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order-success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
  path="/payment-history"
  element={
    <ProtectedRoute>
      <PaymentHistory />
    </ProtectedRoute>
  }
/>

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />


        
                {/* ================= ADMIN ROUTES ================= */}
                <Route
  path="/manage-staff"
  element={
    <SuperAdminRoute>
      <ManageStaff />
    </SuperAdminRoute>
  }
/>
<Route
  path="/delivery"
  element={
    <DeliveryRoute>
      <DeliveryDashboard />
    </DeliveryRoute>
  }
/>
<Route
  path="/assigned-deliveries"
  element={
    <DeliveryRoute>
      <AssignedDeliveries />
    </DeliveryRoute>
  }
/>
<Route
  path="/delivery-history"
  element={
    <DeliveryRoute>
      <DeliveryHistory />
    </DeliveryRoute>
  }
/>


        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        

        <Route
          path="/customers"
          element={
            <AdminRoute>
              <Customers />
            </AdminRoute>
          }
        />


        <Route
          path="/orders"
          element={
            <AdminRoute>
              <Orders />
            </AdminRoute>
          }
        />

        <Route
          path="/admin-products"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          }
        />

        <Route
          path="/admin-plans"
          element={
            <AdminRoute>
              <AdminPlans />
            </AdminRoute>
          }
        />

        <Route
          path="/subscriptions"
          element={
            <AdminRoute>
              <Subscriptions />
            </AdminRoute>
          }
        />

        <Route
          path="/deliveries"
          element={
            <AdminRoute>
              <Deliveries />
            </AdminRoute>
          }
        />

        <Route
          path="/payments"
          element={
            <AdminRoute>
              <Payments />
            </AdminRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <AdminRoute>
              <Reports />
            </AdminRoute>
          }
        />

        <Route
  path="/analytics"
  element={
    <SuperAdminRoute>
      <Analytics />
    </SuperAdminRoute>
  }
/>
        
<Route
  path="/settings"
  element={
    <SuperAdminRoute>
      <Settings />
    </SuperAdminRoute>
  }
/>



      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;