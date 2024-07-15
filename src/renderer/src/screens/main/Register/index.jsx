// RegisterForm.jsx
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { RegisterContainer, InputForm, InputLabel, ContainerLink, ErrorMessage } from './styles' // Importando os estilos
import { ButtonAction } from '../../../components/ButtonAction'

const addEleitor = async (data) => {
  const response = await window.api.registerEleitor(data)
  if (!response.success) {
    throw new Error(response.message)
  }
  return response
}

export const Register = () => {
  const navigate = useNavigate()

  const schema = Yup.object().shape({
    nome: Yup.string('Digite um nome válido').required('O nome é obrigatório'),
    email: Yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
    senha: Yup.string('Digite uma senha válida').required('A senha é obrigatória'),
    confirmarSenha: Yup.string()
      .required('A confirmação de senha é obrigatória')
      .oneOf([Yup.ref('senha')], 'As senhas devem ser iguais')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const mutation = useMutation(addEleitor, {
    onSuccess: (data) => {
      console.log('Registro bem-sucedido:', data)
      toast.success('Registro criado com sucesso')
      setTimeout(() => {
        navigate('/main')
      }, 1000)
    },
    onError: (error) => {
      console.error('Erro no registro:', error)
      toast.error('Erro no registro. Tente novamente.')
    }
  })

  const onSubmit = (data) => {
    mutation.mutate(data)
  }

  return (
    <RegisterContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <InputLabel>Nome</InputLabel>
          <InputForm placeholder="Digite seu nome" {...register('nome')} />
          {errors.nome && <ErrorMessage>{errors.nome.message}</ErrorMessage>}
        </div>
        <div>
          <InputLabel>Email</InputLabel>
          <InputForm placeholder="Digite seu e-mail" {...register('email')} />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div>
          <InputLabel>Senha</InputLabel>
          <InputForm placeholder="Digite sua senha" type="password" {...register('senha')} />
          {errors.senha && <ErrorMessage>{errors.senha.message}</ErrorMessage>}
        </div>
        <div>
          <InputLabel>Confirmar senha</InputLabel>
          <InputForm
            placeholder="Digite sua senha novamente"
            type="password"
            {...register('confirmarSenha')}
          />
          {errors.confirmarSenha && <ErrorMessage>{errors.confirmarSenha.message}</ErrorMessage>}
        </div>
        <ButtonAction type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Registrando...' : 'Registrar'}
        </ButtonAction>
        {mutation.isError && <ErrorMessage>{mutation.error.message}</ErrorMessage>}

        <ContainerLink>
          <p>Já possui conta?</p>
          <a>
            <Link to="/login">Clique aqui</Link>
          </a>
        </ContainerLink>
      </form>
    </RegisterContainer>
  )
}
