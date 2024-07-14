import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

// Função para buscar candidatos
const fetchCandidatos = async () => {
  const response = await window.api.getCandidatos();
  if (response.success) {
    return response.candidatos;
  } else {
    throw new Error(response.message);
  }
};

// Função para deletar candidato
const deleteCandidato = async (id) => {
  const response = await window.api.deleteCandidato(id);
  if (!response.success) {
    throw new Error(response.message);
  }
};

// Hook personalizado para gerenciar candidatos
export const useCandidatos = () => {
  const queryClient = useQueryClient();

  const candidatosQuery = useQuery('candidatos', fetchCandidatos, {
    refetchInterval: 100, refetchOnWindowFocus: true
  });

  const deleteMutation = useMutation(deleteCandidato, {
    onSuccess: () => {
      queryClient.invalidateQueries('candidatos');
      toast.success('Candidato deletado com sucesso!');
    },
    onError: (error) => {
      toast.error('Erro ao deletar candidato!');
      console.error(error);
    },
  });

  return {
    ...candidatosQuery,
    deleteCandidato: deleteMutation.mutate,
  };
};
