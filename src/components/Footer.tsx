import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-foreground text-background">
      <div className="max-w-[100rem] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Clinic Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                <span className="font-heading text-2xl font-bold text-primary-foreground">D</span>
              </div>
              <div>
                <div className="font-heading text-xl font-bold text-background">Dental Care</div>
                <div className="font-paragraph text-xs text-background/70">Expert Dental Services</div>
              </div>
            </div>
            <p className="font-paragraph text-sm text-background/80 leading-relaxed mb-6">
              Providing exceptional dental care with modern technology and compassionate service. Your smile is our priority.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-background/10 hover:bg-primary flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-background/10 hover:bg-primary flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-background/10 hover:bg-primary flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-background/10 hover:bg-primary flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-background mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About Us', href: '#about' },
                { label: 'Our Services', href: '#services' },
                { label: 'Patient Reviews', href: '#reviews' },
                { label: 'Gallery', href: '#gallery' },
                { label: 'Contact Us', href: '#contact' }
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-paragraph text-sm text-background/80 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-background mb-6">Our Services</h3>
            <ul className="space-y-3">
              {[
                'Teeth Cleaning',
                'Root Canal Treatment',
                'Dental Implants',
                'Teeth Whitening',
                'Braces & Orthodontics',
                'Tooth Extraction'
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="font-paragraph text-sm text-background/80 hover:text-primary transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-background mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-paragraph text-sm text-background/80 leading-relaxed">
                    123 Dental Street, Medical District<br />
                    New York, NY 10001, USA
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="tel:+15551234567"
                  className="font-paragraph text-sm text-background/80 hover:text-primary transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:info@dentalclinic.com"
                  className="font-paragraph text-sm text-background/80 hover:text-primary transition-colors"
                >
                  info@dentalclinic.com
                </a>
              </li>
            </ul>
            <div className="mt-6 p-4 rounded-lg bg-background/10">
              <p className="font-paragraph text-sm text-background/90 font-semibold mb-2">Opening Hours</p>
              <p className="font-paragraph text-xs text-background/70">Mon - Fri: 9:00 AM - 7:00 PM</p>
              <p className="font-paragraph text-xs text-background/70">Saturday: 9:00 AM - 5:00 PM</p>
              <p className="font-paragraph text-xs text-primary font-semibold mt-2">24/7 Emergency Care</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-background/70 text-center md:text-left">
              © {new Date().getFullYear()} Dental Care Clinic. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-paragraph text-sm text-background/70 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="font-paragraph text-sm text-background/70 hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="font-paragraph text-sm text-background/70 hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
