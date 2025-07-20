import { useState } from 'react';
import { assets } from '../assets/assets';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I book an appointment?",
      answer: "You can book appointments directly through our online portal by selecting your preferred doctor and available time slot"
    },
    {
      question: "What are your working hours?",
      answer: "Our clinic is open Monday to Saturday from 8:00 AM to 8:00 PM. We're closed on Sundays and public holidays."
    },
    {
      question: "Do you accept insurance?",
      answer: "Yes, we accept most major insurance providers. Please check with our front desk for specific coverage details."
    },
    {
      question: "How can I contact emergency services?",
      answer: "For emergencies, please call our 24/7 emergency hotline at +1 (555) 123-4567 or visit the nearest emergency room."
    },
    {
      question: "What COVID-19 safety measures are in place?",
      answer: "We follow all CDC guidelines including mandatory masks, social distancing, and regular sanitization of all facilities."
    }
    
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Frequently Asked Questions</h2>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side - Image */}
          <div className="w-full md:w-1/2">
            <img 
              src={assets.FAQimage} 
              alt="Healthcare professionals" 
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>
          
          {/* Right side - FAQs */}
          <div className="w-full md:w-1/2">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className=" border border-gray-400 mt-7 rounded-lg overflow-hidden shadow-sm transition-all duration-300 ease-in-out"
                >

                  <button
                    className={`w-full px-6 py-4 font-semibold text-left flex justify-between items-center transition-colors duration-300 ${
                      activeIndex === index ? 'bg-gray-300' : 'bg-gray-100 text-gray-800 hover:bg-gray-300'
                    }`}
                    onClick={() => toggleFAQ(index)}
                  >

                    <span className="font-medium">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 transform transition-transform duration-300 ${
                        activeIndex === index ? 'rotate-180 text-gray-600' : 'text-gray-600'
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>

                  </button>
                  
                  

                  <div
                    className={`transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden ${
                      activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 py-4 border-t border-gray-200">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>

                  </div>


                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;