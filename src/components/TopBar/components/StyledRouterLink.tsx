import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, useLocation, useRouteMatch } from "react-router-dom";

interface StyleRouterLinkProps {
  target?: string;
  label?: string;
  style?: any;
  onDismiss?: () => void;
  children?: any;
  mobileMenu?: boolean;
}

const StyleRouterLink: React.FC<StyleRouterLinkProps> = ({target, label, style, onDismiss, children, mobileMenu}) => {
  const [isShow, setIsShow] = useState(false);
  const [isActive, setIsActive] = useState('inactive');
  const location = useLocation();
  const match = useRouteMatch();

  useEffect(() => {
    if (children) {
      setIsActive('inactive');
      React.Children.map(children, (child: any) => {
        if (location.pathname === child.props.target) {
          setIsActive('active');
        }
      })
    }    
    if (mobileMenu && children) {
      if (location.pathname !== target) {
        if (isShow === true) {
          setIsShow(false);
        }
      }
    }
  }, [location, mobileMenu, setIsShow, target, children]);

  if (children) {
    return (
      <div 
        onMouseEnter={() => { 
          if (!mobileMenu) {
            setIsShow(true)
          }
        }} 
        onMouseLeave={() => { 
          if (!mobileMenu) {
            setIsShow(false)
          }
        }}
                onClick={() => { 
          if (mobileMenu) {
            setIsShow(!isShow);
          }
        }}
        style={mobileMenu ? {cursor: "pointer", width: "100%", textAlign: "left", display: "flex", flexDirection: "column"}
                          : {cursor: "pointer", width: "100%", textAlign: "left"}}
      >
        <StyledLink subactive={isActive} exact activeClassName="inactive" style={style} to={location}>
          {label}
          { mobileMenu && (
            <StyledSpan>{isShow === true ? '➖' : '➕'}</StyledSpan>
          )}
        </StyledLink>
        {
          isShow === true && <StyledNestedMenu>
            {children}
          </StyledNestedMenu>
        }
      </div>
    )
  } else {
    return (
      <StyledLink exact activeClassName="active" to={target || ''} style={style} onClick={onDismiss}>{label}</StyledLink>
    ) 
  }
}
interface StyledLinkProps {
  subactive?: string;
}

const StyledLink = styled(NavLink)<StyledLinkProps>`
  color: ${(props) => (props.subactive === 'active' ? props.theme.colors.primary.main : props.theme.colors.grey[500])};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => (props.subactive === 'active' ? props.theme.colors.primary.main : props.theme.colors.grey[600])};
  }
  &.active {
    color: ${(props) => props.theme.colors.primary.main};
  }
  @media (max-width: 770px) {
    box-sizing: border-box;
    color: ${(props) => (props.subactive === 'active' ? props.theme.colors.primary.main : props.theme.colors.grey[500])};
    font-size: 24px;
    font-weight: 700;
    padding: ${(props) => props.theme.spacing[3]}px ${(props) => props.theme.spacing[4]}px;
    text-align: left;
    text-decoration: none;
    width: 100%;
    &:hover {
      color: ${(props) => (props.subactive === 'active' ? props.theme.colors.primary.main : props.theme.colors.grey[600])};
    }
    &.active {
      color: ${(props) => props.theme.colors.primary.main};
    }
  }
`;

const StyledNestedMenu = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  @media (max-width: 770px) {
    position: relative;
    background-color: rgba(194 , 163, 174, 0.33);
    padding-left: 30px;
  }
`;

const StyledSpan = styled.span`
  position: absolute;
  right: 20px;
  font-size: 20px;
`;

export default StyleRouterLink;