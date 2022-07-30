/*
 * @Author       : 程哲林
 * @Date         : 2022-07-30 17:26:59
 * @LastEditors  : 程哲林
 * @LastEditTime : 2022-07-30 18:26:31
 * @FilePath     : /bilibili-downloader-desktop/src/components/Player/index.tsx
 * @Description  : 未添加文件描述
 */
import React, { useEffect, useState } from 'react'
import { Box, Backdrop } from '@mui/material'
import DPlayer from 'dplayer'
import { emitter } from '../../utils'
import { useCallback } from 'react'

interface PlayerProps {
  src: string
  pic?: string
  thumbnails?: string
}

let dp: DPlayer | null = null

const Player = React.memo((): JSX.Element => {
  const [{ visible, src, pic, thumbnails }, setPreview] = useState<
    PlayerProps & { visible: boolean }
  >({
    visible: false,
    src: '',
    pic: '',
    thumbnails: '',
  })

  useEffect(() => {
    emitter.on('video-preview', (data: PlayerProps) => {
      setPreview({
        ...data,
        visible: true,
      })
    })
  }, [])

  useEffect(() => {
    if (visible && !dp) {
      dp = new DPlayer({
        container: document.getElementById('j-player'),
        screenshot: true,
        autoplay: true,
        lang: 'zh-cn',
        video: {
          url: src,
          pic,
          thumbnails,
          type: 'flv',
        },
      })
    }

    return () => {
      dp?.destroy()
      dp = null;
    }
  }, [pic, src, thumbnails, visible])

  const onClose = useCallback(() => {
    dp?.pause()
    dp?.destroy()
    dp = null;
    setPreview((ct) => ({ ...ct, visible: false }))
  }, [])

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={visible}
      onClick={onClose}
    >
      <Box maxWidth="70%" maxHeight="80%" width="100vw">
        <div id="j-player"></div>
      </Box>
    </Backdrop>
  )
})

export default Player
