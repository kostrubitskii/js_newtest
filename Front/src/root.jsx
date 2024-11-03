import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { Main } from "./pages/Main/Main";
import { HeroPage } from "./pages/HeroPage/HeroPage";

export const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
        <Route index path="/" element={<Main />} />
        <Route path="/heroes/:id" element={<HeroPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
