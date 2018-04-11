import React, { Component, PropTypes } from 'react';
import { Modal, Button, Form, Col } from 'antd';
import moment from 'moment';

const Base = {};

export default Base;

Base.ModSuccess = (title, content, onOk) => {
    Modal.success({
        title,
        content: <div style={{ wordBreak: 'break-all' }}>{content}</div>,
        okText: '我知道了',
        onOk,
        onCancel() {
        },
    });
}

Base.ModFail = (title, content, onOk) => {
    Modal.error({
        title,
        content: <div style={{ wordBreak: 'break-all' }}>{content}</div>,
        okText: '我知道了',
        onOk,
        onCancel() {
        },
    });
}

Base.ModConfirm = (title, content, onOk) => {
    Modal.confirm({
        title,
        content: <div style={{ wordBreak: 'break-all' }}>{content}</div>,
        onOk,
        onCancel() {},
    });
}


//TODO 增加复杂confirm的情况

Base.ModConfirmData = (title, content, onOk) => {


}

Base.ModInfo = (title, content, onOk) => {
    Modal.info({
        title,
        content: <div style={{ wordBreak: 'break-all' }}>{content}</div>,
        okText: '我知道了',
        onOk,
        onCancel() {
        },
    });
}