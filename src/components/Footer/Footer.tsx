import Link from '@mui/material/Link';

function Footer() {
  return (
    <div className="footer-wrapper pt-[40px] mt-[auto]">
      <footer className="flex justify-end py-[13px] px-[50px] footer-dash">
        <ul className="flex gap-8">
          <li>
            <Link href="#">Support</Link>
          </li>
          <li>
            <Link href="#">Terms & Conditions</Link>
          </li>
          <li>
            <Link href="#">Privacy Policy</Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default Footer;
