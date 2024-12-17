import React, { useState, useRef } from "react";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Finder = styled.div`
  border: 1px solid #fff;
  background-color: #f6f5f0;
  border-radius: 15px;
  padding: 8px;
  box-shadow: 9px 9px 16px rgba(189, 189, 189, 0.6),
    -9px -9px 16px rgba(255, 255, 255, 0.5);
`;

const FinderOuter = styled.div`
  display: flex;
  width: 600px;
  padding: 1.5rem 2rem;
  border-radius: 10px;
  box-shadow: inset 10px 10px 15px -10px #c3c3c3,
    inset -10px -10px 15px -10px #ffffff;
`;

const FinderInner = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  flex: 1;
`;

const FinderInput = styled.input`
  height: calc(100% + 3rem);
  border: none;
  background-color: transparent;
  outline: none;
  font-size: 1.5rem;
  letter-spacing: 0.75px;
  width: 100%;
  transition: all 0.3s ease-in-out;

  &.active {
    border-color: #2c3e50;
  }

  &:disabled {
    background-color: #e0e0e0;
  }
`;

const FinderIcon = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 1rem;
  transition: all 0.2s;
  box-shadow: inset 0 0 0 20px #292929;
  border-radius: 50%;
  position: relative;

  &::after,
  &::before {
    display: block;
    content: "";
    position: absolute;
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  &::after {
    width: 10px;
    height: 10px;
    background-color: #292929;
    border: 3px solid #f6f5f0;
    top: 50%;
    position: absolute;
    transform: translateY(-50%);
    left: 0px;
    right: 0;
    margin: auto;
    border-radius: 50%;
  }

  &.active::after {
    border-width: 10px;
    background-color: #f6f5f0;
  }

  &::before {
    width: 4px;
    height: 13px;
    background-color: #f6f5f0;
    top: 50%;
    left: 20px;
    transform: rotateZ(45deg) translate(-50%, 0);
    transform-origin: 0 0;
    border-radius: 4px;
  }

  &.active::before {
    background-color: #292929;
    width: 6px;
    transform: rotateZ(45deg) translate(-50%, 25px);
  }

  &.processing {
    transform-origin: 50%;
    animation: spinner 0.3s linear infinite;
    animation-delay: 0.5s;
  }

  &.active {
    transform: translateY(-5px);
  }

  @keyframes spinner {
    0% {
      transform: rotateZ(45deg);
    }
    100% {
      transform: rotateZ(405deg);
    }
  }
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #2c3e50;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #34495e;
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

const MyComponent = () => {
  const [isActive, setIsActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const inputRef = useRef(null);
  const finderRef = useRef(null);

  // Handle focus and blur events
  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    if (inputRef.current.value.length === 0) {
      setIsActive(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setIsActive(false);
    setIsDisabled(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsDisabled(false);

      if (inputRef.current.value.length > 0) {
        setIsActive(true);
      }
    }, 1000);
  };

  return (
    <Container>
      <Finder>
        <FinderOuter>
          <FinderInner>
            <FinderIcon className={isActive ? "active" : ""} ref={finderRef} />
            <FinderInput
              ref={inputRef}
              className={isActive ? "active" : ""}
              type="text"
              name="q"
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={isDisabled}
            />
          </FinderInner>
        </FinderOuter>
      </Finder>
      <SubmitButton onClick={handleSubmit} disabled={isDisabled}>
        Submit
      </SubmitButton>
    </Container>
  );
};

export default MyComponent;
