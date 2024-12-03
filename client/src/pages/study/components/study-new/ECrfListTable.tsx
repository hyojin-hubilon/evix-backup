import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    useTheme,
    IconButton,
} from '@mui/material';
import dayjs from 'dayjs';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import PreviewIcon from '@mui/icons-material/Preview';
import { t } from 'i18next';
import { MyCRFList, SelectedCrfList } from '@/types/ecrf';

export type CrfAdd = {
    type: 'add' | 'delete';
    crf: MyCRFList;
};

type ECrfListTableProps = {
    crfList: MyCRFList[];
    selectedCrf: MyCRFList[];
    handleSelected: (selectedCrf: CrfAdd) => void;
    // handleSelectPreview: (previewSurveyNo: number) => void;
};
const ECrfListTable = ({
    crfList,
    selectedCrf,
    handleSelected,
    // handleSelectPreview,
}: ECrfListTableProps) => {
    const theme = useTheme();
    const { divider } = theme.palette;
    const ref = useRef({});

    const handleSelectCrf = (e: ChangeEvent<HTMLInputElement>, crf: MyCRFList) => {
        const checked = e.target.checked;
        if (checked) handleSelected({ type: 'add', crf: crf });
        else handleSelected({ type: 'delete', crf: crf });
    };

    useEffect(() => {
        for (const key in ref.current) {
            if (ref.current[key]) {
                const numKey = Number(key);
                const findIndex = selectedCrf.findIndex((crf) => crf.crf_no === numKey);

                if (findIndex > -1) ref.current[key].checked = true;
                else ref.current[key].checked = false;
            }
        }
    }, [selectedCrf, crfList]);

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
                        {/* <TableCell align="center">
							{t('common.preview')}
							</TableCell> */}
							{/* 미리보기 */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {crfList.map((crf) => (
                        <TableRow
                            key={crf.crf_no}
                            sx={{
                                'td, th': { borderBottom: `1px solid ${divider}` },
                                '&:last-child td, &:last-child th': { border: 0 },
                            }}
                        >
                            <TableCell align="center">
                                <input
                                    type="checkbox"
                                    onChange={(e) => handleSelectCrf(e, crf)}
                                    ref={(element) => (ref.current[crf.crf_no] = element)}
                                />
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {crf.crf_title}
                            </TableCell>
                            <TableCell align="center">
                                {dayjs(crf.created_at).format('YYYY-MM-DD')}
                            </TableCell>
                            {/* <TableCell align="center">
                                <IconButton
                                    color="primary"
                                    onClick={() => handleSelectPreview(crf.crf_no)}
                                >
                                    <PreviewIcon />
                                </IconButton>
                            </TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ECrfListTable;
