// HPI 1.7-G
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, Mail, Clock, MapPin, Star, CheckCircle, Award, Users, Calendar, ArrowRight, Shield, Heart, Activity, Sparkles, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BaseCrudService } from '@/integrations';
import { DentalServices, Dentists, Testimonials, ClinicGallery, AppointmentRequests } from '@/entities';

// --- Utility Components for The Architect's Design System ---

const SectionDivider = () => (
  <div className="w-full flex justify-center items-center py-12 opacity-20">
    <div className="h-px w-full max-w-[120rem] bg-gradient-to-r from-transparent via-foreground to-transparent" />
  </div>
);

const Hairline = ({ className = "" }: { className?: string }) => (
  <div className={`h-px w-full bg-border/40 ${className}`} />
);

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function HomePage() {
  // --- 1. Data Fidelity Protocol: Canonical Data Sources ---
  const [services, setServices] = useState<DentalServices[]>([]);
  const [dentists, setDentists] = useState<Dentists[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonials[]>([]);
  const [gallery, setGallery] = useState<ClinicGallery[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [isLoadingDentists, setIsLoadingDentists] = useState(true);
  const [isLoadingTestimonials, setIsLoadingTestimonials] = useState(true);
  const [isLoadingGallery, setIsLoadingGallery] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
  const [formData, setFormData] = useState({
    patientName: '',
    phoneNumber: '',
    emailAddress: '',
    preferredAppointmentDate: '',
    treatmentType: '',
    message: ''
  });

  // --- Data Fetching (Preserved) ---
  useEffect(() => {
    loadServices();
    loadDentists();
    loadTestimonials();
    loadGallery();
  }, []);

  const loadServices = async () => {
    setIsLoadingServices(true);
    try {
      const result = await BaseCrudService.getAll<DentalServices>('dentalservices');
      setServices(result.items);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setIsLoadingServices(false);
    }
  };

  const loadDentists = async () => {
    setIsLoadingDentists(true);
    try {
      const result = await BaseCrudService.getAll<Dentists>('dentists');
      setDentists(result.items);
    } catch (error) {
      console.error('Error loading dentists:', error);
    } finally {
      setIsLoadingDentists(false);
    }
  };

  const loadTestimonials = async () => {
    setIsLoadingTestimonials(true);
    try {
      const result = await BaseCrudService.getAll<Testimonials>('testimonials');
      setTestimonials(result.items);
    } catch (error) {
      console.error('Error loading testimonials:', error);
    } finally {
      setIsLoadingTestimonials(false);
    }
  };

  const loadGallery = async () => {
    setIsLoadingGallery(true);
    try {
      const result = await BaseCrudService.getAll<ClinicGallery>('clinicgallery');
      setGallery(result.items);
    } catch (error) {
      console.error('Error loading gallery:', error);
    } finally {
      setIsLoadingGallery(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await BaseCrudService.create('appointmentrequests', {
        _id: crypto.randomUUID(),
        patientName: formData.patientName,
        phoneNumber: formData.phoneNumber,
        emailAddress: formData.emailAddress,
        preferredAppointmentDate: formData.preferredAppointmentDate,
        treatmentType: formData.treatmentType,
        message: formData.message
      });
      setFormData({
        patientName: '',
        phoneNumber: '',
        emailAddress: '',
        preferredAppointmentDate: '',
        treatmentType: '',
        message: ''
      });
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 5000);
    } catch (error) {
      console.error('Error submitting appointment:', error);
      alert('Failed to submit appointment request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Motion Hooks ---
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-clip selection:bg-primary/20 selection:text-primary-foreground">
      {/* Success Popup Modal */}
      {showSuccessPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-white rounded-3xl p-8 md:p-12 max-w-md w-full mx-4 shadow-2xl relative"
          >
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", damping: 15 }}
                className="w-16 h-16 bg-accent-blue/20 rounded-full flex items-center justify-center mb-6"
              >
                <CheckCircle className="w-8 h-8 text-accent-blue" />
              </motion.div>

              <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
                Thank You!
              </h3>

              <p className="text-text-light-gray mb-2">
                Your appointment request has been received.
              </p>

              <p className="text-sm text-text-light-gray mb-8">
                We'll contact you shortly to confirm your appointment details.
              </p>

              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="absolute bottom-0 left-0 h-1 bg-accent-blue rounded-b-3xl"
              />
            </div>
          </motion.div>
        </motion.div>
      )}

      <Header />

      {/* --- HERO SECTION: The Opening Statement --- */}
      <section id="home" className="relative w-full h-[100vh] min-h-[800px] flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://static.wixstatic.com/media/26c3d3_874c37de965a43b3bf33e470aa7eb252~mv2.png?originWidth=2048&originHeight=640"
            alt="Pristine dental clinic environment"
            className="w-full h-full object-cover"
            width={1200}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </motion.div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full pt-20">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary-foreground mb-8 w-fit">
                <Sparkles className="w-4 h-4 text-accent-blue" />
                <span className="text-sm font-medium tracking-wide uppercase text-accent-blue-foreground">Premium Dental Care</span>
              </div>
              
              <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight text-foreground mb-8">
                Healthy Smiles <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-blue">
                  Start Here.
                </span>
              </h1>

              <p className="font-paragraph text-lg md:text-xl text-text-light-gray max-w-2xl leading-relaxed mb-10">
                Experience the perfect synthesis of advanced technology and compassionate care. 
                We design smiles that inspire confidence and promote lifelong health.
              </p>

              <div className="flex flex-wrap gap-4 mb-16">
                <a href="#appointment">
                  <Button className="h-14 px-8 text-lg bg-accent-blue hover:bg-accent-blue/90 text-white rounded-full shadow-lg shadow-accent-blue/20 transition-all hover:scale-105">
                    Book Appointment
                  </Button>
                </a>
                <a href="#services">
                  <Button variant="outline" className="h-14 px-8 text-lg border-2 border-primary/20 text-foreground hover:bg-primary/5 hover:border-primary/40 rounded-full transition-all">
                    Explore Services
                  </Button>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-8 border-t border-border/40 pt-8">
                <div>
                  <div className="font-heading text-3xl font-bold text-foreground">15+</div>
                  <div className="text-sm text-text-light-gray mt-1">Years of Excellence</div>
                </div>
                <div>
                  <div className="font-heading text-3xl font-bold text-foreground">5k+</div>
                  <div className="text-sm text-text-light-gray mt-1">Happy Patients</div>
                </div>
                <div>
                  <div className="font-heading text-3xl font-bold text-foreground">4.9</div>
                  <div className="text-sm text-text-light-gray mt-1">Average Rating</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-text-light-gray">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>

      {/* --- SERVICES SECTION: Sticky Layout --- */}
      <section id="services" className="relative w-full py-32 bg-background">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Sticky Header */}
            <div className="lg:col-span-4 relative">
              <div className="sticky top-32">
                <FadeIn>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6 text-foreground leading-tight">
                    Comprehensive <br />
                    <span className="text-primary">Dental Solutions</span>
                  </h2>
                  <p className="font-paragraph text-base md:text-lg text-text-light-gray mb-8 leading-relaxed">
                    From routine hygiene to complex restorative procedures, our expert team utilizes state-of-the-art technology to ensure your comfort and results.
                  </p>
                  <div className="hidden lg:block w-20 h-1 bg-accent-blue rounded-full" />
                </FadeIn>
              </div>
            </div>

            {/* Scrollable Grid */}
            <div className="lg:col-span-8">
              {isLoadingServices ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-64 bg-gray-100 rounded-2xl" />
                  ))}
                </div>
              ) : services.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map((service, index) => (
                    <FadeIn key={service._id} delay={index * 0.1} className="h-full">
                      <div className="group relative h-full bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700" />
                        
                        <div className="relative z-10">
                          <div className="w-14 h-14 rounded-xl bg-secondary/30 flex items-center justify-center mb-6 text-accent-blue group-hover:bg-accent-blue group-hover:text-white transition-colors duration-300">
                            {service.serviceIcon ? (
                              <Image src={service.serviceIcon} alt="" className="w-8 h-8 object-contain" width={32} />
                            ) : (
                              <Activity className="w-7 h-7" />
                            )}
                          </div>
                          
                          <h3 className="font-heading text-xl font-bold mb-3 text-foreground group-hover:text-accent-blue transition-colors">
                            {service.serviceName}
                          </h3>
                          
                          <p className="font-paragraph text-text-light-gray mb-6 line-clamp-3">
                            {service.shortDescription}
                          </p>
                          
                          {service.learnMoreLink && (
                            <a href={service.learnMoreLink} className="inline-flex items-center text-sm font-semibold text-foreground group-hover:text-accent-blue transition-colors">
                              Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </a>
                          )}
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center border border-dashed border-gray-200 rounded-xl">
                  <p className="text-text-light-gray">Services are currently being updated.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>



      {/* --- ABOUT DENTIST: Magazine Layout --- */}
      <section id="about" className="w-full py-32 bg-secondary/10 overflow-hidden">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20">
          {isLoadingDentists ? (
            <div className="h-[600px] bg-gray-100 rounded-3xl animate-pulse" />
          ) : dentists.length > 0 ? (
            dentists.map((dentist, index) => (
              <div key={dentist._id} className={`flex flex-col lg:flex-row gap-16 items-center ${index !== 0 ? 'mt-32' : ''}`}>
                {/* Image Side */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="w-full lg:w-1/2 relative"
                >
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                    {dentist.image ? (
                      <Image
                        src={dentist.image}
                        alt={dentist.name || "Dentist"}
                        className="w-full h-full object-cover"
                        width={800}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <Users className="w-20 h-20 text-gray-400" />
                      </div>
                    )}
                    {/* Floating Badge */}
                    <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg max-w-xs">
                      <p className="font-heading font-bold text-lg text-foreground">"Patient care is not just a profession, it's a promise."</p>
                    </div>
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent-blue/10 rounded-full blur-3xl" />
                  <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />
                </motion.div>

                {/* Content Side */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full lg:w-1/2"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-px w-12 bg-accent-blue" />
                    <span className="text-accent-blue font-semibold uppercase tracking-wider text-sm">Meet The Expert</span>
                  </div>
                  
                  <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                    {dentist.name}
                  </h2>
                  <p className="font-heading text-xl text-primary mb-8 font-medium">
                    {dentist.qualifications}
                  </p>

                  <div className="prose prose-lg text-text-light-gray mb-10">
                    <p>{dentist.patientCarePhilosophy}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                    {dentist.highlights?.split('\n').map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent-blue mt-1 flex-shrink-0" />
                        <span className="text-foreground/80">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-8 pt-8 border-t border-border/50">
                    <div>
                      <span className="block text-3xl font-bold text-foreground">{dentist.yearsOfExperience}+</span>
                      <span className="text-sm text-text-light-gray">Years Experience</span>
                    </div>
                    <div className="h-10 w-px bg-border" />
                    <div>
                      <span className="block text-3xl font-bold text-foreground">100%</span>
                      <span className="text-sm text-text-light-gray">Dedication</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))
          ) : (
            <div className="text-center py-20">
              <p className="text-text-light-gray">Dentist profiles loading...</p>
            </div>
          )}
        </div>
      </section>

      {/* --- FEATURES: Bento Grid Style --- */}
      <section className="w-full py-32 bg-background">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <FadeIn>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">Why Choose Us</h2>
              <p className="text-lg text-text-light-gray">
                We've reimagined the dental experience to be as comfortable, transparent, and effective as possible.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Safety First", desc: "Hospital-grade sterilization protocols for your absolute safety." },
              { icon: Heart, title: "Pain-Free Dentistry", desc: "Advanced sedation and gentle techniques for anxiety-free visits." },
              { icon: Clock, title: "Efficient Care", desc: "Respecting your time with prompt appointments and minimal waiting." },
              { icon: Activity, title: "Modern Tech", desc: "Digital X-rays, intraoral cameras, and 3D imaging for precision." },
              { icon: Users, title: "Expert Team", desc: "Continuous training ensures we stay at the forefront of dentistry." },
              { icon: Sparkles, title: "Premium Comfort", desc: "Relaxing amenities and a calming atmosphere to put you at ease." }
            ].map((feature, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group p-8 rounded-2xl bg-white border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-text-light-gray leading-relaxed">{feature.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS: Clean Cards --- */}
      <section id="reviews" className="w-full py-32 bg-gray-50">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Patient Stories</h2>
              <p className="text-lg text-text-light-gray">Don't just take our word for it. Hear from those who have experienced our care.</p>
            </div>
            <div className="flex gap-2">
              {/* Decorative controls could go here */}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoadingTestimonials ? (
              [1, 2, 3].map(i => <div key={i} className="h-64 bg-gray-200 rounded-2xl animate-pulse" />)
            ) : testimonials.length > 0 ? (
              testimonials.map((testimonial, index) => (
                <FadeIn key={testimonial._id} delay={index * 0.1}>
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < (testimonial.rating || 5) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    <p className="text-foreground/80 italic mb-8 flex-grow">"{testimonial.reviewText}"</p>
                    <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100">
                      {testimonial.patientPhoto ? (
                        <Image src={testimonial.patientPhoto} alt={testimonial.patientName || "Patient"} className="w-12 h-12 rounded-full object-cover" width={48} />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          {testimonial.patientName?.charAt(0) || "P"}
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-foreground">{testimonial.patientName}</div>
                        <div className="text-xs text-text-light-gray">Verified Patient</div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-text-light-gray">No reviews yet.</div>
            )}
          </div>
        </div>
      </section>

      {/* --- APPOINTMENT: Split Screen with Parallax --- */}
      <section id="appointment" className="relative w-full min-h-screen flex items-center bg-background overflow-hidden">
        <div className="absolute inset-0 w-full h-full lg:w-1/2 lg:right-0 bg-secondary/20">
           <Image 
             src="https://static.wixstatic.com/media/26c3d3_967fedce13684a97a8e6470b6acece41~mv2.png?originWidth=1152&originHeight=768"
             alt="Appointment Background"
             className="w-full h-full object-cover opacity-50 mix-blend-multiply"
             width={600}
           />
        </div>

        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Form Container */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">Book Your Visit</h2>
              <p className="text-text-light-gray mb-8">Fill out the form below and we'll get back to you shortly.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Full Name</label>
                    <Input 
                      required 
                      value={formData.patientName}
                      onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                      placeholder="John Doe" 
                      className="h-12 bg-gray-50 border-gray-200 focus:border-accent-blue focus:ring-accent-blue/20" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Phone</label>
                    <Input 
                      required 
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                      placeholder="(555) 000-0000" 
                      className="h-12 bg-gray-50 border-gray-200 focus:border-accent-blue focus:ring-accent-blue/20" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input 
                      required 
                      type="email"
                      value={formData.emailAddress}
                      onChange={(e) => setFormData({...formData, emailAddress: e.target.value})}
                      placeholder="john@example.com" 
                      className="h-12 bg-gray-50 border-gray-200 focus:border-accent-blue focus:ring-accent-blue/20" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Preferred Date</label>
                    <Input 
                      required 
                      type="date"
                      value={formData.preferredAppointmentDate}
                      onChange={(e) => setFormData({...formData, preferredAppointmentDate: e.target.value})}
                      className="h-12 bg-gray-50 border-gray-200 focus:border-accent-blue focus:ring-accent-blue/20" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Treatment Type</label>
                  <Select 
                    value={formData.treatmentType} 
                    onValueChange={(val) => setFormData({...formData, treatmentType: val})}
                  >
                    <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checkup">General Checkup</SelectItem>
                      <SelectItem value="cleaning">Teeth Cleaning</SelectItem>
                      <SelectItem value="whitening">Whitening</SelectItem>
                      <SelectItem value="ortho">Orthodontics</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Message (Optional)</label>
                  <Textarea 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell us about your dental needs..." 
                    className="min-h-[120px] bg-gray-50 border-gray-200 focus:border-accent-blue focus:ring-accent-blue/20 resize-none" 
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg font-semibold bg-accent-blue hover:bg-accent-blue/90 text-white rounded-xl shadow-lg shadow-accent-blue/20 transition-all"
                >
                  {isSubmitting ? 'Submitting...' : 'Confirm Appointment'}
                </Button>
              </form>
            </motion.div>

            {/* Text Content Side */}
            <div className="hidden lg:block pl-12">
              <h3 className="font-heading text-5xl font-bold mb-8 text-foreground">
                Your Smile Journey <br />
                <span className="text-accent-blue">Starts Today.</span>
              </h3>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md text-accent-blue font-bold text-xl">1</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Book Online</h4>
                    <p className="text-text-light-gray">Choose your preferred time and service in seconds.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md text-accent-blue font-bold text-xl">2</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Confirmation</h4>
                    <p className="text-text-light-gray">Our team will contact you to confirm details.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md text-accent-blue font-bold text-xl">3</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Visit Us</h4>
                    <p className="text-text-light-gray">Experience premium care at our modern clinic.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* --- CONTACT: Minimalist Info --- */}
      <section id="contact" className="w-full py-24 bg-foreground text-white">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-heading text-4xl font-bold mb-8">Visit Our Clinic</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <MapPin className="w-8 h-8 text-accent-blue mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Address</h3>
                    <p className="text-gray-400 leading-relaxed">
                      123 Dental Street, Medical District<br />
                      New York, NY 10001, USA
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <Phone className="w-8 h-8 text-accent-blue mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Phone</h3>
                    <p className="text-gray-400">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500 mt-1">Mon-Fri, 9am - 6pm</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <Mail className="w-8 h-8 text-accent-blue mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Email</h3>
                    <p className="text-gray-400">info@dentalclinic.com</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 flex gap-4">
                <Button className="bg-accent-blue text-white hover:bg-accent-blue/90">
                  Get Directions
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Call Now
                </Button>
              </div>
            </div>

            <div className="h-[400px] w-full rounded-2xl overflow-hidden bg-gray-800 relative">
               {/* Map Placeholder - In production use real map */}
               <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.682279921345!2d-73.98784368459395!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(90%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Clinic Location Map"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}