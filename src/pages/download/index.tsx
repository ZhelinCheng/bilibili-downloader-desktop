/*
 * @Author       : 程哲林
 * @Date         : 2022-07-29 20:52:17
 * @LastEditors  : 程哲林
 * @LastEditTime : 2022-07-30 19:20:07
 * @FilePath     : /bilibili-downloader-desktop/src/pages/download/index.tsx
 * @Description  : 未添加文件描述
 */
import React, { useState, useRef, useCallback } from 'react'
import {
  Grid,
  Paper,
  InputBase,
  Divider,
  IconButton,
} from '@mui/material'
// import Button from '@mui/material/Button'
// import HttpIcon from '@mui/icons-material/Http'
// import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import LinkIcon from '@mui/icons-material/Link'
import SearchIcon from '@mui/icons-material/Search'
import AvatarCard from '../../components/AvatarCard'
// import DirectionsIcon from '@mui/icons-material/Directions';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated'
import styles from './index.module.scss'
import WorkCard from '../../components/Card'
import { emitter } from '../../utils'

const DownloadLinkInput = React.memo((): JSX.Element => {

  const inputRef = useRef<HTMLInputElement>(null)

  const onSubmit = useCallback(() => {
    const url = inputRef.current?.value

    if (/^https:\/\/.*\.bilibili\.com/.test(url)) {
      console.log(url)
    } else {
      emitter.emit('toast', {
        message: '请输入正确的B站视频/UP主页链接',
        type: "warning",
      })
    }
  }, [])

  return (
    <>
      <Paper
        elevation={0}
        square
        className={styles['d-input']}
        variant="outlined"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="menu">
          <LinkIcon />
        </IconButton>
        <InputBase
          autoFocus
          /* onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setUrl(e.target.value)
        }}
        value={url} */
          inputRef={inputRef}
          sx={{ ml: 1, flex: 1 }}
          placeholder="请输入UP主页/投稿地址"
          inputProps={{ 'aria-label': '请输入UP主页/投稿地址' }}
        />
        <IconButton onClick={onSubmit} sx={{ p: '10px' }} aria-label="搜索资源">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="下载到本地">
          <BrowserUpdatedIcon />
        </IconButton>
      </Paper>
    </>
  )
})

const DownloadPage = React.memo((): JSX.Element => {
  return (
    <div className={styles.main}>
      <DownloadLinkInput />
      <AvatarCard />
      <Grid container rowSpacing={2} spacing={1}>
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <WorkCard
            onPreview={() => {
              emitter.emit('video-preview', {
                src: 'https://store.zhelin.me/static/2022/1659172997_490771777.flv',
                pic: '',
                thumbnails: '',
              })
            }}
            loading={false}
            item={{
              src: 'https://store.zhelin.me/static/2022/1659161932_c904f6362c034718960088d986a90b267269663d.jpg@672w_378h_1c.webp',
              title: '【欣子】Calc.｜看一眼就出不去啦( • •  )‥♡',
              // views: '396 k views',
              createdAt: 'a week ago',
              clarity: '1080p',
            }}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <WorkCard
            loading={true}
            item={{
              src: 'https://store.zhelin.me/static/2022/1659161932_c904f6362c034718960088d986a90b267269663d.jpg@672w_378h_1c.webp',
              title: '【欣子】Calc.｜看一眼就出不去啦( • •  )‥♡',
              // views: '396 k views',
              createdAt: 'a week ago',
              clarity: '1080p',
            }}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <WorkCard
            loading={true}
            item={{
              src: 'https://store.zhelin.me/static/2022/1659161932_c904f6362c034718960088d986a90b267269663d.jpg@672w_378h_1c.webp',
              title: '【欣子】Calc.｜看一眼就出不去啦( • •  )‥♡',
              // views: '396 k views',
              createdAt: 'a week ago',
              clarity: '1080p',
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
})

export default DownloadPage
