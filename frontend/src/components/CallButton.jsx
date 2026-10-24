import React from "react";
import { VideoIcon } from "lucide-react";

function CallButton({ handleVideoCall }) {
  return (
    <div className="absolute right-4 top-0 z-10 flex h-[72px] items-center">
      <button
        onClick={handleVideoCall}
        className="btn btn-success btn-sm rounded-full text-white"
      >
        <VideoIcon className="size-6" />
      </button>
    </div>
  );
}

export default CallButton;
