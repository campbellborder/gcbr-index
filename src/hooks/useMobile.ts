import { useMediaQuery } from 'react-responsive';

export default function useMobile() {
  return useMediaQuery({ query: '(max-width: 767px)' });
}