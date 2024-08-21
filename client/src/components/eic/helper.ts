import { Template, Font, checkTemplate, getInputFromTemplate } from '@pdfme/common';
import { Form, Viewer, Designer } from '@pdfme/ui';
import { generate } from '@pdfme/generator';
import { text } from '@pdfme/schemas';
import plugins from './plugins';

const fontObjList = [
    {
        fallback: true,
        label: 'Freesentation',
        url: '/fonts/Freesentation.ttf',
    },
];

export const getFontsData = async () => {
    const fontDataList = await Promise.all(
        fontObjList.map(async (font) => ({
            ...font,
            data: await fetch(font.url).then((res) => res.arrayBuffer()),
        }))
    );

    return fontDataList.reduce((acc, font) => ({ ...acc, [font.label]: font }), {} as Font);
};

export const readFile = (file: File | null, type: 'text' | 'dataURL' | 'arrayBuffer') => {
    return new Promise<string | ArrayBuffer>((r) => {
        const fileReader = new FileReader();
        fileReader.addEventListener('load', (e) => {
            if (e && e.target && e.target.result && file !== null) {
                r(e.target.result);
            }
        });
        if (file !== null) {
            if (type === 'text') {
                fileReader.readAsText(file);
            } else if (type === 'dataURL') {
                fileReader.readAsDataURL(file);
            } else if (type === 'arrayBuffer') {
                fileReader.readAsArrayBuffer(file);
            }
        }
    });
};

export const cloneDeep = (obj: unknown) => JSON.parse(JSON.stringify(obj));

const getTemplateFromJsonFile = (file: File) => {
    return readFile(file, 'text').then((jsonStr) => {
        const template: Template = JSON.parse(jsonStr as string);
        checkTemplate(template);
        return template;
    });
};

export const downloadJsonFile = (json: unknown, title: string) => {
    if (typeof window !== 'undefined') {
        const blob = new Blob([JSON.stringify(json)], {
            type: 'application/json',
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${title}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }
};

export const handleLoadTemplate = (
    e: React.ChangeEvent<HTMLInputElement>,
    currentRef: Designer | Form | Viewer | null
) => {
    if (e.target && e.target.files) {
        getTemplateFromJsonFile(e.target.files[0])
            .then((template) => {
                if (!currentRef) return;
                currentRef.updateTemplate(template);
            })
            .catch((e) => {
                alert(`Invalid template file.
--------------------------
${e}`);
            });
    }
};

export const handlePreviewTemplate = (
    eicFile: any,
    currentRef: Designer | Form | Viewer | null
) => {
    if (eicFile) {
        getTemplateFromJsonFile(eicFile)
            .then((template) => {
                if (!currentRef) return;
                currentRef.updateTemplate(template);
            })
            .catch((error) => {
                console.error(error);
            });
    }
};

export const getPlugins = () => {
    // text schema 생성 시 빈값 세팅
    text.propPanel.defaultSchema.content = '';
    return {
        Text: text,
        Signature: plugins.signature,
        Checkbox: plugins.checkbox,
    };
};

export const generatePDF = async (currentRef: Designer | Form | Viewer | null) => {
    if (!currentRef) return;
    const template = currentRef.getTemplate();
    const inputs =
        typeof (currentRef as Viewer | Form).getInputs === 'function'
            ? (currentRef as Viewer | Form).getInputs()
            : getInputFromTemplate(template);

    for (const obj of inputs) {
        for (const key in obj) {
            if (obj[key] === 'N' || obj[key] === '') {
                alert('필수 입력을 작성해주세요.');
                return;
            }
        }
    }

    const font = await getFontsData();

    try {
        const pdf = await generate({
            template,
            inputs,
            options: { font, title: 'ediv-net' },
            plugins: getPlugins(),
        });

        const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
        window.open(URL.createObjectURL(blob));
    } catch (error) {
        alert('필수 입력을 작성해주세요.');
        console.error(error);
    }
};

export const isJsonString = (str: string) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

const getBlankTemplate = () =>
    ({ schemas: [{}], basePdf: { width: 210, height: 297, padding: [0, 0, 0, 0] } } as Template);
export const getTemplatePresets = (): {
    key: string;
    label: string;
    template: () => Template;
}[] => [{ key: 'blank', label: 'Blank', template: getBlankTemplate }];

export const getTemplateByPreset = (templatePreset: string): Template => {
    const templatePresets = getTemplatePresets();
    const preset = templatePresets.find((preset) => preset.key === templatePreset);
    return preset ? preset.template() : templatePresets[0].template();
};
