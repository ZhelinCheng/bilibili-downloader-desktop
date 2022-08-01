/*
 * @Author       : 程哲林
 * @Date         : 2022-07-30 17:26:59
 * @LastEditors  : 程哲林
 * @LastEditTime : 2022-08-01 22:12:59
 * @FilePath     : /bilibili-downloader-desktop/src/components/Player/index.tsx
 * @Description  : 未添加文件描述
 */
import React, { useEffect, useState } from 'react'
import { Box, Backdrop, Stack } from '@mui/material'
import DPlayer from 'dplayer'
import cx from 'classnames'
import { emitter } from '../../utils'
import { useCallback } from 'react'
import styles from './index.module.scss'

interface PlayerProps {
  pic: string
  quality: any
  url: any
  size: any
  title: string
  width: number
  height: number
}

let dp: DPlayer | null = null

const Player = React.memo((): JSX.Element => {
  const [preview, setPreview] = useState<{
    visible: boolean
    items: PlayerProps[]
    index: number
  }>({
    visible: false,
    items: [],
    index: 0,
  })

  useEffect(() => {
    emitter.on('video-preview', (items: PlayerProps[]) => {
      setPreview({
        index: 0,
        items,
        visible: true,
      })
    })
  }, [])

  useEffect(() => {
    const { visible, index, items } = preview
    if (visible && !dp) {
      const item = items[index]
      dp = new DPlayer({
        container: document.getElementById('j-player'),
        autoplay: true,
        airplay: false,
        lang: 'zh-cn',
        video: {
          url: item.url,
          pic: '',
          thumbnails: '',
          // type: 'flv',
        },
      })
    }

    return () => {
      dp?.destroy()
      dp = null
    }
  }, [preview])

  const onClose = useCallback((e: React.UIEvent) => {
    if (e.target === e.currentTarget && typeof onClose === 'function') {
      dp?.pause()
      dp?.destroy()
      dp = null
      setPreview((ct) => ({ ...ct, visible: false }))
    }
  }, [])

  const { items, index } = preview
  const { width, height } = items[index] || { width: 0, height: 0 }

  return (
    <Backdrop
      className={styles['com-player']}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={preview.visible}
      onClick={onClose}
    >
      <Box
        width={`${width}px`}
        height={`${height}px`}
        className={styles['player']}
      >
        <div id="j-player"></div>
      </Box>
      <Stack className={styles.panel} direction="row" spacing={2}>
        {items.map(({ pic, title }, idx) => {
          return (
            <Box
              className={cx(styles.item, {
                [styles.active]: index === idx,
              })}
              key={pic || title}
            >
              <img src={pic} alt={title} />
            </Box>
          )
        })}
      </Stack>
    </Backdrop>
  )
})

export default Player
