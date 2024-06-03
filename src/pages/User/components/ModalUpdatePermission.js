import React from 'react';
import { Modal, Form, Row, Col, Select, message, Input, List } from 'antd';
import { PERMISSION_STATUS } from '../../../constants/common';
import { updatePermission } from '../../../services/apis/UserApis';

const { Option } = Select;
const layout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};

function ModalUpdatePermission({ permission, setPermission, isOpenEdit, setIsOpenEdit, isReload, setIsReload }) {
    const [form] = Form.useForm();

    const handleCancel = () => {
        setIsOpenEdit(false);
        setPermission(null);
    };
    const handleOk = async () => {
        try {
            const formValues = await form.validateFields();
            await update({ id: permission.id, description: formValues.description });
            setIsOpenEdit(false);
        } catch (error) {
            message.error(error?.message);
        }
    };

    const update = async ({ ...params }) => {
        try {
            const rs = await updatePermission(params);
            message.success(rs?.message);
            setIsReload(!isReload);
        } catch (error) {
            message.error(error?.message);
        } finally {
        }
    };
    return (
        <Modal
            width={750}
            styles={{
                mask: {
                    padding: '0px !importance',
                },
                header: {
                    background: '#fff',
                    borderBottom: '1px solid #f0f0f0',
                    borderRadius: '2px 2px 0 0',
                    padding: '16px 24px',
                },
                body: {
                    padding: '16px 24px',
                },
                footer: {
                    padding: '16px 24px',
                },
            }}
            title={'Edit Permission'}
            open={isOpenEdit}
            onCancel={handleCancel}
            onOk={handleOk}
            okText={'Update'}
        >
            <Form {...layout} form={form} onFinish={handleOk} initialValues={permission}>
                <Row>
                    <Col span={24}>
                        <Form.Item name="name" label="Permission Name">
                            <Input disabled={true} className="form-input" placeholder="Enter First Name" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="description"
                            label="Permission Description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Last Name is required',
                                },
                            ]}
                        >
                            <Input className="form-input" placeholder="Enter Last Name" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="status" label="Status">
                            <Select
                                disabled={true}
                                style={{
                                    height: 40,
                                }}
                            >
                                <Option value={PERMISSION_STATUS.APPLIED.key}>{PERMISSION_STATUS.APPLIED.value}</Option>
                                <Option value={PERMISSION_STATUS.NOTAPPLIED.key}>
                                    {PERMISSION_STATUS.NOTAPPLIED.value}
                                </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="linkedModules" label="Linked Modules ">
                            <List
                                style={{
                                    padding: '10px',
                                    background: '#0000000a',
                                    borderRadius: '6px',
                                    border: '1px solid #d9d9d9',
                                }}
                                size="small"
                                dataSource={permission.linkedModules}
                                renderItem={(item) => (
                                    <List.Item
                                        key={item}
                                        style={{
                                            padding: 0,
                                            borderBlockEnd: 'none',
                                            alignItems: 'center',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            color: '#00000040',
                                        }}
                                    >
                                        <span style={{ background: '#00000040' }} className="dot-outlined"></span>{' '}
                                        {item}
                                    </List.Item>
                                )}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

export default ModalUpdatePermission;
