import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarQuickFilter,
    gridClasses,
} from '@mui/x-data-grid';
import { Box, Container, useTheme } from '@mui/material';

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarQuickFilter />
        </GridToolbarContainer>
    );
}

const StudyParticipants = () => {
    const theme = useTheme();
    const createData = (
        id: number,
        name: string,
        gender: string,
        dateOfBirth: string,
        age: number,
        enrollmentDate: string,
        roundInfo: string,
        institution: string,
        status: string
    ) => {
        return {
            id,
            name,
            gender,
            dateOfBirth,
            age,
            enrollmentDate,
            roundInfo,
            institution,
            status,
        };
    };

    const data = [
        createData(
            1,
            'Kate Brown',
            'male',
            'Dec 10, 2000',
            25,
            '2024.06.01 22:15',
            '3/12',
            '아주대병원',
            'In Progress'
        ),
        createData(
            2,
            'Daniel Heny',
            'female',
            'Nov 20, 1999',
            26,
            '2024.06.01 22:15',
            '12/12',
            '서울대병원',
            'Complete'
        ),
        createData(
            3,
            'Julia hose Yoon',
            'male',
            'Oct 24, 1982',
            42,
            '2024.06.01 22:15',
            '2/12',
            '순천향대병원',
            'Pending'
        ),
        createData(
            4,
            'Clara dew Mio',
            'female',
            'Mar 11, 1988',
            36,
            '2024.06.01 22:15',
            '11/12',
            '아주대병원',
            'Approved'
        ),
    ];

    const columns = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'gender', headerName: 'Gender', width: 100 },
        { field: 'dateOfBirth', headerName: 'Date of birth', width: 200 },
        { field: 'age', headerName: 'Age', width: 100 },
        { field: 'enrollmentDate', headerName: 'Enrollment Date', width: 200 },
        { field: 'roundInfo', headerName: 'Round Info.', width: 150 },
        { field: 'institution', headerName: 'Institution', width: 200 },
        { field: 'status', headerName: 'Status', width: 150 },
    ];

    return (
        <Box sx={{ minHeight: 400 }} width={1}>
            <DataGrid
                columns={columns}
                rows={data}
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                slots={{ toolbar: CustomToolbar }}
                sx={{
                    border: '1px solid #ddd',
                    [`& .${gridClasses.virtualScrollerContent}`]: {
                        borderTop: `1px solid ${theme.palette.grey[500]}`,
                    },
                    [`& .${gridClasses.row}`]: {
                        borderBottom: `1px solid ${theme.palette.grey[400]}`,
                    },
					bgcolor: 'white',
					p:'1rem'
                }}
            />
        </Box>
		
    );
};

export default StudyParticipants;
