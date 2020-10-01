import React, { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import Peer from 'skyway-js';

import AuthRequired from "components/AuthRequired";
import { useParams } from "libs/Url";
import { getMatchingDetail } from "libs/ServerClient";

const createPeer = () => (new Peer({
  key: "b6b6bf8d-c7d2-4b6a-bba5-cd527c9faa08",
  debug: 3,
}));

export default function Call() {
  const { id: matchingId } = useParams() as { id: string };
  const [myId, setMyId] = useState('')
  const [callId, setCallId] = useState('')
  const localVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);
  const [peer, setPeer] = useState(null as Peer | null);
  const micAudio = new Tone.UserMedia();
  const matching = getMatchingDetail(matchingId);

  useEffect(() => {
    setPeer(createPeer());
  }, []);

  useEffect(
    () => {
      if (navigator.mediaDevices && peer) {
        peer.on('open', () => {
          setMyId(peer.id);
        })

        peer.on('call', mediaConnection => {
          mediaConnection.answer((localVideo.current as any).srcObject)

          mediaConnection.on('stream', async (stream) => {
            (remoteVideo.current as any).srcObject = stream;
          })
        })
      }
    }, [peer]
  )
  micAudio.open().then(() => {
    const shifter = new Tone.PitchShift(5);
    const reverb = new Tone.Freeverb();
    // 加工済みの音声を受け取る空のノードを用意
    const effectedDest = Tone.context.createMediaStreamDestination();
    micAudio.connect(shifter);
    shifter.connect(reverb);
    // リバーブを空のノードに接続
    reverb.connect(effectedDest);

    // カメラ映像取得
    navigator.mediaDevices.getUserMedia({ video: false, audio: true })
      .then(stream => {

        // ストリームから音声トラックを削除
        const oldTrack = stream.getAudioTracks()[0];
        stream.removeTrack(oldTrack);

        // ストリームにエフェクトがかかった音声トラックを追加
        const effectedTrack = effectedDest.stream.getAudioTracks()[0];
        stream.addTrack(effectedTrack);

        (localVideo.current as any).srcObject = stream;
      }).catch(error => {
        // 失敗時にはエラーログを出力
        console.error('mediaDevice.getUserMedia() error:', error);
        return;
      });
  });

  const makeCall = () => {
    if (peer) {
      const mediaConnection = peer.call(callId, (localVideo.current as any).srcObject)
      mediaConnection.on('stream', async (stream) => {
        (remoteVideo.current as any).srcObject = stream
      })
    }
  }
  return (
    <AuthRequired>
      <div>
        <h3>{matching.speaker.companyName}</h3>
        <div><video width="400px" hidden autoPlay muted playsInline ref={localVideo}></video></div>
        <div>{myId}</div>
        <div>
          <input value={callId} onChange={e => setCallId(e.target.value)}></input>
          <button onClick={makeCall}>発信</button>
        </div>
        <div><video width="400px" autoPlay playsInline ref={remoteVideo}></video></div>
      </div>
    </AuthRequired>
  )
}
