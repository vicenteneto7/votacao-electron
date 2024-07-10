import ListIcon from '@mui/icons-material/List';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { paths } from '../../constants/paths';

export const ListLinks = [
    {
        id: 1,
        label: 'Candidatos',
        link: paths.Candidates,
        icon: ListIcon
    },
    {
        id: 2,
        label: 'Novo Candidato',
        link: paths.NewCandidate,
        icon: PersonAddIcon
    }
]