import { Layout } from 'antd';

function MainHeader() {
    const { Header } = Layout;
    return (
        <Header
            style={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <div className="demo-logo" />
        </Header>
    );
}

export default MainHeader;
