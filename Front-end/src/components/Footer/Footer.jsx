
import './Footer.css';

const Footer = () => {
  return (
    <footer className=" ">
      <div className="footer-top">
        <div className="footer-section">
          <h4>POPULAR LOCATIONS</h4>
          <ul>
            <li>Kolkata</li>
            <li>Mumbai</li>
            <li>Chennai</li>
            <li>Pune</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>TRENDING LOCATIONS</h4>
          <ul>
            <li>Bhubaneshwar</li>
            <li>Hyderabad</li>
            <li>Chandigarh</li>
            <li>Nashik</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>ABOUT US</h4>
          <ul>
            <li>About OLX Group</li>
            <li>Careers</li>
            <li>Contact Us</li>
            <li>OLX for Businesses</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>OLX</h4>
          <ul>
            <li>Help</li>
            <li>Sitemap</li>
            <li>Legal & Privacy information</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 OLX. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
