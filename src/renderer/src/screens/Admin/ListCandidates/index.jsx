import React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useQuery, useMutation, useQueryClient } from 'react-query'

import Cancel from '../../../assets/cancel.svg'
import Check from '../../../assets/check.svg'
import Edit from '../../../assets/edit.svg'
import Delete from '../../../assets/trash.svg'
import User from '../../../assets/user.svg'

import { Container, Img, CustomImage } from './styles'

const fetchVotesPerCandidate = async () => {
  const response = await window.api.countVotesPerCandidate()
  if (response.success) {
    return response.results
  } else {
    throw new Error(response.message)
  }
}

const deleteCandidato = async (id) => {
  const response = await window.api.deleteCandidato(id)
  if (!response.success) {
    throw new Error(response.message)
  }
  return response
}

export function ListCandidates() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery('candidatos', fetchVotesPerCandidate, {
    refetchInterval: 60000, // Recarregar a cada 60 segundos
    refetchOnWindowFocus: true // Recarregar ao focar a janela
  })

  const deleteMutation = useMutation(deleteCandidato, {
    onMutate: async (id) => {
      await queryClient.cancelQueries('candidatos')
      const previousData = queryClient.getQueryData('candidatos')
      queryClient.setQueryData('candidatos', (old) =>
        old.filter((candidato) => candidato.id_candidato !== id)
      )
      return { previousData }
    },
    onError: (err, id, context) => {
      queryClient.setQueryData('candidatos', context.previousData)
      toast.error(`Erro ao deletar candidato: ${err.message}`)
    },
    onSettled: () => {
      queryClient.invalidateQueries('candidatos')
    }
  })

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (error) {
    return <div>Erro: {error.message}</div>
  }

  if (!data || data.length === 0) {
    return (
      <div>
        <p>Nenhum candidato encontrado.</p>
      </div>
    )
  }

  const handleEdit = (candidate) => {
    navigate('/editar-candidato', { state: candidate })
  }

  const handleDelete = (id) => {
    deleteMutation.mutate(id)
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
              <TableCell align="center">Votos</TableCell>
              <TableCell align="center">Editar</TableCell>
              <TableCell align="center">Remover</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((candidate) => (
              <TableRow
                key={candidate.id_candidato}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">
                  <Img src={User} alt="imagem do candidato" />
                </TableCell>
                <TableCell component="th" scope="candidate">
                  {candidate.candidato_nome}
                </TableCell>
                <TableCell>{candidate.partido}</TableCell>
                <TableCell align="center">{candidate.total_votos}</TableCell>
                <TableCell align="center">
                  <CustomImage
                    onClick={() => handleEdit(candidate)}
                    src={Edit}
                    alt="editar candidato"
                  />
                </TableCell>
                <TableCell align="center">
                  <CustomImage
                    onClick={() => handleDelete(candidate.id_candidato)}
                    src={Delete}
                    alt="deletar candidato"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
