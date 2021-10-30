import React, {useState} from 'react';
import Menu from "./Menu";
import styled from 'styled-components';
import IconButton from "../../../common/components/IconButton"
import {LoginButton} from "./index";
import {GiHamburgerMenu} from "react-icons/gi"
import {AiOutlineClose} from 'react-icons/ai';

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onClick = () => setIsOpen(!isOpen);

    return (
        <div className={"mobile"}>
            <RowContainer>
                <img src={"/images/logo.svg"} alt={"Company Logo"} />
                <IconButton handleClick={onClick} icon={isOpen ? <AiOutlineClose color={"#fff"} /> : <GiHamburgerMenu color={"#FFF"} />} />
            </RowContainer>
            {isOpen &&
                <ColumnContainer>
                    <Menu />
                    <LoginButton>Log in</LoginButton>
                </ColumnContainer>
            }
        </div>
    )
}

export default MobileMenu;

const RowContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  height: 46px;
  
  img {
    height: 100%;
    width: auto;
  }
`

const ColumnContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  background-color: var(--fg);

  border-radius: var(--border-radius);
  margin: 1rem 0;
  padding: 1rem;
  width: calc(100% - 2rem);
  
  button {
    width: 100%;
  }
`