import { useState } from 'react';
import { TextField, Button, Grid, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useConfirmation } from '@/context/ConfirmDialogContext';

const ApplyFreeTrialForm = () => {
    const [formState, setFormState] = useState({
        email: '',
        first_name: '',
        last_name: '',
        mobile: '',
        company_name: '',
        job_title: '',
        industry: '',
        country: '',
        message: '',
    });

    const navigate = useNavigate();
	const confirm = useConfirmation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/v1/auth/apply-free-trial', formState, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                },
            });
            console.log('Response:', response.data);
            confirm({
				description : 'Evix-DCT 무료 버전을 신청하였습니다.',
				variant : 'info'
			}).then(() => navigate(-1));
            
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Grid container alignItems="center" justifyContent="center" sx={{ p: '2rem' }}>
            <Stack spacing={2} width={1}>
                <Typography variant="h4" gutterBottom>
                    Apply for Free Trial
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="First Name"
                        name="first_name"
                        value={formState.first_name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Last Name"
                        name="last_name"
                        value={formState.last_name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Mobile"
                        name="mobile"
                        value={formState.mobile}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Company Name"
                        name="company_name"
                        value={formState.company_name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Job Title"
                        name="job_title"
                        value={formState.job_title}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Industry"
                        name="industry"
                        value={formState.industry}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Country"
                        name="country"
                        value={formState.country}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Submit
                    </Button>
                </form>
            </Stack>
        </Grid>
    );
};

export default ApplyFreeTrialForm;
