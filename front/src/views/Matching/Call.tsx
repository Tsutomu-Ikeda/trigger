import React, { useEffect, useRef, useState } from "react";
// import * as Tone from "tone";
import Peer from 'skyway-js';

import AuthRequired from "components/AuthRequired";
// import { useParams } from "libs/Url";

const peer = new Peer({
  key: "b6b6bf8d-c7d2-4b6a-bba5-cd527c9faa08",
  debug: 3,
});

export default function Call() {
  const [myId, setMyId] = useState('')
  const [callId, setCallId] = useState('')
  const localVideo = useRef<HTMLVideoElement>(null)
  const remoteVideo = useRef<HTMLVideoElement>(null)

  useEffect(
    () => {
      if (navigator.mediaDevices && localVideo) {
        peer.on('open', () => {
          setMyId(peer.id)
          navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(localStream => {
            (localVideo.current as any).srcObject = localStream
          })
        })

        peer.on('call', mediaConnection => {
          mediaConnection.answer((localVideo.current as any).srcObject)

          mediaConnection.on('stream', async stream => {
            (remoteVideo.current as any).srcObject = stream
          })
        })
      }
    }, [localVideo]
  )

  const makeCall = () => {
    const mediaConnection = peer.call(callId, (localVideo.current as any).srcObject)
    mediaConnection.on('stream', async stream => {
      (remoteVideo.current as any).srcObject = stream
      await (remoteVideo.current as any).play().catch(console.error)
    })
  }
  return (
    <AuthRequired>
      <div>
        <div>skyway test</div>
        <div><video width="400px" autoPlay muted playsInline ref={localVideo}></video></div>
        <div>{myId}</div>
        <div>
          <input value={callId} onChange={e => setCallId(e.target.value)}></input>
          <button onClick={makeCall}>発信</button>
        </div>
        <div><video width="400px" autoPlay muted playsInline ref={remoteVideo}></video></div>
      </div>
    </AuthRequired>
  )
}
