import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 없는 화면 보여주는것 보다 랜딩페이지로 가는게 좋을듯?
const NotFound = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/');
    }, []);
    return <div>404 - Page Not Found</div>;
};

export default NotFound;
