import { useQuery } from 'react-query';

const fetchCandidatos = async () => {
  const response = await window.api.getCandidatos();
  if (response.success) {
    return response.candidatos;
  } else {
    throw new Error(response.message);
  }
};

export const useCandidatos = () => {
  return useQuery('candidatos', fetchCandidatos);
};