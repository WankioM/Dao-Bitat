import React from "react";
import "./LandingPage.css";
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import Recommendations from "./Recommended/Recommended";

export const LandingPage = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    const handleUsernameClick = () => {
        if (user) {
            switch (user.role) {
                case 'lister':
                    navigate('/listerdashboard');
                    break;
                case 'agent':
                    navigate('/agentdashboard');
                    break;
                case 'buyer':
                case 'renter':
                    navigate('/buyrentdashboard');
                    break;
                default:
                    navigate('/'); // Redirect to homepage if role is unknown
                    break;
            }
        }
    };

    return (
        <div className="desktop">
            <div className="overlap-group-wrapper">
                <div className="overlap-group">
                    <div className="bg" />
                    <div className="darkoverlay">
                        <div className="search-box">
                            <img className="search" alt="Search" src="icons8-search-100-1.png" />
                        </div>
                        <p className="we-re-getting-real">
                            We&#39;re getting real about real estate. Navigate the market with transparency.
                        </p>
                        <p className="find-your-perfect">
                            Find your Perfect Fit. <br />
                            Effortlessly
                        </p>
                    </div>
                    <div className="navbar">
                        <div className="text-wrapper">Buy</div>
                        <div className="div">Rent</div>
                        <div className="text-wrapper-2">Sell</div>
                        <div className="text-wrapper-3">Advertise</div>

                        {/*Only show signin if username does not esist*/}
                        {!user && <Link to="/login" className="text-wrapper-4">Sign In</Link>}

                        {/*Insert username here if it exists*/}
                        {user && (
                            <div className="text-wrapper-6" onClick={handleUsernameClick} style={{ cursor: 'pointer' }}>
                                Hi, {user.name}
                            </div>
                        )}

                        <div className="text-wrapper-5">HAPA</div>
                    </div>
                </div>
            </div>
            <Recommendations />
        </div>
    );
};
