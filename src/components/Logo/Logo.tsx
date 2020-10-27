import React from 'react'
import strainLogo from '../../assets/StrainNFT-Logo.png'
import { useHistory  } from 'react-router-dom'

const Logo: React.FC = () => {
    let history = useHistory();

    function imageClick() {
        history.push('/');
    }

    return <img src={strainLogo} alt="Logo" height={48} onClick={() => imageClick()}/>;
};

export default Logo
