/*
 * @Author       : 程哲林
 * @Date         : 2022-07-28 21:51:06
 * @LastEditors  : 程哲林
 * @LastEditTime : 2022-07-29 22:34:16
 * @FilePath     : /bilibili-downloader-desktop/src/main.tsx
 * @Description  : 未添加文件描述
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { createTheme, ThemeProvider } from '@mui/material/styles'

import Layout from './layout'

import DownloadPage from './pages/download'
import 'normalize.css'
import './index.css'

const theme = createTheme({
  components: {},
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DownloadPage />} />
            <Route path="/download" element={<DownloadPage />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </ThemeProvider>
  </React.StrictMode>
)
