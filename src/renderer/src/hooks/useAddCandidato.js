import { useMutation, useQueryClient } from 'react-query';

export const useAddCandidato = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (candidatoDataFormData) => {
      const file = candidatoDataFormData.get('file');
      const nome = candidatoDataFormData.get('nome');
      const partido = candidatoDataFormData.get('partido');

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const fileData = reader.result.split(',')[1]; // Remove o prefixo do base64
          const candidatoData = { nome, partido, file: { name: file.name, data: fileData } };

          try {
            const response = await window.api.addCandidato(candidatoData);
            resolve(response);
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('candidatos');
      },
    }
  );
};
