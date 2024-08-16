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

const headerHeight = 71;

type Mode = 'form' | 'viewer';

const initTemplate = () => {
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

const Previewer = ({ eicFile }) => {
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

    const onGetInputs = () => {
        if (ui.current) {
            const inputs = ui.current.getInputs();
            console.log('aaa', inputs);

            for (const obj of inputs) {
                for (const key in obj) {
                    if (obj[key] === 'N' || obj[key] === '') {
                        alert('필수 입력값을 작성해주세요.');
                        return;
                    }
                }
            }

            alert(JSON.stringify(inputs, null, 2));
        }
    };

    useEffect(() => {
        if (uiRef != prevUiRef) {
            if (prevUiRef && ui.current) {
                ui.current.destroy();
            }
            buildUi(mode);
            setPrevUiRef(uiRef);
        }
        
        const jsonFile = new Blob([JSON.stringify(eicFile)], {
            type: 'application/json',
        });
        handlePreviewTemplate(jsonFile, ui.current);
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
                {/* <label style={{ width: 180 }}>
                    Load Template
                    <input
                        type="file"
                        accept="application/json"
                        onChange={(e) => handleLoadTemplate(e, ui.current)}
                    />
                </label>
                <button onClick={onGetInputs}>Get Inputs</button> */}
                <button onClick={() => generatePDF(ui.current)}>Preview PDF</button>
            </header>
            <div ref={uiRef} style={{ width: '100%', height: `calc(100vh - ${headerHeight}px)` }} />
        </div>
    );
};

export default Previewer;
