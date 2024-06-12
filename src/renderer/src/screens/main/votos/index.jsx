import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

export function CountVotes() {
  const navigate = useNavigate()

  const { data, isLoading, isError } = useQuery(
    'countVotesPerCandidate',
    async () => await window.api.countVotesPerCandidate(),
    {
      refetchInterval: 1000
    }
  )

  if (isLoading) return <div>Carregando...</div>
  if (isError) return <div>Erro ao carregar a contagem de votos</div>

  function handleClick() {
    navigate('/main')
  }

  return (
    <div>
      <button onClick={handleClick}>Voltar</button>
      <h2>Contagem de Votos por Candidato</h2>
      {data.success ? (
        <table>
          <thead>
            <tr>
              <th>Candidato</th>
              <th>Partido</th>
              <th>Total de Votos</th>
            </tr>
          </thead>
          <tbody>
            {data.results.map((candidate) => (
              <tr key={candidate.id_candidato}>
                <td>{candidate.candidato_nome}</td>
                <td>{candidate.partido}</td>
                <td>{candidate.total_votos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>{data.message}</div>
      )}
    </div>
  )
}