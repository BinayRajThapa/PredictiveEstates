import { useQuery } from 'react-query';
import { getAllProperties, getProperty } from '../utils/api';

const useProperties = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    'allProperties',
    getAllProperties,
    getProperty,
    { refetchOnWindowFocus: false }
  );
  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};

export default useProperties;
