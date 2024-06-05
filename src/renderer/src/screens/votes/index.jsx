import { useQuery } from 'react-query'

export function VotesList() {
  const { data, isLoading, isError } = useQuery(
    'allVoterVotes',
    async () => await window.api.getAllVoterVotes()
  )

  if (isLoading) return <div>Carregando...</div>
  if (isError) return <div>Erro ao carregar os votos</div>

  return (
    <div>
      <h2>Votos de Todos os Eleitores</h2>
      {data.success ? (
        <table>
          <thead>
            <tr>
              <th>Eleitor</th>
              <th>Email</th>
              <th>Candidato</th>
              <th>Partido</th>
            </tr>
          </thead>
          <tbody>
            {data.votes.map((vote, index) => (
              <tr key={index}>
                <td>{vote.eleitor_nome}</td>
                <td>{vote.email}</td>
                <td>{vote.candidato_nome}</td>
                <td>{vote.partido}</td>
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
