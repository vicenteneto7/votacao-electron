import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'

import Cancel from '../../../assets/cancel.svg'
import Check from '../../../assets/check.svg'
import Edit from '../../../assets/edit.svg'
import Delete from '../../../assets/delete.svg'
import User from '../../../assets/user.svg'

import { Container, Img, CustomImage } from './styles'
import { useCandidatos } from '../../../hooks/useCandidates'
import { toast } from 'react-toastify'

export function ListCandidates() {
  const navigate = useNavigate()

  const { data, isLoading, error, deleteCandidato } = useCandidatos();
  
  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (error) {
    return <div>Erro: {error.message}</div>
  }

  function isOffer(offerStatus) {
    if (offerStatus) {
      return <img src={Check} />
    }
    return <img src={Cancel} />
  }

  function editCandidate(candidate) {
    navigate('/editar-candidato', { state: candidate })
  }

  const candidateImagePath = (imagePath) => {
    if (!imagePath) return '' // Verifica se imagePath é nulo ou vazio
    const normalizedPath = imagePath.replace(/\\/g, '/') // Normaliza o caminho para Unix
    return `app:///${normalizedPath}`
  }

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Foto</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Partido</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((candidate) => (
                <TableRow
                  key={candidate.id_candidato}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">
                    <Img src={candidateImagePath(candidate.imagem)} alt="imagem do candidato" />
                  </TableCell>
                  <TableCell component="th" scope="candidate">
                    {candidate.nome}
                  </TableCell>
                  <TableCell>{candidate.partido}</TableCell>
                  <TableCell style={{ display: 'flex', flexDirection: 'row'}}>
                    <div>
                      <CustomImage
                        onClick={() => editCandidate(candidate)}
                        src={Edit}
                        alt="editar produto"
                      />
                    </div>
                    <div style={{marginLeft: '1rem'}}>
                      <CustomImage
                        onClick={() => deleteCandidato(candidate.id_candidato)}
                        src={Delete}
                        alt="deletar produto"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
