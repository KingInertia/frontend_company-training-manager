import { setSnackbarMessage } from '../../store/UI/snackbarSlice';
import axiosInstance from '../../api/axiosInstance';

const useExportCompanyResults = () => {
  const exportCompanyResults = async (file_type, company_id, user_id) => {
    const params = { company_id, file_type };

    if (user_id) params.user_id = user_id;

    try {
      const params = new URLSearchParams();

      const response = await axiosInstance.get(
        `/api/v1/quizzes/export-company-results/?${params.toString()}`,
        { responseType: 'blob' },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `results.${file_type}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      const errorMessage = error.response
        ? Object.values(error.response.data).join(' ')
        : error.message;
      dispatch(setSnackbarMessage(errorMessage));

      return null;
    }
  };

  return exportCompanyResults;
};

export default useExportCompanyResults;
