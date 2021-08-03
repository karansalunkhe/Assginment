import { Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./store/auth-context";
import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/EditUser";
import User from "./components/users/User";
import Calculator from "./pages/Calculator";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/profile">
            <UserProfile />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/users/add">
            <AddUser />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/users/edit/:id">
            <EditUser />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/users/:id">
            <User />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/calculator">
            <Calculator />
          </Route>
        )}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
