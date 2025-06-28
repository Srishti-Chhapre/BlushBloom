const ContactUs = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-pink-600">Contact Us</h1>
      
      <div className="max-w-3xl mx-auto bg-pink-50 p-8 rounded-lg shadow">
        <form className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input type="text" placeholder="Your Name" className="w-full border border-gray-300 p-3 rounded" />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input type="email" placeholder="Your Email" className="w-full border border-gray-300 p-3 rounded" />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Message</label>
            <textarea placeholder="Your Message" rows="5" className="w-full border border-gray-300 p-3 rounded"></textarea>
          </div>

          <button className="bg-pink-500 text-white py-3 rounded hover:bg-pink-600 transition">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
