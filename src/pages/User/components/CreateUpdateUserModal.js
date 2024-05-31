import React, { useEffect, useState } from 'react';
import { Modal, Form, Row, Col, Select, message, Input } from 'antd';

import { getRoleSelectList } from '../../../services/apis/RoleApis';
import { createUpdateUser } from '../../../services/apis/UserApis';
import { COMMON_STATUS } from '../../../constants/common';

function CreateUpdateUserModal({ ...props }) {
    const [roles, setRoles] = useState([]);
    const [form] = Form.useForm();
    const { Option } = Select;
    const layout = {
        labelCol: {
            span: 24,
        },
        wrapperCol: {
            span: 24,
        },
    };

    const getRoles = async () => {
        try {
            const response = await getRoleSelectList();
            setRoles(response.data);
        } catch (error) {
            message.error(error?.message);
        }
    };

    const createUser = async (user) => {
        try {
            const response = await createUpdateUser(user);
            message.success(response.message);
            form.resetFields();
            props.setIsModalOpen(false);
        } catch (error) {
            message.error(error.message);
        }
    };
    useEffect(() => {
        getRoles();
    }, []);

    const handleCancel = () => props.setIsModalOpen(false);
    const handleOk = async () => {
        try {
            let formVals = await form.validateFields();
            formVals = { ...formVals, userName: `${formVals.firstName} ${formVals.lastName}`, id: null };
            // await createUser(formVals);
            props.setIsReload(!props.isReload);
        } catch (error) {}
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
            title="Add new account"
            open={props.isModalOpen}
            onCancel={handleCancel}
            onOk={handleOk}
            okText={'Create'}
        >
            <Form
                {...layout}
                form={form}
                onFinish={handleOk}
                initialValues={{
                    firstName: '',
                    lastName: '',
                    contactNumber: '',
                    email: '',
                    role: null,
                    status: COMMON_STATUS.ACTIVE.key,
                }}
            >
                <Row>
                    <Col span={12}>
                        <Form.Item
                            name="firstName"
                            label="First Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'First Name is required',
                                },
                            ]}
                        >
                            <Input className="form-input" placeholder="Enter First Name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="lastName"
                            label="Last Name"
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
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            name="phoneNumber"
                            label="Contact Number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Contact Number is required',
                                },
                            ]}
                        >
                            <Input className="form-input" placeholder="Contact Number" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Valid Email is required',
                                },
                            ]}
                        >
                            <Input className="form-input" placeholder="Email" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        {' '}
                        <Form.Item
                            name="status"
                            label="Status"
                            rules={[
                                {
                                    required: true,
                                    message: 'Status is required',
                                },
                            ]}
                        >
                            <Select
                                style={{
                                    height: 40,
                                }}
                                placeholder="Select Status"
                            >
                                <Option value={COMMON_STATUS.ACTIVE.key}>{COMMON_STATUS.ACTIVE.value}</Option>
                                <Option value={COMMON_STATUS.INACTIVE.key}>{COMMON_STATUS.INACTIVE.value}</Option>
                                <Option value={COMMON_STATUS.DELETED.key}>{COMMON_STATUS.DELETED.value}</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="roleId"
                            label="Role"
                            rules={[
                                {
                                    required: true,
                                    message: 'Role is required',
                                },
                            ]}
                        >
                            <Select
                                style={{
                                    height: 40,
                                }}
                                placeholder="Select Role"
                                options={roles?.map((r) => ({
                                    value: r.key.toString(),
                                    label: r.value,
                                }))}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

export default CreateUpdateUserModal;
