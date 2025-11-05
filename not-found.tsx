import VideoBackground from './components/VideoBackground';

export default function NotFound() {
  return (
    <section className="section-notfound">
      <VideoBackground src="/2025-11-03 18-02-55.mp4" fixed zIndex={0} scale={1} />
      <div className="container nf-inner">
        <h1 className="nf-title">Oops! Page not found</h1>
        <p className="nf-sub">The page you are looking for either doesn't exist or currently not available</p>
        <a className="cta-btn" href="/">Go back to home</a>
      </div>
    </section>
  );
}


