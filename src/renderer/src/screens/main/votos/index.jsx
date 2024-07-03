import { useNavigate } from 'react-router-dom'
import { CandidatesCarousel } from '../../../components/CandidatesCarousel'
import { Container } from './styles'
import { Header } from '../../../components/Header'

export function CountVotes() {
  const navigate = useNavigate()

  function handleClickCarouselForm() {
    navigate('/votosCarrossel')
  }

  return (
    <Container>
      <h2>Apuração da votação</h2>

      <CandidatesCarousel />
    </Container>
  )
}
