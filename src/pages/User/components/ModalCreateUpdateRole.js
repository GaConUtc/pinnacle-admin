import React, { useEffect, useState } from 'react';
import { Modal, Form, Row, Col, Select, message, Input, List, Collapse } from 'antd';
import { getModulePermissionDisplay } from '../../../services/apis/RoleApis';

const layout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};
const { Option } = Select;

function ModalCreateUpdateRole({ role, setRole, isOpenModal, setIsOpenModal, isReload, setIsReload }) {
    const [modulePermissions, setModulePermissions] = useState([]);
    const [moduleLinkedPermissions, setModuleLinkedPermissions] = useState([]);
    // let moduleLinkedPermissions = [];
    const [form] = Form.useForm();
    const onOk = async () => {
        const formValues = await form.validateFields();
        console.log(formValues);
    };
    const onCancel = () => {
        setIsOpenModal && setIsOpenModal(false);
        setRole && setRole(null);
    };

    const handleChangePermission = (e, moduleId) => {
        setModuleLinkedPermissions((pre) => {
            console.log(pre);
            return pre?.map((i) =>
                i?.moduleId !== moduleId
                    ? { moduleId: moduleId, linkedPermissions: e }
                    : { ...i, linkedPermissions: e },
            );
        });
    };
    useEffect(() => {
        const getModulePermissionData = async () => {
            try {
                const response = await getModulePermissionDisplay();
                setModulePermissions(response.data);
            } catch (error) {
                message.error(error.message);
            }
        };
        getModulePermissionData();
    }, []);
    console.log(moduleLinkedPermissions);
    return (
        <Modal
            width={750}
            height={750}
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
                    overflowY: 'scroll',
                    padding: '16px 24px',
                    maxHeight: 600,
                },
                footer: {
                    padding: '16px 24px',
                },
            }}
            onCancel={onCancel}
            onOk={onOk}
            open={isOpenModal}
            title={role ? 'Update Role' : 'Add new Role'}
        >
            <Form {...layout} form={form} onFinish={onOk} initialValues={role}>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name="name"
                            label="Role Name"
                            rules={[
                                {
                                    required: true,
                                    message: '',
                                },
                            ]}
                        >
                            <Input className="form-input" placeholder="Enter Name" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="description" label="Role Description">
                            <Input className="form-input" placeholder="Enter Last Name" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Permission">
                            {modulePermissions?.map((item) => {
                                const items = [
                                    {
                                        key: item.moduleId,
                                        label: item.name,
                                        children: (
                                            <Select
                                                mode="multiple"
                                                style={{
                                                    height: 40,
                                                }}
                                                options={item?.displayPermissions?.map((p) => ({
                                                    label: p.name,
                                                    value: p.permissionId,
                                                }))}
                                                onChange={(e) => handleChangePermission(e, item.moduleId)}
                                            ></Select>
                                        ),
                                    },
                                ];

                                return (
                                    <Collapse
                                        key={item.moduleId}
                                        style={{ marginBottom: 10 }}
                                        size="small"
                                        items={items}
                                    ></Collapse>
                                );
                            })}
                        </Form.Item>
                    </Col>
                    <Col></Col>
                </Row>
            </Form>
        </Modal>
    );
}

export default ModalCreateUpdateRole;
