import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Send,
  Github,
  Linkedin,
  Instagram,
  Facebook,
  ArrowUpRight,
  MessageCircle,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';



/* ❗ NOT EXPORTED */
const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'mohammedsaleem330@gmail.com',
    href: 'mailto:mohammedsaleem330@gmail.com',
  },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    value: '+20 115 500 3537',
    href: 'https://wa.me/201155003537',
  },
];

/* ❗ NOT EXPORTED */
export const socialLinks = [
  { icon: Github, href: 'https://github.com/M7mdSelim', label: 'GitHub' },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/mohammed-selim-1673021a1/',
    label: 'LinkedIn',
  },
  {
    icon: Instagram,
    href: 'https://www.instagram.com/muhamedselim_/',
    label: 'Instagram',
  },
  {
    icon: Facebook,
    href: 'https://www.facebook.com/profile.php?id=100006098884315',
    label: 'Facebook',
  },
];

export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const encodedMessage = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    );

    window.open(`https://wa.me/201155003537?text=${encodedMessage}`, '_blank');
  };

  return (
  <section
    id="contact"
    className="relative bg-card/20
               py-20 sm:py-24 lg:py-32
               px-4 sm:px-6"
  >
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 sm:mb-16"
      >
        <p className="text-primary font-medium mb-2 sm:mb-3">CONTACT</p>
        <h2 className="section-title">
          Let&apos;s Work <span className="text-gradient">Together</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-3 sm:mt-4 text-sm sm:text-base">
          Have a project in mind? Drop me a message and let&apos;s create
          something amazing.
        </p>
      </motion.div>

      <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 space-y-6 sm:space-y-8"
        >
          {/* Get in Touch */}
          <div className="glass-card p-5 sm:p-8">
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <div className="p-3 rounded-xl bg-primary/10">
                <MessageCircle size={22} className="text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg">
                  Get in Touch
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  I usually respond within 24 hours
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center gap-4
                             p-4 sm:p-5
                             rounded-2xl bg-muted/50
                             border border-border/50
                             hover:border-primary/50
                             transition-colors"
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="p-2.5 rounded-lg bg-primary/10 shrink-0">
                    <item.icon size={18} className="text-primary" />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="text-xs text-muted-foreground">
                      {item.label}
                    </span>
                    <span className="font-medium truncate">
                      {item.value}
                    </span>
                  </div>

                  <ArrowUpRight
                    size={16}
                    className="ml-auto text-muted-foreground"
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="glass-card p-5 sm:p-8">
            <h3 className="font-bold mb-4 text-base sm:text-lg">
              Follow Me
            </h3>

            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative p-4
                             rounded-2xl
                             bg-muted/50
                             border border-border/50
                             hover:border-primary/50
                             transition-colors
                             overflow-hidden"
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-primary/20 pointer-events-none"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 2, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <social.icon
                    size={20}
                    className="relative z-10 text-muted-foreground hover:text-primary"
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3"
        >
          <div className="glass-card p-5 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 sm:px-5 py-3.5 sm:py-4
                             rounded-2xl bg-input border border-border"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 sm:px-5 py-3.5 sm:py-4
                             rounded-2xl bg-input border border-border"
                />
              </div>

              <textarea
                rows={5}
                placeholder="Tell me about your project..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full px-4 sm:px-5 py-3.5 sm:py-4
                           rounded-2xl bg-input border border-border resize-none"
              />

              <motion.button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2"
                whileTap={{ scale: 0.97 }}
              >
                <span>Send Message</span>
                <Send size={18} />
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

}
