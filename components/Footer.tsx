export default function Footer() {
  return (
    <footer className="siteFooter">
      <div className="footerInner">

        <div className="footerBrand">
          <h2>ELLDesign Studio</h2>

          <p>
            Set · Stage · Spatial Design
            <br />
            Los Angeles · Hong Kong
          </p>
        </div>

        <div className="footerContact">
          <a href="mailto:elldesign@studio.com">
            elldesign@studio.com
          </a>

          <a href="mailto:info@elldesign.studio">
            info@elldesign.studio
          </a>

          <a href="tel:+13107571745">
            +310-757-1745
          </a>
        </div>

        <div className="footerBottom">
          <span>© 2026 ELLDesign</span>

          <span>SPACE × STORY × SYSTEM</span>

          <a href="#" className="footerTop" aria-label="Back to top">
            ↑
          </a>
        </div>

      </div>
    </footer>
  );
}
