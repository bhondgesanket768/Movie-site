import React from "react"
import { Button } from 'antd';
import "./footer.css";
import { Link } from 'react-router-dom';
import { FacebookOutlined, LinkedinOutlined, TwitterOutlined, YoutubeOutlined, InstagramOutlined, VerticalRightOutlined } from '@ant-design/icons';
import history from "../history";

function Footer() {
    return (
        <div className="footer-container">
        <section className="footer-subscription">
            <p className="footer-subscription-heading">
                Join the Movietpoint and get all the benefits
            </p>
        </section>
        <div className="footer-links">
            <div className="footer-link-wrapper">
                <div className="footer-link-items">
                    <h2>About Us</h2>
                    <Link to='/'>How it works</Link>
                    <Link to='/'>Testimonials</Link>
                    <Link to='/'>Terms of Service</Link>
                </div>
                <div class='footer-link-items'>
                    <h2>Contact Us</h2>
                    <Link to='/'>Contact</Link>
                    <Link to='/'>Support</Link>
                    <Link to='/'>Sponsorships</Link>
                </div>
            </div>
            <div className='footer-link-wrapper'>
                <div class='footer-link-items'>
                    <h2>Videos</h2>
                    <Link to='/'>Watch Videos</Link>
                    <Link to='/'>Influencer</Link>
                </div>
                <div class='footer-link-items'>
                    <h2>Social Media</h2>
                    <Link to='/'>Instagram</Link>
                    <Link to='/'>Facebook</Link>
                    <Link to='/'>Youtube</Link>
                    <Link to='/'>Twitter</Link>
                </div>
            </div>
        </div>
        <section class='social-media'>
            <div class='social-media-wrap'>
                <div class='footer-logo'>
                    <Link to='/' className='social-logo'>
                        MOVIETPOINT
                    </Link>
                </div>
                <large class='website-rights'>MOVIETPOINT © 2021</large>
                <div class='social-icons'>
                    <Link
                        class='social-icon-link facebook'
                        to='/'
                        // target='_blank'
                        aria-label='Facebook'
                    >
                        <FacebookOutlined />
                    </Link>
                    <Link
                        class='social-icon-link instagram'
                        to='/'
                        // target='_blank'
                        aria-label='Instagram'
                    >
                        <InstagramOutlined />
                    </Link>
                    <Link
                        class='social-icon-link youtube'
                        to='/'
                        // target='_blank'
                        aria-label='Youtube'
                    >
                        <YoutubeOutlined />
                    </Link>
                    <Link
                        class='social-icon-link twitter'
                        to='/'
                        // target='_blank'
                        aria-label='Twitter'
                    >
                        <TwitterOutlined />
                    </Link>
                    <Link
                        class='social-icon-link twitter'
                        to='/'
                        // target='_blank'
                        aria-label='LinkedIn'
                    >
                        <LinkedinOutlined />
                    </Link>
                </div>
            </div>
        </section>
    </div>
    )
}

export default Footer