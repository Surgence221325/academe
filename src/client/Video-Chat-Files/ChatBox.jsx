import { useEffect, useState, useRef } from "react";
import AgoraRTC from 'agora-rtc-sdk-ng';
import { VideoPlayer } from "./VideoPlayer";

const APP_ID= "7af9bfe27cef41979d85bd9fa0f9afba";
const TOKEN= import.meta.env.VITE_AGORA_API_KEY;
const CHANNEL= "Academe";

const client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

const ChatBox = ({sendMessage}) => {
}