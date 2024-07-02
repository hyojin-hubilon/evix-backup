import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';
import { ChipOwnProps } from '@mui/material';
import { ForwardRefExoticComponent } from 'react';

export interface MenuItem {
    id: string;
    title: string;
    type: string;
    url?: string;
    collapse?: boolean;
    icon?: JSX.ElementType | ForwardRefExoticComponent<Omit<AntdIconProps, 'ref'>> | string;
    breadcrumbs?: boolean;
    target?: '_self' | '_blank' | true | false;
    children?: MenuItem[];
    disabled?: boolean;
    external?: boolean;
    chip?: ChipOwnProps;
}

export interface MenuItems {
    items: MenuItem[];
}
