/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  ChevronUp,
  Mic,
  MicOff,
  Settings,
  Video,
  VideoOff,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type PermissionState = 'idle' | 'requesting' | 'granted' | 'denied' | 'error';

export function WebcamPreview() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [permissionState, setPermissionState] =
    useState<PermissionState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  // const { setItem } = useLocalStorage();
  const [selectedVideoDeviceId, setSelectedVideoDeviceId] = useState<
    string | null
  >(null);
  const [selectedAudioDeviceId, setSelectedAudioDeviceId] = useState<
    string | null
  >(null);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [showVideoDeviceList, setShowVideoDeviceList] = useState(false);
  const [showAudioDeviceList, setShowAudioDeviceList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const audioBgState = audioEnabled
    ? 'bg-gray-200 hover:bg-gray-300'
    : 'bg-red-500 hover:bg-red-600';
  const videoBgState = videoEnabled
    ? 'bg-gray-200 hover:bg-gray-300'
    : 'bg-red-500 hover:bg-red-600';

  async function requestPermissions(
    videoDeviceId?: string,
    audioDeviceId?: string
  ) {
    setErrorMessage(null);
    setIsLoading(true);
    setPermissionState('requesting');

    const constraints: MediaStreamConstraints = {
      video: videoDeviceId
        ? { deviceId: { exact: videoDeviceId } }
        : { facingMode: 'user' },
      audio: audioDeviceId
        ? { deviceId: { exact: audioDeviceId } }
        : { facingMode: 'user' },
    };

    try {
      const s = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(s);
      setPermissionState('granted');
      setIsLoading(false);
      setErrorMessage(null);

      if (videoRef.current) {
        videoRef.current.srcObject = s;
        await videoRef.current.play().catch(() => {});
      }

      await enumerateVideoDevices();
    } catch (err: any) {
      console.error('getUserMedia error:', err);
      setIsLoading(false);
      setStream(null);
      if (
        err?.name === 'NotAllowedError' ||
        err?.message?.includes('permission')
      ) {
        setPermissionState('denied');
        setErrorMessage(
          'Permissões negadas. Ative a câmera/microfone nas configurações do navegador.'
        );
      } else if (err?.name === 'NotFoundError') {
        setPermissionState('error');
        setErrorMessage('Nenhuma câmera encontrada neste dispositivo.');
      } else {
        setPermissionState('error');
        setErrorMessage('Erro ao acessar câmera/microfone.');
      }
    }
  }

  async function enumerateVideoDevices() {
    try {
      const list = await navigator.mediaDevices.enumerateDevices();
      const videoInput = list.filter(d => d.kind === 'videoinput');
      const audioInput = list.filter(d => d.kind === 'audioinput');
      setDevices(list);

      if (!selectedVideoDeviceId && videoInput.length > 0) {
        handleSelectVideoDevice(videoInput[0].deviceId);
      }
      if (!selectedAudioDeviceId && audioInput.length > 0) {
        handleSelectAudioDevice(audioInput[0].deviceId);
      }
    } catch (err) {
      console.warn('enumerateDevices failed', err);
    }
  }

  function toggleVideo(enabled?: boolean) {
    const newVal = enabled === undefined ? !videoEnabled : enabled;
    setVideoEnabled(newVal);
    stream?.getVideoTracks().forEach(t => (t.enabled = newVal));
  }

  function toggleAudio(enabled?: boolean) {
    const newVal = enabled === undefined ? !audioEnabled : enabled;
    setAudioEnabled(newVal);
    stream?.getAudioTracks().forEach(t => (t.enabled = newVal));
  }

  function stopStream() {
    stream?.getTracks().forEach(t => {
      try {
        t.stop();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {}
    });
    setStream(null);
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }

  function toggleShowVideoDeviceList(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setShowAudioDeviceList(false);
    setShowVideoDeviceList(!showVideoDeviceList);
  }

  function toggleShowAudioDeviceList(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setShowVideoDeviceList(false);
    setShowAudioDeviceList(!showAudioDeviceList);
  }

  function handleSelectVideoDevice(deviceId: string | null) {
    // setItem(LocalStorageKeys.VIDEO_DEVICE_ID, String(deviceId));
    setSelectedVideoDeviceId(deviceId);
    setShowVideoDeviceList(false);
  }

  function handleSelectAudioDevice(deviceId: string | null) {
    // setItem(LocalStorageKeys.AUDIO_DEVICE_ID, String(deviceId));
    setSelectedAudioDeviceId(deviceId);
    setShowAudioDeviceList(false);
  }

  useEffect(() => {
    if (!selectedVideoDeviceId || !selectedAudioDeviceId) return;

    (async () => {
      stopStream();
      await requestPermissions(selectedVideoDeviceId, selectedAudioDeviceId);
    })();
  }, [selectedVideoDeviceId, selectedAudioDeviceId]);

  useEffect(() => {
    enumerateVideoDevices();

    return () => stopStream();
  }, []);

  useEffect(() => {
    if (!stream) return;
    if (videoRef.current && videoRef.current.srcObject !== stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(() => {});
    }
  }, [stream]);

  return (
    <div className="mx-auto lg:w-[456px] rounded-lg bg-white shadow">
      <div className="relative h-[340px] lg:w-[456px]">
        <video
          ref={videoRef}
          className="h-[340px] lg:w-[456px] rounded bg-black object-cover"
          playsInline
          muted
          autoPlay
        />
        {!stream && (
          <div className="absolute inset-0 flex flex-col lg:w-[456px] items-center justify-center p-4 text-center">
            {permissionState === 'denied' ? (
              <div>
                <p className="mb-2 text-sm text-red-600">Permissões negadas.</p>
                <p className="mb-3 text-xs text-gray-500">
                  Ative câmera/microfone nas configurações do navegador.
                </p>
                <button
                  onClick={() =>
                    requestPermissions(selectedVideoDeviceId ?? undefined)
                  }
                  className="rounded bg-[#fc4c02] px-3 py-2 text-white"
                >
                  Tentar novamente
                </button>
              </div>
            ) : permissionState === 'error' ? (
              <div>
                <p className="mb-2 text-sm text-red-600">{errorMessage}</p>
                <button
                  onClick={() =>
                    requestPermissions(selectedVideoDeviceId ?? undefined)
                  }
                  className="px-3 py-2 text-white rounded bg-amber-500"
                >
                  Tentar novamente
                </button>
              </div>
            ) : isLoading ? (
              <p className="text-sm text-gray-500">Carregando câmera…</p>
            ) : (
              <div>
                <p className="mb-2 text-sm text-gray-500">
                  Nenhuma pré-visualização
                </p>
                <p className="text-xs text-gray-400">
                  Clique em “Solicitar permissões” para ativar.
                </p>
              </div>
            )}
          </div>
        )}
        <div className="absolute bottom-[-17px] z-10 flex w-full items-center justify-center gap-2 p-1">
          <div
            className={`absolute top-[-80px] flex flex-col gap-3 rounded-lg bg-white p-2 ${showAudioDeviceList ? 'block' : 'hidden'}`}
          >
            <div>
              <label className="block mb-1 text-sm">Microfone</label>
              <select
                className="w-full px-2 py-1 border rounded"
                value={selectedAudioDeviceId ?? ''}
                onChange={e => handleSelectAudioDevice(e.target.value || null)}
              >
                <option value="">(Padrão)</option>
                {devices
                  .filter(devc => devc.kind === 'audioinput')
                  .map(d => (
                    <option key={d.deviceId} value={d.deviceId}>
                      {d.label || `Câmera ${d.deviceId.slice(-4)}`}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div
            className={`absolute top-[-80px] flex flex-col gap-3 rounded-lg bg-white p-2 ${showVideoDeviceList ? 'block' : 'hidden'}`}
          >
            <div>
              <label className="block mb-1 text-sm">Câmera</label>
              <select
                className="w-full px-2 py-1 border rounded"
                value={selectedVideoDeviceId ?? ''}
                onChange={e => handleSelectVideoDevice(e.target.value || null)}
              >
                <option value="">(Padrão)</option>
                {devices
                  .filter(devc => devc.kind === 'videoinput')
                  .map(d => (
                    <option key={d.deviceId} value={d.deviceId}>
                      {d.label || `Câmera ${d.deviceId.slice(-4)}`}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div
            className={`flex cursor-pointer rounded-xl ${audioBgState} p-1`}
            onClick={() => toggleAudio()}
          >
            {audioEnabled ? (
              <Mic color="#1F2937" size={20} />
            ) : (
              <MicOff color="#FFFFFF" size={20} />
            )}
            <button
              className={`rounded-xl ${audioBgState} p-1`}
              onClick={toggleShowAudioDeviceList}
              type="button"
            >
              <ChevronUp size={10} />
            </button>
          </div>
          <div
            className={`flex cursor-pointer rounded-xl ${videoBgState} p-1`}
            onClick={() => toggleVideo()}
          >
            {videoEnabled ? (
              <Video color="#1F2937" size={20} />
            ) : (
              <VideoOff color="#FFFFFF" size={20} />
            )}
            <button
              className={`rounded-xl ${videoBgState} p-1`}
              onClick={toggleShowVideoDeviceList}
              type="button"
            >
              <ChevronUp size={10} />
            </button>
          </div>
          <button
            className="p-1 bg-gray-200 rounded-xl hover:bg-gray-300"
            title="Solicitar permissões"
            type="button"
            onClick={() =>
              requestPermissions(selectedVideoDeviceId ?? undefined)
            }
          >
            <Settings color="#1F2937" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
