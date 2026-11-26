import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, VolumeX } from "lucide-react";
import { Kicker, Reveal, StarMark } from "./ui";

const SRC = "/motion/portfolio-motion.mp4";
const POSTER = "/motion/portfolio-motion-poster.jpg";

export default function Film() {
  const video = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const muted = true;
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);

  /* Play only while the film is actually on screen: no background decoding,
     and the poster frame carries the section until someone presses play. */
  useEffect(() => {
    const el = video.current;
    if (!el) return;

    const onTime = () => {
      if (el.duration) setProgress((el.currentTime / el.duration) * 100);
    };
    el.addEventListener("timeupdate", onTime);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !el.paused) {
          el.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);

    return () => {
      el.removeEventListener("timeupdate", onTime);
      io.disconnect();
    };
  }, []);

  const toggle = async () => {
    const el = video.current;
    if (!el) return;

    if (el.paused) {
      try {
        await el.play();
        setPlaying(true);
        setStarted(true);
      } catch (err) {
        setPlaying(false);
      }
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  const restart = async () => {
    const el = video.current;
    if (!el) return;
    el.currentTime = 0;
    try {
      await el.play();
      setPlaying(true);
      setStarted(true);
    } catch (err) {
      /* autoplay refusal: leave it on the poster */
    }
  };

  return (
    <section id="film" className="aw-film">
      <div className="aw-container">
        <Reveal>
          <div className="aw-film-head">
            <div>
              <Kicker>The whole site, in motion</Kicker>
              <h2 className="aw-h2">
                A minute,
                <br />
                <em className="aw-italic">end to end.</em>
              </h2>
            </div>
            <p className="aw-lead aw-film-lead">
              One continuous take: the hero, the tickets, the learning gauges, a full case study,
              then the dark theme. Recorded from the live build — no mockups.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <figure className={`aw-film-frame${playing ? " is-playing" : ""}`}>
            <div
              className={`aw-film-screen${started ? " is-started" : ""}`}
              onClick={(event) => {
                /* the screen and the play pill are one target: stopPropagation on
                   the pill means a click can never toggle twice */
                if ((event.target as HTMLElement).closest("button")) return;
                void toggle();
              }}
            >
              <video
                ref={video}
                className="aw-film-video"
                src={SRC}
                poster={POSTER}
                muted={muted}
                playsInline
                loop
                preload="metadata"
                aria-label="A sixty-second walkthrough of the portfolio: hero, case-study tickets, skills, learning tracks and the case-study page, ending on the dark theme."
              />

              {!started && (
                <button
                  type="button"
                  className="aw-film-bigplay"
                  onClick={(event) => {
                    event.stopPropagation();
                    void toggle();
                  }}
                >
                  <span className="aw-film-bigplay-ring">
                    <Play size={22} strokeWidth={1.6} fill="currentColor" />
                  </span>
                  <span>
                    <strong>Play the take</strong>
                    <em>1:00 · no audio</em>
                  </span>
                </button>
              )}

              <div className="aw-film-stub" aria-hidden="true">
                <span className="aw-film-stub-brand">
                  <StarMark size={8} /> Film
                </span>
                <div className="aw-film-stub-meta">
                  <div>
                    <span className="aw-film-stub-label">Runtime</span>
                    <span className="aw-film-stub-value">01:00</span>
                  </div>
                  <div>
                    <span className="aw-film-stub-label">Source</span>
                    <span className="aw-film-stub-value">Live build</span>
                  </div>
                  <div>
                    <span className="aw-film-stub-label">Sound</span>
                    <span className="aw-film-stub-value">None</span>
                  </div>
                </div>
                <span className="aw-film-bars">
                  <i style={{ height: "100%" }} />
                  <i style={{ height: "62%" }} />
                  <i style={{ height: "84%" }} />
                  <i style={{ height: "48%" }} />
                  <i style={{ height: "92%" }} />
                  <i style={{ height: "70%" }} />
                  <i style={{ height: "100%" }} />
                  <i style={{ height: "56%" }} />
                  <i style={{ height: "78%" }} />
                  <i style={{ height: "40%" }} />
                </span>
                <span className="aw-film-progress" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <figcaption className="aw-film-caption">
              <div className="aw-film-controls">
                <button type="button" className="aw-film-btn" onClick={toggle} aria-label={playing ? "Pause the film" : "Play the film"}>
                  {playing ? <Pause size={14} strokeWidth={1.9} /> : <Play size={14} strokeWidth={1.9} fill="currentColor" />}
                </button>
                <button type="button" className="aw-film-btn" onClick={restart} aria-label="Restart the film">
                  <RotateCcw size={13} strokeWidth={1.9} />
                </button>
                <span className="aw-film-btn aw-film-btn--static" title="The take is silent by design" aria-label="Silent take">
                  <VolumeX size={13} strokeWidth={1.9} />
                </span>
                <span className="aw-film-time">{Math.round(progress)}%</span>
              </div>
              <span className="aw-film-note">
                Filmed from the running site — scroll, pointer and theme flip all live.
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
