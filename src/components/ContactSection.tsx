import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Github, Linkedin, Instagram, Facebook, ArrowUpRight, MessageCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

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

export const socialLinks = [
  { icon: Github, href: 'https://github.com/M7mdSelim', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/mohammed-selim-1673021a1/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/muhamedselim_/', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=100006098884315', label: 'Facebook' },
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
    <section id="contact" className="py-32 px-6 relative bg-card/20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium mb-3">CONTACT</p>
          <h2 className="section-title">
            Let's Work <span className="text-gradient">Together</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            Have a project in mind? I'd love to hear about it. Drop me a message and let's create something amazing.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-primary/10">
                  <MessageCircle size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg">Get in Touch</h3>
                  <p className="text-sm text-muted-foreground">I usually respond within 24 hours</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      // Some embedded previews block default navigation; force it on user click.
                      e.preventDefault();
                      if (item.href.startsWith('mailto:')) {
                        window.location.href = item.href;
                        return;
                      }
                      const win = window.open(item.href, '_blank', 'noopener,noreferrer');
                      if (!win) window.location.assign(item.href);
                    }}
                    className="flex items-center justify-between p-4 rounded-2xl bg-muted/50 border border-border/50 hover:border-primary/50 transition-all group cursor-pointer"
                    whileHover={{ x: 4, backgroundColor: 'hsl(var(--primary) / 0.05)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                        <item.icon size={18} className="text-primary" />
                      </div>
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="text-muted-foreground text-sm shrink-0">{item.label}:</span>
                        <span className="font-medium group-hover:text-primary transition-colors truncate">{item.value}</span>
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-2" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-8">
              <h3 className="font-display font-bold mb-4">Follow Me</h3>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-muted/50 border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all relative overflow-hidden"
                    whileHover={{ scale: 1.15, y: -5, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    title={social.label}
                  >
                    <motion.div
                      className="absolute inset-0 bg-primary/20"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 2, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ borderRadius: '50%', transformOrigin: 'center' }}
                    />
                    <social.icon size={20} className="text-muted-foreground hover:text-primary transition-colors relative z-10" />
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
            <div className="glass-card p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-input border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-input border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-input border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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
