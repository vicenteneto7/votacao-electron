import styled from 'styled-components'

export const LoginContainer = styled.main`
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    form {

    display: flex;
    flex-direction: column;
    align-items: center;

    height: 20rem;
    width: 20rem;
    gap: 2rem;   
    
    }
`

export const InputForm = styled.input`
      height: 2.7rem;
      width: 27.4rem;
      padding: 0 0.5rem;

      color: ${(props) => props.theme['gray-900']};

      &::placeholder{
        color: ${(props) => props.theme['gray-300']};
      }
`

export const InputLabel = styled.label`
     font-size: 1.3rem;

     color: ${(props) => props.theme['gray-300']};

`

export const ContainerLink = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        gap: 1rem;

        p{
            font-size: 1.3rem;
        }

        a{
            font-size: 1.3rem;

            color: ${(props) => props.theme['red-500']};

        }
`


