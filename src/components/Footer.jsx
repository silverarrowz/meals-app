const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__section footer__section_links">
          <h4>Quick Links</h4>
          <nav>
            <ul className="footer__navigation">
              <li>
                <a className="footer__link" href="/meals-app/">
                  Home
                </a>
              </li>
              <li>
                <a className="footer__link" href="/meals-app/favorites">
                  Favorites
                </a>
              </li>
              <li>
                <a className="footer__link" href="/meals-app/contact">
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="footer__section footer__section_social">
          <h4>Follow Us</h4>
          <nav className="footer__social-links">
            <a
              className="footer__link footer__link-social"
              href="https://facebook.com"
              target="_blank"
            >
              Facebook
            </a>
            <a
              className="footer__link footer__link-social"
              href="https://twitter.com"
              target="_blank"
            >
              Twitter
            </a>
            <a
              className="footer__link footer__link-social"
              href="https://instagram.com"
              target="_blank"
            >
              Instagram
            </a>
          </nav>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; 2024 Meals App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
