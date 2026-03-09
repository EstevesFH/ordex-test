import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  position: relative;
  overflow: hidden;
  background: #020617; /* Fallback */
`;

export const LoginCard = styled.div`
  position: relative;
  z-index: 10;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  padding: 40px;
  border-radius: 28px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
`;

export const LogoWrapper = styled.div`
  text-align: center;
  margin-bottom: 32px;

  .icon-box {
    width: 64px;
    height: 64px;
    border-radius: 18px;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    color: white;
    box-shadow: 0 10px 20px rgba(37, 99, 235, 0.3);
  }

  h1 {
    font-size: 1.75rem;
    font-weight: 800;
    color: white;
    margin-bottom: 4px;
    letter-spacing: -0.5px;
  }

  p {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.5);
  }
`;

export const InputGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    font-size: 0.85rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 8px;
    padding-left: 4px;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;

    svg {
      position: absolute;
      left: 16px;
      color: rgba(255, 255, 255, 0.3);
      transition: color 0.2s;
    }

    input {
      width: 100%;
      padding: 14px 16px 14px 48px;
      font-size: 0.95rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.05);
      color: white;
      outline: none;
      transition: all 0.2s;

      &:focus {
        border-color: #3b82f6;
        background: rgba(255, 255, 255, 0.08);
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        
        & + svg {
          color: #3b82f6;
        }
      }

      &::placeholder {
        color: rgba(255, 255, 255, 0.2);
      }
    }
  }
`;

export const ErrorAlert = styled.div`
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 12px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #fca5a5;
  font-size: 0.85rem;
  text-align: center;
`;

export const ActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
`;

export const ForgotLink = styled.div`
  text-align: right;
  margin-bottom: 20px;
  
  a {
    font-size: 0.85rem;
    color: #3b82f6;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;