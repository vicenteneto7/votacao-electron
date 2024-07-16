import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Container, Label, Input, StyledButton, LabelUpload } from './styles';
import Upload from '../../../../assets/upload.svg';
import { ErrorMessage } from '../../../../components/ErrorMessage';
import { useAddCandidato } from '../../../../hooks/useAddCandidato';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../../constants/paths';

const schema = yup.object().shape({
  nome: yup.string().required('Digite o nome do candidato'),
  partido: yup.string().required('Digite o partido do candidato'),
  file: yup
    .mixed()
    .test('fileSize', 'Carregue arquivos de até 2MB', (value) => {
      return value && value[0]?.size <= 2000000;
    })
    .test('required', 'Escolha uma imagem', (value) => {
      return value && value.length > 0;
    }),
});

export function NewCandidato() {
  const navigate = useNavigate()

  const [fileName, setFileName] = useState('');
  const { mutate: addCandidato } = useAddCandidato();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const candidatoDataFormData = new FormData();
    candidatoDataFormData.append('nome', data.nome);
    candidatoDataFormData.append('partido', data.partido);
    candidatoDataFormData.append('file', data.file[0]);

    console.log('Enviando dados do candidato:', {
      nome: data.nome,
      partido: data.partido,
      file: data.file[0].name,
    });

    addCandidato(candidatoDataFormData, {
      onSuccess: () => {
        toast.success('Candidato criado com sucesso!');
        setTimeout(() => {
          navigate(paths.Candidates)
        }, 1000)
      },
      onError: (error) => {
        toast.error(`Erro ao criar candidato: ${error.message}`);
      },
    });
  };

  return (
    <Container>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Nome</Label>
          <Input type="text" {...register('nome')} />
          <ErrorMessage>{errors.nome?.message}</ErrorMessage>
        </div>

        <div>
          <Label>Partido</Label>
          <Input type="text" {...register('partido')} />
          <ErrorMessage>{errors.partido?.message}</ErrorMessage>
        </div>

        <div>
          <LabelUpload>
            {fileName || (
              <>
                <img src={Upload} alt="Upload" />
                Carregue a imagem do candidato
              </>
            )}
            <input
              type="file"
              id="image-input"
              accept="image/png, image/jpeg"
              onChangeCapture={(value) => {
                setFileName(value.target.files[0]?.name);
              }}
              {...register('file')}
            />
          </LabelUpload>
          <ErrorMessage>{errors.file?.message}</ErrorMessage>
        </div>

        <StyledButton type="submit">Adicionar candidato</StyledButton>
      </form>
    </Container>
  );
}
