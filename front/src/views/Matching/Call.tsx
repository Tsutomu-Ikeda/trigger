import React, { useEffect, useRef } from "react";
import * as Tone from "tone";
import Peer from 'skyway-js';

import AuthRequired from "components/AuthRequired";
import { useParams } from "libs/Url";
import { getMatchingDetail } from "libs/ServerClient";

const peer = new Peer({
  key: "b6b6bf8d-c7d2-4b6a-bba5-cd527c9faa08",
});

export default function Call() {
  const { id: matchingId } = useParams() as { id: string };
  const localVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);
  // const [room, setRoom] = useState(null as any);
  const micAudio = new Tone.UserMedia();
  const matching = getMatchingDetail(matchingId);


  useEffect(() => {
    peer.on("open", () => {

      micAudio.open().then(() => {
        const shifter = new Tone.PitchShift(5);
        const reverb = new Tone.Freeverb();
        const effectedDest = Tone.context.createMediaStreamDestination();
        micAudio.connect(shifter);
        shifter.connect(reverb);
        reverb.connect(effectedDest);

        navigator.mediaDevices.getUserMedia({ video: false, audio: true })
          .then(stream => {

            const oldTrack = stream.getAudioTracks()[0];
            stream.removeTrack(oldTrack);

            const effectedTrack = effectedDest.stream.getAudioTracks()[0];
            stream.addTrack(effectedTrack);

            (localVideo.current as any).srcObject = stream;

            const room = peer.joinRoom(matchingId, { mode: "mesh", stream: (localVideo.current as any).srcObject });

            room.on("stream", async (stream) => {
              (remoteVideo.current as any).srcObject = stream;
            });

            room.on("peerJoin", async (a) => { console.log(a) })
          }).catch(error => {
            console.error('mediaDevice.getUserMedia() error:', error);
            return;
          });
      });
    })
  }, [matchingId, micAudio]);

  return (
    <AuthRequired>
      <div>
        <h3>{matching.speaker.companyName}</h3>
        <div><video width="400px" hidden autoPlay muted playsInline ref={localVideo}></video></div>
        <div>{peer && peer.id}</div>
        <div><video width="400px" autoPlay playsInline ref={remoteVideo}></video></div>
      </div>
    </AuthRequired>
  )
}
