import React, { useEffect, useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

// Global styles
const GlobalStyles = createGlobalStyle`
  @font-face {
    src: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/2479807/CosiAzure-Black.woff2') format('woff2');
    font-family: 'Cosi Azure';
  }

  @font-face {
    src: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/2479807/ageo-regular.woff2') format('woff2');
    font-family: 'Ageo';
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  img {
    max-width: 100%;
  }

  a {
    display: inline-block;
    text-decoration: none;
    color: inherit;
  }

  html {
    font-size: 100%;
  }

  body {
    font-family: 'Cosi Azure', sans-serif;
    text-rendering: optimizeLegibility;
    color: white;
    background-color: #151515;
  }

  p {
    margin-bottom: 1.15rem;
  }

  h1, h2, h3, h4, h5 {
    margin: 2.75rem 0 1.05rem;
    font-weight: 400;
    line-height: 1.15;
  }

  h1 {
    margin-top: 0;
    font-size: 4.209em;
  }

  h2 { font-size: 3.157em; }

  h3 { font-size: 2.369em; }

  h4 { font-size: 1.777em; }

  h5 { font-size: 1.333em; }

  small { font-size: 0.75em; }
`;

// Styled components
const Intro = styled.div`
  position: fixed;
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
  background-color: white;
  z-index: 5;
`;

const IntroTitle = styled.div`
  color: white;
  max-width: 45%;
  text-align: center;
  mix-blend-mode: difference;
  z-index: 2;
  transform: translateY(40px);
  font-size: 10rem;
`;

const IntroBackground = styled.div`
  position: absolute;
  top: 0;
  background-color: black;
  width: 100%;
  height: 100%;
  transform: scaleX(0);

  &--left {
    left: 0;
    transform-origin: left center;
  }

  &--right {
    left: 50%;
    transform-origin: right center;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 64px 0;
  max-width: 70vw;
  margin: 0 auto;
`;

const HeaderLogo = styled.div`
  display: flex;
  align-items: center;

  .dot {
    display: inline-block;
    height: 24px;
    width: 24px;
    background-color: #7a3828;
    border-radius: 50%;
  }

  .dot:last-child {
    height: 16px;
    width: 16px;
    margin-left: 4px;
  }
`;

const HeaderNav = styled.nav`
  font-family: "Ageo", sans-serif;
  letter-spacing: 0.05em;
  text-transform: lowercase;

  > *:not(:last-child) {
    margin-right: 8px;
  }
`;

const Hero = styled.section`
  display: grid;
  grid-template-columns: 35% 40% 25%;
  height: 100vh;
`;

const HeroCol = styled.div`
  height: 100vh;
  background-size: cover;

  &--1 {
    padding-top: 20%;

    h1 {
      position: relative;
      font-size: 220px;
      transform: translateX(50%);
      z-index: 3;
    }
  }

  &--2 {
    img {
      object-fit: cover;
      height: 100%;
    }
  }

  &--3 {
    /* This column can be used for additional content */
  }
`;

const Hidden = styled.div`
  visibility: hidden;
  opacity: 0;
`;

const ErrorPage = () => {
  const introTitleRef = useRef(null);
  const introBackgroundLeftRef = useRef(null);
  const introBackgroundRightRef = useRef(null);
  const headerLogoRef = useRef(null);
  const headerNavLinksRef = useRef(null);
  const heroCol2ImgRef = useRef(null);
  const navigate = useNavigate();
  const animationOptions = {
    ease: "expo.inOut",
  };

  useEffect(() => {
    // 3초 후에 "/"로 이동
    const timeout = setTimeout(() => {
      navigate("/");
    }, 6000);

    // 컴포넌트가 언마운트될 때 타이머를 정리
    return () => clearTimeout(timeout);
  }, [navigate]);

  const introAnimation = () => {
    const tl = gsap.timeline({
      defaults: {
        ease: animationOptions.ease,
        duration: 1,
      },
    });

    tl.to(introTitleRef.current, {
      duration: 1.5,
      y: 0,
      autoAlpha: 1,
      delay: 0.5,
    })
      .to([introBackgroundLeftRef.current, introBackgroundRightRef.current], {
        scaleX: 1,
      })
      .to([introBackgroundLeftRef.current, introBackgroundRightRef.current], {
        scaleY: 0,
        transformOrigin: "top center",
      })
      .to(
        introTitleRef.current,
        {
          duration: 1.5,
          y: -60,
          autoAlpha: 0,
        },
        "-=0.6"
      )
      .to(
        ".intro",
        {
          y: "-100%",
        },
        "-=0.5"
      );

    return tl;
  };

  const skewInElements = (elements) => {
    const tl = gsap.timeline();

    tl.from(elements, {
      duration: 1,
      ease: animationOptions.ease,
      skewY: -5,
      autoAlpha: 0,
      y: 40,
    });

    return tl;
  };

  const fadeInElements = (elements) => {
    const tl = gsap.timeline();

    tl.from(elements, {
      duration: 1,
      ease: animationOptions.ease,
      y: "20px",
      autoAlpha: 0,
      stagger: 0.1,
    });

    return tl;
  };

  useEffect(() => {
    const master = gsap.timeline({
      paused: false,
      delay: 0.2,
    });

    // Make sure refs are not null
    if (
      introTitleRef.current &&
      introBackgroundLeftRef.current &&
      introBackgroundRightRef.current
    ) {
      master
        .add(introAnimation())
        .add(fadeInElements([headerLogoRef.current, headerNavLinksRef.current]))
        .add(skewInElements([heroCol2ImgRef.current]), "-=1");
    }
  }, []);

  return (
    <>
      <GlobalStyles />
      <Intro>
        <IntroTitle ref={introTitleRef}>404 Error</IntroTitle>
        <IntroBackground
          ref={introBackgroundLeftRef}
          className="intro__background--left"
        />
        <IntroBackground
          ref={introBackgroundRightRef}
          className="intro__background--right"
        />
      </Intro>
      <Header>
        <HeaderLogo ref={headerLogoRef}>
          <div className="dot"></div>
          <div className="dot"></div>
        </HeaderLogo>
        <HeaderNav ref={headerNavLinksRef}>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </HeaderNav>
      </Header>
      <Hero>
        <HeroCol className="hero__col--1">
          <h1>Hero Title</h1>
        </HeroCol>
        <HeroCol className="hero__col--2">
          <img ref={heroCol2ImgRef} src="your-image.jpg" alt="Hero Image" />
        </HeroCol>
        <HeroCol className="hero__col--3"></HeroCol>
      </Hero>
    </>
  );
};

export default ErrorPage;
