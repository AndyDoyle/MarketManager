import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};
export const userData = query => {
    return request({
        url: './usertable.json',
        method: 'get',
        params: query
    });
};
export const worktimeData = query => {
    return request({
        url: './worktime.json',
        method: 'get',
        params: query
    });
};
export const supplierData = query => {
    return request({
        url: './supplier.json',
        method: 'get',
        params: query
    });
};
export const stockData = query => {
    return request({
        url: './stock.json',
        method: 'get',
        params: query
    });
};
export const goodData = query => {
    return request({
        url: './good.json',
        method: 'get',
        params: query
    });
};
export const goodinData = query => {
    return request({
        url: './goodin.json',
        method: 'get',
        params: query
    });
};
export const goodoutData = query => {
    return request({
        url: './goodout.json',
        method: 'get',
        params: query
    });
};
export const ykData = query => {
    return request({
        url: './inventory.json',
        method: 'get',
        params: query
    });
};
export const roleData = query => {
    return request({
        url: './role.json',
        method: 'get',
        params: query
    });
};