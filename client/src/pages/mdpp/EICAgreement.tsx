import { Box, Button } from '@mui/material';
import MdppHeader from './components/MdppHeader';
import * as S from './styles';
import Previewer, { initTemplate } from '@/components/eic/PreViewer';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

import { Mode, Template, checkTemplate, getInputFromTemplate } from '@pdfme/common';
import { Form, Viewer } from '@pdfme/ui';
import {
    getFontsData,
    getPlugins,
    handlePreviewTemplate,
} from '@/components/eic/helper';
import studyApi from '@/apis/study';

import EICImage from '@assets/images/eicAgreement.png';
import { useNavigate } from 'react-router-dom';


const EICAgreement = () => {
	const navigate = useNavigate();
	const uiRef = useRef<HTMLDivElement | null>(null);
    const ui = useRef<Form | Viewer | null>(null);
    const [prevUiRef, setPrevUiRef] = 
    useState<MutableRefObject<HTMLDivElement | Form | Viewer | null> | null>(null);
	const [eicFile, setEicFile] = useState<any>(null);
	const [ submitted, setSumbmitted] = useState<boolean>(false);

    const mode: Mode = 'form';

	const handleDownloadEicFile = async () => {
        try {
                const response = await studyApi.downloadEicFile( //테스트용
                    218,
                    '1724289084468.json'
                );
                setEicFile(() => response);
        } catch (error) {
            console.error('Failed to Download EIC File', error);
        }
    };


    const buildUi = (mode: Mode) => {
        const template = initTemplate();
        let inputs = getInputFromTemplate(template);
        try {
            const inputsString = localStorage.getItem('inputs');
            if (inputsString) {
                const inputsJson = JSON.parse(inputsString);
                inputs = inputsJson;
            }
        } catch {
            localStorage.removeItem('inputs');
        }

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

    useEffect(() => {
        if (uiRef !== prevUiRef) {
            if (prevUiRef && ui.current) {
                ui.current.destroy();
            }
            buildUi(mode);
            setPrevUiRef(uiRef);
        }

		handleDownloadEicFile().then(() => {
			const jsonFile = new Blob([JSON.stringify(eicFile)], {
				type: 'application/json',
			});

			getFontsData().then(() => {
				handlePreviewTemplate(jsonFile, ui.current);
			});
		})
    }, []);

	
	return (
		<Box sx={{bgcolor: 'white', minHeight: '100vh', pt: '22px'}}>
			{ !submitted ?

				<>
					<MdppHeader title="전자동의서" backBtn></MdppHeader>			
					<Box m="23px">
						<S.CommonText>
							에버액스 디지털 치료기기 사용성 조사에 참여해 주셔서 감사드립니다. 동의서 내용을 확인하시고, 데이터 활용에 동의해 주세요.
						</S.CommonText>
					</Box>
					<Box m="20px">
						<div ref={uiRef} style={{ width: '100%', height: `calc(100vh - 300px)` }} />
					</Box>
					<Box mt="80px" m="20px">
						<S.BigButton fullWidth variant='contained' onClick={() => setSumbmitted(true)}>동의서 제출하기</S.BigButton>
					</Box>
				</>
			:
				<>
					<Box>
						<img
							src={EICImage}
							alt="동의서 제출 완료"
							style={{ maxWidth: '100%' }}
						/>
					</Box>
					<Box p="23px" textAlign="center">
						<S.H1>
							동의서 제출 완료
						</S.H1>
						<Box mt="21px">
							<S.CommonText>
								<strong>참여자명</strong> 님의 <strong>스터디명</strong> 연구 참여 동의서를<br />
								<strong>코드발급 기관명</strong> 에 안전하게 제출하였습니다.
							</S.CommonText>
						</Box>
					</Box>
					<Box position="absolute" bottom="20px" width={1} p="20px">
						<S.BigButton fullWidth variant='contained' onClick={() => navigate('/mdpp/survey/:survey_no')}>확인</S.BigButton>
					</Box>
				</>

			}
		</Box>
)
}

export default EICAgreement;