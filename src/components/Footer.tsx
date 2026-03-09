import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' }
  ];

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Our Services', href: '#services' },
    { label: 'Patient Reviews', href: '#reviews' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact Us', href: '#contact' }
  ];

  const services = [
    'Teeth Cleaning',
    'Root Canal Treatment',
    'Dental Implants',
    'Teeth Whitening',
    'Braces & Orthodontics',
    'Tooth Extraction'
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-foreground to-foreground/95 text-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -ml-48 -mb-48" />

      <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Clinic Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-blue to-primary flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <span className="font-heading text-2xl font-bold text-white">D</span>
              </motion.div>
              <div>
                <div className="font-heading text-lg font-bold text-background">Dental Care</div>
                <div className="font-paragraph text-xs text-background/70">Premium Services</div>
              </div>
            </div>
            <p className="font-paragraph text-sm text-background/80 leading-relaxed mb-6">
              Providing exceptional dental care with modern technology and compassionate service. Your smile is our priority.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-background/10 hover:bg-gradient-to-br hover:from-accent-blue hover:to-primary flex items-center justify-center transition-all"
                  aria-label={social.label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-heading text-lg font-semibold text-background mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    className="font-paragraph text-sm text-background/80 hover:text-accent-blue transition-colors relative group"
                    whileHover={{ x: 4 }}
                  >
                    <span className="relative">
                      {link.label}
                      <motion.span 
                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-blue group-hover:w-full transition-all duration-300"
                      />
                    </span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-heading text-lg font-semibold text-background mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <motion.a
                    href="#services"
                    className="font-paragraph text-sm text-background/80 hover:text-primary transition-colors relative group flex items-center gap-2"
                    whileHover={{ x: 4 }}
                  >
                    <motion.span 
                      className="w-1.5 h-1.5 rounded-full bg-accent-blue opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                    />
                    {service}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-heading text-lg font-semibold text-background mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group cursor-pointer">
                <motion.div whileHover={{ scale: 1.2, rotate: 10 }}>
                  <MapPin className="w-5 h-5 text-accent-blue flex-shrink-0 mt-1" />
                </motion.div>
                <div>
                  <p className="font-paragraph text-sm text-background/80 leading-relaxed group-hover:text-background transition-colors">
                    123 Dental Street, Medical District<br />
                    New York, NY 10001, USA
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-3 group">
                <motion.div whileHover={{ scale: 1.2, rotate: -10 }}>
                  <Phone className="w-5 h-5 text-accent-blue flex-shrink-0" />
                </motion.div>
                <motion.a
                  href="tel:+15551234567"
                  className="font-paragraph text-sm text-background/80 hover:text-accent-blue transition-colors"
                  whileHover={{ x: 2 }}
                >
                  +1 (555) 123-4567
                </motion.a>
              </li>
              <li className="flex items-center gap-3 group">
                <motion.div whileHover={{ scale: 1.2, rotate: 10 }}>
                  <Mail className="w-5 h-5 text-accent-blue flex-shrink-0" />
                </motion.div>
                <motion.a
                  href="mailto:info@dentalclinic.com"
                  className="font-paragraph text-sm text-background/80 hover:text-accent-blue transition-colors"
                  whileHover={{ x: 2 }}
                >
                  info@dentalclinic.com
                </motion.a>
              </li>
            </ul>
            <motion.div 
              className="mt-6 p-4 rounded-lg bg-background/10 border border-background/20 hover:border-accent-blue/30 transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              <p className="font-paragraph text-sm text-background/90 font-semibold mb-2">Opening Hours</p>
              <p className="font-paragraph text-xs text-background/70">Mon - Fri: 9:00 AM - 7:00 PM</p>
              <p className="font-paragraph text-xs text-background/70">Saturday: 9:00 AM - 5:00 PM</p>
              <p className="font-paragraph text-xs text-accent-blue font-semibold mt-2">24/7 Emergency Care</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="pt-8 border-t border-background/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-background/70 text-center md:text-left">
              © {new Date().getFullYear()} Dental Care Clinic. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <motion.a 
                  key={item}
                  href="#" 
                  className="font-paragraph text-sm text-background/70 hover:text-accent-blue transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
