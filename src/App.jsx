import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Results from "./pages/Results.jsx";
import Quiz from "./pages/Quiz.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

// CREATED-BY: PRASHANT SINGH
// EMAIL: PRASHANT1832002@GMAIL.COM, PRASHAANTXZ@GMAIL.COM
