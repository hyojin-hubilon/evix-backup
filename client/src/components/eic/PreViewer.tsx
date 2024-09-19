import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Template, checkTemplate, getInputFromTemplate } from '@pdfme/common';
import { Form, Viewer } from '@pdfme/ui';
import {
    getFontsData,
    getTemplateByPreset,
    generatePDF,
    getPlugins,
    handlePreviewTemplate,
} from './helper';
import { Button, DialogActions } from '@mui/material';

const headerHeight = 200;

type Mode = 'form' | 'viewer';

export const initTemplate = () => {
    let template: Template = getTemplateByPreset(localStorage.getItem('templatePreset') || '');
    try {
        const templateString = localStorage.getItem('template');
        if (!templateString) {
            return template;
        }
        const templateJson = JSON.parse(templateString);
        checkTemplate(templateJson);
        template = templateJson as Template;
    } catch {
        localStorage.removeItem('template');
    }
    return template;
};

const Previewer = ({ eicFile, onClose }) => {
    const uiRef = useRef<HTMLDivElement | null>(null);
    const ui = useRef<Form | Viewer | null>(null);
    const [prevUiRef, setPrevUiRef] = useState<MutableRefObject<
        HTMLDivElement | Form | Viewer | null
    > | null>(null);

    const mode: Mode = 'form';

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

        const jsonFile = new Blob([JSON.stringify(eicFile)], {
            type: 'application/json',
        });

        getFontsData().then(() => {
            handlePreviewTemplate(jsonFile, ui.current);
        });
    }, []);

    return (
        <div>
            <header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: '0 1rem',
                    fontSize: 'small',
                    height: '3.0rem',
                }}
            >
                <strong>Preview</strong>
            </header>
            <div ref={uiRef} style={{ width: '100%', height: `calc(100vh - ${headerHeight}px)` }} />
			<DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onClose}
                    >
                        Close
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => generatePDF(ui.current)}
                    >
                        Preview PDF
                    </Button>
                </DialogActions>
        </div>
    );
};

export default Previewer;
