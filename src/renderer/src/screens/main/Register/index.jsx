// RegisterForm.jsx
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

const addEleitor = async (data) => {
  const response = await window.api.registerEleitor(data);
  if (!response.success) {
    throw new Error(response.message);
  }
  return response;
};

export const Register = () => {
  const navigate = useNavigate()


  const { register, handleSubmit, formState: { errors } } = useForm();

  const mutation = useMutation(addEleitor, {
    onSuccess: (data) => {
      console.log('Registro bem-sucedido:', data);
      // Lógica adicional após registro bem-sucedido
      setTimeout(() => {
        navigate('/main')
      }, 1000)
    },
    onError: (error) => {
      console.error('Erro no registro:', error);
      // Lógica adicional para tratar erro no registro
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nome</label>
        <input {...register('nome', { required: 'Nome é obrigatório' })} />
        {errors.nome && <p>{errors.nome.message}</p>}
      </div>    
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
        {mutation.isLoading ? 'Registrando...' : 'Registrar'}
      </button>
      {mutation.isError && <p>{mutation.error.message}</p>}
      <a>Já possui conta? <Link to='/login'>Clique aqui</Link></a>
    </form>
  );
};
