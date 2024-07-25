import { instance } from './commonApi';

const US_API_URL = 'https://api.fda.gov/drug/label.json';
const KOREA_API_URL = 'https://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList';

export interface Drug {
    id?: number;
    productName: string;
    companyName: string;
    itemCode: string;
    // itemType: string;
    // approvalNumber: string;
    // approvalDate: string;
}

/**
 * 의약품 오픈 API 호출 test
 * @param searchTerm
 * @returns
 */
export const fetchKoreanDrugs = async (searchTerm: string): Promise<Drug[]> => {
    try {
        const response = await instance.get(KOREA_API_URL, {
            params: {
                serviceKey: decodeURIComponent(import.meta.env.VITE_KOREA_API_KEY as string),
                itemName: searchTerm,
                type: 'json',
                numOfRows: 100,
            },
        });

        const items = response.data.body.items;

        const drugs: Drug[] = items
            ? items.map((item: any, index: number) => ({
                  id: index + 1,
                  productName: item.itemName,
                  companyName: item.entpName,
                  itemCode: item.itemSeq,
                  //   itemType: item.className,
                  //   approvalNumber: item.itemPermit,
                  //   approvalDate: item.openDe,
                  api_key: import.meta.env.VITE_US_API_KEY,
              }))
            : [];

        return drugs;
    } catch (error) {
        console.error('Error fetching Korean drugs:', error);
        return [];
    }
};

export const fetchUSDrugs = async (searchTerm: string): Promise<Drug[]> => {
    try {
        const response = await instance.get(US_API_URL, {
            params: {
                limit: 300,
                search: `openfda.brand_name:${searchTerm}*`,
            },
        });

        const items = response.data.results;

        const drugs: Drug[] = items.map((item: any, index: number) => ({
            id: index,
            productName: item.openfda.brand_name[0],
            companyName: item.openfda.manufacturer_name[0],
            // itemCode: item.openfda.nui ? item.openfda.nui[0] : '',
            itemCode: item.openfda.product_ndc
                ? item.openfda.product_ndc[0]
                : item.openfda.package_ndc[0], // itemCode가 NDC 같음
            // itemType: item.openfda.product_type[0],
            // approvalNumber: item.openfda.application_number
            //     ? item.openfda.application_number[0]
            //     : '',
            // approvalDate: item.effective_time,
        }));

        return drugs;
    } catch (error) {
        console.error('Error fetching US drugs:', error);
        return [];
    }
};
