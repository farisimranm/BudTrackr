import { NA } from "./constants";
import dayjs from 'dayjs';

export const months = [
    {
        value: 1,
        label: 'January',
    },
    {
        value: 2,
        label: 'February',
    },
    {
        value: 3,
        label: 'March',
    },
    {
        value: 4,
        label: 'April',
    },
    {
        value: 5,
        label: 'May',
    },
    {
        value: 6,
        label: 'June',
    },
    {
        value: 7,
        label: 'July',
    },
    {
        value: 8,
        label: 'August',
    },
    {
        value: 9,
        label: 'September',
    },
    {
        value: 10,
        label: 'October',
    },
    {
        value: 11,
        label: 'November',
    },
    {
        value: 12,
        label: 'December',
    },

];

export const getMonthName = (monthNumber) => { return monthNumber ? months[monthNumber - 1].label : NA };

export const getFormattedDate = () => {
    const today = new Date();
    const day = new Intl.DateTimeFormat('en-GB', { weekday: 'long' }).format(today);
    const date = new Intl.DateTimeFormat('en-GB', { day: '2-digit' }).format(today);
    const month = new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(today);
    return `${day}, ${date} ${month}`;
};

export const getDayjsDate = (month, year) => {
    if (!Number.isNaN(month) && !Number.isNaN(year)) {
        return dayjs(new Date(year, month - 1, 1));
    }
    else {
        return dayjs();
    }
};