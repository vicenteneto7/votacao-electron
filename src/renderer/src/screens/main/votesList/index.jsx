import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  ButtonContainer,
  CardCandidate,
  CardEleitor,
  CardInner,
  CardVote,
  CardVoted,
  Container,
  Container2,
  ContainerItems,
  CustomList,
  Image,
  Name,
  Party,
  Title,
  Voted
} from './styles';
import { MdArrowBack } from 'react-icons/md';
import { LiaLongArrowAltRightSolid } from 'react-icons/lia';

import PropTypes from 'prop-types';

import User from '../../../assets/user.svg';

export function VotesList() {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery(
    'allVoterVotes',
    async () => await window.api.getAllVoterVotes(),
    {
      refetchInterval: 1000
    }
  );

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Erro ao carregar os votos</div>;

  function handleClick() {
    navigate('/main');
  }

  const Row = ({ index, style, data }) => {
    const vote = data[index];
    return (
      <ContainerItems style={style} key={index}>
        <CardInner>
          <CardVote>
            <CardEleitor>
              <Image src={User} />
              <Name>{vote.eleitor_nome}</Name>
              <div>{vote.email}</div>
            </CardEleitor>
            <CardVoted>
              <Voted>Votou em</Voted>
              <LiaLongArrowAltRightSolid size={60} color='' />
            </CardVoted>
            <CardCandidate>
              <Image src={User} />
              <Name>{vote.candidato_nome}</Name>
              <Party>{vote.partido}</Party>
            </CardCandidate>
          </CardVote>
        </CardInner>
      </ContainerItems>
    );
  };

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
  };

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
          <Title>Lista de votos realizados</Title>
        </div>
      </ButtonContainer>
      <Container2>
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
      </Container2>
    </Container>
  );
}
