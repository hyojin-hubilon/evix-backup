import { ResCommonError } from '@/apis/axios-common';
import studyApi from '@/apis/study';
import { useEffect, useState } from 'react';
import { Box, Button, Typography, Paper, Stack, Badge, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import authApi from '@/apis/auth';
import { invitedStudy } from '@/types/study';
import Breadcrumbs2 from '@/components/@extended/Breadcrumbs2';
import { t } from 'i18next';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 13,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

const UnauthorizedInvitation = () => {
    const [invitedStudies, setInvitedStudies] = useState<invitedStudy[]>([]);
    const [invitedStudyNumber, setInvitedStudyNumber] = useState<number>(0);

    const handleInvitedStudies = (invitedStudies: any[]) => {
        setInvitedStudies(() => invitedStudies);
    };

    const handleInvitedStudyNumber = (length: number) => {
        setInvitedStudyNumber(() => length);
    };

    const handleAcceptInvite = async (study : invitedStudy) => {
        try {
            const response = await authApi.verifyInviteToken(study.invite_token);
            if (response.code !== 200) {
                alert("error");
            }
        } catch (error) {
            console.error('Failed to accept invitation:', error);
        } 
    };

    useEffect(() => {
        const fetchInvitedStudies = async () => {
            try {
                const response: any = await studyApi.unauthorizedInvitation();
                handleInvitedStudies(response?.content);
                handleInvitedStudyNumber(response?.content.length);
            } catch (error) {
                if (error instanceof ResCommonError) {
                    alert(error.message);
                }
            }
        };
        fetchInvitedStudies();
    }, []);

    return (
		<Container maxWidth="lg">
        <Box sx={{ p: 2 }}>
			<Breadcrumbs2 sub={`${t('settings.study_invitation_received')} (${invitedStudyNumber})`}/>

            <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
				{t('settings.participate_in_the_study')}
                {/* 초대 수락 후 Study에 참여해보세요. */}
                <br />
				{t('settings.received_invitations_displayed')}
                {/* ※받은 초대만 조회됩니다. */}
            </Typography>
            <Stack spacing={2}>
                {invitedStudies.map((study, index) => (
                    <Paper
                        key={index}
                        sx={{
                            p: 2,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            bgcolor: '#e3eeff',
                        }}
                    >
                        <Box>
                            <Typography variant="subtitle1">{study.title}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Study Owner: {study.owner_first_name} {study.owner_last_name}
                            </Typography>
                        </Box>
                        <StyledBadge color="primary">
                            <Button variant="contained" color="primary" onClick={() => handleAcceptInvite(study)}>
                                Join us now
                            </Button>
                        </StyledBadge>
                    </Paper>
                ))}
            </Stack>
        </Box>
		</Container>
    );
};

export default UnauthorizedInvitation;
