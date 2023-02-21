import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));
  const result = keys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { name: key, type: 'nested', children: buildTree(data1[key], data2[key]) };
    }
    if (!_.has(data1, key)) {
      return { name: key, type: 'added', value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { name: key, type: 'deleted', value: data1[key] };
    }

    if (!_.isEqual(data1[key], data2[key])) {
      return {
        name: key, type: 'changed', value1: data1[key], value2: data2[key],
      };
    }

    return { name: key, type: 'unchanged', value: data1[key] };
  });

  return result;
};

export default buildTree;
