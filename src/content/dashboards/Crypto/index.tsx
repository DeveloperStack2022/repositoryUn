import { Helmet } from 'react-helmet-async';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import WatchList from './WatchList';

function DashboardCrypto() {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Container maxWidth="lg">
          <WatchList />
      </Container>
      <Footer />
      
    </>
  );
}

export default DashboardCrypto;
