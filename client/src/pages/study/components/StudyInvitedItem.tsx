import { Button, Card, Grid, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import authApi from '@/apis/auth';
import { StudyInvitedItemProps } from '@/types/study';

const StudyInvitedItem = ({ invitedStudy, onAcceptInvite }: StudyInvitedItemProps) => {
    const theme = useTheme();
    const [acceptingInvite, setAcceptingInvite] = useState(false);

    const handleAcceptInvite = async () => {
        try {
            setAcceptingInvite(true);
            await authApi.verifyInviteToken(invitedStudy.invite_token);
            onAcceptInvite();
        } catch (error) {
            console.error('Failed to accept invitation:', error);
        } finally {
            setAcceptingInvite(false);
        }
    };

    return (
        <Card sx={{ bgcolor: theme.palette.primary.lighter, p: '1rem', height: '5rem' }}>
            <Grid container>
                <Grid item xs={8}>
                    <Typography variant="h4">{invitedStudy.title}</Typography>
                    <Typography sx={{ fontSize: '0.7rem', color: theme.palette.grey[500] }}>
                        {invitedStudy.owner_first_name} {invitedStudy.owner_last_name}
                    </Typography>
                </Grid>
                <Grid item container xs={4} alignItems="center" justifyContent="flex-end" gap={1}>
                    <Button
                        size="large"
                        variant="contained"
                        onClick={handleAcceptInvite}
                        disabled={acceptingInvite}
                    >
                        {acceptingInvite ? 'Accepting...' : 'Join us now'}
                    </Button>
                </Grid>
            </Grid>
        </Card>
    );
};

export default StudyInvitedItem;
