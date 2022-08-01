import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import { Button, Chip, Stack } from '@mui/material'
import Download from '@mui/icons-material/Download'
import FourKIcon from '@mui/icons-material/FourK'
import styles from './index.module.scss'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt'
import { emitter } from '../../utils'
import { getVideoUrls } from '../../api/download'

interface MediaProps {
  loading?: boolean
  bvid: string
  onPreview?: () => void
  onDownload?: () => void
  onSubscribe?: () => void
  item: {
    src: string
    title: string
    clarity?: string
    length?: string
    views: number
    createdAt: string
  }
}

const SkeletonMedia = () => {
  return (
    <Box sx={{ marginRight: 0.5 }}>
      <Skeleton
        variant="rectangular"
        sx={{ width: '100%', height: 118, aspectRatio: 210 / 118 }}
      />
      <Box sx={{ pt: 0.5 }}>
        <Skeleton />
        <Skeleton />
        <Skeleton width="60%" />
        <Skeleton />
      </Box>
    </Box>
  )
}

async function videoPreview(bvid: string) {
  const videosUrl = await getVideoUrls(bvid, true)
  emitter.emit('video-preview', videosUrl)
}

function WorkMedia({
  loading = false,
  item,
  bvid,
  onDownload,
  onPreview,
  onSubscribe,
}: MediaProps) {
  if (!loading) {
    return <SkeletonMedia />
  }

  return (
    <Box className={styles['m-card']}>
      <Box marginBottom={'8px'} position="relative" className={styles.img}>
        <img alt={item.title} src={item.src} />
        <Chip
          color="primary"
          icon={<FourKIcon />}
          size="small"
          label={item.clarity || item.length}
          className={styles.chip}
        />
      </Box>
      <Box>
        <Typography noWrap gutterBottom variant="body2">
          {item.title}
        </Typography>
        {/* <Typography variant="caption" color="text.secondary">
          37度的天也阻挡不了满满的元气！
        </Typography> */}
        <Typography display="block" variant="caption" color="text.secondary">
          {item.views} views · {item.createdAt}
        </Typography>
        <Stack
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          direction="row"
        >
          <Button
            onClick={() => {
              videoPreview(bvid)
              onPreview && onPreview()
            }}
            size="small"
            variant="text"
            endIcon={<PlayArrowIcon />}
          >
            预览
          </Button>
          <Button
            onClick={onDownload}
            size="small"
            variant="text"
            endIcon={<Download />}
          >
            下载
          </Button>
          <Button
            onClick={onSubscribe}
            color="error"
            size="small"
            variant="text"
            endIcon={<DoDisturbAltIcon />}
          >
            忽略
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default WorkMedia
