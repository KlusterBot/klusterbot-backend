let {
    RTCPeerConnection,
    RTCIceCandidate,
    mediaDevices,
    MediaStream,
    MediaStreamTrackSource,
} = require("wrtc");

const { RTCAudioSink, RTCAudioSource } = require("wrtc").nonstandard;
// const RTCAudioSource = require("node-webrtc-audio-stream-source").default;
const { PassThrough } = require("stream");
const fs = require("fs");
const gTTS = require("gtts");
const MemoryStream = require("memorystream");
const ffmpeg = require("fluent-ffmpeg");

const Stage = require("./stage");

const NodeCache = require("node-cache");
const myCache = new NodeCache();

const servers = {
    iceServers: [
        {
            urls: [
                "stun:stun1.l.google.com:19302",
                "stun:stun2.l.google.com:19302",
            ],
        },
    ],
};

let constraints = {
    audio: true,
    video: false,
};

function Call(id, instance) {
    let peerConnection;
    let localStream;
    let audio;
    let audioMine;
    let isSpeaking;
    let dataChannel;

    const audioSource = new RTCAudioSource();

    const sampleRate = 44100; // Assume 44100 Hz sample rate
    const bitsPerSample = 16; // 16-bit samples
    const channelCount = 2; // Stereo audio

    let self = this;
    this.id = id;
    this.instance = instance;
    self.events = {};
    let { socket } = instance;

    let callStage = new Stage();
    callStage.setEventCapture([
        "candidate",
        "screenShareCheck",
        "answer",
        "negotiate",
        "reconnectCall",
        "endCall",
        "noAnswer",
        "ringing",
    ]);
    callStage.add((next) => {
        next();
    });
    callStage.add(async (event, data) => {
        console.log("Call Stage", event);

        if (event === "candidate") {
            if (
                peerConnection &&
                peerConnection.signalingState != "closed" &&
                data.candidate &&
                peerConnection.currentRemoteDescription
            ) {
                try {
                    // console.log("Adding Candidate");
                    peerConnection.addIceCandidate(
                        new RTCIceCandidate(data.candidate)
                    );
                } catch (error) {
                    // console.log(error);
                }
            }
        } else if (event === "answer") {
            if (
                !peerConnection.currentRemoteDescription &&
                peerConnection.signalingState != "closed"
            ) {
                // console.log("Adding Answer");
                peerConnection.setRemoteDescription(data.answer);
            } else {
                if (peerConnection.signalingState == "have-local-offer") {
                    // console.log("Adding Answer");
                    peerConnection.setRemoteDescription(data.answer);
                }

                peerConnection.addEventListener(
                    "signalingstatechange",
                    function () {
                        if (
                            peerConnection.signalingState == "have-local-offer"
                        ) {
                            // console.log("Adding Answer");
                            peerConnection.setRemoteDescription(data.answer);
                        }
                    }
                );
            }
        } else if (event === "negotiate") {
            await createAnswer(data.description);
        } else if (event === "reconnectCall") {
            if (peerConnection) {
                peerConnection.close();
                peerConnection = null;
            }

            await createPeerConnection(id);

            let offer = await peerConnection.createOffer({
                iceRestart: true,
                offerToReceiveAudio: true,
                offerToReceiveVideo: true,
            });
            await peerConnection.setLocalDescription(offer);
            socket.emit("callInfo", {
                type: "callReconnectOffer",
                offer,
                id,
            });

            if (self.events["connectionstatechange"]) {
                self.events["connectionstatechange"]("reconnecting");
            }
        } else if (event === "endCall") {
            self.endCall(true);
        } else if (event === "ringing") {
            if (self.events["ringing"]) {
                self.events["ringing"]();
            }
        }
    });

    callStage.run(id, instance);

    self.endCall = (byUser = false) => {
        if (peerConnection) {
            peerConnection.close();
        }

        callStage.end();

        if (self.events["end"]) {
            self.events["end"](byUser);
        }

        socket.emit("endCall", id);
    };

    self.say = (text, language = "en-us") => {
        return new Promise(async (resolve, reject) => {
            if (myCache.has(text)) {
                try {
                    return resolve(await self.play(myCache.get(text)));
                } catch (e) {}
                return;
            }

            let gtts = new gTTS(text, language);
            let filename = `./.temp/say-${Date.now()}.mp3`;

            try {
                if (!fs.existsSync("./.temp")) {
                    fs.mkdirSync("./.temp");
                }
            } catch (e) {}

            gtts.save(filename, async function (err, result) {
                if (err) {
                    return reject(err);
                }

                myCache.set(text, filename);

                return resolve(await self.play(filename));
            });
        });
    };

    // const toArrayBuffer = (buffer) => {
    //     const arrayBuffer = new ArrayBuffer(buffer.length);
    //     const view = new Uint8Array(arrayBuffer);
    //     for (let i = 0; i < buffer.length; ++i) {
    //         view[i] = buffer[i];
    //     }
    //     return arrayBuffer;
    // };

    self.play = (FILE_PATH) => {
        function createAudioData(buffer) {
            const numberOfFrames =
                buffer.length / ((bitsPerSample / 8) * channelCount); // Calculate the number of frames

            // Convert buffer to an appropriate typed array for the bit depth
            const samples = new Int16Array(
                buffer.buffer,
                buffer.byteOffset,
                buffer.length / 2
            );

            return {
                samples,
                sampleRate,
                bitsPerSample,
                channelCount,
                numberOfFrames,
            };
        }

        return new Promise((resolve, reject) => {
            try {
                const highWaterMark = 1024 * 1024 * 10;
                const duplex = new PassThrough({
                    readableHighWaterMark: highWaterMark,
                    writableHighWaterMark: highWaterMark,
                    highWaterMark,
                });

                const audioFile = ffmpeg(FILE_PATH)
                    .format("s16le") // Output raw PCM data
                    .audioCodec("pcm_s16le")
                    .audioChannels(channelCount)
                    .audioFrequency(sampleRate)
                    // .native()
                    .on("error", (err) => {
                        console.error(
                            "An error occurred while decoding the audio file:",
                            err.message
                        );
                    })
                    .on("end", () => {
                        console.log("Audio file decoding finished");
                        // stream();
                    })
                    .pipe(duplex);

                // we need to send 10 ms at the time
                const chunkSize =
                    ((sampleRate / 100) * channelCount * bitsPerSample) / 8;

                // start a loop to consume the buffer, loading into a Int16Array chunk size of data
                const interval = setInterval(() => {
                    const chunk = duplex.read(chunkSize);
                    if (chunk === null) {
                        return;
                    }

                    // Create a new buffer to hold the slice of data
                    const chunkBuffer = Buffer.alloc(chunkSize);

                    // Copy the slice of data to the new buffer
                    chunk.copy(chunkBuffer, 0, 0, chunkSize);

                    // Convert the new buffer to a Int16Array
                    const samples = new Int16Array(
                        chunkBuffer.buffer,
                        chunkBuffer.byteOffset,
                        chunkSize / 2
                    );

                    audioSource.onData({
                        samples,
                        sampleRate,
                        bitsPerSample,
                        channelCount,
                        numberOfFrames: samples.length / channelCount, // Correct, as length is already in terms of elements
                    });
                }, 10);

                duplex.on("end", () => {
                    resolve();
                    clearInterval(interval);
                });
            } catch (error) {
                reject(error);
            }
        });
    };

    const createPeerConnection = async (id) => {
        peerConnection = new RTCPeerConnection(servers);
        self.peerConnection = peerConnection;

        const audioTrack = audioSource.createTrack();
        peerConnection.addTransceiver(audioTrack);

        let callReady = setInterval(() => {
            if (
                peerConnection.signalingState === "stable" &&
                peerConnection.iceConnectionState === "completed"
            ) {
                clearInterval(callReady);

                if (self.events["ready"]) {
                    self.events["ready"]();
                }
            }
        }, 100);

        peerConnection.ontrack = (event) => {
            if (self.events["track"]) {
                self.events["track"](event);
            }

            try {
                if (!fs.existsSync("./.temp")) {
                    fs.mkdirSync("./.temp");
                }
            } catch (e) {}

            event.streams[0].getTracks().forEach((track) => {
                if (track.kind == "audio") {
                    const writableStream = new MemoryStream();
                    const writableStreamMine = new MemoryStream();

                    if (self.events["voice_stream"]) {
                        self.events["voice_stream"](
                            writableStream,
                            writableStreamMine
                        );
                    }

                    let ended = false;

                    const onAudioData = ({ samples: { buffer } }) => {
                        if (!ended) {
                            writableStream.write(Buffer.from(buffer));
                        }
                    };

                    audio = null;

                    audio = new RTCAudioSink(track);
                    audio.addEventListener("data", onAudioData);

                    audio.addEventListener("end", () => {
                        audio.removeEventListener("data", onAudioData);
                        writableStream.end();
                    });

                    // audioMine = null;

                    // audioMine = new RTCAudioSink(audioTrack);
                    // audioMine.addEventListener("data", ({ samples: { buffer } }) => {
                    //     if (!ended) {
                    //         writableStreamMine.write(Buffer.from(buffer));
                    //     }
                    // });

                    // audioMine.addEventListener("end", () => {
                    //     writableStreamMine.end();
                    // });

                    // NOTE(mroberts): This is a hack so that we can get a callback when the
                    // RTCPeerConnection is closed. In the future, we can subscribe to
                    // "connectionstatechange" events.

                    const { close } = peerConnection;

                    peerConnection.close = function () {
                        try {
                            ended = true;
                            audio.stop();
                            audioTrack.stop();

                            audio.removeEventListener("data", onAudioData);
                            writableStream.end();
                        } catch (error) {
                            console.log(error);
                        }

                        return close.apply(this, arguments);
                    };
                }
            });
        };

        peerConnection.addEventListener("signalingstatechange", function () {
            if (self.events["signalingstatechange"]) {
                self.events["signalingstatechange"](
                    peerConnection.signalingState
                );
            }
        });

        peerConnection.addEventListener("negotiationneeded", async (event) => {
            if (self.events["negotiationneeded"]) {
                self.events["negotiationneeded"](event);
            }

            try {
                let offer = await peerConnection.createOffer({
                    offerToReceiveAudio: true,
                    offerToReceiveVideo: true,
                });

                await peerConnection.setLocalDescription(offer);

                socket.emit("callInfo", {
                    type: "callReconnectOffer",
                    offer,
                    id,
                });
            } catch (error) {
                // console.log(error);
            }
        });

        peerConnection.onicecandidate = async (event) => {
            if (event.candidate) {
                if (self.events["candidate"]) {
                    self.events["candidate"](event.candidate);
                }
            }

            if (event.candidate) {
                socket.emit("callInfo", {
                    type: "candidate",
                    candidate: event.candidate,
                    id,
                });
            }
        };

        peerConnection.oniceconnectionstatechange = function () {
            // console.log("ICE state: ", peerConnection.iceConnectionState);
            if (self.events["iceconnectionstatechange"]) {
                self.events["iceconnectionstatechange"](
                    peerConnection.iceConnectionState
                );
            }
        };

        peerConnection.addEventListener("connectionstatechange", function () {
            if (self.events["connectionstatechange"]) {
                self.events["connectionstatechange"](
                    peerConnection.connectionState
                );
            }
        });
    };

    this.on = (event, cb) => {
        self.events[event] = cb;
    };

    this.answer = async (key) => {
        let offer = await createOffer(id);
        sendOffer(key, offer);
    };

    this.call = async () => {
        let offer = await createOffer(id);
        socket.emit("call", { type: "offer", offer, id });
    };

    const createAnswer = async (offer) => {
        await peerConnection.setRemoteDescription(offer);

        let answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        socket.emit("callInfo", {
            type: "answer",
            answer: answer,
            id,
        });
    };

    const createOffer = async (id) => {
        await createPeerConnection(id);

        let offer = await peerConnection.createOffer({
            iceRestart: true,
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
        });
        await peerConnection.setLocalDescription(offer);
        return offer;
    };

    const sendOffer = (key, offer) => {
        socket.emit("callInfo", {
            type: "callReconnectOffer",
            key: key,
            offer,
            id,
        });
    };
}

module.exports = Call;
