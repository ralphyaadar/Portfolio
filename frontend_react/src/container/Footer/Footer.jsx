import React, {useState} from 'react';
import './Footer.scss';
import { AppWrap, MotionWrap } from '../../wrapper';
import { images } from '../../constants';
import { client } from '../../client';


const Footer = () => {

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email ,message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {

    setLoading(true);

    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message
    };

    client.create(contact)
          .then(() => {
            setIsFormSubmitted(true);
          })

    setLoading(false);

  };

  return(
    <>
    <h2 className='head-text'>Take a coffee & chat with me</h2>

    <div className='app__footer-cards'>
      <div className='app__footer-card'>
        <img src={images.email} alt="email"  />
        <a href="mailto:hello@micael.com" className='p-text'>hell@micael.com</a>
      </div>
      <div className='app__footer-card'>
        <img src={images.mobile} alt="mobile"  />
        <a href="tel:+1 (123) 456-789" className='p-text'>+1 (123) 456-789</a>
      </div>
    </div>

    {!isFormSubmitted ? 
    <div className='app__footer-form app__flex'>
      <div className='app__flex'>
        <input className='p-text' type="text" placeholder='Your Name'
               value={name} onChange={handleChangeInput}
               name="name"  />
      </div>
      <div className='app__flex'>
        <input className='p-text' type="email" placeholder='Your Email'
               value={email} onChange={handleChangeInput}
               name="email"  />
      </div>
      <div>
        <textarea className='p-text'
                  placeholder='Your message'
                  value={message}
                  name="message"
                  onChange={handleChangeInput}
                   />
      </div>
      <button type='button' className='p-text' onClick={handleSubmit}>
        { loading ? 'Sending' : 'Send Message' }
      </button>
    </div>
    : <div>
        <h3 className='head-text'>Thank you for getting in touch</h3>
    </div>  
  }
    </>
  )
}

export default AppWrap(MotionWrap(Footer, 'app__footer'), 'contact', 'app__primarybg');