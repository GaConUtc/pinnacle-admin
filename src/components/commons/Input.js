import React from 'react';
import { Input } from 'antd';
export default function InputCustom({ ...props }) {
    return (
        <Input
            className={{ root: 'form-input' }}
            styles={{
                width: props?.width ?? 'auto',
                padding: '0px 3px',
            }}
            placeholder={props.placeholder ?? ''}
        />
    );
}
