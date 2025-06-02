import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/ScrollToTop'; // 👈 import เพิ่มตรงนี้
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
import ContactPage from './pages/ContactPage';
import RandomMenuPage from './pages/RandomMenuPage';
import PopularMenuPage from './pages/PopularMenuPage';
import ProfilePage from './pages/ProfilePage';
import MenuDetailPage from './pages/MenuDetailPage';
import SearchResultsPage from './pages/SearchResultsPage';
import BmrTdeePage from './pages/BmrTdeePage';
import NotFoundPage from './pages/NotFoundPage';
import { useAuthStore } from './store/authStore';

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    // Check if user is authenticated on app load
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <ScrollToTop /> {/* 👈 ใส่ไว้ด้านนอก <Routes> ก็ทำงานได้ทุกหน้า */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="random-menu" element={<RandomMenuPage />} />
          <Route path="popular-menu" element={<PopularMenuPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="menu/:id" element={<MenuDetailPage />} />
          <Route path="search" element={<SearchResultsPage />} />
          <Route path="bmr-tdee" element={<BmrTdeePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
