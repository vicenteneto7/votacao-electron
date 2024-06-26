// LoginForm.jsx
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { useEleitor } from '../../../hooks/EleitorContext'
import { ContainerLink, InputForm, InputLabel, LoginContainer } from './styles'
import { ButtonAction } from '../../../components/ButtonAction'

const loginEleitor = async (data) => {
  const response = await window.api.loginEleitor(data)
  if (!response.success) {
    throw new Error(response.message)
  }
  return response
}

export const Login = () => {
  const navigate = useNavigate()

  const { putEleitorData } = useEleitor()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const mutation = useMutation(loginEleitor, {
    onSuccess: async (dataEleitor) => {
      console.log('Login bem-sucedido:', dataEleitor)

      // Lógica adicional após login bem-sucedido
      putEleitorData(dataEleitor)

      setTimeout(() => {
        if (dataEleitor.admin) {
          navigate('/admin')
        } else {
          navigate('/main')
        }
      }, 1000)

      return dataEleitor
    },
    onError: (error) => {
      console.error('Erro no login:', error)
      // Lógica adicional para tratar erro no login
    }
  })

  const onSubmit = (data) => {
    mutation.mutate(data)
  }

  return (
    <LoginContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <InputLabel>E-mail</InputLabel>
          <InputForm
            placeholder="Digite seu e-mail"
            {...register('email', { required: 'Email é obrigatório' })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <InputLabel>Senha</InputLabel>
          <InputForm
            placeholder="Digite sua senha"
            type="password"
            {...register('senha', { required: 'Senha é obrigatória' })}
          />
          {errors.senha && <p>{errors.senha.message}</p>}
        </div>
        <ButtonAction type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Logando...' : 'Login'}
        </ButtonAction>
        {mutation.isError && <p>{mutation.error.message}</p>}

        <ContainerLink>
          <p>Não possui conta?</p>
          <a>
            <Link to="/">Clique aqui</Link>
          </a>
        </ContainerLink>
      </form>
    </LoginContainer>
  )
}
