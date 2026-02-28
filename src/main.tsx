import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom' // 추가
import './index.css'
import App from './App.tsx'
import DetailPage from './contant/DetailPage.tsx' // 상세 페이지 컴포넌트 (새로 만들어야 함)
import RootLayout from './contant/layout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes >
        <Route element={<RootLayout />}>
          <Route path="/" element={<App />} />
          {/* 상세 페이지 (:id는 동적 파라미터입니다) */}
          <Route path="/detail/:id" element={<DetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)