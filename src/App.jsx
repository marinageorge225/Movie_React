import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import RatingForm from "./components/RatingForm";
import Header from "./components/Header";
import Movies from "./components/Movies";
import Slider from "./components/Slider";
import ShowAllReviews from "./components/ShowAllReviews";
import "./styles.css";

function HomePage() {
  return (
    <>
      <Header />
      <Slider />
      <Movies />
      <RatingForm />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/reviews" element={<ShowAllReviews />} />
    </Routes>
  );
}

export default App;
