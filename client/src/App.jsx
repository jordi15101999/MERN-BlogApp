import "./index.css";
import useAuth from "./hooks/useAuth";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import ArticlePage from "./pages/article";
import NotFound from "./components/NotFound";
import DashboardPage from "./pages/dashboard";
import NewArticleView from "./views/dashboard/NewArticle";
import MyArticlesView from "./views/dashboard/MyArticles";
import EditArticleView from "./views/dashboard/EditArticleView";
import ProfileView from "./views/dashboard/Profile";
import LayoutDashboard from "./views/dashboard/layout";

const DashboardRoutes = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();

  // Protect the /dashboard route
  if (!isAuthenticated) {
    return navigate("/login");
  }

  return (
    <Routes>
      <Route path="/" element={<LayoutDashboard />}>
        <Route index element={<DashboardPage />} />
        <Route path="newArticle" element={<NewArticleView />} />
        <Route path="myArticles" element={<MyArticlesView />} />
        <Route
          path="myArticles/:articleId/edit"
          element={<EditArticleView />}
        />
        <Route path="profile/:email" element={<ProfileView />} />
      </Route>
    </Routes>
  );
};

function App() {
  const isAuthenticated = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {isAuthenticated ? (
          // If authenticated, redirect /login and /register to /dashboard
          <>
            <Route path="/login" element={<Navigate to="/dashboard" />} />
            <Route path="/register" element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          // If not authenticated, allow access to /login and /register
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </>
        )}
        <Route path="/article/:articleId" element={<ArticlePage />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
