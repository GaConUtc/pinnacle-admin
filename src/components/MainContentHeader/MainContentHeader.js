import React from 'react';
import { Row, Col } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import InputSearch from '../commons/InputSearch';
import ButtonFilter from '../commons/ButtonFilter';

function MainContentHeader({
    titleLeft,
    checkedKeys,
    setCheckedKeys,
    treeData,
    inputValue,
    searchChange,
    setIsModalOpen,
    showHeader,
}) {
    const openModal = () => (setIsModalOpen ? setIsModalOpen(true) : console.log());

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

            <Col className="content-header">
                <Row style={{ alignItems: 'center', height: '100%' }}>
                    {showHeader?.search && (
                        <div className="content-header_item">
                            <InputSearch value={inputValue} searchChange={searchChange} />
                        </div>
                    )}

                    {showHeader?.filter && (
                        <div className="content-header_item">
                            <ButtonFilter
                                checkedKeys={checkedKeys}
                                setCheckedKeys={setCheckedKeys}
                                treeData={treeData}
                            />
                        </div>
                    )}
                    {showHeader?.addNew && (
                        <div className="content-header_item" style={{ display: 'flex' }}>
                            <PlusCircleOutlined
                                onClick={openModal}
                                style={{ fontSize: 16, opacity: 0.5, cursor: 'pointer' }}
                            />
                        </div>
                    )}
                </Row>
            </Col>
        </Row>
    );
}

export default MainContentHeader;
