import React from 'react'
import { useParams } from 'react-router-dom'

const VideoPage = () => {
    const { courseId, videoId } = useParams();
  return (
    <div>VideoPage: {videoId}</div>
  )
}

export default VideoPage