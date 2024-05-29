import React from 'react';
import { Row, Col, Button } from 'antd';

import InputSearch from '../commons/InputSearch';
import ButtonFilter from '../commons/ButtonFilter';

function MainContentHeader({ ...props }) {
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
                        <InputSearch />
                    </div>
                    <div className="content-header_item">
                        <ButtonFilter />
                    </div>
                </Row>
            </Col>
        </Row>
    );
}

export default MainContentHeader;
