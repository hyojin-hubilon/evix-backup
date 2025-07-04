import { RegistrableSurvey } from '@/types/survey';
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    useTheme,
    FormControl,
    Checkbox,
    IconButton,
} from '@mui/material';
import dayjs from 'dayjs';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import PreviewIcon from '@mui/icons-material/Preview';
import { t } from 'i18next';

export type SurveyAdd = {
    type: 'add' | 'delete';
    survey: RegistrableSurvey;
};

type SurveyListTableProps = {
    surveyList: RegistrableSurvey[];
    selectedSurvey: RegistrableSurvey[];
    handleSelected: (selectedSurvey: SurveyAdd) => void;
    handleSelectPreview: (previewSurveyNo: number) => void;
};
const SurveyListTable = ({
    surveyList,
    selectedSurvey,
    handleSelected,
    handleSelectPreview,
}: SurveyListTableProps) => {
    const theme = useTheme();
    const { divider } = theme.palette;
    const ref = useRef({});

    const handleSelectSurvey = (e: ChangeEvent<HTMLInputElement>, survey) => {
        const checked = e.target.checked;
        if (checked) handleSelected({ type: 'add', survey: survey });
        else handleSelected({ type: 'delete', survey: survey });
    };

    useEffect(() => {
        for (const key in ref.current) {
            if (ref.current[key]) {
                const numKey = Number(key);
                const findIndex = selectedSurvey.findIndex((survey) => survey.survey_no === numKey);

                if (findIndex > -1) ref.current[key].checked = true;
                else ref.current[key].checked = false;
            }
        }
    }, [selectedSurvey, surveyList]);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                <TableHead>
                    <TableRow
                        sx={{ 'td, th': { borderBottom: `1px solid ${theme.palette.grey[400]}` } }}
                    >
                        <TableCell align="center">
							{t('study.select')}
							{/* 선택 */}
						</TableCell>
                        <TableCell align="left">
							{t('study.survey_title')}
							{/* Survey 제목 */}
							</TableCell>
                        <TableCell align="center">
							{t('study.updated_at')}
							{/* 업데이트 */}
						</TableCell>
                        <TableCell align="center">
							{t('common.preview')}
							{/* 미리보기 */}
							</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {surveyList.map((survey) => (
                        <TableRow
                            key={survey.survey_no}
                            sx={{
                                'td, th': { borderBottom: `1px solid ${divider}` },
                                '&:last-child td, &:last-child th': { border: 0 },
                            }}
                        >
                            <TableCell align="center">
                                <input
                                    type="checkbox"
                                    onChange={(e) => handleSelectSurvey(e, survey)}
                                    ref={(element) => (ref.current[survey.survey_no] = element)}
                                />
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {survey.title}
                            </TableCell>
                            <TableCell align="center">
                                {dayjs(survey.updated_at).format('YYYY-MM-DD')}
                            </TableCell>
                            <TableCell align="center">
                                <IconButton
                                    color="primary"
                                    onClick={() => handleSelectPreview(survey.survey_no)}
                                >
                                    <PreviewIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SurveyListTable;
