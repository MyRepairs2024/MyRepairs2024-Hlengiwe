import React from 'react'

const Footer = () => {
    return (
        <>
            <div className="Footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-5 col-12 ft-1">
                            <h3><span>My</span> Repairs</h3>
                            <p>make it easy to browse service alternatives, get quotes, and book local providers.</p>
                            <div className="footer-icons">
                                <i class="fa-brands fa-facebook"></i>
                                <i class="fa-brands fa-twitter"></i>
                                <i class="fa-brands fa-instagram"></i>
                                <i class="fa-brands fa-linkedin-in"></i>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-12 ft-2">
                            <h5>Quick Links</h5>
                            <ul>
                                <li className="nav-item">
                                    <a className="" href="/">Services</a>
                                </li>
                                <li className="nav-item">
                                    <a className="" href="/">Contact Us</a>
                                </li>
                                <li className="nav-item">
                                    <a className="" href="/">Services</a>
                                </li>
                                
                            </ul>
                        </div>
                        <div className="col-md-6 col-lg-4 col-12 ft-3">
                            <h5>Company</h5>
                            <p><i class="fa-solid fa-phone-volume"></i>+27714342977</p>
                            <p><i class="fa-solid fa-envelope"></i> myrepairs.co.za</p>
                            <p><i class="fa-solid fa-paper-plane"></i> Midrand, South Africa.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='Last-footer'>
                <p>Design By Shane Tambala</p>
            </div>

            <style jsx>{`
            
  
  .nav_ul li {
    padding: 0 0.6rem;
  }
  
  .nav_ul a {
    font-size: 1.05rem;
    color: #000 !important;
    font-weight: 400;
    letter-spacing: 0.5px;
  }
  
  .btn1 {
    border: 0;
    padding: 0.5rem 1.8rem;
    color: #fff;
    background-color: #01193c;
  }
  
  .btn2 {
    border: 0;
    padding: 0.5rem 1.2rem;
    color: #fff;
    background-color: #f60838;
  }
  
  .Footer {
    padding: 2rem 0;
    margin-top: 15rem;
  }
  
  .ft-1 h3 {
    font-weight: 700;
    font-family: cursive;
    letter-spacing: 2px;
    padding: 0.5rem 0;
  }
  
  .ft-1 span {
    color: #ff0066;
  }
  
  .ft-1 p {
    padding: 0rem 5rem 0.8rem 0;
    font-weight: 500;
  }
  
  .footer-icons i {
    padding: 0.4rem 0.5rem;
    background: #e1e1e1;
    color: #f60838;
    margin: 0 0.5rem;
    border-radius: 50%;
  }
  
  .footer-icons i:hover {
    background: #f60838;
    color: #fff;
    transition: 0.6s;
    cursor: pointer;
  }
  
  .Footer h5 {
    color: #f60838;
  }
  
  .ft-2 ul {
    list-style: none;
    padding-left: 0;
  }
  
  .ft-2 ul li {
    padding: 0.35rem 0;
    font-weight: 500;
  }
  
  .ft-2 ul a {
    text-decoration: none;
    color: #000;
    font-size: 1.06rem;
  }
  
  .ft-3 p {
    font-weight: 500;
    padding: 0.1rem 0;
    font-size: 1.06rem;
  }
  
  .ft-3 i {
    padding-right: 0.5rem;
  }
  
  .Last-footer {
    background: #ff0066;
    text-align: center;
    padding: 1rem 0;
  }
  
  .Last-footer p {
    margin-bottom: 0;
    font-size: 1.2rem;
    font-weight: 700;
  }
            
            `}</style>
        </>
    )
}

export default Footer
