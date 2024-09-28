import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="bg-gradient-to-r from-[#1a6e9e] to-[#0a4d73] text-white pt-8 pb-4 bottom-0 w-full text-center"
      dir="rtl"
    >
      <div className="container mx-auto">
        {/* Grid with 5 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Quick Links Column */}
          <div>
            <h3 className="text-xl font-semibold mb-4">روابط سريعة</h3>{" "}
            {/* Increased header size */}
            <ul>
              <li className="mb-2">
                <Link to="/about" className="hover:text-gray-300 text-lg">
                  {" "}
                  {/* Increased link size */}
                  من نحن
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/services" className="hover:text-gray-300 text-lg">
                  خدماتنا
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="hover:text-gray-300 text-lg">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact Column */}
          <div>
            <h3 className="text-xl font-semibold mb-4">اتصل بنا</h3>{" "}
            {/* Increased header size */}
            <ul>
              <li className="mb-2">
                <Link to="/contact" className="hover:text-gray-300 text-lg">
                  البريد الإلكتروني
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/support" className="hover:text-gray-300 text-lg">
                  الدعم الفني
                </Link>
              </li>
            </ul>
          </div>

          {/* Additional Columns */}
          <div>
            <h3 className="text-xl font-semibold mb-4">الدعم</h3>{" "}
            {/* Increased header size */}
            <ul>
              <li className="mb-2">
                <Link to="/faq" className="hover:text-gray-300 text-lg">
                  الأسئلة الشائعة
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/terms" className="hover:text-gray-300 text-lg">
                  شروط الخدمة
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/privacy-policy"
                  className="hover:text-gray-300 text-lg"
                >
                  سياسة الخصوصية
                </Link>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h3 className="text-xl font-semibold mb-4">عن الشركة</h3>{" "}
            {/* Increased header size */}
            <p className="mb-2 text-lg">
              {" "}
              {/* Increased paragraph size */}
              نحن ملتزمون بتقديم أفضل الحلول والخدمات لعملائنا.
            </p>
          </div>
        </div>

        {/* Bottom section with copyright */}
      </div>
      <div className="mt-8 border-t border-[#0a4d73] pt-4 text-center w-full">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Test. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
