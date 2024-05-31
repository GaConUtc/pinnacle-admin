import React from 'react';
import { Row, Col } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import InputSearch from '../commons/InputSearch';
import ButtonFilter from '../commons/ButtonFilter';

function MainContentHeader({ ...props }) {
    const openModal = () => props.setIsModalOpen(true);

    return (
        <Row style={{ justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #DFDFDF' }}>
            <Col
                style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#002060',
                    lineHeight: '32px',
                }}
            >
                <div style={{ height: '100%' }}>{props.titleLeft}</div>
            </Col>
            <Col className="content-header">
                <Row>
                    <div className="content-header_item">
                        <InputSearch value={props.inputValue} searchChange={props.searchChange} />
                    </div>
                    <div className="content-header_item">
                        <ButtonFilter
                            checkedKeys={props.checkedKeys}
                            setCheckedKeys={props.setCheckedKeys}
                            treeData={props.treeData}
                        />
                    </div>
                    <div className="content-header_item" style={{ display: 'flex' }}>
                        <PlusCircleOutlined
                            onClick={openModal}
                            style={{ fontSize: 16, opacity: 0.5, cursor: 'pointer' }}
                        />
                    </div>
                </Row>
            </Col>
        </Row>
    );
}

export default MainContentHeader;
