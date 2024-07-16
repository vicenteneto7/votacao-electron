import { useQuery } from 'react-query'
import {
  ButtonContainer,
  CardCandidate,
  CardEleitor,
  CardInner,
  CardVote,
  CardVoted,
  ContainerFirst,
  ContainerItems,
  ContainerSecond,
  ContainerThird,
  CustomList,
  Image,
  MainContainer,
  Name,
  Party,
  Title,
  Voted
} from './styles'
import { LiaLongArrowAltRightSolid } from 'react-icons/lia'
import User from '../../../assets/user.svg'
import PropTypes from 'prop-types'
import { useEleitor } from '../../../hooks/EleitorContext'
import { Header } from '../../../components/Header'

export function VotesListById() {
  const { eleitorData } = useEleitor()
  const id_eleitor = eleitorData.eleitorId

  const { data, isLoading, isError } = useQuery(
    ['voterVotes', id_eleitor],
    async () => await window.api.getVoterVotes({ id_eleitor }),
    {
      refetchInterval: 1000
    }
  )

  if (isLoading) return <div>Carregando...</div>
  if (isError) return <div>Erro ao carregar os votos</div>

  const Row = ({ index, style, data }) => {
    const vote = data[index]
    return (
      <ContainerItems style={style} key={index}>
        <CardInner>
          <CardVote>
            <CardEleitor>
              <Image src={User} />
              <Name>Você</Name>
            </CardEleitor>
            <CardVoted>
              <Voted>Votou em</Voted>
              <LiaLongArrowAltRightSolid size={60} color="" />
            </CardVoted>
            <CardCandidate>
              <Image src={User} />
              <Name>{vote.candidato_nome}</Name>
              <Party>{vote.partido}</Party>
            </CardCandidate>
          </CardVote>
        </CardInner>
      </ContainerItems>
    )
  }

  Row.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        eleitor_nome: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        candidato_nome: PropTypes.string.isRequired,
        partido: PropTypes.string.isRequired
      })
    ).isRequired
  }

  return (
    <MainContainer>
      <ContainerFirst>
        <Header />
      </ContainerFirst>
      <ContainerSecond>
        <ButtonContainer>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Title>Lista de votos realizados</Title>
          </div>
        </ButtonContainer>
        <ContainerThird>
          {data && data.votes && (
            <CustomList
              height={600}
              itemCount={data.votes.length}
              itemSize={230}
              width={'100%'}
              itemData={data.votes}
              style={{ overflowY: 'scroll', overflowX: 'hidden' }} // Ocultar barras de rolagem
            >
              {Row}
            </CustomList>
          )}
        </ContainerThird>
      </ContainerSecond>
    </MainContainer>
  )
}
