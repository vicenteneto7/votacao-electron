// src/components/CandidateList.jsx
import { useQuery, useMutation } from 'react-query'
import { useEleitor } from '../../hooks/EleitorContext'
import { queryClient } from '../../lib/react-query'

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

  return (
    <div>
      <h2>Lista de Candidatos</h2>
      <ul>
        {candidatos.map((candidato) => (
          <li key={candidato.id_candidato}>
            <span>
              {candidato.nome} ({candidato.partido})
            </span>
            <button onClick={() => handleVote(candidato.id_candidato)}>Votar</button>
          </li>
        ))}
      </ul>
      {mutation.isError && <p>Erro ao votar: {mutation.error.message}</p>}
      {mutation.isSuccess && <p>Voto registrado com sucesso!</p>}
    </div>
  )
}
