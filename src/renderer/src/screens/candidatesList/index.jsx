// src/components/CandidateList.jsx
import { useQuery, useMutation } from 'react-query'
import { useEleitor } from '../../hooks/EleitorContext'
import { queryClient } from '../../lib/react-query'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  ButtonContainer,
  CandidateName,
  CardCandidate,
  CardInner,
  Container,
  Container2,
  ContainerItems,
  Image,
  Party
} from './styles'

import User from '../../assets/user.svg'

import Carousel from 'react-elastic-carousel'

import { MdArrowBack } from 'react-icons/md'

const fetchCandidatos = async () => {
  const response = await window.api.getCandidatos()
  if (!response.success) {
    throw new Error(response.message)
  }
  return response.candidatos
}

const voteCandidato = async ({ id_eleitor, id_candidato }) => {
  const response = await window.api.vote({ id_eleitor, id_candidato })
  if (!response.success) {
    throw new Error(response.message)
  }
  return response
}

export const CandidateList = () => {
  const navigate = useNavigate()

  const { eleitorData } = useEleitor()

  const {
    data: candidatos,
    error,
    isLoading
  } = useQuery('candidatos', fetchCandidatos, {
    refetchInterval: 1000
  })

  console.log(candidatos)

  const mutation = useMutation(voteCandidato, {
    onSuccess: () => {
      queryClient.invalidateQueries('candidatos')
      queryClient.invalidateQueries('voterVotes')
    }
  })

  const handleVote = (id_candidato) => {
    if (eleitorData.eleitorId && id_candidato) {
      mutation.mutate({ id_eleitor: eleitorData.eleitorId, id_candidato })
    } else {
      console.error('IDs de eleitor ou candidato são nulos9.')
    }
  }

  if (isLoading) return <div>Carregando candidatos...</div>
  if (error) return <div>Erro ao carregar candidatos: {error.message}</div>

  function handleClick() {
    navigate('/main')
  }

  function handleClickCarrossel() {
    navigate('/carrossel')
  }

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 400, itemsToShow: 2, itemsToScroll: 2 },
    { width: 600, itemsToShow: 3 },
    { width: 900, itemsToShow: 4 },
    { width: 1300, itemsToShow: 5 }
  ]

  return (
    <Container>
      <ButtonContainer>
        <div style={{ position: 'fixed', left: '9rem' }}>
          <Button onClick={handleClick}>
            <MdArrowBack />
            Voltar
          </Button>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <h2>Lista de Candidatos</h2>
        </div>
      </ButtonContainer>
      <Container2>
        <Carousel itemsToShow={4} style={{ width: '90%' }} breakPoints={breakPoints}>
          {candidatos.map((candidato) => (
            <ContainerItems key={candidato.id_candidato}>
              <CardInner>
                <CardCandidate>
                  <div>
                    <Image src={User}></Image>
                  </div>
                  <CandidateName>{candidato.nome}</CandidateName>
                  <Party>{candidato.partido}</Party>
                  <Button onClick={() => handleVote(candidato.id_candidato)}>Votar</Button>
                </CardCandidate>
              </CardInner>
            </ContainerItems>
          ))}
        </Carousel>
        {mutation.isError && (
          <p style={{ color: 'red' }}>Erro ao votar: {mutation.error.message}</p>
        )}
        {mutation.isSuccess && <p>Voto registrado com sucesso!</p>}
      </Container2>
    </Container>
  )
}
