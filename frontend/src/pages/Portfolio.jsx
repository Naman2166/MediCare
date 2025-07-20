import { motion } from 'framer-motion';
import { useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';

export default function Portfolio() {

  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  return (


    <div className="bg-gray-50 min-h-screen font-sans text-gray-800 mb-[-5%] max-w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="h-70 flex flex-col justify-center items-center bg-gradient-to-r from-blue-600 to-blue-2  00 text-white relative">
        {/* Profile Image */}
        <motion.img 
          src={assets.portfolio_image}    // Add your image path here
          alt="Profile"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay:0.3, duration: 1 }}
          className="rounded-full w-40 h-40 mb-6 mt-10"
        />
        <motion.h1 
          initial={{ opacity: 0, x: -110 }} 
          whileInView={{ opacity:1 , x: 0}}
          transition={{ delay: 0.3, duration: 1.2 }}
          className="text-black text-5xl font-bold mb-4" //current
        >
          Hi, I'm Naman Patel
        </motion.h1> 

        <motion.p 
          initial={{ opacity: 0, x: 110 }} 
          whileInView={{ opacity:1 , x: 0}} 
          transition={{ delay: 0.3, duration: 1.2 }}
          className="text-gray-800 text-xl font-medium mb-10"
        >
          Full Stack Developer | MERN | Java | DSA
        </motion.p>
      </section>




      {/* About Section */}
      <section className="p-10 max-w-4xl mx-auto bg-white shadow-lg shadow-gray-700 rounded-lg my-8 border ">
        <motion.h2 
          className="text-3xl font-bold mb-4 text-center text-purple-700"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -70 }}
          transition={{ duration: 0.8 }}
        >
          About Me
        </motion.h2>

        <motion.p 
          whileInView={{opacity: 1, y: 0}}
          initial={{ opacity: 0, y: 50 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          I'm a 3rd-year Computer Science student and a Full Stack Web Developer specializing in MERN stack, Java, and immersive tech like VR & AR using A-Frame. I'm passionate about building impactful web experiences and solving real-world problems through code.
        </motion.p>
      </section>





      {/* Skills Section */}
      <section className="bg-gradient-to-r from-blue-100 to-indigo-200 py-10 px-6 rounded-lg shadow-lg">
        <motion.h2 
          className="text-3xl font-bold mb-6 text-center text-indigo-800"
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.8 }}
        >
          Skills
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-4">
          {['React', 'Node.js','Express.js', 'MongoDB','SQL', 'Java','C++', 'Tailwind CSS'].map((skill, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, x: -90 }} 
              whileInView={{ opacity:1 , x: 0}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="bg-indigo-100 px-4 py-2 rounded-full text-indigo-700 shadow-md "
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </section>





      {/* Projects Section */}
      <section className="py-10 px-6 bg-gray-100">
        <motion.h2 
          className="text-3xl font-bold mb-6 text-center text-pink-700"
          whileInView={{ opacity: 1 , y:0 }}
          initial={{ opacity: 0 , y:-50 }}
          transition={{ duration: 1 , delay:0.3}}
        >
          Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {[{
            name: 'Doctor Appointment Booking System',
            description: 'A React-based web app to find doctors, view their profiles, and book appointment slots with a user-friendly and responsive interface.',
            image: assets.logo ,// Replace with your project image
            onClick: ()=>{navigate('/'); scrollTo(0,0)}
          }, {
            name: 'Spotify-Clone',
            description: 'A responsive Spotify clone built using HTML and CSS, replicating the UI and basic layout of the original music platform.',
            image: assets.logo_spotify, // Replace with your project image
            onClick: ()=>{window.location.href = '/Spotify.html'; scrollTo(0,0)}
          }].map((project, index) => (
            
            <motion.div                          //Project Cards
              initial={{opacity:0, y:50}}
              whileInView={{opacity:1, y:0}}
              whileHover={{ scale: 1.04 }}
              onClick={project.onClick}
              className="bg-white p-5 rounded-xl shadow-lg shadow-gray-700 border hover:border-blue-500 transition cursor-pointer"
            >
              <img src={project.image} alt={project.name} className="rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
              <p className="text-gray-600">{project.description}</p>
              
            </motion.div>
          ))}
        </div>
      </section>





      {/* Contact Section */}
      <section className="py-10 px-6 bg-purple-700 text-white text-center">
        <motion.h2 
          className="text-3xl font-bold mb-4"
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          Contact Me
        </motion.h2>

        <motion.p 
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className='text-black text-lg font-bold'
        >
          Let's work together! Reach out at <a href="mailto:namanp2166@gmail.com" className="text-blue-00 underline">namanp2166@gmail.com</a>
          
          <br />
           
          <div className='flex gap-3 justify-center mt-2 '> 
          <SocialIcon url="https://www.linkedin.com/in/naman-patel-a17443288" target='_blank' rel="noopener noreferrer" className='transform transition-transform hover:scale-110' />
          <SocialIcon url="https://github.com/Naman2166?tab=repositories" target='_blank' rel="noopener noreferrer" className='transform transition-transform hover:scale-110' />
          <SocialIcon url="https://www.instagram.com/namann.77?igsh=dWQ0d2pueXA4MWRo&utm_source=qr" target='_blank' rel="noopener noreferrer" className='transform transition-transform hover:scale-110' />
          </div>
          
        </motion.p>
      </section>
    </div>
  );
}
