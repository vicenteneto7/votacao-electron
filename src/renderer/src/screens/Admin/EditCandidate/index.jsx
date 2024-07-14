import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Container, Label, Input, StyledButton, LabelUpload } from './styles'
import Upload from '../../../assets/upload.svg'
import { paths } from '../../../constants/paths'

export function EditCandidate() {
  const { state: candidate } = useLocation()
  const navigate = useNavigate()
  const [fileName, setFileName] = useState('')

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: candidate.candidato_nome,
      partido: candidate.partido
    }
  })

  const onSubmit = async (data) => {
    try {
      let fileData = null

      if (data.file[0]) {
        fileData = await fileToBase64(data.file[0])
      }

      const candidateData = {
        id_candidato: candidate.id_candidato,
        nome: data.name,
        partido: data.partido,
        file: fileData ? { name: data.file[0].name, data: fileData } : null
      }

      await window.api.editCandidato(candidateData)

      toast.success('Candidato editado com sucesso!')
      setTimeout(() => {
        navigate(paths.Candidates)
      }, 1000)
    } catch (error) {
      toast.error('Erro ao editar candidato!')
      console.error(error)
    }
  }

  return (
    <Container>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Nome</Label>
          <Input type="text" {...register('name')} />
        </div>

        <div>
          <Label>Partido</Label>
          <Input type="text" {...register('partido')} />
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
                setFileName(value.target.files[0]?.name)
              }}
              {...register('file')}
            />
          </LabelUpload>
        </div>

        <StyledButton type="submit">Editar candidato</StyledButton>
      </form>
    </Container>
  )
}

async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result.split(',')[1])
    reader.onerror = (error) => reject(error)
  })
}