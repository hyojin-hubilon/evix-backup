import { useEffect, useRef, useState } from 'react';
import { Template, checkTemplate, Lang } from '@pdfme/common';
import { Designer } from '@pdfme/ui';
import {
    getFontsData,
    getTemplatePresets,
    getTemplateByPreset,
    readFile,
    cloneDeep,
    getPlugins,
    handlePreviewTemplate,
} from './helper';
import { Box, Button, DialogActions, InputLabel, Typography } from '@mui/material';
import studyApi from '@/apis/study';
import { useNavigate } from 'react-router-dom';
import { useConfirmation } from '@/context/ConfirmDialogContext';

const headerHeight = 80;

const initialTemplatePresetKey = 'invoice';
const customTemplatePresetKey = 'custom';

const templatePresets = getTemplatePresets();

interface StudyDetail {
    std_no: number;
    std_type: string;
    title: string;
    std_start_date: string;
    std_end_date: string;
    description: string;
    disease: string;
    target_number: number;
    drug_code: string;
    drug_brand_name: string;
    drug_manufacturer_name: string;
}

interface EditViewerProps {
    eicFile: any;
    onClose: () => void;
    studyDetail: StudyDetail;
}

const EditViewer = ({ eicFile, onClose, studyDetail }: EditViewerProps) => {
    const navigate = useNavigate();
    const confirm = useConfirmation();

    const designerRef = useRef<HTMLDivElement | null>(null);
    const designer = useRef<Designer | null>(null);
    const [lang, setLang] = useState<Lang>('en');
    const [templatePreset, setTemplatePreset] = useState<string>(
        localStorage.getItem('templatePreset') || initialTemplatePresetKey
    );

    const buildDesigner = () => {
        let template: Template = getTemplateByPreset(localStorage.getItem('templatePreset') || '');
        try {
            const templateString = localStorage.getItem('template');
            if (templateString) {
                setTemplatePreset(customTemplatePresetKey);
            }

            const templateJson = templateString
                ? JSON.parse(templateString)
                : getTemplateByPreset(localStorage.getItem('templatePreset') || '');
            checkTemplate(templateJson);
            template = templateJson as Template;
        } catch {
            localStorage.removeItem('template');
        }

        getFontsData().then((font) => {
            if (designerRef.current) {
                designer.current = new Designer({
                    domContainer: designerRef.current,
                    template,
                    options: {
                        font,
                        lang,
                        labels: {
                            'clear': 'clear',
                        },
                        theme: {
                            token: {
                                colorPrimary: '#25c2a0',
                            },
                        },
                        icons: {
                            multiVariableText:
                                '<svg fill="#000000" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.643,13.072,17.414,2.3a1.027,1.027,0,0,1,1.452,0L20.7,4.134a1.027,1.027,0,0,1,0,1.452L9.928,16.357,5,18ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"/></svg>',
                        },
                    },
                    plugins: getPlugins(),
                });
                designer.current.onSaveTemplate(onSaveTemplate);
                designer.current.onChangeTemplate(() => {
                    setTemplatePreset(customTemplatePresetKey);
                });
            }
        });
    };

    const onChangeBasePDF = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target && e.target.files) {
            readFile(e.target.files[0], 'dataURL').then(async (basePdf) => {
                if (designer.current) {
                    designer.current.updateTemplate(
                        Object.assign(cloneDeep(designer.current.getTemplate()), {
                            basePdf,
                        })
                    );
                }
            });
        }
    };

    const onSaveTemplate = () => {
        if (designer.current) {
            const template = designer.current.getTemplate();
            const schemas = template?.schemas;

            const seenKeys = new Set();
            for (const schema of schemas) {
                for (const key in schema) {
                    if (seenKeys.has(key)) {
                        confirm({
                            description: `중복된 필드가 있습니다 Duplicating field name is = (${key}) 서로 다른 필드 명을 가지고 있어야합니다.`,
                            variant: 'info',
                        });
                        return;
                    }
                    seenKeys.add(key);
                }
            }
            const jsonTemplate = new Blob([JSON.stringify(template)], {
                type: 'application/json',
            });
            handleEdit(jsonTemplate);
            onClose();
        }
    };

    const handleEdit = async (jsonTemplate: Blob) => {
        const studyData: StudyDetail = studyDetail;
        console.log(studyData);

        // FormData 객체 생성 및 데이터 추가
        const formData = new FormData();

        formData.append(
            'requestDto',
            new Blob([JSON.stringify(studyData)], { type: 'application/json' })
        );

        // 전자동의서 파일이 있는 경우 FormData에 추가
        if (jsonTemplate) {
            formData.append('eic_file', jsonTemplate, `${studyData.title}.json`);
        }

        try {
            const response = await studyApi.editEicFile(formData);
            if (response.code === 200 && response.content.std_no) {
                confirm({
                    description: '전자동의서가 변경되었습니다.',
                    variant: 'info',
                }).then(() => window.location.reload());
            }
        } catch (error) {
            console.error('Failed to deploy study: ', error);
        }
    };

    useEffect(() => {
        if (designer.current) {
            designer.current.destroy();
        }
        buildDesigner();

        const jsonFile = new Blob([JSON.stringify(eicFile)], {
            type: 'application/json',
        });
        getFontsData().then(() => {
            handlePreviewTemplate(jsonFile, designer.current);
        });
        setTemplatePreset(customTemplatePresetKey);
    }, []);

    return (
        <Box>
            <Box p={'16px 24px'}>
                <Typography variant="h5">Register electronic consent form</Typography>
                <Typography variant="h6">
                    Upload the electronic consent form in PDF file format to apply functions such as
                    consent and signature.
                </Typography>
            </Box>
            <div ref={designerRef} style={{ width: '100%', height: `calc(100vh - 200px)` }} />
            <DialogActions>
                <Button sx={{ width: '50%', height: '40px' }} variant="outlined" onClick={onClose}>
                    Cancel
                </Button>
                <Button sx={{ width: '50%', height: '40px' }} variant="contained" color="primary">
                    <InputLabel htmlFor="upload-pdf" style={{ width: 180, color: 'white' }}>
                        Change Base PDF
                    </InputLabel>
                    <input
                        id="upload-pdf"
                        type="file"
                        accept="application/pdf"
                        onChange={onChangeBasePDF}
                        hidden
                    />
                </Button>
                <Button
                    sx={{ width: '50%', height: '40px' }}
                    variant="contained"
                    color="primary"
                    onClick={onSaveTemplate}
                >
                    Save
                </Button>
            </DialogActions>
        </Box>
    );
};

export default EditViewer;
