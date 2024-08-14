import { useState } from "react";
import logo from "../../img/logo.png";
import styled from "styled-components";
import { SignIn } from "./signIn";
import { SignUp } from "./signUp";
export function AuthContainer() {
  const [isSignIn, setIsSignIn] = useState(true);
  return (
    <>
      <StyledLogo src={logo} alt="Logo" />
      {isSignIn ? <SignIn /> : <SignUp />}
    </>
  );
}

const StyledLogo = styled.img`
  width: 250px;
  margin-bottom: 20px;
`;
