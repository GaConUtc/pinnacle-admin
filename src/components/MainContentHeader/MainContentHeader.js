import React from 'react';
import { Row, Col } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import InputSearch from '../commons/InputSearch';
import ButtonFilter from '../commons/ButtonFilter';

import './MainContentHeader.scss';

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
        <Row className="content-header" style={{ justifyContent: 'space-between', padding: '20px 0' }}>
            <Col
                className="content-header__item content-header__left"
                style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#002060',
                    lineHeight: '32px',
                }}
            >
                <div style={{ height: '100%' }}>{titleLeft}</div>
            </Col>

            <Col>
                <Row
                    className="content-header__item content-header__right"
                    style={{ alignItems: 'center', height: '100%' }}
                >
                    {showHeader?.search && (
                        <div className="content-header__right-item">
                            <InputSearch value={inputValue} searchChange={searchChange} />
                        </div>
                    )}

                    {showHeader?.filter && (
                        <div className="content-header__right-item">
                            <ButtonFilter
                                checkedKeys={checkedKeys}
                                setCheckedKeys={setCheckedKeys}
                                treeData={treeData}
                            />
                        </div>
                    )}
                    {showHeader?.addNew && (
                        <div className="content-header__right-item" style={{ display: 'flex' }}>
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
