import axiosPlugin from '@/axiosPlugin.js'
import { message } from 'ant-design-vue';
import { errorHandler } from './common.js'
import qs from "qs";

const module = "userInfo"

export async function login(username, password) {
    let data = null;
    await axiosPlugin({
        method: "post",
        url: module + "/login",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        data: qs.stringify({
            username: username,
            password: password,
        }),
    }).then((response) => {
        data = response.data.msg;
        localStorage.setItem("token", data);
        message.success('登录成功');
    }).catch((response) => {
        if (response.data.state && response.data.code == "-2") {
            message.error('用户名或密码错误');
        } else if (response.data.state && response.data.code == "-3") {
            message.error('用户身份验证通过，但账号尚未通过审核，无法登录');
        }
    });
    return data;
}

export async function preRegister(username, password, studentName, isTeamLeader, groupName, groupDescription) {
    let data = null;
    await axiosPlugin({
        method: "post",
        url: module + "/preRegister",
        data:{
            username: username,
            password: password,
            studentName: studentName,
            isTeamLeader: isTeamLeader,
            groupName: groupName,
            groupDescription: groupDescription,
        },
    }).then((response) => {
        data = response;
    }).catch((response) =>{
        data = errorHandler(response, true);
    });
    return data;
}

export async function getUserInfo() {
    let data = null;
    await axiosPlugin({
        method: "get",
        url: module + "/getUserInfo",
    }).then((response) => {
        data = response.data.msg;
        localStorage.setItem("userInfo", JSON.stringify(data));
        message.success('用户信息已更新');
    }).catch((response) => errorHandler(response));
    return data;
}

export async function joinGroup(groupName, JoinCode) {
    let data = null;
    await axiosPlugin({
        method: "post",
        url: module + "/joinGroup",
        data: {
            groupName: groupName,
            joinCode: JoinCode,
        },
    }).then((response) => {
        data = response;
        localStorage.setItem("token", response.data.msg);
        message.success('用户Token已更新');
    }).catch((response) =>{
        data = errorHandler(response, true);
    });
    return data;
}

export async function sendForgetPasswordMail(username, studentName) {
    let data = null;
    await axiosPlugin({
        method: "post",
        url: module + "/sendForgetPasswordMail",
        data:{
            username: username,
            studentName: studentName,
        },
    }).then((response) => {
        data = response;
    }).catch((response) =>{
        data = errorHandler(response, true);
    });
    return data;
}

export async function changePasswordByToken(token, newPassword) {
    let data = null;
    await axiosPlugin({
        method: "post",
        url: module + "/changePasswordByToken",
        data:{
            token: token,
            newPassword: newPassword,
        },
    }).then((response) => {
        data = response;
    }).catch((response) =>{
        data = errorHandler(response, true);
    });
    return data;
}

export async function changePasswordByUser(oldPassword, newPassword) {
    let data = null;
    await axiosPlugin({
        method: "post",
        url: module + "/changePasswordByUser",
        data:{
            oldPassword: oldPassword,
            newPassword: newPassword,
        },
    }).then((response) => {
        data = response;
    }).catch((response) =>{
        data = errorHandler(response, true);
    });
    return data;
}


export async function getUserList(pageSize, pageNum) {
    let data = null;
    await axiosPlugin({
        method: "get",
        url: module + "/teacher/getUserInfoList",
        params: {
            pageSize: pageSize,
            pageNum: pageNum,
        },
    }).then((response) => {
        if (response.data.state === "SUCCESS") {
            data = response.data.msg;
        }
    });
    return data;
}