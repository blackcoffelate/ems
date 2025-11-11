import { BrowserRouter } from "react-router-dom";
import { AppDataProvider } from "./contexts/AppDataContext";
import ReloadPrompt from "./components/ReloadPrompt";
import { AppRoutes } from "./routes/AppRoutes";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppDataProvider>
        <AppRoutes />
        <ReloadPrompt />
      </AppDataProvider>
    </BrowserRouter>
  );
};

export default App;