"use client";

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure GSAP is available
    if (typeof window === 'undefined') return;

    const loader = document.querySelector('.loading-screen');
    const logo = document.querySelector('.loading-logo');
    const spinner = document.querySelector('.loading-spinner');
    const progressBar = document.querySelector('.loading-progress');

    if (!loader || !logo || !spinner) return;

    // Set initial states
    gsap.set(logo, { opacity: 0, scale: 0.8, y: 20 });
    gsap.set(spinner, { opacity: 0, rotation: 0 });
    gsap.set(progressBar, { scaleX: 0 });

    // Create entrance animation timeline
    const entranceTl = gsap.timeline();

    // Logo reveal with scale and fade
    entranceTl
      .to(logo, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
      })
      .to(
        spinner,
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.4'
      )
      .to(
        progressBar,
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'expo.out',
        },
        '-=0.8'
      );

    // Continuous spinner rotation
    gsap.to(spinner, {
      rotation: 360,
      duration: 2,
      ease: 'none',
      repeat: -1,
    });

    // Simulate loading progress
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 90) {
        progress = 90; // Cap at 90% until page is fully loaded
      }
      gsap.to(progressBar, {
        scaleX: progress / 100,
        duration: 0.3,
        ease: 'power2.out',
      });
    }, 200);

    // Check if page is fully loaded
    const handleLoad = () => {
      // Complete progress bar
      gsap.to(progressBar, {
        scaleX: 1,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
          // Exit animation
          const exitTl = gsap.timeline({
            onComplete: () => {
              setIsLoading(false);
              if (loader) {
                (loader as HTMLElement).style.display = 'none';
              }
              // Add class to body for content animation
              document.body.classList.add('page-loaded');
              // Animate main content fade-in
              const mainContent = document.querySelector('main, .nav-outer');
              if (mainContent) {
                gsap.fromTo(
                  mainContent,
                  { opacity: 0, y: 20 },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                  }
                );
              }
            },
          });

          exitTl
            .to(
              [logo, spinner, progressBar],
              {
                opacity: 0,
                scale: 0.95,
                y: -30,
                duration: 0.6,
                ease: 'power3.in',
              },
              0
            )
            .to(
              loader,
              {
                opacity: 0,
                y: '-100%',
                duration: 0.9,
                ease: 'expo.in',
              },
              '-=0.2'
            );
        },
      });

      clearInterval(progressInterval);
    };

    // Check if already loaded
    if (document.readyState === 'complete') {
      setTimeout(handleLoad, 800); // Minimum display time for smooth UX
    } else {
      window.addEventListener('load', handleLoad);
      // Fallback: remove loader after max 3 seconds
      setTimeout(handleLoad, 3000);
    }

    return () => {
      clearInterval(progressInterval);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="loading-screen">
      <div className="loading-content">
        {/* Logo */}
        <div className="loading-logo-wrapper">
          <img
            src="/safelines_logo-removebg-preview.png"
            alt="Safe Lines Logo"
            className="loading-logo"
            loading="eager"
          />
        </div>

        {/* Spinner */}
        <div className="loading-spinner-wrapper">
          <div className="loading-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="loading-progress-wrapper">
          <div className="loading-progress-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

