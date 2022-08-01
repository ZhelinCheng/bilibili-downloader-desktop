/*
 * @Author       : 程哲林
 * @Date         : 2022-07-29 20:52:17
 * @LastEditors  : 程哲林
 * @LastEditTime : 2022-08-01 20:21:27
 * @FilePath     : /bilibili-downloader-desktop/src/pages/download/index.tsx
 * @Description  : 未添加文件描述
 */
import React, { useRef, useCallback } from 'react'
import {
  Box,
  Grid,
  Paper,
  InputBase,
  Divider,
  IconButton,
  Pagination,
} from '@mui/material'
import LinkIcon from '@mui/icons-material/Link'
import SearchIcon from '@mui/icons-material/Search'
import AvatarCard from '../../components/AvatarCard'
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated'
import styles from './index.module.scss'
import WorkCard from '../../components/Card'
import { emitter } from '../../utils'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {
  getUpInfo,
  getVideoItems,
  VideoItemsRes,
  UpInfoBase,
} from '../../api/download'

import 'dayjs/locale/zh-cn'

interface PageData {
  videos: VideoItemsRes
  up: UpInfoBase
  mid: string
}

interface DownloadLinkInputProps {
  onChange: (data: PageData) => void
}

dayjs.extend(relativeTime)

async function getVideos(mid: string, page = 1): Promise<PageData> {
  const [videoItems, upInfo] = await Promise.all([
    getVideoItems(mid, page),
    getUpInfo(mid),
  ])
  return {
    videos: videoItems,
    up: upInfo,
    mid,
  }
}

const DownloadLinkInput = React.memo(
  ({ onChange }: DownloadLinkInputProps): JSX.Element => {
    const inputRef = useRef<HTMLInputElement>(null)

    const onSubmit = useCallback(async () => {
      const url = inputRef.current?.value || ''
      if (/^https:\/\/.*\.bilibili\.com/.test(url)) {
        const midExec = /\.com\/(?<mid>\d+)\/?/.exec(url)
        if (midExec && midExec?.groups?.mid) {
          const mid = midExec.groups.mid
          const data = await getVideos(mid)
          onChange(data)
        }
      } else {
        emitter.emit('toast', {
          message: '请输入正确的B站视频/UP主页链接',
          type: 'warning',
        })
      }
    }, [onChange])

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
          <IconButton
            onClick={onSubmit}
            sx={{ p: '10px' }}
            aria-label="搜索资源"
          >
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            color="primary"
            sx={{ p: '10px' }}
            aria-label="下载到本地"
          >
            <BrowserUpdatedIcon />
          </IconButton>
        </Paper>
      </>
    )
  }
)

const DownloadPage = React.memo((): JSX.Element => {
  const [{ up, videos, mid }, setPageInfo] = React.useState<
    PageData & {
      loading: boolean
    }
  >({
    mid: '',
    up: {
      mid: '',
      name: '',
      face: '',
      play: 0,
      likes: 0,
      sign: '',
    },
    videos: {
      items: [],
      page: 0,
      count: 0,
      limit: 0,
      status: 1,
    },
    loading: true,
  })

  console.log(videos)
  // https://space.bilibili.com/106652681/video

  const pageCount = Math.ceil(videos.count / videos.limit)

  return (
    <div className={styles.main}>
      <DownloadLinkInput
        onChange={(data: PageData) => {
          setPageInfo({
            ...data,
            loading: false,
          })
        }}
      />
      <AvatarCard {...up} works={videos.count} />
      <Grid container rowSpacing={2} spacing={1}>
        {videos.items.map(({ bvid, length, aid, pic, title, created, play }) => {
          return (
            <Grid key={bvid} item xs={6} sm={4} md={3} lg={2}>
              <WorkCard
                onPreview={() => {
                  /* emitter.emit('video-preview', {
                    src: 'https://store.zhelin.me/static/2022/1659172997_490771777.flv',
                    pic: '',
                    thumbnails: '',
                  }) */
                }}
                bvid={bvid}
                loading
                item={{
                  src: pic,
                  title,
                  length,
                  views: play,
                  createdAt: dayjs(created * 1000).toNow(true),
                  clarity: '1080p',
                }}
              />
            </Grid>
          )
        })}
      </Grid>
      {pageCount > 1 ? (
        <Box className={styles['d-pager']} display="flex">
          <Pagination
            showFirstButton
            showLastButton
            count={pageCount}
            size="small"
            onChange={async (_ev, page: number) => {
              const data = await getVideos(mid, page)
              setPageInfo({ ...data, loading: false })
            }}
          />
        </Box>
      ) : null}
    </div>
  )
})

export default DownloadPage
