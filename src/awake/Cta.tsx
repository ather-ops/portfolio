import { AwButton, Reveal } from "./ui";

export default function Cta() {
  return (
    <section id="contact" className="aw-contact">
      <div className="aw-container">
        <Reveal>
          <div className="aw-cta-bar">
            <div>
              <p className="aw-cta-kicker">Start something</p>
              <h2 className="aw-cta-title">
                See the work in action.
                <br />
                Start your next AI system.
              </h2>
            </div>
            <div className="aw-cta-actions">
              <AwButton href="mailto:peerather07@gmail.com" variant="white">
                Let&apos;s collaborate
              </AwButton>
              <AwButton href="#work" variant="ghostlight">
                View portfolio
              </AwButton>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <p className="aw-contact-line">
            Or email{" "}
            <a href="mailto:peerather07@gmail.com">peerather07@gmail.com</a> ·{" "}
            <a href="https://wa.me/919103107882" target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
