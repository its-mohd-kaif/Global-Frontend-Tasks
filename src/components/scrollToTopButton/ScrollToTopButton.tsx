import { Button } from '@cedcommerce/ounce-ui';
import React, { useEffect, useState } from 'react';
import './ScrollToTopButton.css';
import { ArrowUp } from "react-feather"

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const handleScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <>
            {isVisible && (
                <Button
                    customClass={`scroll-to-top-button`}
                    icon={<ArrowUp color="#dddddd" size={20} />}
                    type="Primary"
                    onClick={scrollToTop}
                />
            )}
        </>
    );
};

export default ScrollToTopButton;
