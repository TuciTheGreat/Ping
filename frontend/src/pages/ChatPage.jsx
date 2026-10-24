import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStreamToken } from "../lib/api";
import useAuthUser from "../hooks/useAuthUser";
import { StreamChat } from "stream-chat";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageComposer,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import CallButton from "../components/CallButton";
import LoadingPage from "../components/LoadingPage";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const { authenticatedUser } = useAuthUser();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authenticatedUser, // Works only when authenticatedUser is available
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData || !authenticatedUser) return;
      try {
        console.log("Initializing stream chat client...");

        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authenticatedUser._id,
            name: authenticatedUser.fullName,
            image: authenticatedUser.image,
          },
          tokenData.token,
        );

        const channelId = [authenticatedUser._id, targetUserId]
          .sort()
          .join("-");

        const currChannel = client.channel("messaging", channelId, {
          members: [authenticatedUser._id, targetUserId],
        });

        await currChannel.watch();

        setChannel(currChannel);
        setChatClient(client);
      } catch (error) {
        console.error("Error initializing stream chat:", error);
        toast.error("Failed to initialize chat. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [tokenData, authenticatedUser, targetUserId]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link has been sent!");
    }
  };

  if (loading || !chatClient || !channel)
    return <LoadingPage chatpage={true} />;

  return (
    <div className="h-[calc(100dvh-6.5rem)] min-h-72 overflow-hidden">
      <div className="card h-full bg-base-100 card-sm">
        <div className="card-body h-full p-0">
          <Chat client={chatClient}>
            <Channel channel={channel}>
              <div className="relative h-full w-full min-w-0">
                <CallButton handleVideoCall={handleVideoCall} />

                <Window>
                  <ChannelHeader />
                  <MessageList />
                  <MessageComposer focus />
                </Window>
              </div>

              <Thread />
            </Channel>
          </Chat>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
