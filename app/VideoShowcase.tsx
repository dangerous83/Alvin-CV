"use client";

import { useRef, useState } from "react";

const VIDEO_PREVIEW = "https://drive.google.com/file/d/18GJ3DqkmJ74fqnftsBVXBSbLeZHDVrla/preview";

export function VideoShowcase() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(false);

  function openVideo() {
    setActive(true);
    dialogRef.current?.showModal();
  }

  function closeVideo() {
    dialogRef.current?.close();
    setActive(false);
  }

  return (
    <>
      <button className="showreel-button" type="button" onClick={openVideo} aria-haspopup="dialog">
        <span className="showreel-play" aria-hidden="true"><i /></span>
        <span className="showreel-copy">
          <small>Creative direction in motion</small>
          <strong>Watch my AI showreel</strong>
        </span>
        <span className="showreel-action" aria-hidden="true">Play ↗</span>
      </button>

      <dialog
        className="showreel-dialog"
        ref={dialogRef}
        onClose={() => setActive(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeVideo();
        }}
      >
        <div className="showreel-modal">
          <div className="showreel-modal-header">
            <div><span>Featured film</span><strong>Alvin Jampazar — AI Showreel</strong></div>
            <button type="button" onClick={closeVideo} aria-label="Close showreel">Close <span aria-hidden="true">×</span></button>
          </div>
          <div className="showreel-frame">
            {active ? (
              <iframe
                src={VIDEO_PREVIEW}
                title="Alvin Jampazar AI showreel"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            ) : null}
          </div>
        </div>
      </dialog>
    </>
  );
}
