import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-blue-600 text-white">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <div className="flex items-center mb-4">
                            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Techzone-Learning-Logo-120x117-uUGY2esfrxZHjEwkgj6r5cDYpI2FKZ.png" alt="Techzone Learning Logo" className="h-8 w-auto mr-2" />
                            <span className="text-lg font-bold text-white">Techzone Learning</span>
                        </div>
                        <p className="text-white mb-4">Empowering students with cutting-edge technology education and practical skills for the digital future.</p>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/Techzonelearn/" className="text-white">
                                <Facebook className="w-5 h-5" />
                                <span className="sr-only">Facebook</span>
                            </a>
                            <a href="#" className="text-white">
                                <Twitter className="w-5 h-5" />
                                <span className="sr-only">Twitter</span>
                            </a>
                            <a href="https://www.instagram.com/techzonelearning/" className="text-white">
                                <Instagram className="w-5 h-5" />
                                <span className="sr-only">Instagram</span>
                            </a>
                            <a href="https://www.linkedin.com/company/techzonelearning?originalSubdomain=pk" className="text-white">
                                <Linkedin className="w-5 h-5" />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4 text-yellow-400">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-white">Home</Link></li>
                            <li><Link to="https://techzonelearning.com/contact/" className="text-white">Contact</Link></li>
                            <li><Link to="https://techzonelearning.com" className="text-white">Techzone Learning</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4 text-yellow-400">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <MapPin className="w-5 h-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-white">Suit #07, Ground floor, Progressive Center, PECHS Block #06, Shahra-e-Faisal, Karachi, Pakistan, 75400</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="w-5 h-5 text-yellow-400 mr-2" />
                                <span className="text-white">(021) 33397340</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="w-5 h-5 text-yellow-400 mr-2" />
                                <span className="text-white">techzone.learning@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-blue-500 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-white text-sm">&copy; {currentYear} Techzone Learning. All rights reserved.</p>
                    <div className="mt-4 md:mt-0 flex space-x-6">
                        <Link to="/privacy" className="text-white text-sm">Privacy Policy</Link>
                        <Link to="/terms" className="text-white text-sm">Terms of Service</Link>
                        <Link to="/cookies" className="text-white text-sm">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;