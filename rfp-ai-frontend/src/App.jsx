import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchQuestion from "./pages/SearchQuestion";
import BatchQueryProcessing from "./pages/BatchQueryProcessing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/search" element={<SearchQuestion />} />

        <Route path="/batch" element={<BatchQueryProcessing />} />

        <Route path="/signin" element={<SignIn />} />
        
        <Route path="/signup" element={<SignUp />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;