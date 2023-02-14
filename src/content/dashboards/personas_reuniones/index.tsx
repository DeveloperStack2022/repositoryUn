import {Helmet} from 'react-helmet-async'
import {Container} from '@mui/material'
//Custom Components 
import {PersonasTable} from './TablePersonas'
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';

function InformacionPersonas() {
    return (
        <>
        <Helmet>
            <title>Informacion Personas</title>
        </Helmet>
        <PageTitleWrapper>
            <PageHeader />
        </PageTitleWrapper>
        <Container maxWidth="lg">
           <PersonasTable />
        </Container>
        </>
    )
}

export default InformacionPersonas;