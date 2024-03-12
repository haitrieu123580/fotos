import { clsx } from 'clsx';
import {
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    differenceInWeeks,
    parseISO,
} from 'date-fns';
import { twMerge } from 'tailwind-merge';

import Constants from './Constants';

import Validator from './Validator';

export function cn(...inputs: any) {
    return twMerge(clsx(inputs));
}
// ? need this function?
export const isFunction = (func: any) => {
    return func && typeof func === 'function';
};

// ? need this function?
export const convertDate = (date: string) => {
    return date ? date?.split('-').reverse()?.join('/') : '';
};

export const convertRegexToOptions = (_string = '') => {
    _string = _string?.replace('[', '');
    _string = _string?.replace(']', '');

    let array = [];
    if (_string?.indexOf('|') != -1) {
        array = _string?.split('|');
    } else {
        array = _string?.split('｜');
    }
    array = array?.map((x) => {
        let index = x.indexOf(':');
        if (index != -1) {
            return {
                label: x?.split(':')[1],
                key: x?.split(':')[0],
                value: x?.split(':')[0],
            };
        } else {
            return {
                label: x?.split('：')[1],
                key: x?.split('：')[0],
                value: x?.split('：')[0],
            };
        }
    });
    return array;
};

export const getLoggedInUserInfoFromToken = () => {
    // const token = getCookie('accessToken') && getCookie('accessToken') || '';
    // if (!token) {
    //   return null;
    // }
    // const value = jwtDecode(token);
    return null;
};

export function objectToFormData(obj: object, formData = null, namespace = '') {
    const fd = formData || new FormData();

    // for (let property in obj) {
    //     //eslint-disable-next-line
    //     if (!obj.hasOwnProperty(property)) {
    //         continue;
    //     }

    //     const formKey = namespace ? `${namespace}[${property}]` : property;

    //     if (obj[property] instanceof Date) {
    //         fd.append(formKey, obj[property].toISOString());
    //     } else if (
    //         typeof obj[property] === 'object' &&
    //         !(obj[property] instanceof File)
    //     ) {
    //         objectToFormData(obj[property], fd, formKey);
    //     } else {
    //         fd.append(formKey, obj[property]);
    //     }
    // }

    return fd;
}

