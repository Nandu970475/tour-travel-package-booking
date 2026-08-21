import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import TourDetails from "./Pages/TourDetails";
import Payment from "./Pages/Payment";
import Register from "./Pages/Register";
import Tours from "./Pages/Tours";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import BookingForm from "./components/BookingForm";
import PaymentDetails from "./Pages/PaymentDetails";
import MyBookings from "./components/MyBookings";
import PaymentSuccess from "./Pages/PaymentSuccess";
import Login from "./pages/Login";
import Wishlist from "./Pages/Wishlist";
import Gallery from "./pages/Gallery";
import CategoryTours from "./Pages/CategoryTours";

// Admin Pages
import AdminLogin from "./Pages/AdminLogin";
import AdminDashboard from "./Pages/AdminDashboard";
import AddTour from "./Pages/AddTour";
import ViewTours from "./Pages/ViewTours";
import EditTour from "./Pages/EditTour";
import DeleteTour from "./Pages/DeleteTour";
import ViewBookings from "./Pages/ViewBookings";
import RegisteredUsers from "./Pages/RegisteredUsers";
import Categories from "./components/Categories";
function App() {
  return (
    <Routes>
      {/* User Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/tour/:id" element={<TourDetails />} />
      <Route path="/booking" element={<BookingForm />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/gallery/:id" element={<Gallery />} />
     <Route path="/categories" element={<Categories />} />
     <Route
  path="/category/:category"
  element={<CategoryTours />}
/>

<Route path="/payment-details" element={<PaymentDetails />} />
<Route path="/payment-success" element={<PaymentSuccess />} />
<Route path="/mybookings" element={<MyBookings />} />
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/addtour" element={<AddTour />} />
      <Route path="/viewtours" element={<ViewTours />} />
      <Route path="/edittour" element={<EditTour />} />
      <Route path="/deletetour" element={<DeleteTour />} />
      <Route path="/bookings" element={<ViewBookings />} />
      <Route path="/users" element={<RegisteredUsers />} />
    </Routes>
  );
}

export default App;