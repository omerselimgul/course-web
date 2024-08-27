import { useRoutes } from "react-router-dom";
import "./App.css";
import routes from "./Routes/Routes";
import FormManagerContextProvider from "./Context/FormManagerContext";
import { SnackbarProvider } from "notistack";
import AuthProvider from "./Context/AuthContext";
import LoadingSpinnerContextProvider from "./Context/LoadingSpinnerContext";
import FirabaseProvider from "./Context/Firabase/FirabaseContext";
function App() {
  const Router = useRoutes(routes);
  return (
    <SnackbarProvider autoHideDuration={3000}>
      <AuthProvider>
        <FirabaseProvider>
          <LoadingSpinnerContextProvider>
            <FormManagerContextProvider>{Router}</FormManagerContextProvider>
          </LoadingSpinnerContextProvider>
        </FirabaseProvider>
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
