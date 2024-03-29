import "./App.css";

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useRouteError,
  useNavigation,
} from "react-router-dom";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Home from "./pages/Home";
import { useNavigate } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import NetworkStatus from "./NetworkStatus";
import UseSessionExpiration from "./Custom hooks/UseSessionExpiration";
import ThemeButton from "./components/ThemeButton";
import { ThemeProvider } from "./contexts/theme.context";
import "./styles/tailwind.css";
import { TasksProvider } from "./contexts/tasksProvider.context";
import { AiOutlineHome } from "react-icons/ai";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

function App() {
  const [themeMode, setThemeMode] = useState("light");
  const darkTheme = () => {
    setThemeMode("dark");
  };

  const lightTheme = () => setThemeMode("light");

  useEffect(() => {
    document
      .querySelector("html")
      .classList.toggle("dark", themeMode === "dark");
    document
      .querySelector("html")
      .classList.toggle("light", themeMode === "light");
  }, [themeMode]);

  const Router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "NetworkStatus",
          element: <NetworkStatus />,
        },
        {
          path: "SignUpPage",
          element: (
            <div>
              <SignUpPage />
              <button style={{ padding: "8px", margin: "8px" }}>
                <Link className="customButton2" to={"/SignInPage"}>Déjà inscrit ?</Link>
              </button>
            </div>
          ),
        },
        {
          path: "SignInPage",
          element: (
            <div>
              <SignInPage />
              <button style={{ padding: "8px", margin: "8px" }}>
                <Link className="customButton2" to={"/SignUpPage"}>s'inscrire</Link>
              </button>
            </div>
          ),
        },
        {
          path: "home",
          element: (
            <div className="row">
              {/* <aside className="col-3">
                            <h2>Menu</h2>
                        </aside> */}
              <main className="col-9">
                <Outlet />
              </main>
            </div>
          ),
          children: [
            {
              path: "",
              element: (
                <div>
                  <Home />
                </div>
              ),
            },
            {
              path: "1/:id",
              element: (
                <div>
                  <Page1 />
                </div>
              ),
              loader: () =>
                fetch("https://jsonplaceholder.typicode.com/posts?_limit=18"),
            },
            {
              path: "2/:id",
              element: (
                <div>
                  <Page2 />
                </div>
              ),
            },
          ],
        },
      ],
    },
  ]);

  function ErrorPage() {
    const error = { message: useRouteError() };
    console.log(error);

    return (
      <>
        <h1> {error.message.data || "erreur inconnue"} </h1>
        <br />
      </>
    );
  }

  function Root() {
    const { state } = useNavigation();
    const navigate = useNavigate();
    const handleLogout = async () => {
      try {
        const userSession = localStorage.getItem("userSession");
        if (userSession) {
          localStorage.removeItem("userSession");
          navigate("/");
        } else {
          console.error("Erreur lors de la déconnexion");
        }
      } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
      }
    };

    var verseHeader = <></>;
    const userSessionState = localStorage.getItem("userSession");
    if (!userSessionState) {
      verseHeader = (
        <header className="header">
          <div className="top_header">
            <NetworkStatus />
            <ThemeButton />
          </div>

          <div>
            <button style={{ padding: "8px", margin: "8px" }}>
              <Link to={"SignInPage"}>S'identifier</Link>
            </button>
          </div>
        </header>
      );
    } else if (userSessionState) {
      verseHeader = (
        <header className="header">
          <div className="top_header">
            <ThemeButton />
            <NetworkStatus />
          </div>

          <div className="bottom_header">
            <Link to="/home">
              <AiOutlineHome title="Delete?" className="icon" />
            </Link>
            <button style={{ padding: "8px", margin: "8px" }}>
              <Link to={"home/1/1"}>Dashboard</Link>
            </button>
            <button style={{ padding: "8px", margin: "8px" }}>
              <Link to={"home/2/1"}>TaskList</Link>
            </button>
            <button onClick={handleLogout}>Déconnexion</button>
          </div>
        </header>
      );
    }
    return (
      <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
        <UseSessionExpiration>
          {verseHeader}
          <div className="container my-4">
            {state === "loading" && "Loading"}

            <Outlet />
          </div>
        </UseSessionExpiration>
      </ThemeProvider>
    );
  }

  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
  });

  return (
    <Provider store={store}>
      <TasksProvider>
        <div className="App">
          <RouterProvider router={Router} />
        </div>
      </TasksProvider>
    </Provider>
  );
}

export default App;
