'use client'
import { io } from 'socket.io-client'
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Peer from 'peerjs';
import { FiVideo, FiVideoOff, FiMic, FiMicOff, FiPhoneOff } from "react-icons/fi";

const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`);

const Page = (params) => {
    const router = useRouter();
    const [myId, setMyId] = useState('');
    const [remoteId, setRemoteId] = useState('');
    const myVideo = useRef();
    const remoteVideo = useRef();
    const peerInstance = useRef();
    const [isSoundOn, setIsSoundOn] = useState(true);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [inCall, setInCall] = useState(false);
    const localStream = useRef();
    const currentCall = useRef();

    useEffect(() => {
        const peer = new Peer(undefined, {
            host: '/',
            port: '3001',
            path: '/peerjs',
        });

        peer.on('open', (id) => {
            setMyId(id);
            socket.emit('join-room', 'room-id', id);
        });

        peer.on('call', (call) => {
            navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            }).then((stream) => {
                localStream.current = stream;
                myVideo.current.srcObject = stream;
                call.answer(stream);
                currentCall.current = call;
                setInCall(true);
                call.on('stream', (remoteStream) => {
                    remoteVideo.current.srcObject = remoteStream;
                });
            });
        });

        socket.on('user-connected', (userId) => {
            setRemoteId(userId);
        });

        socket.on('user-disconnected', (userId) => {
            setRemoteId('');
        });

        peerInstance.current = peer;
    }, []);

    const callRemotePeer = () => {
        if (!peerInstance.current) {
            console.error('Peer instance is not defined');
            return;
        }

        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        }).then((stream) => {
            localStream.current = stream;
            myVideo.current.srcObject = stream;
            const call = peerInstance.current.call(remoteId, stream);
            currentCall.current = call;
            setInCall(true);
            call.on('stream', (remoteStream) => {
                remoteVideo.current.srcObject = remoteStream;
            });
        }).catch((error) => {
            console.error('Error accessing media devices.', error);
        });
    };

    const toggleCamera = () => {
        if (localStream.current) {
            localStream.current.getVideoTracks().forEach(track => track.enabled = !track.enabled);
            setIsVideoOn(prev => !prev);
        }
    };

    const toggleMic = () => {
        if (localStream.current) {
            localStream.current.getAudioTracks().forEach(track => track.enabled = !track.enabled);
            setIsSoundOn(prev => !prev);
        }
    };

    const endCall = () => {
        if (currentCall.current) {
            currentCall.current.close();
        }
        if (localStream.current) {
            localStream.current.getTracks().forEach(track => track.stop());
        }
        myVideo.current.srcObject = null;
        remoteVideo.current.srcObject = null;
        setInCall(false);
        setTimeout(() => {
            router.push('/');
        }, 500);
    };

    return (
        <>
            <main className="bg-new-white min-h-[100dvh] relative p-4">
                <div>
                    <h2>My ID: {myId}</h2>
                    <input
                        type="text"
                        placeholder="Enter remote peer ID"
                        value={remoteId}
                        onChange={(e) => setRemoteId(e.target.value)}
                    />
                    <button onClick={callRemotePeer}>Call</button>
                </div>
                <div className='bg-[#202020] rounded-lg w-full aspect-video flex justify-center items-center relative'>
                    <video className='w-full rounded-lg absolute' ref={remoteVideo} autoPlay />
                    {inCall ? null : <p className='text-new-white text-3xl absolute z-10'>Conectandose...</p>}
                    <video className='absolute bottom-3 right-3 w-96 rounded-lg' ref={myVideo} autoPlay />
                </div>
                {inCall && (
                    <div className='flex justify-center items-center pt-4 gap-4'>
                        {isVideoOn ? (
                            <div className='border-2 rounded-full cursor-pointer' onClick={toggleCamera}>
                                <FiVideo className='p-3 text-6xl' />
                            </div>
                        ) : (
                            <div className='border-2 rounded-full cursor-pointer bg-[#202020]' onClick={toggleCamera}>
                                <FiVideoOff className='p-3 text-6xl text-new-white' />
                            </div>
                        )}
                        {isSoundOn ? (
                            <div className='border-2 rounded-full cursor-pointer' onClick={toggleMic}>
                                <FiMic className='p-3 text-6xl' />
                            </div>
                        ) : (
                            <div className='border-2 rounded-full cursor-pointer bg-[#202020]' onClick={toggleMic}>
                                <FiMicOff className='p-3 text-6xl text-new-white' />
                            </div>
                        )}
                        <div className='border-2 rounded-full cursor-pointer bg-[#ff0000]' onClick={endCall}>
                            <FiPhoneOff className='p-3 text-6xl text-new-white' />
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}

export default Page;
