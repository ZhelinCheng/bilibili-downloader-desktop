/*
 * @Author       : 程哲林
 * @Date         : 2022-07-28 21:51:06
 * @LastEditors  : 程哲林
 * @LastEditTime : 2022-07-29 20:58:47
 * @FilePath     : /bilibili-downloader-desktop/src/main.tsx
 * @Description  : 未添加文件描述
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/index';
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<IndexPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
