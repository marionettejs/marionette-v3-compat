import restoreFunction from './utils/restoreFunction';

export default function() {

  restoreFunction('_getChildView', 'getChildView', 'getChildView is deprecated. Use childView instead.', 'CollectionView');
  restoreFunction('_getEmptyView', 'getEmptyView', 'getEmptyView is deprecated. Use emptyView instead.', 'CollectionView');
}
