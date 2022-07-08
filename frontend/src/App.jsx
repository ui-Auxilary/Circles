import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router, Route,
  Routes,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "config/theme";
import PageLoading from "./components/PageLoading";
import Auth from "./pages/Auth";
import CourseSelector from "./pages/CourseSelector";
import DegreeWizard from "./pages/DegreeWizard";
import GraphicalSelector from "./pages/GraphicalSelector";
import PageNotFound from "./pages/PageNotFound";
import ProgressionChecker from "./pages/ProgressionChecker";
import TermPlanner from "./pages/TermPlanner";
import "./App.less";
import "./config/axios";

const App = () => {
  const [loading, setLoading] = useState(true);
  const { theme } = useSelector((state) => state.settings);

  const [userObject, setUserObject] = useState({});

  const handleCallbackResponse = (response) => {
    const jwt = response.credential;
    // if (requestLogin(jwt).err) {
    //   console.log("failed: ", jwt)
    //   return;
    // }
    console.log("callBackResponse with jwt: ", jwt);
    // Should now decode own jwt - let the BE `/auth/login` route do it
    // decode own just for show rn
    setUserObject(jwt);

    return jwt;
  };

  useEffect(() => {
    // initialise theme
    document.body.classList.add(theme);
    document.body.classList.remove(theme === "light" ? "dark" : "light");

    /* global google */
    google.accounts.id.initialize({
      client_id: "1017197944285-i4ov50aak72667j31tuieffd8o2vd5md.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.prompt();
  }, [theme]);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Router>
        {loading ? (
          <PageLoading setLoading={setLoading} />
        ) : (
          <Routes>
            <Route path="/degree-wizard" element={<DegreeWizard />} />
            <Route
              path="/course-selector"
              element={<CourseSelector />}
            />
            <Route
              path="/graphical-selector"
              element={<GraphicalSelector />}
            />
            <Route
              path="/term-planner"
              element={<TermPlanner />}
            />
            <Route
              path="/progression-checker"
              element={<ProgressionChecker />}
            />
            <Route
              path="/login"
              element={(
                <Auth
                  userObject={userObject}
                  setUserObject={setUserObject}
                />
              )}
            />
            <Route
              path="*"
              element={<PageNotFound />}
            />
          </Routes>
        )}
      </Router>
    </ThemeProvider>
  );
};

export default App;
