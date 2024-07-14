import { CandidatesCarousel } from '../../../components/CandidatesCarousel'
import { Container } from './styles'

export function CountVotes() {
  return (
    <Container>
      <h2>Apuração da votação</h2>

      <CandidatesCarousel />
    </Container>
  )
}
