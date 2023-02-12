/** 转树形结构 */
export function arrayToTree<T extends { pagepermisson: number; parent_id: number }>(data: T[]) {
	const result = [];
	const obj = data.reduce((pre: any, cur: any) => {
		pre[cur.id] = cur;
		return pre;
	}, {});

	for (let item of data) {
		// if (item.pagepermisson === 0) continue;
		if (item.parent_id === 0) {
			result.push(item);
			continue;
		}
		if (item.parent_id in obj) {
			const parent = obj[item.parent_id];
			parent.children = parent.children || [];
			parent.children.push(item);
		}
	}
	return result;
}
