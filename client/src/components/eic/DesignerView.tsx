import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Template, checkTemplate, Lang, DesignerProps } from '@pdfme/common';
import { Designer } from '@pdfme/ui';
import {
    getFontsData,
    getTemplateByPreset,
    readFile,
    cloneDeep,
    getPlugins,
    handleLoadTemplate,
    downloadJsonFile,
} from './helper';
import {
    Box,
    Button,
    DialogActions,
    DialogTitle,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography,
} from '@mui/material';

const headerHeight = 80;

const initialTemplatePresetKey = 'invoice';
const customTemplatePresetKey = 'custom';

const translations: { label: string; value: string }[] = [
    { value: 'en', label: 'English' },
    { value: 'ko', label: 'Korean' },
];

function DesignerView({ basePdfFile, handleEicFile, onClose }) {
    const designerRef = useRef<HTMLDivElement | null>(null);
    const designer = useRef<Designer | null>(null);
    const [lang, setLang] = useState<Lang>('en');
    const [templatePreset, setTemplatePreset] = useState<string>(
        localStorage.getItem('templatePreset') || initialTemplatePresetKey
    );
    const [prevDesignerRef, setPrevDesignerRef] =
        useState<MutableRefObject<HTMLDivElement | null> | null>(null);

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
                designer.current.onChangeTemplate(() => {
                    setTemplatePreset(customTemplatePresetKey);
                });

                setUpBasePdf(basePdfFile);
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

    const onDownloadTemplate = () => {
        if (designer.current) {
            const template = designer.current.getTemplate();
            const schemas = template?.schemas;

            const seenKeys = new Set();
            for (const schema of schemas) {
                for (const key in schema) {
                    if (seenKeys.has(key)) {
                        alert(
                            `중복된 필드가 있습니다(${key}) 서로 다른 필드 명을 가지고 있어야합니다.`
                        );
                        return;
                    }
                    seenKeys.add(key);
                }
            }
            downloadJsonFile(template, 'template');
            handleEicFile(template);
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
                        alert(
                            `중복된 필드가 있습니다 Duplicating field name is = (${key}) 서로 다른 필드 명을 가지고 있어야합니다.`
                        );
                        return;
                    }
                    seenKeys.add(key);
                }
            }
            const jsonTemplate = new Blob([JSON.stringify(template)], {
                type: 'application/json',
            });
            handleEicFile(jsonTemplate);
            onClose();
        }
    };

    const setUpBasePdf = (basePdf: File) => {
        if (!basePdf) {
            return;
        }

        readFile(basePdf, 'dataURL').then(async (basePdf) => {
            if (designer.current) {
                console.log('Updating template with base PDF...');
                designer.current.updateTemplate(
                    Object.assign(cloneDeep(designer.current.getTemplate()), {
                        basePdf,
                    })
                );
            }
        });
    };

    useEffect(() => {
        // if (designerRef != prevDesignerRef) {

        if (designer.current) {
            designer.current.destroy();
        }
        buildDesigner();
        // setPrevDesignerRef(designerRef);

        // }
    }, []);

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
				height: 'calc(100vh - 64px)'
            }}
        >
            <Box p={'16px 24px'}>
                <Typography variant="h5">Register electronic consent form</Typography>
                <Typography variant="h6">
                    Upload the electronic consent form in PDF file format to apply functions such as
                    consent and signature.
                </Typography>
            </Box>
            <Box
                ref={designerRef}
                sx={{ width: '100%', height: `calc(100vh - ${headerHeight}px)` }}
            />

            <Box>
                {/**
                <Box>
                    <input
                        id="base-pdf-upload"
                        type="file"
                        accept="application/pdf"
                        onChange={onChangeBasePDF}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="base-pdf-upload">
                        <Button variant="contained" component="span">
                            Change
                        </Button>
                    </label>
                </Box>
                <Box>
                    <input
                        id="template-upload"
                        type="file"
                        accept="application/json"
                        onChange={(e) => {
                            handleLoadTemplate(e, designer.current);
                            setTemplatePreset(customTemplatePresetKey);
                        }}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="template-upload">
                        <Button variant="contained" component="span">
                            Load
                        </Button>
                    </label>
                </Box>
                <Button variant="contained" onClick={onDownloadTemplate}>
                    Download Template
                </Button>
                 */}
                <DialogActions>
                    <Button
                        variant="outlined"
                        sx={{
                            width: '50%',
                            height: '40px',
                            color: '#344054',
                            borderColor: '#D0D5DD',
                        }}
                        onClick={onClose}
                    >
                        Cancel
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
        </Box>
    );
}

export default DesignerView;
