import Footer from "../components/footer";
import '../CSS/AboutMe.css'; 
/*import Member from '../components/member_profile';*/
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { FaAward } from "react-icons/fa"; // Import the award icon

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const journeyRef = useRef<HTMLDivElement>(null);
    const splitLayoutRef = useRef<HTMLDivElement>(null);
    const timelineMain = useRef<HTMLDivElement>(null);
    const timelineEnd = useRef<HTMLDivElement>(null);
    const heroSectionRef = useRef<HTMLDivElement>(null);
    const heroImageRef = useRef<HTMLImageElement>(null);
    const [selectedMember, setSelectedMember] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const members = [
        {
            imageUrl: "/images/People/thesingersf.png",
            name: "Sophia Bennett",
            position: "Vocalist",
            description:
                "Sophia Bennett, a captivating vocalist, possesses a powerful and soulful voice that effortlessly blends raw emotion with technical precision. Her stage presence and vocal range have mesmerized audiences worldwide.",
            details:
                "Sophia has been singing since she was 5 years old. She draws inspiration from artists like Adele and Freddie Mercury. Her powerful voice has been the backbone of the band's success. She has performed at over 200 concerts and is known for her ability to connect deeply with the audience.",
            awards: [
                "Best Female Vocalist - Music Awards 2018",
                "Top Performer - Global Music Festival 2020",
                "Vocal Excellence Award - National Music Awards 2021",
            ],
        },
        {
            imageUrl: "/images/People/theguitaristsf.png",
            name: "Ryan Ali",
            position: "Guitarist",
            description:
                "Ryan Ali, a gifted guitarist with a fiery stage presence, delivers electrifying solos and intricate riffs that ignite the energy of every performance. His passion for music is evident in every note he plays.",
            details:
                "Ryan started playing guitar at the age of 10. He is known for his intricate riffs and solos, inspired by legends like Jimi Hendrix and Slash. Ryan has composed over 50 original tracks and is the creative force behind many of the band's hit songs.",
            awards: [
                "Best Guitar Solo - Rock Awards 2017",
                "Innovative Guitarist of the Year - Music Creators Guild 2019",
                "Lifetime Achievement in Guitar - Global Music Awards 2022",
            ],
        },
        {
            imageUrl: "/images/People/thepianistsf.png",
            name: "Emily Young",
            position: "Pianist",
            description:
                "Emily Young, a pianist renowned for her powerful and driving grooves, provides the solid foundation that anchors the band’s sound. Her unique style blends classical training with modern influences.",
            details:
                "Emily is the heart of the rhythm section. Her piano melodies are influenced by funk and jazz, giving the band a unique groove. She has been playing piano since she was 7 years old and has collaborated with several renowned artists in the industry.",
            awards: [
                "Best Pianist - Jazz Fusion Awards 2016",
                "Outstanding Musician - National Music Festival 2018",
                "Piano Virtuoso Award - Classical Meets Modern 2021",
            ],
        },
        {
            imageUrl: "/images/People/thedrummersf.png",
            name: "Liam Carter",
            position: "Drummer",
            description:
                "Liam Carter, a dynamic drummer with impeccable timing and explosive energy, provides the driving force behind the band’s powerful sound. His drumming style is a mix of rock, metal, and jazz.",
            details:
                "Liam's drumming style is a mix of rock and metal. He has been playing drums for over 15 years and is the energy powerhouse of the band. Liam is known for his high-energy performances and his ability to keep the band in perfect rhythm.",
            awards: [
                "Best Drummer - Rock Legends Awards 2015",
                "Percussionist of the Year - Music Innovators Guild 2019",
                "Drumming Excellence Award - Global Music Awards 2021",
            ],
        },
    ];

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (timelineMain.current) {
            ScrollTrigger.create({
                trigger: splitLayoutRef.current,
                start: "top top",
                endTrigger: timelineEnd.current,
                end: `top-=250vh top`,
                pin: journeyRef.current,
                pinSpacing: false,
            });
        }

          if (heroSectionRef.current && heroImageRef.current) {
              const heroSection = heroSectionRef.current;
              const heroImage = heroImageRef.current;
  
              ScrollTrigger.create({
                  trigger: heroSection,
                  start: "top top",
                  end: "bottom top",
                  scrub: true,
                  onUpdate: (self) => {
                      const progress = self.progress; // Progress from 0 to 1
                      const brightness = 1 - (progress*1.5); // Brightness decreases as you scroll
                      heroImage.style.filter = `brightness(${brightness})`;
                  },
              });
          }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    useEffect(() => {
      const canvas = document.getElementById("timeline-canvas") as HTMLCanvasElement;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      const dpr = window.devicePixelRatio || 1;
      const setCanvasSize = () => {
          canvas.width = window.innerWidth * dpr;
          canvas.height = window.innerHeight * dpr;
          ctx.scale(dpr, dpr);
      };
      
      setCanvasSize();
      window.addEventListener('resize', setCanvasSize);
      
      interface Particle {
          x: number;
          y: number;
          radius: number;
          speed: number;
          velocityX: number;
          velocityY: number;
          color: string;
      }
      
      const particles: Particle[] = [];
      const numParticles = 300;
      const scrollSpeedFactor = 0.5;
      
      for (let i = 0; i < numParticles; i++) {
          particles.push({
              x: Math.random() * canvas.width / dpr,
              y: Math.random() * canvas.height / dpr,
              radius: Math.random() * 5 + 1,
              speed: Math.random() * 2 + 0.5,
              velocityX: (Math.random() - 0.5) * 0.2,
              velocityY: (Math.random() - 0.5) * 0.2,
              color: `rgb(${Math.floor(200 + Math.random() * 55)}, ${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 50)})`,
          });
      }
      
      let lastScrollY = window.scrollY;
      let animationFrameId: number;
      
      function animate() {
          if (!ctx) return;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const scrollDelta = (window.scrollY - lastScrollY) * 0.6;
      
          const actualWidth = canvas.clientWidth;
          const actualHeight = canvas.clientHeight;
      
          particles.forEach((particle) => {
              particle.y += scrollDelta * (1 - particle.speed * scrollSpeedFactor);
              particle.x += particle.velocityX;
              particle.y += particle.velocityY;
      
              if (particle.x > canvas.width / dpr) particle.x = 0;
              if (particle.x < 0) particle.x = canvas.width / dpr;
              if (particle.y > canvas.height / dpr) particle.y = 0;
              if (particle.y < 0) particle.y = canvas.height / dpr;
      
              const xRadius = particle.radius * (canvas.width / actualWidth);
              const yRadius = particle.radius * (canvas.height / actualHeight);
      
              ctx.beginPath();
              ctx.ellipse(particle.x, particle.y, xRadius, yRadius, 0, 0, Math.PI * 2);
              ctx.fillStyle = particle.color;
              ctx.fill();
              ctx.closePath();
          });
      
          lastScrollY = window.scrollY;
          animationFrameId = requestAnimationFrame(animate);
      }
      
      animate();
      

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
      <div
        className="responsive-container"
        style={{ overflow: "hidden", height: "100%" }}
      >
        <motion.div
          ref={heroSectionRef}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "black",
            marginTop: "20px",
            position: "relative",
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <img
              ref={heroImageRef}
              src={` /images/aboutmenew.jpg`}
              alt="Stage Fright Tour"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div className="hero2-overlay">
              <h1>About Us</h1>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        {isMobile ? (
          <div className="timeline-section-mobile">
            {[
              {
                year: "2001",
                text: "We started as a small group creating tunes in our garage. We didn't have much to our name but we all had a love for music."
              },
              {
                year: "2006",
                text: "As time passed our crew started to get busy with their lives, leaving behind our jam sessions."
              },
              {
                year: "2007",
                text: "One day our lead guitarist Ryan decided to post one of our sounds on SoundCloud, sparking immense interest."
              },
              {
                year: "2010",
                text: "We officially became a band and started creating music under the name Stage Fright."
              },
              {
                year: "2015",
                text: "After dropping our debut album Resounding, we earned awards and grew rapidly."
              },
              {
                year: "2020",
                text: "After 10 successful years, we went on our first tour, sharing our music with the world."
              }
            ].map((event, idx) => (
              <div key={idx} className="timeline-event-mobile">
                <h2 className="timeline-mobile-year">{event.year}</h2>
                <p className="timeline-mobile-description">{event.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="timeline-section">
            <video
              className="timeline-video"
              src="/images/mosh-pit-background.mp4"
              autoPlay
              loop
              muted
            ></video>
            {/* Canvas Layer */}
            <canvas id="timeline-canvas"></canvas>
            {/* Content Layer */}
            <div className="timeline-content" ref={timelineMain}>
              {/* Pinned "Our Journey" Section */}
              <div ref={journeyRef} className="timeline-left">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className="timeline-left-dash" />
                  <h1 className="timeline-left-title">
                    OUR <br /> JOURNEY
                  </h1>
                </div>
              </div>
              {/* Scrollable Timeline Section */}
              <div ref={splitLayoutRef} className="timeline-right">
                <div className="timeline-right-section" style={{ marginTop: "25vh" }}>
                  <h2 className="timeline-right-year">2001</h2>
                  <p className="timeline-description">
                    We started as a small group creating tunes in our garage. We didn't have much to our name but we all had a love for music.
                  </p>
                </div>
                <div className="timeline-right-section">
                  <h2 className="timeline-right-year">2006</h2>
                  <p className="timeline-description">
                    As time passed our crew started to get busy with their lives, leaving behind our jam sessions.
                  </p>
                </div>
                <div className="timeline-right-section">
                  <h2 className="timeline-right-year">2007</h2>
                  <p className="timeline-description">
                    One day our lead guitarist Ryan decided to post one of our sounds on SoundCloud, sparking immense interest.
                  </p>
                </div>
                <div className="timeline-right-section">
                  <h2 className="timeline-right-year">2010</h2>
                  <p className="timeline-description">
                    We officially became a band and started creating music under the name Stage Fright.
                  </p>
                </div>
                <div className="timeline-right-section">
                  <h2 className="timeline-right-year">2015</h2>
                  <p className="timeline-description">
                    After dropping our debut album Resounding, we earned awards and grew rapidly.
                  </p>
                </div>
                <div className="timeline-right-section" ref={timelineEnd} style={{ marginBottom: "25vh" }}>
                  <h2 className="timeline-right-year">2020</h2>
                  <p className="timeline-description">
                    After 10 successful years, we went on our first tour, sharing our music with the world.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="meet-the-band-section">
          <h2 className="meet-the-band-title">Our Members</h2>
          <div className={`band-tiles ${isMobile ? "mobile-grid" : ""}`}>
            {members.map((member, index) => (
              <div
                key={index}
                className={`band-tile ${selectedMember === index ? "active" : ""}`}
                onClick={() => setSelectedMember(index)}
              >
                <div
                  className="band-tile-image"
                  style={{ backgroundImage: `url(${member.imageUrl})` }}
                ></div>
                <div className="band-tile-overlay">
                  <h3>{member.name}</h3>
                  <p>{member.position}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Dynamic Information Section */}
          <div className="member-details">
            <div className={`member-details-container ${isMobile ? 'mobile' : ''}`}>
              {/* Left: Member Image */}
              <div
                className="member-details-image"
                style={{
                  backgroundImage: `url(${members[selectedMember].imageUrl})`,
                }}
              ></div>

              {/* Middle: Member Description */}
              <div className="member-details-description">
                <h3>{members[selectedMember].name}</h3>
                <h4>{members[selectedMember].position}</h4>
                <p>{members[selectedMember].description}</p>
              </div>

              {/* Right: Member Awards */}
              <div className="member-details-awards">
                <h5>Awards & Achievements</h5>
                <ul>
                  {members[selectedMember].awards.map((award, index) => (
                    <li key={index}>
                      <FaAward className="award-icon" />
                      <span>{award}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
}