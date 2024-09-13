import { Box } from '@mui/material';
import MdppHeader from './components/MdppHeader';
import * as S from './styles';
import { initTemplate } from '@/components/eic/PreViewer';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Mode, getInputFromTemplate } from '@pdfme/common';
import { Form, Viewer } from '@pdfme/ui';
import {
    createPDF,
    getFontsData,
    getPlugins,
    handlePreviewTemplate,
} from '@/components/eic/helper';
import EICImage from '@assets/images/eicAgreement.png';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import participantStudyApi from '@/apis/participantStudy';
import { useConfirmation } from '@/context/ConfirmDialogContext';
import React from 'react';

const EICAgreement = () => {
    const [participantName, setParticipantName] = useState<string>('');
    const navigate = useNavigate();
    const params = useParams();
    const stdNo = Number(params?.stdNo);
    const location = useLocation();
    const study = location.state?.study ?? {};

    console.log(study);
  
    const uiRef = useRef<HTMLDivElement | null>(null);
    const ui = useRef<Form | Viewer | null>(null);
    const [prevUiRef, setPrevUiRef] = useState<MutableRefObject<
        HTMLDivElement | Form | Viewer | null
    > | null>(null);

    const [submitted, setSumbmitted] = useState<boolean>(false);
    const confirm = useConfirmation();
    const mode: Mode = 'form';

	const pdfArea = React.useMemo(() => <div ref={uiRef} style={{ width: '100%', height: `calc(100vh - 300px)` }} />, []);

    const buildUi = (mode: Mode) => {
        const template = initTemplate();
        let inputs = getInputFromTemplate(template);

        getFontsData().then((font) => {
            if (uiRef.current) {
                ui.current = new (mode === 'form' ? Form : Viewer)({
                    domContainer: uiRef.current,
                    template,
                    inputs,
                    options: {
                        font,
                        labels: { 'clear': 'clear' },
                        theme: {
                            token: {
                                colorPrimary: '#25c2a0',
                            },
                        },
                    },
                    plugins: getPlugins(),
                });
            }
        });
    };

    const handleSubmit = async () => {
        if (stdNo) {
            const formData = new FormData();
            const pdf = await createPDF(ui.current);

            if (!pdf) {
                return;
            }

            formData.append('eic_file', pdf, `eic_file.pdf`);
            participantStudyApi.uploadEic(stdNo, formData).then((res) => {
                if (res.code === 200) {
                    confirm({
                        description: `전자서명이 완료되었습니다.`,
                        variant: 'info',
                    });
                    setParticipantName((prev) => res.content.full_name);
                    setSumbmitted((prev) => true);
                }
            });
        }
    };

    useEffect(() => {
        if (uiRef !== prevUiRef) {
            if (prevUiRef && ui.current) {
                ui.current.destroy();
            }
            buildUi(mode);
            setPrevUiRef(uiRef);
        }

        const handleEic = async () => {
            try {
                const eicFile = await participantStudyApi.downloadEicFile(stdNo, study.eic_name);
                return eicFile;
            } catch (error) {
                console.error('Failed to Download EIC File', error);
            }
        };

        handleEic().then((eicFile) => {
            console.log('eicFile', eicFile); 
            const jsonFile = new Blob([JSON.stringify(eicFile)], {
                type: 'application/json',
            });

            getFontsData().then(() => {
                handlePreviewTemplate(jsonFile, ui.current);
            });
        })
    }, []);

	useEffect(() => {
		console.log(uiRef);
	}, [uiRef]);

    return (
        <Box sx={{ bgcolor: 'white', minHeight: '100vh', pt: '22px' }}>
            {!submitted ? (
                <>
                    <MdppHeader title="전자동의서" backBtn></MdppHeader>
                    <Box m="23px">
                        <S.CommonText>
                            {study.title} 조사에 참여해 주셔서 감사드립니다.
                            동의서 내용을 확인하시고, 데이터 활용에 동의해 주세요.
                        </S.CommonText>
                    </Box>
                    <Box m="20px">
                        { pdfArea }
                    </Box>
                    <Box mt="80px" m="20px">
                        <S.BigButton fullWidth variant="contained" onClick={handleSubmit}>
                            동의서 제출하기
                        </S.BigButton>
                    </Box>
                </>
            ) : (
                <>
                    <Box>
                        <img src={EICImage} alt="동의서 제출 완료" style={{ maxWidth: '100%' }} />
                    </Box>
                    <Box p="23px" textAlign="center">
                        <S.H1>동의서 제출 완료</S.H1>
                        <Box mt="21px">
                            <S.CommonText>
                                <strong>{participantName}</strong> 님의 <strong>{study.title}</strong> 연구 참여 
                                동의서를
                                <br />
                                <strong>{study.allotment_agency_name}</strong> 에 안전하게 제출하였습니다.
                            </S.CommonText>
                        </Box>
                    </Box>
                    <Box position="absolute" bottom="20px" width={1} p="20px">
                        <S.BigButton
                            fullWidth
                            variant="contained"
                            onClick={() => navigate('/mdpp/studies')}
                        >
                            확인
                        </S.BigButton>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default EICAgreement;
