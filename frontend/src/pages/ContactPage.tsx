import { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setError('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Normally you would send the form data to your API here
      console.log('Form submitted:', formData);
      
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        message: ''
      });
      
      // Reset success message after a delay
      setTimeout(() => setSubmitSuccess(false), 5000);
      
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('เกิดข้อผิดพลาดในการส่งข้อความ โปรดลองใหม่อีกครั้ง');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-6 animate-fade-down">ส่งข้อความถึงพวกเรา!</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          มีคำถาม ข้อเสนอแนะ หรือแนะนำเมนูใหม่ๆ? เราพร้อมรับฟังทุกความคิดเห็นของคุณ
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto bg-secondary rounded-3xl p-8 shadow-xl border-2 border-black">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}
          
          {submitSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              ส่งข้อความเรียบร้อยแล้ว! ขอบคุณสำหรับข้อความของคุณ
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block font-semibold text-gray-700">
                ชื่อ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="กรอกชื่อของคุณ"
                className="input-field"
                value={formData.firstName}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="lastName" className="block font-semibold text-gray-700">
                นามสกุล <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="กรอกนามสกุลของคุณ"
                className="input-field"
                value={formData.lastName}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone" className="block font-semibold text-gray-700">
                เบอร์โทรศัพท์
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="กรอกเบอร์โทรศัพท์"
                className="input-field"
                value={formData.phone}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block font-semibold text-gray-700">
                อีเมล <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@email.com"
                className="input-field"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="block font-semibold text-gray-700">
              ข้อความ <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="พิมพ์ข้อความของคุณที่นี่..."
              className="input-field"
              value={formData.message}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </div>
          
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gray-800 hover:bg-black text-white font-bold py-3 px-12 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'กำลังส่ง...' : 'ส่ง'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactPage;