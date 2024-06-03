import React from 'react';
import { Row, Col } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import InputSearch from '../commons/InputSearch';
import ButtonFilter from '../commons/ButtonFilter';

function MainContentHeader({
    titleLeft,
    headerRight = true,
    checkedKeys,
    setCheckedKeys,
    treeData,
    inputValue,
    searchChange,
    isModalOpen,
    setIsModalOpen,
}) {
    const openModal = () => setIsModalOpen(true);

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
                <div style={{ height: '100%' }}>{titleLeft}</div>
            </Col>
            {headerRight && (
                <Col className="content-header">
                    <Row>
                        <div className="content-header_item">
                            <InputSearch value={inputValue} searchChange={searchChange} />
                        </div>

                        <div className="content-header_item">
                            <ButtonFilter
                                checkedKeys={checkedKeys}
                                setCheckedKeys={setCheckedKeys}
                                treeData={treeData}
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
            )}
        </Row>
    );
}

export default MainContentHeader;
