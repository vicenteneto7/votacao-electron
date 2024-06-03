// LoginForm.jsx
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'

const loginEleitor = async (data) => {
  const response = await window.api.loginEleitor(data)
  if (!response.success) {
    throw new Error(response.message)
  }
  return response
}

export const Login = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const mutation = useMutation(loginEleitor, {
    onSuccess: (data) => {
      console.log('Login bem-sucedido:', data)
      // Lógica adicional após login bem-sucedido
      setTimeout(() => {
        navigate('/main')
      }, 1000)

      return data
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input {...register('email', { required: 'Email é obrigatório' })} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Senha</label>
        <input type="password" {...register('senha', { required: 'Senha é obrigatória' })} />
        {errors.senha && <p>{errors.senha.message}</p>}
      </div>
      <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Logando...' : 'Login'}
      </button>
      {mutation.isError && <p>{mutation.error.message}</p>}
      <a>
        Não possui conta? <Link to="/">Clique aqui</Link>
      </a>
    </form>
  )
}
