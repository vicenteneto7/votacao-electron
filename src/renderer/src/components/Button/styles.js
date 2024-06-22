import styled from 'styled-components'

export const ContainerButton = styled.button`
  height: 2.7rem;
  width: 27.4rem;
  background: ${(props) => props.theme['green-300']};
  color: white;
  border-radius: 0.2rem;
  outline: none;
  text-decoration: none;
  border: none;

  font-size: 1.4rem;
  text-align: center;
  font-weight: 100;

  cursor: pointer;

  
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }

  cursor: pointer;
`