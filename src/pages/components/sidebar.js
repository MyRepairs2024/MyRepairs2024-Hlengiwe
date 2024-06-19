import React, { useState } from 'react';
import { FaBars, FaTimes, FaArrowRight } from 'react-icons/fa';
import { FaHome, FaCogs, FaCalendar, FaInfoCircle, FaUserFriends, FaQuestionCircle, FaPhoneAlt } from 'react-icons/fa';
import styles from '../../../styles/sidebar.module.css';

import  Link  from 'next/link';
import Icon from './Icon';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
    
      <div className={styles['sidebar-logo']}>
        <img src="/logo-w.png" alt="" />
      </div>
    
   
      <div className={styles['sidebar-links']}>
        <ul>
        
          <li>
            <Link href="/" className={styles['sidebar-link']}>
              <FaUserFriends className={styles['sidebar-icon']} />
             What We Do
            </Link>
          </li>
          <li>
            <Link href="/" className={styles['sidebar-link']}>
              <FaQuestionCircle className={styles['sidebar-icon']} />
             
            </Link>
          </li>
          <li>
            <Link href="/" className={styles['sidebar-link']}>
              <FaInfoCircle className={styles['sidebar-icon']} />
              Learn More
            </Link>
          </li>
          <li>
            <Link href="/" className={styles['sidebar-link']}>
              <FaPhoneAlt className={styles['sidebar-icon']} />
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div
        className={styles['sidebar-toggle']}
        onClick={toggleSidebar}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isOpen ? <FaTimes /> : isHovered ? <FaArrowRight /> : <FaBars />}
      </div>
    </div>
  );
};

export default Sidebar;






