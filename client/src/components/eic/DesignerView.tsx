import { MutableRefObject, useRef, useState } from 'react';
import { Template, checkTemplate, Lang } from '@pdfme/common';
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

const headerHeight = 80;

const initialTemplatePresetKey = 'invoice';
const customTemplatePresetKey = 'custom';

const translations: { label: string; value: string }[] = [
    { value: 'en', label: 'English' },
    { value: 'ko', label: 'Korean' },
];

function DesignerView() {
    const designerRef = useRef<HTMLDivElement | null>(null);
    const designer = useRef<Designer | null>(null);
    const [lang, setLang] = useState<Lang>('en');
    const [templatePreset, setTemplatePreset] = useState<string>(
        localStorage.getItem('templatePreset') || initialTemplatePresetKey
    );
    const [prevDesignerRef, setPrevDesignerRef] = useState<MutableRefObject<HTMLDivElement | null> | null>(null);

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
                        alert(`중복된 필드가 있습니다(${key}) 서로 다른 필드 명을 가지고 있어야합니다.`);
                        return;
                    }
                    seenKeys.add(key);
                }
            }
            downloadJsonFile(template, 'template');
        }
    };

    if (designerRef != prevDesignerRef) {
        if (prevDesignerRef && designer.current) {
            designer.current.destroy();
        }
        buildDesigner();
        setPrevDesignerRef(designerRef);
    }

    return (
        <div>
            <header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: '0 1rem',
                    fontSize: 'small',
                }}
            >
                <strong>Register electronic consent form</strong>
                <label>
                    Lang:{' '}
                    <select
                        onChange={(e) => {
                            setLang(e.target.value as Lang);
                            if (designer.current) {
                                designer.current.updateOptions({ lang: e.target.value as Lang });
                            }
                        }}
                        value={lang}
                    >
                        {translations.map((t) => (
                            <option key={t.value} value={t.value}>
                                {t.label}
                            </option>
                        ))}
                    </select>
                </label>
                <label style={{ width: 180 }}>
                    Change BasePDF
                    <input type="file" accept="application/pdf" onChange={onChangeBasePDF} />
                </label>
                <label style={{ width: 180 }}>
                    Load Template
                    <input
                        type="file"
                        accept="application/json"
                        onChange={(e) => {
                            handleLoadTemplate(e, designer.current);
                            setTemplatePreset(customTemplatePresetKey);
                        }}
                    />
                </label>
                <button onClick={onDownloadTemplate}>Download Template</button>
            </header>
            <div
                ref={designerRef}
                style={{ width: '100%', height: `calc(100vh - ${headerHeight}px)` }}
            />
        </div>
    );
}

export default DesignerView;
