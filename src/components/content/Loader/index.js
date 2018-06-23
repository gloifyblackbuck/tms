import React from 'react';
import PreLoader from '../../uiComponents/materializecss/PreLoader';
// ../../../assets/images/logo/logo@3x.png
import logo3x from '../../../assets/images/44frgm.gif';

const Loader = ({width}) => {
	return (
		<div style={{marginTop:"-89px"}}>
			<div className="page-loader valign-wrapper">
						<div className="container" style={{textAlign: "-webkit-center"}}>
							<div className="page-loader-inner-section">
								<img src={logo3x} width='120px' style={{ "marginBottom": "-39px" }} alt="..."/>
								<PreLoader width={width || '70%'} backgroundColor="#0089ec"/>
							</div>
						</div>
			</div>
		</div>
	);
}

export default Loader;
