import { Button, Result } from 'antd';
import './style.scss';

export default function Error() {
	return (
		<div className="error">
			<Result status="404" title="404" subTitle="Sorry, the page you visited does not exist." />
		</div>
	);
}
