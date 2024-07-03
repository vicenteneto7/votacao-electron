import { useQuery } from 'react-query'
import Carousel from 'react-elastic-carousel'
import {
  Button,
  CandidateName,
  CardCandidate,
  CardInner,
  Container,
  ContainerItems,
  Image,
  Party
} from './styles'

import User from '../../assets/user.svg'

export function CandidatesCarousel() {
  const { data, isLoading, isError } = useQuery(
    'countVotesPerCandidate',
    async () => await window.api.countVotesPerCandidate(),
    {
      refetchInterval: 1000
    }
  )

  if (isLoading) return <div>Carregando...</div>
  if (isError) return <div>Erro ao carregar a contagem de votos</div>

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 400, itemsToShow: 2, itemsToScroll: 2 },
    { width: 600, itemsToShow: 3 },
    { width: 900, itemsToShow: 4 },
    { width: 1300, itemsToShow: 5 }
  ]

  return (
    <Container>
      <Carousel itemsToShow={4} style={{ width: '90%' }} breakPoints={breakPoints}>
        {data &&
          data.results.map((candidate) => (
            <ContainerItems key={candidate.id_candidato}>
              <CardInner>
                <CardCandidate>
                  <div>
                    <Image src={User}></Image>
                  </div>
                  <CandidateName>{candidate.candidato_nome}</CandidateName>
                  <Party>{candidate.partido}</Party>
                  <Button>{candidate.total_votos} Votos</Button>
                </CardCandidate>
              </CardInner>
            </ContainerItems>
          ))}
      </Carousel>
    </Container>
  )
}
