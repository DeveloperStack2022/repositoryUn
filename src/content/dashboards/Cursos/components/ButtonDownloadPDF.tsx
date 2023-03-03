import {useRef} from 'react'
import {Button} from '@mui/material'
import {PDFDownloadLink,} from '@react-pdf/renderer'
import PDFfile from 'src/PDF/Cusrsos'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
interface IProps {
    data: any[]
}

const ButtonDownload = ({data}:IProps) => {
    return (
        <PDFDownloadLink document={<PDFfile data={data} />} fileName="reporte_cursos" style={{textDecoration:'none'}} >
            {({loading}) => (loading ? "loading..." : <Button sx={{ml:1}} endIcon={<ArrowDownwardIcon />} variant="outlined">Descargar</Button>) }
        </PDFDownloadLink>
    )
}

export default ButtonDownload