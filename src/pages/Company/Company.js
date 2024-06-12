import { useState } from 'react';
import CompanyDetail from './components/CompanyDetail';
import CompanyRegister from './components/CompanyRegister';

function Company() {
    const [isEditMode, setIsEditMode] = useState(false);
    return isEditMode ? <CompanyDetail /> : <CompanyRegister changeMode={setIsEditMode} />;
}

export default Company;
