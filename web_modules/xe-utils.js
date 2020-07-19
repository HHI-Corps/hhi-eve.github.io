var formatString = 'yyyy-MM-dd HH:mm:ss';
var setupDefaults = {
  treeOptions: {
    parentKey: 'parentId',
    key: 'id',
    children: 'children'
  },
  formatDate: formatString + '.SSSZ',
  formatString: formatString,
  dateDiffRules: [
    ['yyyy', 31536000000],
    ['MM', 2592000000],
    ['dd', 86400000],
    ['HH', 3600000],
    ['mm', 60000],
    ['ss', 1000],
    ['S', 0]
  ]
};

var setupDefaults_1 = setupDefaults;

function arrayEach (obj, iterate, context) {
  if (obj) {
    if (obj.forEach) {
      obj.forEach(iterate, context);
    } else {
      for (var index = 0, len = obj.length; index < len; index++) {
        iterate.call(context, obj[index], index, obj);
      }
    }
  }
}

var arrayEach_1 = arrayEach;

var objectToString = Object.prototype.toString;

var staticObjectToString = objectToString;

function helperCreateInInObjectString (type) {
  return function (obj) {
    return '[object ' + type + ']' === staticObjectToString.call(obj)
  }
}

var helperCreateInInObjectString_1 = helperCreateInInObjectString;

/**
  * 判断是否数组
  *
  * @param {Object} obj 对象
  * @return {Boolean}
  */
var isArray = Array.isArray || helperCreateInInObjectString_1('Array');

var isArray_1 = isArray;

/**
  * 判断对象自身属性中是否具有指定的属性
  *
  * @param {Object} obj 对象
  * @param {String/Number} key 键值
  * @return {Boolean}
  */
function hasOwnProp (obj, key) {
  return obj && obj.hasOwnProperty ? obj.hasOwnProperty(key) : false
}

var hasOwnProp_1 = hasOwnProp;

function objectEach (obj, iterate, context) {
  if (obj) {
    for (var key in obj) {
      if (hasOwnProp_1(obj, key)) {
        iterate.call(context, obj[key], key, obj);
      }
    }
  }
}

var objectEach_1 = objectEach;

/**
  * 迭代器
  *
  * @param {Object} obj 对象/数组
  * @param {Function} iterate(item, index, obj) 回调
  * @param {Object} context 上下文
  * @return {Object}
  */
function each (obj, iterate, context) {
  if (obj) {
    return (isArray_1(obj) ? arrayEach_1 : objectEach_1)(obj, iterate, context)
  }
  return obj
}

var each_1 = each;

/* eslint-disable valid-typeof */
function helperCreateInTypeof (type) {
  return function (obj) {
    return typeof obj === type
  }
}

var helperCreateInTypeof_1 = helperCreateInTypeof;

/**
  * 判断是否方法
  *
  * @param {Object} obj 对象
  * @return {Boolean}
  */
var isFunction = helperCreateInTypeof_1('function');

var isFunction_1 = isFunction;

function helperCreateGetObjects (name, getIndex) {
  var proMethod = Object[name];
  return function (obj) {
    var result = [];
    if (obj) {
      if (proMethod) {
        return proMethod(obj)
      }
      each_1(obj, getIndex > 1 ? function (key) {
        result.push(['' + key, obj[key]]);
      } : function () {
        result.push(arguments[getIndex]);
      });
    }
    return result
  }
}

var helperCreateGetObjects_1 = helperCreateGetObjects;

/**
  * 获取对象所有属性
  *
  * @param {Object} obj 对象/数组
  * @return {Array}
  */
var keys = helperCreateGetObjects_1('keys', 1);

var keys_1 = keys;

/**
  * 判断是否对象
  *
  * @param {Object} obj 对象
  * @return {Boolean}
  */
function isPlainObject (obj) {
  return obj ? obj.constructor === Object : false
}

var isPlainObject_1 = isPlainObject;

/**
  * 判断是否为Null
  *
  * @param {Object} obj 对象
  * @return {Boolean}
  */
function isNull (obj) {
  return obj === null
}

var isNull_1 = isNull;

/**
 * 返回一个获取对象属性的函数
 *
 * @param {String} name 属性名
 * @param {Object} defs 空值
 */
function property (name, defs) {
  return function (obj) {
    return isNull_1(obj) ? defs : obj[name]
  }
}

var property_1 = property;

/**
  * 指定方法后的返回值组成的新对象
  *
  * @param {Object} obj 对象/数组
  * @param {Function} iterate(item, index, obj) 回调
  * @param {Object} context 上下文
  * @return {Object}
  */
function objectMap (obj, iterate, context) {
  var result = {};
  if (obj) {
    if (iterate) {
      if (!isFunction_1(iterate)) {
        iterate = property_1(iterate);
      }
      each_1(obj, function (val, index) {
        result[index] = iterate.call(context, val, index, obj);
      });
    } else {
      return obj
    }
  }
  return result
}

var objectMap_1 = objectMap;

/**
  * 指定方法后的返回值组成的新数组
  *
  * @param {Object} obj 对象/数组
  * @param {Function} iterate(item, index, obj) 回调
  * @param {Object} context 上下文
  * @return {Array}
  */
function map (obj, iterate, context) {
  var result = [];
  if (obj && arguments.length > 1) {
    if (!isFunction_1(iterate)) {
      iterate = property_1(iterate);
    }
    if (obj.map) {
      return obj.map(iterate, context)
    } else {
      each_1(obj, function () {
        result.push(iterate.apply(context, arguments));
      });
    }
  }
  return result
}

var map_1 = map;

function handleObjectAndArrayClone (func, obj, deep) {
  return func(obj, deep ? function (val) {
    return copyValue(val, deep)
  } : function (val) {
    return val
  })
}

function handleValueClone (val, deep) {
  if (deep && val) {
    var Ctor = val.constructor;
    switch(staticObjectToString.call(val)) {
      case "[object Date]":
      case "[object RegExp]":
        return new Ctor(val.valueOf())
      case "[object Set]":
        var set = new Ctor();
        val.forEach(function (v) {
          set.add(v);
        });
        return set
      case "[object Map]":
        var map = new Ctor();
        val.forEach(function (v, k) {
          map.set(k, v);
        });
        return map
    }
  }
  return val
}

function copyValue (val, deep) {
  if (isPlainObject_1(val)) {
    return handleObjectAndArrayClone(objectMap_1, val, deep)
  } else if (isArray_1(val)) {
    return handleObjectAndArrayClone(map_1, val, deep)
  }
  return handleValueClone(val, deep)
}

/**
  * 浅拷贝/深拷贝
  *
  * @param {Object} obj 对象/数组
  * @param {Boolean} deep 是否深拷贝
  * @return {Object}
  */
function clone (obj, deep) {
  if (obj) {
    return copyValue(obj, deep)
  }
  return obj
}

var clone_1 = clone;

var objectAssignFns = Object.assign;

function handleAssign (destination, args, isClone) {
  var len = args.length;
  for (var source, index = 1; index < len; index++) {
    source = args[index];
    arrayEach_1(keys_1(args[index]), isClone ? function (key) {
      destination[key] = clone_1(source[key], isClone);
    } : function (key) {
      destination[key] = source[key];
    });
  }
  return destination
}

/**
  * 将一个或多个源对象复制到目标对象中
  *
  * @param {Object} target 目标对象
  * @param {...Object}
  * @return {Boolean}
  */
var assign = function (target) {
  if (target) {
    var args = arguments;
    if (target === true) {
      if (args.length > 1) {
        target = isArray_1(target[1]) ? [] : {};
        return handleAssign(target, args, true)
      }
    } else {
      return objectAssignFns ? objectAssignFns.apply(Object, args) : handleAssign(target, args)
    }
  }
  return target
};

var assign_1 = assign;

function mixin () {
  arrayEach_1(arguments, function (methods) {
    each_1(methods, function (fn, name) {
      XEUtils[name] = isFunction_1(fn) ? function () {
        var result = fn.apply(XEUtils.$context, arguments);
        XEUtils.$context = null;
        return result
      } : fn;
    });
  });
}

function setup (options) {
  return assign_1(setupDefaults_1, options)
}

function XEUtils () {}

XEUtils.v = 'v2';
XEUtils.mixin = mixin;
XEUtils.setup = setup;

var xeUtils = XEUtils;

/**
 * 该方法已废弃，被 assign 替换
 * @param target 目标对象
 * @param sources 多个对象
*/
var extend = assign_1;

var extend_1 = extend;

function lastArrayEach (obj, iterate, context) {
  for (var len = obj.length - 1; len >= 0; len--) {
    iterate.call(context, obj[len], len, obj);
  }
}

var lastArrayEach_1 = lastArrayEach;

function lastObjectEach (obj, iterate, context) {
  lastArrayEach_1(keys_1(obj), function (key) {
    iterate.call(context, obj[key], key, obj);
  });
}

var lastObjectEach_1 = lastObjectEach;

function handleMerge (target, source) {
  if ((isPlainObject_1(target) && isPlainObject_1(source)) || (isArray_1(target) && isArray_1(source))) {
    each_1(source, function (obj, key) {
      target[key] = handleMerge(target[key], obj);
    });
    return target
  }
  return source
}

/**
  * 将一个或多个源对象合并到目标对象中
  *
  * @param {Object} target 目标对象
  * @param {...Object}
  * @return {Boolean}
  */
 var merge = function (target) {
  if (!target) {
    target = {};
  }
  var args = arguments;
  var len = args.length;
  for (var source, index = 1; index < len; index++) {
    source = args[index];
    if (source) {
      handleMerge(target, source);
    }
  }
  return target
};

var merge_1 = merge;

function helperCreateIterateHandle (prop, useArray, restIndex, matchValue, defaultValue) {
  return function (obj, iterate, context) {
    if (obj && iterate) {
      if (prop && obj[prop]) {
        return obj[prop](iterate, context)
      } else {
        if (useArray && isArray_1(obj)) {
          for (var index = 0, len = obj.length; index < len; index++) {
            if (!!iterate.call(context, obj[index], index, obj) === matchValue) {
              return [true, false, index, obj[index]][restIndex]
            }
          }
        } else {
          for (var key in obj) {
            if (hasOwnProp_1(obj, key)) {
              if (!!iterate.call(context, obj[key], key, obj) === matchValue) {
                return [true, false, key, obj[key]][restIndex]
              }
            }
          }
        }
      }
    }
    return defaultValue
  }
}

var helperCreateIterateHandle_1 = helperCreateIterateHandle;

/**
  * 对象中的值中的每一项运行给定函数,如果函数对任一项返回true,则返回true,否则返回false
  *
  * @param {Object} obj 对象/数组
  * @param {Function} iterate(item, index, obj) 回调
  * @param {Object} context 上下文
  * @return {Boolean}
  */
var some = helperCreateIterateHandle_1('some', 1, 0, true, false);

var some_1 = some;

/**
  * 对象中的值中的每一项运行给定函数,如果该函数对每一项都返回true,则返回true,否则返回false
  *
  * @param {Object} obj 对象/数组
  * @param {Function} iterate(item, index, obj) 回调
  * @param {Object} context 上下文
  * @return {Boolean}
  */
var every = helperCreateIterateHandle_1('every', 1, 1, false, true);

var every_1 = every;

function helperCreateIndexOf (name, callback) {
  return function (obj, val) {
    if (obj) {
      if (typeof obj === 'string' || isArray_1(obj)) {
        if (obj[name]) {
          return obj[name](val)
        }
        return callback(obj, val)
      }
      for (var key in obj) {
        if (hasOwnProp_1(obj, key)) {
          if (val === obj[key]) {
            return key
          }
        }
      }
    }
    return -1
  }
}

var helperCreateIndexOf_1 = helperCreateIndexOf;

function arrayIndexOf (obj, val) {
  if (obj.indexOf) {
    return obj.indexOf(val)
  }
  for (var index = 0, len = obj.length; index < len; index++) {
    if (val === obj[index]) {
      return index
    }
  }
}

var arrayIndexOf_1 = arrayIndexOf;

/**
  * 返回对象第一个索引值
  *
  * @param {Object} obj 对象
  * @param {Object} val 值
  * @return {Number}
  */
var indexOf = helperCreateIndexOf_1('indexOf', arrayIndexOf_1);

var indexOf_1 = indexOf;

/**
  * 判断对象是否包含该值,成功返回true否则false
  *
  * @param {Object} obj 对象
  * @param {Object} val 值
  * @return {Boolean}
  */
function includes (obj, val) {
  return indexOf_1(obj, val) !== -1
}

var includes_1 = includes;

/**
  * 判断数组是否包含另一数组
  *
  * @param {Array} array1 数组
  * @param {Array} array2 被包含数组
  * @return {Boolean}
  */
function includeArrays (array1, array2) {
  var len;
  var index = 0;
  if (isArray_1(array1) && isArray_1(array2)) {
    for (len = array2.length; index < len; index++) {
      if (!includes_1(array1, array2[index])) {
        return false
      }
    }
    return true
  }
  return includes_1(array1, array2)
}

var includeArrays_1 = includeArrays;

/**
  * 数组去重
  *
  * @param {Array} array 数组
  * @return {Array}
  */
function uniq (array) {
  var result = [];
  each_1(array, function (value) {
    if (!includes_1(result, value)) {
      result.push(value);
    }
  });
  return result
}

var uniq_1 = uniq;

/**
 * 将对象或者伪数组转为新数组
 *
 * @param {Array} obj 数组
 * @return {Array}
 */
function toArray (array) {
  return map_1(array, function (item) {
    return item
  })
}

var toArray_1 = toArray;

/**
  * 将多个数的值返回唯一的并集数组
  *
  * @param {...Array} 数组
  * @return {Array}
  */
function union () {
  var args = arguments;
  var result = [];
  var index = 0;
  var len = args.length;
  for (; index < len; index++) {
    result = result.concat(toArray_1(args[index]));
  }
  return uniq_1(result)
}

var union_1 = union;

var staticStrUndefined = 'undefined';

var staticStrUndefined_1 = staticStrUndefined;

/**
  * 判断是否Undefined
  *
  * @param {Object} obj 对象
  * @return {Boolean}
  */
var isUndefined = helperCreateInTypeof_1(staticStrUndefined_1);

var isUndefined_1 = isUndefined;

/**
 * 判断是否 undefined 和 null
 * @param {Object} obj 对象
 * @return {Boolean}
 */
function eqNull (obj) {
  return isNull_1(obj) || isUndefined_1(obj)
}

var eqNull_1 = eqNull;

var staticHGKeyRE = /(.+)?\[(\d+)\]$/;

var staticHGKeyRE_1 = staticHGKeyRE;

function helperGetHGSKeys (property) {
  // 以最快的方式判断数组，可忽略准确性
  return property ? (property.splice && property.join ? property : ('' + property).split('.')) : []
}

var helperGetHGSKeys_1 = helperGetHGSKeys;

/**
 * 获取对象的属性的值，如果值为 undefined，则返回默认值
 * @param {Object/Array} obj 对象
 * @param {String/Function} property 键、路径
 * @param {Object} defaultValue 默认值
 * @return {Object}
 */
function get (obj, property, defaultValue) {
  if (eqNull_1(obj)) {
    return defaultValue
  }
  var result = pathGet(obj, property);
  return isUndefined_1(result) ? defaultValue : result
}

function valGet (obj, key) {
  var matchs = key ? key.match(staticHGKeyRE_1) : '';
  return matchs ? (matchs[1] ? (obj[matchs[1]] ? obj[matchs[1]][matchs[2]] : undefined) : obj[matchs[2]]) : obj[key]
}

function pathGet (obj, property) {
  if (obj) {
    var rest, props, len;
    var index = 0;
    if (obj[property] || hasOwnProp_1(obj, property)) {
      return obj[property]
    } else {
      props = helperGetHGSKeys_1(property);
      len = props.length;
      if (len) {
        for (rest = obj; index < len; index++) {
          rest = valGet(rest, props[index]);
          if (eqNull_1(rest)) {
            if (index === len - 1) {
              return rest
            }
            return
          }
        }
      }
      return rest
    }
  }
}

var get_1 = get;

// function sortByDef (v1, v2) {
//   return v1 > v2 ? 1 : -1
// }

// 支持中文、数字、字母排序 > null > undefined
function sortByDef (v1, v2) {
  if (isUndefined_1(v1)) {
    return 1
  }
  if (isNull_1(v1)) {
    return isUndefined_1(v2) ? -1 : 1
  }
  return v1 && v1.localeCompare ? v1.localeCompare(v2) : (v1 > v2 ? 1 : -1)
}

function sortMultis (name, compares) {
  return function (item1, item2) {
    var v1 = item1[name];
    var v2 = item2[name];
    if (v1 === v2) {
      return compares ? compares(item1, item2) : 0
    }
    return sortByDef(v1, v2)
  }
}

function getSortPros (arr, list, iterate, context) {
  iterate = isArray_1(iterate) ? iterate : [iterate];
  arrayEach_1(iterate, function (prop, index) {
    arrayEach_1(list, isFunction_1(prop) ? function (val, key) {
      val[index] = prop.call(context, val.data, key, arr);
    } : function (val) {
      val[index] = get_1(val.data, prop);
    });
  });
  return iterate
}

/**
  * 数组按属性值升序
  *
  * @param {Array} arr 数组
  * @param {Function/String/Array} iterate 方法或属性
  * @param {Object} context 上下文
  * @return {Array}
  */
function sortBy (arr, iterate, context) {
  if (arr) {
    if (eqNull_1(iterate)) {
      return toArray_1(arr).sort(sortByDef)
    }
    var compares;
    var list = map_1(arr, function (item) {
      return { data: item }
    });
    var sortPros = getSortPros(arr, list, iterate, context);
    var len = sortPros.length;
    if (len) {
      while (len >= 0) {
        compares = sortMultis(len, compares);
        len--;
      }
      list = list.sort(compares);
    }
    return map_1(list, property_1('data'))
  }
  return []
}

var sortBy_1 = sortBy;

/**
  * 获取一个指定范围内随机数
  *
  * @param {Number} minVal 最小值
  * @param {Number} maxVal 最大值
  * @return {Number}
  */
function random (minVal, maxVal) {
  return minVal >= maxVal ? minVal : ((minVal = minVal >> 0) + Math.round(Math.random() * ((maxVal || 9) - minVal)))
}

var random_1 = random;

/**
  * 获取对象所有值
  *
  * @param {Object} obj 对象/数组
  * @return {Array}
  */
var values = helperCreateGetObjects_1('values', 0);

var values_1 = values;

/**
  * 将一个数组随机打乱，返回一个新的数组
  *
  * @param {Array} array 数组
  * @return {Array}
  */
function shuffle (array) {
  var index;
  var result = [];
  var list = values_1(array);
  var len = list.length - 1;
  for (; len >= 0; len--) {
    index = len > 0 ? random_1(0, len) : 0;
    result.push(list[index]);
    list.splice(index, 1);
  }
  return result
}

var shuffle_1 = shuffle;

/**
  * 从一个数组中随机返回几个元素
  *
  * @param {Array} array 数组
  * @param {Number} number 个数
  * @return {Array}
  */
function sample (array, number) {
  var result = shuffle_1(array);
  if (arguments.length <= 1) {
    return result[0]
  }
  if (number < result.length) {
    result.length = number || 0;
  }
  return result
}

var sample_1 = sample;

/**
 * 裁剪 Arguments 或数组 array，从 start 位置开始到 end 结束，但不包括 end 本身的位置
 * @param {Array/Arguments} array 数组或Arguments
 * @param {Number} startIndex 开始索引
 * @param {Number} endIndex 结束索引
 */
function slice (array, startIndex, endIndex) {
  var result = [];
  if (array) {
    for (startIndex = startIndex || 0, endIndex = endIndex || array.length; startIndex < endIndex; startIndex++) {
      result.push(array[startIndex]);
    }
  }
  return result
}

var slice_1 = slice;

/**
  * 根据回调过滤数据
  *
  * @param {Object} obj 对象/数组
  * @param {Function} iterate(item, index, obj) 回调
  * @param {Object} context 上下文
  * @return {Object}
  */
function filter (obj, iterate, context) {
  var result = [];
  if (obj && iterate) {
    if (obj.filter) {
      return obj.filter(iterate, context)
    }
    each_1(obj, function (val, key) {
      if (iterate.call(context, val, key, obj)) {
        result.push(val);
      }
    });
  }
  return result
}

var filter_1 = filter;

/**
  * 查找匹配第一条数据的键
  *
  * @param {Object} obj 对象/数组
  * @param {Function} iterate(item, index, obj) 回调
  * @param {Object} context 上下文
  * @return {Object}
  */
var findKey = helperCreateIterateHandle_1('', 0, 2, true);

var findKey_1 = findKey;

/**
  * 查找匹配第一条数据
  *
  * @param {Object} obj 对象/数组
  * @param {Function} iterate(item, index, obj) 回调
  * @param {Object} context 上下文
  * @return {Object}
  */
var find = helperCreateIterateHandle_1('find', 1, 3, true);

var find_1 = find;

/**
  * 接收一个函数作为累加器，数组中的每个值（从左到右）开始合并，最终为一个值。
  *
  * @param {Array} array 数组
  * @param {Function} callback 方法
  * @param {Object} initialValue 初始值
  * @return {Number}
  */
function reduce (array, callback, initialValue) {
  if (array) {
    var len, reduceMethod;
    var index = 0;
    var context = null;
    var previous = initialValue;
    var isInitialVal = arguments.length > 2;
    var keyList = keys_1(array);
    if (array.length && array.reduce) {
      reduceMethod = function () {
        return callback.apply(context, arguments)
      };
      if (isInitialVal) {
        return array.reduce(reduceMethod, previous)
      }
      return array.reduce(reduceMethod)
    }
    if (isInitialVal) {
      index = 1;
      previous = array[keyList[0]];
    }
    for (len = keyList.length; index < len; index++) {
      previous = callback.call(context, previous, array[keyList[index]], index, array);
    }
    return previous
  }
}

var reduce_1 = reduce;

/**
  * 浅复制数组的一部分到同一数组中的另一个位置,数组大小不变
  *
  * @param {Array} array 数组
  * @param {Number} target 从该位置开始替换数据
  * @param {Number} start 从该位置开始读取数据，默认为 0 。如果为负值，表示倒数
  * @param {Number} end 到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数
  * @return {Array}
  */
function copyWithin (array, target, start, end) {
  if (isArray_1(array) && array.copyWithin) {
    return array.copyWithin(target, start, end)
  }
  var replaceIndex, replaceArray;
  var targetIndex = target >> 0;
  var startIndex = start >> 0;
  var len = array.length;
  var endIndex = arguments.length > 3 ? end >> 0 : len;
  if (targetIndex < len) {
    targetIndex = targetIndex >= 0 ? targetIndex : len + targetIndex;
    if (targetIndex >= 0) {
      startIndex = startIndex >= 0 ? startIndex : len + startIndex;
      endIndex = endIndex >= 0 ? endIndex : len + endIndex;
      if (startIndex < endIndex) {
        for (replaceIndex = 0, replaceArray = array.slice(startIndex, endIndex); targetIndex < len; targetIndex++) {
          if (replaceArray.length <= replaceIndex) {
            break
          }
          array[targetIndex] = replaceArray[replaceIndex++];
        }
      }
    }
  }
  return array
}

var copyWithin_1 = copyWithin;

/**
  * 将一个数组分割成大小的组。如果数组不能被平均分配，那么最后一块将是剩下的元素
  *
  * @param {Array} array 数组
  * @param {Number} size 每组大小
  * @return {Array}
  */
function chunk (array, size) {
  var index;
  var result = [];
  var arrLen = size >> 0 || 1;
  if (isArray_1(array)) {
    if (arrLen >= 0 && array.length > arrLen) {
      index = 0;
      while (index < array.length) {
        result.push(array.slice(index, index + arrLen));
        index += arrLen;
      }
    } else {
      result = array.length ? [array] : array;
    }
  }
  return result
}

var chunk_1 = chunk;

function helperCreateMinMax (handle) {
  return function (arr, iterate) {
    if (arr && arr.length) {
      var rest, itemIndex;
      arrayEach_1(arr, function (itemVal, index) {
        if (iterate) {
          itemVal = isFunction_1(iterate) ? iterate(itemVal, index, arr) : get_1(itemVal, iterate);
        }
        if (!eqNull_1(itemVal) && (eqNull_1(rest) || handle(rest, itemVal))) {
          itemIndex = index;
          rest = itemVal;
        }
      });
      return arr[itemIndex]
    }
    return rest
  }
}

var helperCreateMinMax_1 = helperCreateMinMax;

/**
  * 获取最大值
  *
  * @param {Array} arr 数组
  * @param {Function} iterate(item, index, obj) 回调
  * @return {Number}
  */
var max = helperCreateMinMax_1(function (rest, itemVal) {
  return rest < itemVal
});

var max_1 = max;

/**
 * 与 zip 相反
 *
 * @param {Array} arrays 数组集合
 */
function unzip (arrays) {
  var index, maxItem, len;
  var result = [];
  if (arrays && arrays.length) {
    index = 0;
    maxItem = max_1(arrays, function (item) {
      return item ? item.length : 0
    });
    for (len = maxItem ? maxItem.length : 0; index < len; index++) {
      result.push(map_1(arrays, index));
    }
  }
  return result
}

var unzip_1 = unzip;

/**
 * 将每个数组中相应位置的值合并在一起
 *
 * @param {Array*} array 数组
 */
function zip () {
  return unzip_1(arguments)
}

var zip_1 = zip;

/**
 * 根据键数组、值数组对转换为对象
 *
 * @param {Array} props 键数组
 * @param {Number} arr 值数组
 * @return {Object}
 */
function zipObject (props, arr) {
  var result = {};
  arr = arr || [];
  each_1(values_1(props), function (val, key) {
    result[val] = arr[key];
  });
  return result
}

var zipObject_1 = zipObject;

function flattenDeep (array, deep) {
  var result = [];
  arrayEach_1(array, function (vals) {
    result = result.concat(isArray_1(vals) ? (deep ? flattenDeep(vals, deep) : vals) : [vals]);
  });
  return result
}

/**
  * 将一个多维数组铺平
  * @param {Array} array 数组
  * @param {Boolean} deep 是否深层
  * @return {Array}
  */
function flatten (array, deep) {
  if (isArray_1(array)) {
    return flattenDeep(array, deep)
  }
  return []
}

var flatten_1 = flatten;

/**
  * 获取数组对象中某属性值，返回一个数组
  *
  * @param {Array} array 数组
  * @param {String} key 属性值
  * @return {Array}
  */
function pluck (obj, key) {
  return map_1(obj, key)
}

var pluck_1 = pluck;

function deepGetObj (obj, path) {
  var index = 0;
  var len = path.length;
  while (obj && index < len) {
    obj = obj[path[index++]];
  }
  return len && obj ? obj : 0
}

/**
 * 在list的每个元素上执行方法,任何传递的额外参数都会在调用方法的时候传递给它
 *
 * @param {Array} list
 * @param {Array/String/Function} path
 * @param {...Object} arguments
 * @return {Array}
 */
function invoke (list, path) {
  var func;
  var args = arguments;
  var params = [];
  var paths = [];
  var index = 2;
  var len = args.length;
  for (; index < len; index++) {
    params.push(args[index]);
  }
  if (isArray_1(path)) {
    len = path.length - 1;
    for (index = 0; index < len; index++) {
      paths.push(path[index]);
    }
    path = path[len];
  }
  return map_1(list, function (context) {
    if (paths.length) {
      context = deepGetObj(context, paths);
    }
    func = context[path] || path;
    if (func && func.apply) {
      return func.apply(context, params)
    }
  })
}

var invoke_1 = invoke;

var invokeMap = invoke_1;

var invokeMap_1 = invokeMap;

function helperDeleteProperty (obj, property) {
  try {
    delete obj[property];
  } catch (e) {
    obj[property] = undefined;
  }
}

var helperDeleteProperty_1 = helperDeleteProperty;

/**
  * 迭代器,从最后开始迭代
  *
  * @param {Object} obj 对象/数组
  * @param {Function} iterate(item, index, obj) 回调
  * @param {Object} context 上下文
  * @return {Object}
  */
function lastEach (obj, iterate, context) {
  if (obj) {
    return (isArray_1(obj) ? lastArrayEach_1 : lastObjectEach_1)(obj, iterate, context)
  }
  return obj
}

var lastEach_1 = lastEach;

/**
  * 判断是否Object对象
  *
  * @param {Object} obj 对象
  * @return {Boolean}
  */
var isObject = helperCreateInTypeof_1('object');

var isObject_1 = isObject;

/**
  * 清空对象
  *
  * @param {Object} obj 对象
  * @param {*} defs 默认值,如果不传（清空所有属性）、如果传对象（清空并继承)、如果传值(给所有赋值)
  * @param {Object/Array} assigns 默认值
  * @return {Object}
  */
function clear (obj, defs, assigns) {
  if (obj) {
    var len;
    var isDefs = arguments.length > 1 && (isNull_1(defs) || !isObject_1(defs));
    var extds = isDefs ? assigns : defs;
    if (isPlainObject_1(obj)) {
      objectEach_1(obj, isDefs ? function (val, key) {
        obj[key] = defs;
      } : function (val, key) {
        helperDeleteProperty_1(obj, key);
      });
      if (extds) {
        assign_1(obj, extds);
      }
    } else if (isArray_1(obj)) {
      if (isDefs) {
        len = obj.length;
        while (len > 0) {
          len--;
          obj[len] = defs;
        }
      } else {
        obj.length = 0;
      }
      if (extds) {
        obj.push.apply(obj, extds);
      }
    }
  }
  return obj
}

var clear_1 = clear;

function pluckProperty (name) {
  return function (obj, key) {
    return key === name
  }
}

/**
  * 移除对象属性
  *
  * @param {Object/Array} obj 对象/数组
  * @param {Function/String} iterate 方法或属性
  * @param {Object} context 上下文
  * @return {Object/Array}
  */
function remove (obj, iterate, context) {
  if (obj) {
    if (!eqNull_1(iterate)) {
      var removeKeys = [];
      var rest = [];
      if (!isFunction_1(iterate)) {
        iterate = pluckProperty(iterate);
      }
      each_1(obj, function (item, index, rest) {
        if (iterate.call(context, item, index, rest)) {
          removeKeys.push(index);
        }
      });
      if (isArray_1(obj)) {
        lastEach_1(removeKeys, function (item, key) {
          rest.push(obj[item]);
          obj.splice(item, 1);
        });
      } else {
        rest = {};
        arrayEach_1(removeKeys, function (key) {
          rest[key] = obj[key];
          helperDeleteProperty_1(obj, key);
        });
      }
      return rest
    }
    return clear_1(obj)
  }
  return obj
}

var remove_1 = remove;

function strictTree (array, optChildren) {
  each_1(array, function (item) {
    if (item.children && !item.children.length) {
      remove_1(item, optChildren);
    }
  });
}

/**
  * 将一个带层级的数据列表转成树结构
  *
  * @param {Array} array 数组
  * @param {Object} options {strict: false, parentKey: 'parentId', key: 'id', children: 'children', data: 'data'}
  * @return {Array}
  */
function toArrayTree (array, options) {
  var opts = assign_1({}, setupDefaults_1.treeOptions, options);
  var optStrict = opts.strict;
  var optKey = opts.key;
  var optParentKey = opts.parentKey;
  var optChildren = opts.children;
  var optSortKey = opts.sortKey;
  var optReverse = opts.reverse;
  var optData = opts.data;
  var result = [];
  var treeMap = {};
  var idList, id, treeData, parentId;

  if (optSortKey) {
    array = sortBy_1(clone_1(array), optSortKey);
    if (optReverse) {
      array = array.reverse();
    }
  }

  idList = map_1(array, function (item) {
    return item[optKey]
  });

  each_1(array, function (item) {
    id = item[optKey];

    if (optData) {
      treeData = {};
      treeData[optData] = item;
    } else {
      treeData = item;
    }

    parentId = item[optParentKey];
    treeMap[id] = treeMap[id] || [];
    treeMap[parentId] = treeMap[parentId] || [];
    treeMap[parentId].push(treeData);
    treeData[optKey] = id;
    treeData[optParentKey] = parentId;
    treeData[optChildren] = treeMap[id];

    if (!optStrict || (optStrict && !parentId)) {
      if (!includes_1(idList, parentId)) {
        result.push(treeData);
      }
    }
  });

  if (optStrict) {
    strictTree(array, optChildren);
  }

  return result
}

var toArrayTree_1 = toArrayTree;

function unTreeList (result, array, opts) {
  var children;
  var optChildren = opts.children;
  var optData = opts.data;
  each_1(array, function (item) {
    children = item[optChildren];
    if (optData) {
      item = item[optData];
    }
    result.push(item);
    if (children) {
      unTreeList(result, children, opts);
    }
  });
  return result
}

/**
  * 将一个树结构转成数组列表
  *
  * @param {Array} array 数组
  * @param {Object} options {children: 'children', data: 'data'}
  * @return {Array}
  */
function toTreeArray (array, options) {
  return unTreeList([], array, assign_1({}, setupDefaults_1.treeOptions, options))
}

var toTreeArray_1 = toTreeArray;

function helperCreateTreeFunc (handle) {
  return function (obj, iterate, options, context) {
    var opts = options || {};
    var optChildren = opts.children || 'children';
    return handle(null, obj, iterate, context, [], [], optChildren, opts)
  }
}

var helperCreateTreeFunc_1 = helperCreateTreeFunc;

function findTreeItem (parent, obj, iterate, context, path, node, parseChildren, opts) {
  if (obj) {
    var item, index, len, paths, nodes, match;
    for (index = 0, len = obj.length; index < len; index++) {
      item = obj[index];
      paths = path.concat(['' + index]);
      nodes = node.concat([item]);
      if (iterate.call(context, item, index, obj, paths, parent, nodes)) {
        return { index: index, item: item, path: paths, items: obj, parent: parent, nodes: nodes }
      }
      if (parseChildren && item) {
        match = findTreeItem(item, item[parseChildren], iterate, context, paths.concat([parseChildren]), nodes, parseChildren);
        if (match) {
          return match
        }
      }
    }
  }
}

/**
  * 从树结构中查找匹配第一条数据的键、值、路径
  *
  * @param {Object} obj 对象/数组
  * @param {Function} iterate(item, index, items, path, parent, nodes) 回调
  * @param {Object} options {children: 'children'}
  * @param {Object} context 上下文
  * @return {Object} { item, index, items, path, parent, nodes }
  */
var findTree = helperCreateTreeFunc_1(findTreeItem);

var findTree_1 = findTree;

function eachTreeItem (parent, obj, iterate, context, path, node, parseChildren, opts) {
  var paths, nodes;
  each_1(obj, function (item, index) {
    paths = path.concat(['' + index]);
    nodes = node.concat([item]);
    iterate.call(context, item, index, obj, paths, parent, nodes);
    if (item && parseChildren) {
      paths.push(parseChildren);
      eachTreeItem(item, item[parseChildren], iterate, context, paths, nodes, parseChildren);
    }
  });
}

/**
  * 从树结构中遍历数据的键、值、路径
  *
  * @param {Object} obj 对象/数组
  * @param {Function} iterate(item, index, items, path, parent, nodes) 回调
  * @param {Object} options {children: 'children', mapChildren: 'children}
  * @param {Object} context 上下文
  */
var eachTree = helperCreateTreeFunc_1(eachTreeItem);

var eachTree_1 = eachTree;

function mapTreeItem (parent, obj, iterate, context, path, node, parseChildren, opts) {
  var paths, nodes, rest;
  var mapChildren = opts.mapChildren || parseChildren;
  return map_1(obj, function (item, index) {
    paths = path.concat(['' + index]);
    nodes = node.concat([item]);
    rest = iterate.call(context, item, index, obj, paths, parent, nodes);
    if (rest && item && parseChildren && item[parseChildren]) {
      rest[mapChildren] = mapTreeItem(item, item[parseChildren], iterate, context, paths, nodes, parseChildren, opts);
    }
    return rest
  })
}

/**
  * 从树结构中指定方法后的返回值组成的新数组
  *
  * @param {Object} obj 对象/数组
  * @param {Function} iterate(item, index, items, path, parent, nodes) 回调
  * @param {Object} options {children: 'children'}
  * @param {Object} context 上下文
  * @return {Object/Array}
  */
var mapTree = helperCreateTreeFunc_1(mapTreeItem);

var mapTree_1 = mapTree;

/**
  * 从树结构中根据回调过滤数据
  *
  * @param {Object} obj 对象/数组
  * @param {Function} iterate(item, index, items, path, parent) 回调
  * @param {Object} options {children: 'children'}
  * @param {Object} context 上下文
  * @return {Array}
  */
function filterTree (obj, iterate, options, context) {
  var result = [];
  if (obj && iterate) {
    eachTree_1(obj, function (item, index, items, path, parent, nodes) {
      if (iterate.call(context, item, index, items, path, parent, nodes)) {
        result.push(item);
      }
    }, options);
  }
  return result
}

var filterTree_1 = filterTree;

function searchTreeItem (parentAllow, parent, obj, iterate, context, path, node, parseChildren, opts) {
  var paths, nodes, rest, isAllow, hasChild;
  var rests = [];
  var hasOriginal = opts.original;
  var mapChildren = opts.mapChildren || parseChildren;
  arrayEach_1(obj, function (item, index) {
    paths = path.concat(['' + index]);
    nodes = node.concat([item]);
    isAllow = parentAllow || iterate.call(context, item, index, obj, paths, parent, nodes);
    hasChild = parseChildren && item[parseChildren];
    if (isAllow || hasChild) {
      rest = hasOriginal ? item : assign_1({}, item);
    }
    if (isAllow || hasChild) {
      rest[mapChildren] = searchTreeItem(isAllow, item, item[parseChildren], iterate, context, paths, nodes, parseChildren, opts);
      if (isAllow || rest[mapChildren].length) {
        rests.push(rest);
      }
    } else if (isAllow) {
      rests.push(rest);
    }
  });
  return rests
}

/**
  * 从树结构中根据回调查找数据
  *
  * @param {Object} obj 对象/数组
  * @param {Function} iterate(item, index, items, path, parent, nodes) 回调
  * @param {Object} options {children: 'children'}
  * @param {Object} context 上下文
  * @return {Array}
  */
var searchTree = helperCreateTreeFunc_1(function (parent, obj, iterate, context, path, nodes, parseChildren, opts) {
  return searchTreeItem(0, parent, obj, iterate, context, path, nodes, parseChildren, opts)
});

var searchTree_1 = searchTree;

function arrayLastIndexOf (obj, val) {
  if (obj.lastIndexOf) {
    return obj.lastIndexOf(val)
  }
  for (var len = obj.length - 1; len >= 0; len--) {
    if (val === obj[len]) {
      return len
    }
  }
  return -1
}

var arrayLastIndexOf_1 = arrayLastIndexOf;

/**
  * 判断是否Number对象
  *
  * @param {Object} obj 对象
  * @return {Boolean}
  */
var isNumber = helperCreateInTypeof_1('number');

var isNumber_1 = isNumber;

/* eslint-disable eqeqeq */
function isNumberNaN (obj) {
  return isNumber_1(obj) && isNaN(obj)
}

var _isNaN = isNumberNaN;

/**
  * 判断是否String对象
  *
  * @param {Object} obj 对象
  * @return {Boolean}
  */
var isString = helperCreateInTypeof_1('string');

var isString_1 = isString;

/**
  * 判断是否Date对象
  *
  * @param {Object} obj 对象
  * @return {Boolean}
  */
var isDate = helperCreateInInObjectString_1('Date');

var isDate_1 = isDate;

var staticParseInt = parseInt;

var staticParseInt_1 = staticParseInt;

function helperGetUTCDateTime (dates) {
  return Date.UTC(dates[0], dates[1], dates[2], dates[3], dates[4], dates[5], dates[6])
}

var helperGetUTCDateTime_1 = helperGetUTCDateTime;

function helperGetDateTime (date) {
  return date.getTime()
}

var helperGetDateTime_1 = helperGetDateTime;

var dateFormatRules = [
  { rules: [['yyyy', 4]] },
  { rules: [['MM', 2], ['M', 1]], offset: -1 },
  { rules: [['dd', 2], ['d', 1]] },
  { rules: [['HH', 2], ['H', 1]] },
  { rules: [['mm', 2], ['m', 1]] },
  { rules: [['ss', 2], ['s', 1]] },
  { rules: [['SSS', 3], ['S', 1]] },
  { rules: [['ZZ', 5], ['Z', 6], ['Z', 5], ['Z', 1]] }
];

function parseStringDate (str, format) {
  var arr, sIndex, fIndex, fLen, fItem, rules, rIndex, rLen, tempMatch;
  var dates = [0, 0, 1, 0, 0, 0, 0];
  for (fIndex = 0, fLen = dateFormatRules.length; fIndex < fLen; fIndex++) {
    fItem = dateFormatRules[fIndex];
    for (rIndex = 0, rules = fItem.rules, rLen = rules.length; rIndex < rLen; rIndex++) {
      arr = rules[rIndex];
      sIndex = format.indexOf(arr[0]);
      if (sIndex > -1) {
        tempMatch = str.substring(sIndex, sIndex + arr[1]);
        if (tempMatch && tempMatch.length === arr[1]) {
          if (fItem.offset) {
            tempMatch = staticParseInt_1(tempMatch) + fItem.offset;
          }
          dates[fIndex] = tempMatch;
          break
        }
      }
      if (rIndex === rLen - 1) {
        return dates
      }
    }
  }
  return dates
}

/**
  * 字符串转为日期
  *
  * @param {String/Number/Date} str 日期或数字
  * @param {String} format 解析日期格式(yyyy年份、MM月份、dd天、hh(12)HH(24)小时、mm分钟、ss秒、SSS毫秒、Z时区)
  * @return {String}
  */
function toStringDate (str, format) {
  var rest, isDateType;
  if (str) {
    isDateType = isDate_1(str);
    if (isDateType || (!format && /^[0-9]{11,15}$/.test(str))) {
      rest = new Date(isDateType ? helperGetDateTime_1(str) : staticParseInt_1(str));
    } else if (isString_1(str)) {
      var tempMatch;
      var dates = parseStringDate(str, format || setupDefaults_1.formatDate);
      var zStr = dates[7];
      if (dates[0]) {
        // 解析时区
        if (zStr) {
          // 如果为UTC 时间
          if (zStr[0] === 'z' || zStr[0] === 'Z') {
            rest = new Date(helperGetUTCDateTime_1(dates));
          } else {
            // 如果指定时区，时区转换
            tempMatch = zStr.match(/([-+]{1})(\d{2}):?(\d{2})/);
            if (tempMatch) {
              rest = new Date(helperGetUTCDateTime_1(dates) - (tempMatch[1] === '-' ? -1 : 1) * staticParseInt_1(tempMatch[2]) * 3600000 + staticParseInt_1(tempMatch[3]) * 60000);
            }
          }
        } else {
          rest = new Date(dates[0], dates[1], dates[2], dates[3], dates[4], dates[5], dates[6]);
        }
      }
    }
  }
  return !rest || isNaN(helperGetDateTime_1(rest)) ? 'Invalid Date' : rest
}

var toStringDate_1 = toStringDate;

function helperNewDate () {
  return new Date()
}

var helperNewDate_1 = helperNewDate;

/**
  * 判断是否闰年
  *
  * @param {Date} date 日期或数字
  * @return {Boolean}
  */
function isLeapYear (date) {
  var year;
  var currentDate = date ? toStringDate_1(date) : helperNewDate_1();
  if (isDate_1(currentDate)) {
    year = currentDate.getFullYear();
    return (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0)
  }
  return false
}

var isLeapYear_1 = isLeapYear;

/**
  * 迭代器,支持 return false 跳出循环 break
  *
  * @param {Object} obj 对象/数组
  * @param {Function} iterate(item, index, obj) 回调
  * @param {Object} context 上下文
  * @return {Object}
  */
function forOf (obj, iterate, context) {
  if (obj) {
    if (isArray_1(obj)) {
      for (var index = 0, len = obj.length; index < len; index++) {
        if (iterate.call(context, obj[index], index, obj) === false) {
          break
        }
      }
    } else {
      for (var key in obj) {
        if (hasOwnProp_1(obj, key)) {
          if (iterate.call(context, obj[key], key, obj) === false) {
            break
          }
        }
      }
    }
  }
}

var forOf_1 = forOf;

/**
  * 迭代器,从最后开始迭代,支持 return false 跳出循环 break
  *
  * @param {Object} obj 对象/数组
  * @param {Function} iterate(item, index, obj) 回调
  * @param {Object} context 上下文
  * @return {Object}
  */
function lastForOf (obj, iterate, context) {
  if (obj) {
    var len, list;
    if (isArray_1(obj)) {
      for (len = obj.length - 1; len >= 0; len--) {
        if (iterate.call(context, obj[len], len, obj) === false) {
          break
        }
      }
    } else {
      list = hasOwnProp_1(obj);
      for (len = list.length - 1; len >= 0; len--) {
        if (iterate.call(context, obj[list[len]], list[len], obj) === false) {
          break
        }
      }
    }
  }
}

var lastForOf_1 = lastForOf;

/**
  * 从最后开始的索引值,返回对象第一个索引值
  *
  * @param {Object} array 对象
  * @param {Object} val 值
  * @return {Number}
  */
var lastIndexOf = helperCreateIndexOf_1('lastIndexOf', arrayLastIndexOf_1);

var lastIndexOf_1 = lastIndexOf;

/**
  * 返回对象的长度
  *
  * @param {Object} obj 对象
  * @return {Number}
  */
function getSize (obj) {
  var len = 0;
  if (isString_1(obj) || isArray_1(obj)) {
    return obj.length
  }
  each_1(obj, function () {
    len++;
  });
  return len
}

var getSize_1 = getSize;

function isNumberFinite (obj) {
  return isNumber_1(obj) && isFinite(obj)
}

var _isFinite = isNumberFinite;

/**
  * 判断是否整数
  *
  * @param {Number, String} number 数值
  * @return {Boolean}
  */
var isInteger = function (obj) {
  return !isNull_1(obj) && !isNaN(obj) && !isArray_1(obj) && obj % 1 === 0
};

var isInteger_1 = isInteger;

/**
  * 判断是否小数
  *
  * @param {Number} obj 数值
  * @return {Boolean}
  */
function isFloat (obj) {
  return !isNull_1(obj) && !isNaN(obj) && !isArray_1(obj) && !isInteger_1(obj)
}

var isFloat_1 = isFloat;

/**
  * 判断是否Boolean对象
  *
  * @param {Object} obj 对象
  * @return {Boolean}
  */
var isBoolean = helperCreateInTypeof_1('boolean');

var isBoolean_1 = isBoolean;

/**
  * 判断是否RegExp对象
  *
  * @param {Object} obj 对象
  * @return {Boolean}
  */
var isRegExp = helperCreateInInObjectString_1('RegExp');

var isRegExp_1 = isRegExp;

/**
  * 判断是否Error对象
  *
  * @param {Object} obj 对象
  * @return {Boolean}
  */
var isError = helperCreateInInObjectString_1('Error');

var isError_1 = isError;

/**
  * 判断是否TypeError对象
  *
  * @param {Object} obj 对象
  * @return {Boolean}
  */
function isTypeError (obj) {
  return obj ? obj.constructor === TypeError : false
}

var isTypeError_1 = isTypeError;

/**
  * 判断是否为空对象
  *
  * @param {Object} obj 对象
  * @return {Boolean}
  */
function isEmpty (obj) {
  for (var key in obj) {
    return false
  }
  return true
}

var isEmpty_1 = isEmpty;

/* eslint-disable valid-typeof */


/**
  * 判断是否Symbol对象
  *
  * @param {Object} obj 对象
  * @return {Boolean}
  */
var supportSymbol = typeof Symbol !== staticStrUndefined_1;
function isSymbol (obj) {
  return supportSymbol && Symbol.isSymbol ? Symbol.isSymbol(obj) : (typeof obj === 'symbol')
}

var isSymbol_1 = isSymbol;

/**
  * 判断是否Arguments对象
  *
  * @param {Object} obj 对象
  * @return {Boolean}
  */
var isArguments = helperCreateInInObjectString_1('Arguments');

var isArguments_1 = isArguments;

/**
  * 判断是否Element对象
  *
  * @param {Object} obj 对象
  * @return {Boolean}
  */
function isElement (obj) {
  return !!(obj && isString_1(obj.nodeName) && isNumber_1(obj.nodeType))
}

var isElement_1 = isElement;

/* eslint-disable valid-typeof */
var staticDocument = typeof document === staticStrUndefined_1 ? 0 : document;

var staticDocument_1 = staticDocument;

/**
  * 判断是否Document对象
  *
  * @param {Object} obj 对象
  * @return {Boolean}
  */
function isDocument (obj) {
  return !!(obj && staticDocument_1 && obj.nodeType === 9)
}

var isDocument_1 = isDocument;

/* eslint-disable valid-typeof */
var staticWindow = typeof window === staticStrUndefined_1 ? 0 : window;

var staticWindow_1 = staticWindow;

/**
  * 判断是否Window对象
  *
  * @param {Object} obj 对象
  * @return {Boolean}
  */
function isWindow (obj) {
  return staticWindow_1 && !!(obj && obj === obj.window)
}

var isWindow_1 = isWindow;

/* eslint-disable valid-typeof */


/**
  * 判断是否FormData对象
  *
  * @param {Object} obj 对象
  * @return {Boolean}
  */
var supportFormData = typeof FormData !== staticStrUndefined_1;
function isFormData (obj) {
  return supportFormData && obj instanceof FormData
}

var isFormData_1 = isFormData;

/* eslint-disable valid-typeof */


/**
  * 判断是否Map对象
  *
  * @param {Object} obj 对象
  * @return {Boolean}
 */
var supportMap = typeof Map !== staticStrUndefined_1;
function isMap (obj) {
  return supportMap && obj instanceof Map
}

var isMap_1 = isMap;

/* eslint-disable valid-typeof */


/**
  * 判断是否WeakMap对象
  *
  * @param {Object} obj 对象
  * @return {Boolean}
 */
var supportWeakMap = typeof WeakMap !== staticStrUndefined_1;
function isWeakMap (obj) {
  return supportWeakMap && obj instanceof WeakMap
}

var isWeakMap_1 = isWeakMap;

/* eslint-disable valid-typeof */


/**
  * 判断是否Set对象
  *
  * @param {Object} obj 对象
  * @return {Boolean}
 */
var supportSet = typeof Set !== staticStrUndefined_1;
function isSet (obj) {
  return supportSet && obj instanceof Set
}

var isSet_1 = isSet;

/* eslint-disable valid-typeof */


/**
  * 判断是否WeakSet对象
  *
  * @param {Object} obj 对象
  * @return {Boolean}
 */
var supportWeakSet = typeof WeakSet !== staticStrUndefined_1;
function isWeakSet (obj) {
  return supportWeakSet && obj instanceof WeakSet
}

var isWeakSet_1 = isWeakSet;

function helperCreateiterateIndexOf (callback) {
  return function (obj, iterate, context) {
    if (obj && isFunction_1(iterate)) {
      if (isArray_1(obj) || isString_1(obj)) {
        return callback(obj, iterate, context)
      }
      for (var key in obj) {
        if (hasOwnProp_1(obj, key)) {
          if (iterate.call(context, obj[key], key, obj)) {
            return key
          }
        }
      }
    }
    return -1
  }
}

var helperCreateiterateIndexOf_1 = helperCreateiterateIndexOf;

/**
  * 返回对象第一个索引值
  *
  * @param {Object} obj 对象/数组
  * @param {Function} iterate(item, index, obj) 回调
  * @param {Object} context 上下文
  * @return {Object}
  */
var findIndexOf = helperCreateiterateIndexOf_1(function (obj, iterate, context) {
  for (var index = 0, len = obj.length; index < len; index++) {
    if (iterate.call(context, obj[index], index, obj)) {
      return index
    }
  }
  return -1
});

var findIndexOf_1 = findIndexOf;

function helperEqualCompare (val1, val2, compare, func, key, obj1, obj2) {
  if (val1 === val2) {
    return true
  }
  if (val1 && val2 && !isNumber_1(val1) && !isNumber_1(val2) && !isString_1(val1) && !isString_1(val2)) {
    if (isRegExp_1(val1)) {
      return compare('' + val1, '' + val2, key, obj1, obj2)
    } if (isDate_1(val1) || isBoolean_1(val1)) {
      return compare(+val1, +val2, key, obj1, obj2)
    } else {
      var result, val1Keys, val2Keys;
      var isObj1Arr = isArray_1(val1);
      var isObj2Arr = isArray_1(val2);
      if (isObj1Arr || isObj2Arr ? isObj1Arr && isObj2Arr : val1.constructor === val2.constructor) {
        val1Keys = keys_1(val1);
        val2Keys = keys_1(val2);
        if (func) {
          result = func(val1, val2, key);
        }
        if (val1Keys.length === val2Keys.length) {
          return isUndefined_1(result) ? every_1(val1Keys, function (key, index) {
            return key === val2Keys[index] && helperEqualCompare(val1[key], val2[val2Keys[index]], compare, func, isObj1Arr || isObj2Arr ? index : key, val1, val2)
          }) : !!result
        }
        return false
      }
    }
  }
  return compare(val1, val2, key, obj1, obj2)
}

var helperEqualCompare_1 = helperEqualCompare;

function helperDefaultCompare (v1, v2) {
  return v1 === v2
}

var helperDefaultCompare_1 = helperDefaultCompare;

/**
 * 深度比较两个对象之间的值是否相等
 *
 * @param {Object} obj1 值1
 * @param {Object} obj2 值2
 * @return {Boolean}
 */
function isEqual (obj1, obj2) {
  return helperEqualCompare_1(obj1, obj2, helperDefaultCompare_1)
}

var isEqual_1 = isEqual;

/**
 * 判断属性中的键和值是否包含在对象中
 *
 * @param {Object/Array} obj 对象
 * @param {Object} source 值
 * @return {Boolean}
 */
function isMatch (obj, source) {
  var objKeys = keys_1(obj);
  var sourceKeys = keys_1(source);
  if (sourceKeys.length) {
    if (includeArrays_1(objKeys, sourceKeys)) {
      return some_1(sourceKeys, function (key2) {
        return findIndexOf_1(objKeys, function (key1) {
          return key1 === key2 && isEqual_1(obj[key1], source[key2])
        }) > -1
      })
    }
  } else {
    return true
  }
  return isEqual_1(obj, source)
}

var isMatch_1 = isMatch;

/**
 * 深度比较两个对象之间的值是否相等，使用自定义比较函数
 *
 * @param {Object} obj1 值1
 * @param {Object} obj2 值2
 * @param {Function} func 自定义函数
 * @return {Boolean}
 */
function isEqualWith (obj1, obj2, func) {
  if (isFunction_1(func)) {
    return helperEqualCompare_1(obj1, obj2, function (v1, v2, key, obj1, obj2) {
      var result = func(v1, v2, key, obj1, obj2);
      return isUndefined_1(result) ? helperDefaultCompare_1(v1, v2) : !!result
    }, func)
  }
  return helperEqualCompare_1(obj1, obj2, helperDefaultCompare_1)
}

var isEqualWith_1 = isEqualWith;

/**
  * 获取对象类型
  *
  * @param {Object} obj 对象
  * @return {String}
  */
function getType (obj) {
  if (isNull_1(obj)) {
    return 'null'
  }
  if (isSymbol_1(obj)) {
    return 'symbol'
  }
  if (isDate_1(obj)) {
    return 'date'
  }
  if (isArray_1(obj)) {
    return 'array'
  }
  if (isRegExp_1(obj)) {
    return 'regexp'
  }
  if (isError_1(obj)) {
    return 'error'
  }
  return typeof obj
}

var getType_1 = getType;

/**
  * 获取一个全局唯一标识
  *
  * @param {String} prefix 前缀
  * @return {Number}
  */
var __uniqueId = 0;
function uniqueId (prefix) {
  return [prefix, ++__uniqueId].join('')
}

var uniqueId_1 = uniqueId;

/**
  * 从最后开始的索引值,返回对象第一个索引值
  *
  * @param {Object} obj 对象/数组
  * @param {Function} iterate(item, index, obj) 回调
  * @param {Object} context 上下文
  * @return {Object}
  */
var findLastIndexOf = helperCreateiterateIndexOf_1(function (obj, iterate, context) {
  for (var len = obj.length - 1; len >= 0; len--) {
    if (iterate.call(context, obj[len], len, obj)) {
      return len
    }
  }
  return -1
});

var findLastIndexOf_1 = findLastIndexOf;

/**
  * 字符串转JSON
  *
  * @param {String} str 字符串
  * @return {Object} 返回转换后对象
  */
function toStringJSON (str) {
  if (isObject_1(str)) {
    return str
  } else if (isString_1(str)) {
    try {
      return JSON.parse(str)
    } catch (e) {}
  }
  return {}
}

var toStringJSON_1 = toStringJSON;

/**
  * JSON转字符串
  *
  * @param {Object} obj 对象
  * @return {String} 返回字符串
  */
function toJSONString (obj) {
  return JSON.stringify(obj) || ''
}

var toJSONString_1 = toJSONString;

/**
  * 获取对象所有属性、值
  *
  * @param {Object} obj 对象/数组
  * @return {Array}
  */
var entries = helperCreateGetObjects_1('entries', 2);

var entries_1 = entries;

function helperCreatePickOmit (case1, case2) {
  return function (obj, callback) {
    var item, index;
    var rest = {};
    var result = [];
    var context = this;
    var args = arguments;
    var len = args.length;
    if (!isFunction_1(callback)) {
      for (index = 1; index < len; index++) {
        item = args[index];
        result.push.apply(result, isArray_1(item) ? item : [item]);
      }
      callback = 0;
    }
    each_1(obj, function (val, key) {
      if ((callback ? callback.call(context, val, key, obj) : findIndexOf_1(result, function (name) {
        return name === key
      }) > -1) ? case1 : case2) {
        rest[key] = val;
      }
    });
    return rest
  }
}

var helperCreatePickOmit_1 = helperCreatePickOmit;

/**
 * 根据 key 过滤指定的属性值，返回一个新的对象
 *
 * @param {Object} obj 对象
 * @param {String/Array} key 键数组
 * @return {Object}
 */
var pick = helperCreatePickOmit_1(1, 0);

var pick_1 = pick;

/**
 * 根据 key 排除指定的属性值，返回一个新的对象
 *
 * @param {Object} obj 对象
 * @param {String/Array} key 键数组
 * @return {Object}
 */
var omit = helperCreatePickOmit_1(0, 1);

var omit_1 = omit;

/**
  * 获取对象第一个值
  *
  * @param {Object} obj 对象/数组
  * @return {Object}
  */
function first (obj) {
  return values_1(obj)[0]
}

var first_1 = first;

/**
  * 获取对象最后一个值
  *
  * @param {Object} obj 对象/数组
  * @return {Object}
  */
function last (obj) {
  var list = values_1(obj);
  return list[list.length - 1]
}

var last_1 = last;

/**
 * 检查键、路径是否是该对象的属性
 *
 * @param {Object/Array} data 对象
 * @param {String/Function} property 键、路径
 * @return {Boolean}
 */
function has (obj, property) {
  if (obj) {
    if (hasOwnProp_1(obj, property)) {
      return true
    } else {
      var prop, arrIndex, objProp, matchs, rest, isHas;
      var props = helperGetHGSKeys_1(property);
      var index = 0;
      var len = props.length;
      for (rest = obj; index < len; index++) {
        isHas = false;
        prop = props[index];
        matchs = prop ? prop.match(staticHGKeyRE_1) : '';
        if (matchs) {
          arrIndex = matchs[1];
          objProp = matchs[2];
          if (arrIndex) {
            if (rest[arrIndex]) {
              if (hasOwnProp_1(rest[arrIndex], objProp)) {
                isHas = true;
                rest = rest[arrIndex][objProp];
              }
            }
          } else {
            if (hasOwnProp_1(rest, objProp)) {
              isHas = true;
              rest = rest[objProp];
            }
          }
        } else {
          if (hasOwnProp_1(rest, prop)) {
            isHas = true;
            rest = rest[prop];
          }
        }
        if (isHas) {
          if (index === len - 1) {
            return true
          }
        } else {
          break
        }
      }
    }
  }
  return false
}

var has_1 = has;

var sKeyRE = /(.+)\[(\d+)\]$/;

function valSet (obj, key, isSet, value) {
  if (obj[key]) {
    if (isSet) {
      obj[key] = value;
    }
  } else {
    var index;
    var matchs = key ? key.match(sKeyRE) : null;
    var rest = isSet ? value : {};
    if (matchs) {
      index = staticParseInt_1(matchs[2]);
      if (obj[matchs[1]]) {
        obj[matchs[1]][index] = rest;
      } else {
        obj[matchs[1]] = new Array(index + 1);
        obj[matchs[1]][index] = rest;
      }
    } else {
      obj[key] = rest;
    }
    return rest
  }
  return obj[key]
}

/**
 * 设置对象属性上的值。如果属性不存在则创建它
 * @param {Object/Array} obj 对象
 * @param {String/Function} property 键、路径
 * @param {Object} value 值
 */
function set (obj, property, value) {
  if (obj) {
    if (obj[property] || hasOwnProp_1(obj, property)) {
      obj[property] = value;
    } else {
      var rest = obj;
      var props = helperGetHGSKeys_1(property);
      var len = props.length;
      for (var index = 0; index < len; index++) {
        rest = valSet(rest, props[index], index === len - 1, value);
      }
    }
  }
  return obj
}

var set_1 = set;

function createiterateEmpty (iterate) {
  return function () {
    return isEmpty_1(iterate)
  }
}

/**
  * 集合分组,默认使用键值分组,如果有iterate则使用结果进行分组
  *
  * @param {Array} obj 对象
  * @param {Function} iterate 回调/对象属性
  * @param {Object} context 上下文
  * @return {Object}
  */
function groupBy (obj, iterate, context) {
  var groupKey;
  var result = {};
  if (obj) {
    if (iterate && isObject_1(iterate)) {
      iterate = createiterateEmpty(iterate);
    } else if (!isFunction_1(iterate)) {
      iterate = property_1(iterate);
    }
    each_1(obj, function (val, key) {
      groupKey = iterate ? iterate.call(context, val, key, obj) : val;
      if (result[groupKey]) {
        result[groupKey].push(val);
      } else {
        result[groupKey] = [val];
      }
    });
  }
  return result
}

var groupBy_1 = groupBy;

/**
  * 集合分组统计,返回各组中对象的数量统计
  *
  * @param {Array} obj 对象
  * @param {Function} iterate 回调/对象属性
  * @param {Object} context 上下文
  * @return {Object}
  */
function countBy (obj, iterate, context) {
  var result = groupBy_1(obj, iterate, context || this);
  objectEach_1(result, function (item, key) {
    result[key] = item.length;
  });
  return result
}

var countBy_1 = countBy;

/**
  * 序号列表生成函数
  *
  * @param {Number} start 起始值
  * @param {Number} stop 结束值
  * @param {Number} step 自增值
  * @return {Object}
  */
function range (start, stop, step) {
  var index, len;
  var result = [];
  var args = arguments;
  if (args.length < 2) {
    stop = args[0];
    start = 0;
  }
  index = start >> 0;
  len = stop >> 0;
  if (index < stop) {
    step = step >> 0 || 1;
    for (; index < len; index += step) {
      result.push(index);
    }
  }
  return result
}

var range_1 = range;

/**
  * 将一个或者多个对象值解构到目标对象
  *
  * @param {Object} destination 目标对象
  * @param {...Object}
  * @return {Boolean}
  */
function destructuring (destination, sources) {
  if (destination && sources) {
    var rest = assign_1.apply(this, [{}].concat(slice_1(arguments, 1)));
    var restKeys = keys_1(rest);
    arrayEach_1(keys_1(destination), function (key) {
      if (includes_1(restKeys, key)) {
        destination[key] = rest[key];
      }
    });
  }
  return destination
}

var destructuring_1 = destructuring;

/**
  * 获取最小值
  *
  * @param {Array} arr 数组
  * @param {Function} iterate(item, index, obj) 回调
  * @return {Number}
  */
var min = helperCreateMinMax_1(function (rest, itemVal) {
  return rest > itemVal
});

var min_1 = min;

function helperCreateToNumber (handle) {
  return function (str) {
    if (str) {
      var num = handle(str);
      if (!isNaN(num)) {
        return num
      }
    }
    return 0
  }
}

var helperCreateToNumber_1 = helperCreateToNumber;

/**
 * 转数值
 * @param { String/Number } str 数值
 *
 * @return {Number}
 */
var toNumber = helperCreateToNumber_1(parseFloat);

var toNumber_1 = toNumber;

function helperNumString (num) {
  if (('' + num).indexOf('e-') >= 0) {
    var isNegative = num < 0;
    return (isNegative ? '-' : '') + '0' + ('' + ((isNegative ? Math.abs(num) : num) + 1)).substr(1)
  }
  return '' + num
}

var helperNumString_1 = helperNumString;

function toValString (obj) {
  if (isNumber_1(obj)) {
    return helperNumString_1(obj)
  }
  return '' + (eqNull_1(obj) ? '' : obj)
}

var toString_1 = toValString;

/**
  * 千分位分隔符、小数点
  *
  * @param {String/Number} num 数值
  * @param {Object} 参数 {spaceNumber: 分割位数(默认3), separator: 分隔符(默认,), digits: 小数位数(默认null)}
  * @return {String}
 */
function commafy (num, options) {
  num = toString_1(num).replace(/,/g, '');
  if (num) {
    var opts = assign_1({ spaceNumber: 3, separator: ',' }, options);
    var optDigits = opts.digits || opts.fixed;
    var result = (optDigits ? toNumber_1(num).toFixed(optDigits) : num).split('.');
    return result[0].replace(new RegExp('(?=(?!(\\b))(\\d{' + opts.spaceNumber + '})+$)', 'g'), opts.separator) + (result[1] ? '.' + result[1] : '')
  }
  return num
}

var commafy_1 = commafy;

/**
  * 将字符串重复 n 次
  *
  * @param {String} str 字符串
  * @param {Number} count 次数
  * @return {String}
  */
function repeat (str, count) {
  var rest = toString_1(str);
  if (rest.repeat) {
    return rest.repeat(count)
  }
  var list = isNaN(count) ? [] : new Array(staticParseInt_1(count));
  return list.join(rest) + (list.length > 0 ? rest : '')
}

var repeat_1 = repeat;

/**
  * 用指定字符从后面开始补全字符串
  *
  * @param {String} str 字符串
  * @param {Number} targetLength 结果长度
  * @param {Number} padString 补全字符
  * @return {String}
  */
function padEnd (str, targetLength, padString) {
  var rest = toString_1(str);
  targetLength = targetLength >> 0;
  padString = isUndefined_1(padString) ? ' ' : '' + padString;
  if (rest.padEnd) {
    return rest.padEnd(targetLength, padString)
  }
  if (targetLength > rest.length) {
    targetLength -= rest.length;
    if (targetLength > padString.length) {
      padString += repeat_1(padString, targetLength / padString.length);
    }
    return rest + padString.slice(0, targetLength)
  }
  return rest
}

var padEnd_1 = padEnd;

function helperFixedNumber (str, digits) {
  return helperNumString_1(toNumber_1(str)).replace(new RegExp('(\\d+.\\d{0,' + digits + '}).*'), '$1')
}

var helperFixedNumber_1 = helperFixedNumber;

/**
 * 和 Number.toFixed 类似，区别就是不会对小数进行四舍五入，结果返回字符串
 *
 * @param { String/Number } str 数值
 * @return {String}
 */
function toFixedString (str, digits) {
  var nums = helperFixedNumber_1(str, digits).split('.');
  var rest = digits ? [nums[0], '.', padEnd_1(nums[1] || '', digits, '0')].join('') : nums[0];
  if (rest.substring(0, 1) === '-' && parseFloat(rest) === 0) {
    return digits ? rest.replace(/^-/, '') : '0'
  }
  return rest
}

var toFixedString_1 = toFixedString;

/**
 * 转整数
 * @param { String/Number } str 数值
 *
 * @return {Number}
 */
var toInteger = helperCreateToNumber_1(staticParseInt_1);

var toInteger_1 = toInteger;

/**
 * 和 Number.toFixed 类似，区别就是不会对小数进行四舍五入，结果返回数值
 *
 * @param { String/Number } str 数值
 * @return {String}
 */
function toFixedNumber (str, digits) {
  var rest = (digits ? toNumber_1 : toInteger_1)(helperFixedNumber_1(str, digits));
  return rest === 0 ? 0 : rest
}

var toFixedNumber_1 = toFixedNumber;

function helperNumberDecimal (numStr) {
  return (numStr.split('.')[1] || '').length
}

var helperNumberDecimal_1 = helperNumberDecimal;

/**
 * 乘法运算
 *
 * @param { Number } num1 数值1
 * @param { Number } num2 数值2
 * @return {Number}
 */
function multiply (num1, num2) {
  var multiplier = toNumber_1(num1);
  var multiplicand = toNumber_1(num2);
  var str1 = helperNumString_1(multiplier);
  var str2 = helperNumString_1(multiplicand);
  return parseInt(str1.replace('.', '')) * parseInt(str2.replace('.', '')) / Math.pow(10, helperNumberDecimal_1(str1) + helperNumberDecimal_1(str2))
}

var multiply_1 = multiply;

function helperNumberAdd (addend, augend) {
  var str1 = helperNumString_1(addend);
  var str2 = helperNumString_1(augend);
  var ratio = Math.pow(10, Math.max(helperNumberDecimal_1(str1), helperNumberDecimal_1(str2)));
  return (multiply_1(addend, ratio) + multiply_1(augend, ratio)) / ratio
}

var helperNumberAdd_1 = helperNumberAdd;

/**
 * 加法运算
 *
 * @param { Number } num1 被加数
 * @param { Number } num2 加数
 * @return {Number}
 */
function add (num1, num2) {
  return helperNumberAdd_1(toNumber_1(num1), toNumber_1(num2))
}

var add_1 = add;

/**
 * 减法运算
 *
 * @param { Number } num1 被减数
 * @param { Number } num2 减数
 * @return {Number}
 */
function subtract (num1, num2) {
  var subtrahend = toNumber_1(num1);
  var minuend = toNumber_1(num2);
  var str1 = helperNumString_1(subtrahend);
  var str2 = helperNumString_1(minuend);
  var digit1 = helperNumberDecimal_1(str1);
  var digit2 = helperNumberDecimal_1(str2);
  var ratio = Math.pow(10, Math.max(digit1, digit2));
  var precision = (digit1 >= digit2) ? digit1 : digit2;
  return parseFloat(((subtrahend * ratio - minuend * ratio) / ratio).toFixed(precision))
}

var subtract_1 = subtract;

function helperNumberDivide (divisor, dividend) {
  var str1 = helperNumString_1(divisor);
  var str2 = helperNumString_1(dividend);
  var divisorDecimal = helperNumberDecimal_1(str1);
  var dividendDecimal = helperNumberDecimal_1(str2);
  var powY = dividendDecimal - divisorDecimal;
  var isMinus = powY < 0;
  var multiplicand = Math.pow(10, isMinus ? Math.abs(powY) : powY);
  return multiply_1(str1.replace('.', '') / str2.replace('.', ''), isMinus ? 1 / multiplicand : multiplicand)
}

var helperNumberDivide_1 = helperNumberDivide;

/**
 * 除法运算
 *
 * @param { Number } num1 数值1
 * @param { Number } num2 数值2
 * @return {Number}
 */
function divide (num1, num2) {
  return helperNumberDivide_1(toNumber_1(num1), toNumber_1(num2))
}

var divide_1 = divide;

/**
  * 求和函数，将数值相加
  *
  * @param {Array} array 数组
  * @param {Function/String} iterate 方法或属性
  * @param {Object} context 上下文
  * @return {Number}
  */
function sum (array, iterate, context) {
  var result = 0;
  each_1(array, iterate ? isFunction_1(iterate) ? function () {
    result = helperNumberAdd_1(result, iterate.apply(context, arguments));
  } : function (val) {
    result = helperNumberAdd_1(result, get_1(val, iterate));
  } : function (val) {
    result = helperNumberAdd_1(result, val);
  });
  return result
}

var sum_1 = sum;

/**
  * 求平均值函数
  *
  * @param {Array} array 数组
  * @param {Function/String} iterate 方法或属性
  * @param {Object} context 上下文
  * @return {Number}
  */
function mean (array, iterate, context) {
  return helperNumberDivide_1(sum_1(array, iterate, context), getSize_1(array))
}

var mean_1 = mean;

var staticStrFirst = 'first';

var staticStrFirst_1 = staticStrFirst;

var staticStrLast = 'last';

var staticStrLast_1 = staticStrLast;

function helperGetDateFullYear (date) {
  return date.getFullYear()
}

var helperGetDateFullYear_1 = helperGetDateFullYear;

function helperGetDateMonth (date) {
  return date.getMonth()
}

var helperGetDateMonth_1 = helperGetDateMonth;

/**
  * 返回前几月或后几月的日期
  *
  * @param {Date} date 日期或数字
  * @param {Number} month 月(默认当前月)、前几个月、后几个月
  * @param {Number/String} day 获取哪天(null默认当前天)、月初(first)、月末(last)、指定天数(数值)
  * @return {Date}
  */
function getWhatMonth (date, month, day) {
  var monthOffset = month && !isNaN(month) ? month : 0;
  date = toStringDate_1(date);
  if (isDate_1(date)) {
    if (day || !isNaN(day)) {
      if (day === staticStrFirst_1) {
        return new Date(helperGetDateFullYear_1(date), helperGetDateMonth_1(date) + monthOffset, 1)
      } else if (day === staticStrLast_1) {
        return new Date(helperGetDateTime_1(getWhatMonth(date, monthOffset + 1, staticStrFirst_1)) - 1)
      } else {
        date.setDate(day);
      }
    }
    if (monthOffset) {
      date.setMonth(helperGetDateMonth_1(date) + monthOffset);
    }
  }
  return date
}

var getWhatMonth_1 = getWhatMonth;

/**
  * 返回前几年或后几年的日期
  *
  * @param {Date} date 日期或数字
  * @param {Number} year 年(默认当前年)、前几个年(数值)、后几个年(数值)
  * @param {Number/String} month 获取哪月(null默认当前年)、年初(first)、年末(last)、指定月份（0-11）
  * @return {Date}
  */
function getWhatYear (date, year, month) {
  var number;
  date = toStringDate_1(date);
  if (isDate_1(date)) {
    if (year) {
      number = year && !isNaN(year) ? year : 0;
      date.setFullYear(helperGetDateFullYear_1(date) + number);
    }
    if (month || !isNaN(month)) {
      if (month === staticStrFirst_1) {
        return new Date(helperGetDateFullYear_1(date), 0, 1)
      } else if (month === staticStrLast_1) {
        date.setMonth(11);
        return getWhatMonth_1(date, 0, staticStrLast_1)
      } else {
        date.setMonth(month);
      }
    }
  }
  return date
}

var getWhatYear_1 = getWhatYear;

/**
  * 返回前几天或后几天的日期
  *
  * @param {Date} date 日期或数字
  * @param {Number} day 天(默认当天)、前几天、后几天
  * @param {String} mode 获取时分秒(null默认当前时分秒)、日初(first)、日末(last)
  * @return {Date}
  */
function getWhatDay (date, day, mode) {
  date = toStringDate_1(date);
  if (isDate_1(date) && !isNaN(day)) {
    date.setDate(date.getDate() + staticParseInt_1(day));
    if (mode === staticStrFirst_1) {
      return new Date(helperGetDateFullYear_1(date), helperGetDateMonth_1(date), date.getDate())
    } else if (mode === staticStrLast_1) {
      return new Date(helperGetDateTime_1(getWhatDay(date, 1, staticStrFirst_1)) - 1)
    }
  }
  return date
}

var getWhatDay_1 = getWhatDay;

var staticDayTime = 86400000;

var staticDayTime_1 = staticDayTime;

/**
  * 返回某个年份的第几周
  *
  * @param {Date} date 日期或数字
  * @return {Number}
  */
function getYearWeek (date) {
  date = toStringDate_1(date);
  if (isDate_1(date)) {
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    var week = new Date(date.getFullYear(), 0, 4);
    return Math.round(((date.getTime() - week.getTime()) / staticDayTime_1 + (week.getDay() + 6) % 7 - 3) / 7) + 1
  }
  return date
}

var getYearWeek_1 = getYearWeek;

function helperGetYMD (date) {
  return new Date(helperGetDateFullYear_1(date), helperGetDateMonth_1(date), date.getDate())
}

var helperGetYMD_1 = helperGetYMD;

function helperGetYMDTime (date) {
  return helperGetDateTime_1(helperGetYMD_1(date))
}

var helperGetYMDTime_1 = helperGetYMDTime;

/**
  * 返回某个年份的第几天
  *
  * @param {Date} date 日期或数字
  * @return {Number}
  */
function getYearDay (date) {
  date = toStringDate_1(date);
  if (isDate_1(date)) {
    return Math.floor((helperGetYMDTime_1(date) - helperGetYMDTime_1(getWhatYear_1(date, 0, staticStrFirst_1))) / staticDayTime_1) + 1
  }
  return date
}

var getYearDay_1 = getYearDay;

/**
  * 用指定字符从前面开始补全字符串
  *
  * @param {String} str 字符串
  * @param {Number} targetLength 结果长度
  * @param {Number} padString 补全字符
  * @return {String}
  */
function padStart (str, targetLength, padString) {
  var rest = toString_1(str);
  targetLength = targetLength >> 0;
  padString = isUndefined_1(padString) ? ' ' : '' + padString;
  if (rest.padStart) {
    return rest.padStart(targetLength, padString)
  }
  if (targetLength > rest.length) {
    targetLength -= rest.length;
    if (targetLength > padString.length) {
      padString += repeat_1(padString, targetLength / padString.length);
    }
    return padString.slice(0, targetLength) + rest
  }
  return rest
}

var padStart_1 = padStart;

function handleCustomTemplate (date, formats, match, value) {
  var format = formats[match];
  if (format) {
    if (isFunction_1(format)) {
      return format(value, match, date)
    } else {
      return format[value]
    }
  }
  return value
}

function formatDayE (day) {
  return day === 0 ? 7 : day
}

/**
  * 日期格式化为字符串，转义符号 []
  *
  * @param {Date} date 日期或数字
  * @param {String} format 输出日期格式(年份(yy|yyyy)、月份(M|MM自动补0)、天(d|dd自动补0)、12小时制(h|hh自动补0)、24小时制(H|HH自动补0)、分钟(m|mm自动补0)、秒(s|ss自动补0)、毫秒(S|SSS自动补0)、D当年的第几天、a/A上午下午、e/E星期几、w当年的第几周、W当月的第几周、q当年第几个季度、Z时区)
  * @param {Object} options {formats: {q: ['日', '一', '二', '三', '四', '五', '六'], E: function (value, match, date) {return '三'}, }} 自定义格式化模板
  * @return {String}
  */
var dateFormatRE = /\[([^\]]+)]|y{2,4}|M{1,2}|d{1,2}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|S{1,3}|Z{1,2}|W{1,2}|D{1,3}|[aAeEq]/g;
function toDateString (date, format, options) {
  if (date) {
    date = toStringDate_1(date);
    if (isDate_1(date)) {
      var result = format || setupDefaults_1.formatString;
      var hours = date.getHours();
      var apm = hours < 12 ? 'am' : 'pm';
      var formats = assign_1({}, setupDefaults_1.formatStringMatchs, options ? options.formats : null);
      var fy = function (match, length) {
        return ('' + helperGetDateFullYear_1(date)).substr(4 - length)
      };
      var fM = function (match, length) {
        return padStart_1(helperGetDateMonth_1(date) + 1, length, '0')
      };
      var fd = function (match, length) {
        return padStart_1(date.getDate(), length, '0')
      };
      var fH = function (match, length) {
        return padStart_1(hours, length, '0')
      };
      var fh = function (match, length) {
        return padStart_1(hours <= 12 ? hours : hours - 12, length, '0')
      };
      var fm = function (match, length) {
        return padStart_1(date.getMinutes(), length, '0')
      };
      var fs = function (match, length) {
        return padStart_1(date.getSeconds(), length, '0')
      };
      var fS = function (match, length) {
        return padStart_1(date.getMilliseconds(), length, '0')
      };
      var fZ = function (match, length) {
        var zoneHours = date.getTimezoneOffset() / 60 * -1;
        return handleCustomTemplate(date, formats, match, (zoneHours >= 0 ? '+' : '-') + padStart_1(zoneHours, 2, '0') + (length === 1 ? ':' : '') + '00')
      };
      var fW = function (match, length) {
        return padStart_1(handleCustomTemplate(date, formats, match, getYearWeek_1(date)), length, '0')
      };
      var fD = function (match, length) {
        return padStart_1(handleCustomTemplate(date, formats, match, getYearDay_1(date)), length, '0')
      };
      var parseDates = {
        yyyy: fy,
        yy: fy,
        MM: fM,
        M: fM,
        dd: fd,
        d: fd,
        HH: fH,
        H: fH,
        hh: fh,
        h: fh,
        mm: fm,
        m: fm,
        ss: fs,
        s: fs,
        SSS: fS,
        S: fS,
        ZZ: fZ,
        Z: fZ,
        WW: fW,
        W: fW,
        DDD: fD,
        D: fD,
        a: function (match) {
          return handleCustomTemplate(date, formats, match, apm)
        },
        A: function (match) {
          return handleCustomTemplate(date, formats, match, apm.toLocaleUpperCase())
        },
        e: function (match) {
          return handleCustomTemplate(date, formats, match, date.getDay())
        },
        E: function (match) {
          return handleCustomTemplate(date, formats, match, formatDayE(date.getDay()))
        },
        q: function (match) {
          return handleCustomTemplate(date, formats, match, Math.floor((helperGetDateMonth_1(date) + 3) / 3))
        }
      };
      return result.replace(dateFormatRE, function (match, skip) {
        return skip || (parseDates[match] ? parseDates[match](match, match.length) : match)
      })
    }
    return date
  }
  return ''
}

var toDateString_1 = toDateString;

/**
 * 返回当前时间戳
 *
 * @returns Number
 */
var now = Date.now || function () {
  return helperGetDateTime_1(helperNewDate_1())
};

var now_1 = now;

/**
 * 将日期格式化为时间戳
 *
  * @param {String/Number/Date} str 日期或数字
  * @param {String} format 解析日期格式
 * @returns Number
 */
var timestamp = function (str, format) {
  if (str) {
    var date = toStringDate_1(str, format);
    return isDate_1(date) ? helperGetDateTime_1(date) : date
  }
  return now_1()
};

var timestamp_1 = timestamp;

/**
 * 比较两个日期
 *
 * @param {Number/String/Date} date1 日期
 * @param {Number/String/Date} date2 日期
 * @param {String} format 格式化
 */
function isDateSame (date1, date2, format) {
  if (date1 && date2) {
    date1 = toDateString_1(date1, format);
    return date1 !== 'Invalid Date' && date1 === toDateString_1(date2, format)
  }
  return false
}

var isDateSame_1 = isDateSame;

var staticWeekTime = staticDayTime_1 * 7;

var staticWeekTime_1 = staticWeekTime;

/**
  * 返回前几周或后几周的星期几
  *
  * @param {Date} date 日期
  * @param {Number} week 周(默认当前周)、前几周、后几周
  * @param {Number} day 星期天(默认0)、星期一(1)、星期二(2)、星期三(3)、星期四(4)、星期五(5)、星期六(6)
  * @return {Date}
  */
function getWhatWeek (date, week, day) {
  var time, whatDayTime, currentDay, customDay;
  date = toStringDate_1(date);
  if (isDate_1(date)) {
    customDay = staticParseInt_1(/^[0-7]$/.test(day) ? day : date.getDay());
    currentDay = date.getDay();
    time = helperGetDateTime_1(date);
    whatDayTime = time + ((customDay === 0 ? 7 : customDay) - (currentDay === 0 ? 7 : currentDay)) * staticDayTime_1;
    if (week && !isNaN(week)) {
      whatDayTime += week * staticWeekTime_1;
    }
    return new Date(whatDayTime)
  }
  return date
}

var getWhatWeek_1 = getWhatWeek;

/**
  * 返回某个月的第几周
  *
  * @param {Date} date 日期或数字
  * @return {Number}
  */
function getMonthWeek (date) {
  var monthFirst, monthFirstWeek;
  var currentDate = toStringDate_1(date);
  if (isDate_1(currentDate)) {
    monthFirst = getWhatMonth_1(currentDate, 0, staticStrFirst_1);
    monthFirstWeek = getWhatWeek_1(monthFirst, 0, 1);
    if (monthFirstWeek < monthFirst) {
      monthFirstWeek = getWhatWeek_1(monthFirst, 1, 1);
    }
    if (currentDate >= monthFirstWeek) {
      return Math.floor((helperGetYMDTime_1(currentDate) - helperGetYMDTime_1(monthFirstWeek)) / staticWeekTime_1) + 1
    }
    return getMonthWeek(getWhatWeek_1(currentDate, 0, 1))
  }
  return currentDate
}

var getMonthWeek_1 = getMonthWeek;

/**
  * 返回某个年份的天数
  *
  * @param {Date} date 日期或数字
  * @param {Number} year 年(默认当年)、前几个年、后几个年
  * @return {Number}
  */
function getDayOfYear (date, year) {
  date = toStringDate_1(date);
  if (isDate_1(date)) {
    return isLeapYear_1(getWhatYear_1(date, year)) ? 366 : 365
  }
  return date
}

var getDayOfYear_1 = getDayOfYear;

/**
  * 返回某个月份的天数
  *
  * @param {Date} date 日期或数字
  * @param {Number} month 月(默认当月)、前几个月、后几个月
  * @return {Number}
  */
function getDayOfMonth (date, month) {
  date = toStringDate_1(date);
  if (isDate_1(date)) {
    return Math.floor((helperGetDateTime_1(getWhatMonth_1(date, month, staticStrLast_1)) - helperGetDateTime_1(getWhatMonth_1(date, month, staticStrFirst_1))) / staticDayTime_1) + 1
  }
  return date
}

var getDayOfMonth_1 = getDayOfMonth;

/**
  * 返回两个日期之间差距,如果结束日期小于开始日期done为fasle
  *
  * @param {Date} startDate 开始日期
  * @param {Date} endDate 结束日期或当期日期
  * @param {Date} rule 自定义计算规则
  * @return {Object}
  */
function getDateDiff (startDate, endDate, rules) {
  var startTime, endTime, item, diffTime, rule, len, index;
  var result = { done: false, time: 0 };
  startDate = toStringDate_1(startDate);
  endDate = endDate ? toStringDate_1(endDate) : helperNewDate_1();
  if (isDate_1(startDate) && isDate_1(endDate)) {
    startTime = helperGetDateTime_1(startDate);
    endTime = helperGetDateTime_1(endDate);
    if (startTime < endTime) {
      diffTime = result.time = endTime - startTime;
      rule = rules && rules.length > 0 ? rules : setupDefaults_1.dateDiffRules;
      result.done = true;
      for (index = 0, len = rule.length; index < len; index++) {
        item = rule[index];
        if (diffTime >= item[1]) {
          if (index === len - 1) {
            result[item[0]] = diffTime || 0;
          } else {
            result[item[0]] = Math.floor(diffTime / item[1]);
            diffTime -= result[item[0]] * item[1];
          }
        } else {
          result[item[0]] = 0;
        }
      }
    }
  }
  return result
}

var getDateDiff_1 = getDateDiff;

/**
  * 去除字符串右边的空格
  *
  * @param {String} str 字符串
  * @return {String}
  */
function trimRight (str) {
  return str && str.trimRight ? str.trimRight() : toString_1(str).replace(/[\s\uFEFF\xA0]+$/g, '')
}

var trimRight_1 = trimRight;

/**
  * 去除字符串左边的空格
  *
  * @param {String} str 字符串
  * @return {String}
  */
function trimLeft (str) {
  return str && str.trimLeft ? str.trimLeft() : toString_1(str).replace(/^[\s\uFEFF\xA0]+/g, '')
}

var trimLeft_1 = trimLeft;

/**
  * 去除字符串左右两边的空格
  *
  * @param {String} str 字符串
  * @return {String}
  */
function trim (str) {
  return str && str.trim ? str.trim() : trimRight_1(trimLeft_1(str))
}

var trim_1 = trim;

var staticEscapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;'
};

var staticEscapeMap_1 = staticEscapeMap;

function helperFormatEscaper (dataMap) {
  var replaceRegexp = new RegExp('(?:' + keys_1(dataMap).join('|') + ')', 'g');
  return function (str) {
    return toString_1(str).replace(replaceRegexp, function (match) {
      return dataMap[match]
    })
  }
}

var helperFormatEscaper_1 = helperFormatEscaper;

/**
  * 转义HTML字符串，替换&, <, >, ", ', `字符
  *
  * @param {String} str 字符串
  * @return {String}
  */
var escape = helperFormatEscaper_1(staticEscapeMap_1);

var _escape = escape;

var unescapeMap = {};
each_1(staticEscapeMap_1, function (item, key) {
  unescapeMap[staticEscapeMap_1[key]] = key;
});

/**
  * 反转escape
  *
  * @param {String} str 字符串
  * @return {String}
  */
var unescape = helperFormatEscaper_1(unescapeMap);

var _unescape = unescape;

/**
  * 将带字符串转成驼峰字符串,例如： project-name 转为 projectName
  *
  * @param {String} str 字符串
  * @return {String}
  */
function camelCase (str) {
  return toString_1(str).replace(/(-[a-zA-Z])/g, function (text, u) {
    return u.substring(1).toLocaleUpperCase()
  })
}

var camelCase_1 = camelCase;

/**
  * 将带驼峰字符串转成字符串,例如： projectName 转为 project-name
  *
  * @param {String} str 字符串
  * @return {String}
  */
function kebabCase (str) {
  return toString_1(str).replace(/([A-Z])/g, function (text, u) {
    return '-' + u.toLowerCase()
  })
}

var kebabCase_1 = kebabCase;

/**
  * 判断字符串是否在源字符串的头部
  *
  * @param {String} str 字符串
  * @param {String/Number} val 值
  * @param {Number} startIndex 开始索引
  * @return {String}
  */
function startsWith (str, val, startIndex) {
  var rest = toString_1(str);
  return (arguments.length === 1 ? rest : rest.substring(startIndex)).indexOf(val) === 0
}

var startsWith_1 = startsWith;

/**
  * 判断字符串是否在源字符串的尾部
  *
  * @param {String} str 字符串
  * @param {String/Number} val 值
  * @param {Number} startIndex 开始索引
  * @return {String}
  */
function endsWith (str, val, startIndex) {
  var rest = toString_1(str);
  var argsLen = arguments.length;
  return argsLen > 1 && (argsLen > 2 ? rest.substring(0, startIndex).indexOf(val) === startIndex - 1 : rest.indexOf(val) === rest.length - 1)
}

var endsWith_1 = endsWith;

/**
 * 解析动态字符串模板
 * @param {String} str 字符串模板
 * @param {Object} obj 对象
 */
function template (str, obj) {
  return toString_1(str).replace(/\{{2}([.\w[\]\s]+)\}{2}/g, function (match, key) {
    return get_1(obj, trim_1(key))
  })
}

var template_1 = template;

/**
 * 一个空的方法，始终返回 undefined，可用于初始化值
 */
function noop () {}

var noop_1 = noop;

/**
  * 创建一个绑定上下文的函数
  *
  * @param {Function} callback 函数
  * @param {Object} context 上下文
  * @param {*} args 额外的参数
  * @return {Object}
  */
function bind (callback, context) {
  var args = slice_1(arguments, 2);
  return function () {
    return callback.apply(context, slice_1(arguments).concat(args))
  }
}

var bind_1 = bind;

/**
  * 创建一个只能调用一次的函数,只会返回第一次执行后的结果
  *
  * @param {Function} callback 函数
  * @param {Object} context 上下文
  * @param {*} args 额外的参数
  * @return {Object}
  */
function once (callback, context) {
  var done = false;
  var rest = null;
  var args = slice_1(arguments, 2);
  return function () {
    if (done) {
      return rest
    }
    rest = callback.apply(context, slice_1(arguments).concat(args));
    done = true;
    return rest
  }
}

var once_1 = once;

/**
  * 创建一个函数, 调用次数超过 count 次之后执行回调并将所有结果记住后返回
  *
  * @param {Number} count 调用次数
  * @param {Function} callback 完成回调
  * @return {Object}
  */
function after (count, callback, context) {
  var runCount = 0;
  var rests = [];
  return function () {
    var args = arguments;
    runCount++;
    if (runCount <= count) {
      rests.push(args[0]);
    }
    if (runCount >= count) {
      callback.apply(context, [rests].concat(slice_1(args)));
    }
  }
}

var after_1 = after;

/**
  * 创建一个函数, 调用次数不超过 count 次之前执行回调并将所有结果记住后返回
  *
  * @param {Number} count 调用次数
  * @param {Function} callback 完成回调
  * @return {Object}
  */
function before (count, callback, context) {
  var runCount = 0;
  var rests = [];
  context = context || this;
  return function () {
    var args = arguments;
    runCount++;
    if (runCount < count) {
      rests.push(args[0]);
      callback.apply(context, [rests].concat(slice_1(args)));
    }
  }
}

var before_1 = before;

/**
  * 节流函数；当被调用 n 毫秒后才会执行，如果在这时间内又被调用则至少每隔 n 秒毫秒调用一次该函数
  *
  * @param {Function} callback 回调
  * @param {Number} wait 多少秒毫
  * @param {Object} options 参数{leading: 是否在之前执行, trailing: 是否在之后执行}
  * @return {Function}
  */
function throttle (callback, wait, options) {
  var args, context;
  var opts = options || {};
  var runFlag = false;
  var timeout = 0;
  var optLeading = 'leading' in opts ? opts.leading : true;
  var optTrailing = 'trailing' in opts ? opts.trailing : false;
  var runFn = function () {
    runFlag = true;
    callback.apply(context, args);
    timeout = setTimeout(endFn, wait);
  };
  var endFn = function () {
    timeout = 0;
    if (!runFlag && optTrailing === true) {
      runFn();
    }
  };
  var cancelFn = function () {
    var rest = timeout !== 0;
    clearTimeout(timeout);
    runFlag = false;
    timeout = 0;
    return rest
  };
  var throttled = function () {
    args = arguments;
    context = this;
    runFlag = false;
    if (timeout === 0) {
      if (optLeading === true) {
        runFn();
      } else if (optTrailing === true) {
        timeout = setTimeout(endFn, wait);
      }
    }
  };
  throttled.cancel = cancelFn;
  return throttled
}

var throttle_1 = throttle;

/**
  * 函数去抖；当被调用 n 毫秒后才会执行，如果在这时间内又被调用则将重新计算执行时间
  *
  * @param {Function} callback 回调
  * @param {Number} wait 多少秒毫
  * @param {Object} options 参数{leading: 是否在之前执行, trailing: 是否在之后执行}
  * @return {Function}
  */
function debounce (callback, wait, options) {
  var args, context;
  var opts = options || {};
  var runFlag = false;
  var timeout = 0;
  var isLeading = typeof options === 'boolean';
  var optLeading = 'leading' in opts ? opts.leading : isLeading;
  var optTrailing = 'trailing' in opts ? opts.trailing : !isLeading;
  var runFn = function () {
    runFlag = true;
    timeout = 0;
    callback.apply(context, args);
  };
  var endFn = function () {
    if (optLeading === true) {
      timeout = 0;
    }
    if (!runFlag && optTrailing === true) {
      runFn();
    }
  };
  var cancelFn = function () {
    var rest = timeout !== 0;
    clearTimeout(timeout);
    timeout = 0;
    return rest
  };
  var debounced = function () {
    runFlag = false;
    args = arguments;
    context = this;
    if (timeout === 0) {
      if (optLeading === true) {
        runFn();
      }
    } else {
      clearTimeout(timeout);
    }
    timeout = setTimeout(endFn, wait);
  };
  debounced.cancel = cancelFn;
  return debounced
}

var debounce_1 = debounce;

/**
  * 该方法和 setTimeout 一样的效果，区别就是支持上下文和额外参数
  *
  * @param {Function} callback 函数
  * @param {Number} wait 延迟毫秒
  * @param {*} args 额外的参数
  * @return {Number}
 */
function delay (callback, wait) {
  var args = slice_1(arguments, 2);
  var context = this;
  return setTimeout(function () {
    callback.apply(context, args);
  }, wait)
}

var delay_1 = delay;

var staticDecodeURIComponent = decodeURIComponent;

var staticDecodeURIComponent_1 = staticDecodeURIComponent;

/**
 * 反序列化查询参数
 *
 * @param {String} query 字符串
 */
function unserialize (str) {
  var items;
  var result = {};
  if (str && isString_1(str)) {
    arrayEach_1(str.split('&'), function (param) {
      items = param.split('=');
      result[staticDecodeURIComponent_1(items[0])] = staticDecodeURIComponent_1(items[1] || '');
    });
  }
  return result
}

var unserialize_1 = unserialize;

var staticEncodeURIComponent = encodeURIComponent;

var staticEncodeURIComponent_1 = staticEncodeURIComponent;

function stringifyParams (resultVal, resultKey, isArr) {
  var _arr;
  var result = [];
  each_1(resultVal, function (item, key) {
    _arr = isArray_1(item);
    if (isPlainObject_1(item) || _arr) {
      result = result.concat(stringifyParams(item, resultKey + '[' + key + ']', _arr));
    } else {
      result.push(staticEncodeURIComponent_1(resultKey + '[' + (isArr ? '' : key) + ']') + '=' + staticEncodeURIComponent_1(isNull_1(item) ? '' : item));
    }
  });
  return result
}

/**
 * 序列化查询参数
 *
 * @param {Object} query 查询参数
 */
function serialize (query) {
  var _arr;
  var params = [];
  each_1(query, function (item, key) {
    if (!isUndefined_1(item)) {
      _arr = isArray_1(item);
      if (isPlainObject_1(item) || _arr) {
        params = params.concat(stringifyParams(item, key, _arr));
      } else {
        params.push(staticEncodeURIComponent_1(key) + '=' + staticEncodeURIComponent_1(isNull_1(item) ? '' : item));
      }
    }
  });
  return params.join('&').replace(/%20/g, '+')
}

var serialize_1 = serialize;

/* eslint-disable valid-typeof */
var staticLocation = typeof location === staticStrUndefined_1 ? 0 : location;

var staticLocation_1 = staticLocation;

function helperGetLocatOrigin () {
  return staticLocation_1 ? (staticLocation_1.origin || (staticLocation_1.protocol + '//' + staticLocation_1.host)) : ''
}

var helperGetLocatOrigin_1 = helperGetLocatOrigin;

function parseURLQuery (uri) {
  return unserialize_1(uri.split('?')[1] || '')
}

function parseUrl (url) {
  var hashs, portText, searchs, parsed;
  var href = '' + url;
  if (href.indexOf('//') === 0) {
    href = (staticLocation_1 ? staticLocation_1.protocol : '') + href;
  } else if (href.indexOf('/') === 0) {
    href = helperGetLocatOrigin_1() + href;
  }
  searchs = href.replace(/#.*/, '').match(/(\?.*)/);
  parsed = {
    href: href,
    hash: '',
    host: '',
    hostname: '',
    protocol: '',
    port: '',
    search: searchs && searchs[1] && searchs[1].length > 1 ? searchs[1] : ''
  };
  parsed.path = href.replace(/^([a-z0-9.+-]*:)\/\//, function (text, protocol) {
    parsed.protocol = protocol;
    return ''
  }).replace(/^([a-z0-9.+-]*)(:\d+)?\/?/, function (text, hostname, port) {
    portText = port || '';
    parsed.port = portText.replace(':', '');
    parsed.hostname = hostname;
    parsed.host = hostname + portText;
    return '/'
  }).replace(/(#.*)/, function (text, hash) {
    parsed.hash = hash.length > 1 ? hash : '';
    return ''
  });
  hashs = parsed.hash.match(/#((.*)\?|(.*))/);
  parsed.pathname = parsed.path.replace(/(\?|#.*).*/, '');
  parsed.origin = parsed.protocol + '//' + parsed.host;
  parsed.hashKey = hashs ? (hashs[2] || hashs[1] || '') : '';
  parsed.hashQuery = parseURLQuery(parsed.hash);
  parsed.searchQuery = parseURLQuery(parsed.search);
  return parsed
}

var parseUrl_1 = parseUrl;

function getBaseURL () {
  if (staticLocation_1) {
    var pathname = staticLocation_1.pathname;
    var lastIndex = lastIndexOf_1(pathname, '/') + 1;
    return helperGetLocatOrigin_1() + (lastIndex === pathname.length ? pathname : pathname.substring(0, lastIndex))
  }
  return ''
}

var getBaseURL_1 = getBaseURL;

/**
  * 获取地址栏信息
  *
  * @return Object
  */
function locat () {
  return staticLocation_1 ? parseUrl_1(staticLocation_1.href) : {}
}

var locat_1 = locat;

function toCookieUnitTime (unit, expires) {
  var num = parseFloat(expires);
  var nowdate = helperNewDate_1();
  var time = helperGetDateTime_1(nowdate);
  switch (unit) {
    case 'y': return helperGetDateTime_1(getWhatYear_1(nowdate, num))
    case 'M': return helperGetDateTime_1(getWhatMonth_1(nowdate, num))
    case 'd': return helperGetDateTime_1(getWhatDay_1(nowdate, num))
    case 'h':
    case 'H': return time + num * 60 * 60 * 1000
    case 'm': return time + num * 60 * 1000
    case 's': return time + num * 1000
  }
  return time
}

function toCookieUTCString (date) {
  return (isDate_1(date) ? date : new Date(date)).toUTCString()
}

/**
  * cookie操作函数
  * @param {String/Array/Object} name 键/数组/对象
  * @param {String} value 值
  * @param {Object} options 参数
  *   @param {String} name: 键
  *   @param {Object} value: 值
  *   @param {String} path: 路径
  *   @param {String} domain: 作用域
  *   @param {Boolean} secure: 设置为安全的,只能用https协议
  *   @param {Number} expires: 过期时间,可以指定日期或者字符串，默认天
  */
function cookie (name, value, options) {
  if (staticDocument_1) {
    var opts, expires, values, result, cookies, keyIndex;
    var inserts = [];
    var args = arguments;
    if (isArray_1(name)) {
      inserts = name;
    } else if (args.length > 1) {
      inserts = [assign_1({ name: name, value: value }, options)];
    } else if (isObject_1(name)) {
      inserts = [name];
    }
    if (inserts.length > 0) {
      arrayEach_1(inserts, function (obj) {
        opts = assign_1({}, setupDefaults_1.cookies, obj);
        values = [];
        if (opts.name) {
          expires = opts.expires;
          values.push(staticEncodeURIComponent_1(opts.name) + '=' + staticEncodeURIComponent_1(isObject_1(opts.value) ? JSON.stringify(opts.value) : opts.value));
          if (expires) {
            if (isNaN(expires)) {
              // UTCString || Unit
              expires = expires.replace(/^([0-9]+)(y|M|d|H|h|m|s)$/, function (text, num, unit) {
                return toCookieUTCString(toCookieUnitTime(unit, num))
              });
            } else if (/^[0-9]{11,13}$/.test(expires) || isDate_1(expires)) {
              // Date || now
              expires = toCookieUTCString(expires);
            } else {
              // day
              expires = toCookieUTCString(toCookieUnitTime('d', expires));
            }
            opts.expires = expires;
          }
          arrayEach_1(['expires', 'path', 'domain', 'secure'], function (key) {
            if (!isUndefined_1(opts[key])) {
              values.push(opts[key] && key === 'secure' ? key : (key + '=' + opts[key]));
            }
          });
        }
        staticDocument_1.cookie = values.join('; ');
      });
      return true
    } else {
      result = {};
      cookies = staticDocument_1.cookie;
      if (cookies) {
        arrayEach_1(cookies.split('; '), function (val) {
          keyIndex = val.indexOf('=');
          result[staticDecodeURIComponent_1(val.substring(0, keyIndex))] = staticDecodeURIComponent_1(val.substring(keyIndex + 1) || '');
        });
      }
      return args.length === 1 ? result[name] : result
    }
  }
  return false
}

function isCookieKey (key) {
  return includes_1(cookieKeys(), key)
}

function setCookieItem (name, key, options) {
  cookie(name, key, options);
  return cookie
}

function removeCookieItem (name, options) {
  cookie(name, 0, assign_1({ expires: -1 }, setupDefaults_1.cookies, options));
}

function cookieKeys () {
  return keys_1(cookie())
}

assign_1(cookie, {
  _c: false,
  isKey: isCookieKey,
  set: setCookieItem,
  setItem: setCookieItem,
  get: cookie,
  getItem: cookie,
  remove: removeCookieItem,
  removeItem: removeCookieItem,
  keys: cookieKeys,
  getJSON: cookie
});

var cookie_1 = cookie;

/* eslint-disable valid-typeof */
function isBrowseStorage (storage) {
  try {
    var testKey = '__xe_t';
    storage.setItem(testKey, 1);
    storage.removeItem(testKey);
    return true
  } catch (e) {
    return false
  }
}

function isBrowseType (type) {
  return navigator.userAgent.indexOf(type) > -1
}

/**
  * 获取浏览器内核
  * @return Object
  */
function browse () {
  var $body, isChrome, isEdge;
  var isMobile = false;
  var result = {
    isNode: false,
    isMobile: isMobile,
    isPC: false,
    isDoc: !!staticDocument_1
  };
  if (!staticWindow_1 && undefined !== staticStrUndefined_1) {
    result.isNode = true;
  } else {
    isEdge = isBrowseType('Edge');
    isChrome = isBrowseType('Chrome');
    isMobile = /(Android|webOS|iPhone|iPad|iPod|SymbianOS|BlackBerry|Windows Phone)/.test(navigator.userAgent);
    if (result.isDoc) {
      $body = staticDocument_1.body || staticDocument_1.documentElement;
      arrayEach_1(['webkit', 'khtml', 'moz', 'ms', 'o'], function (core) {
        result['-' + core] = !!$body[core + 'MatchesSelector'];
      });
    }
    assign_1(result, {
      edge: isEdge,
      firefox: isBrowseType('Firefox'),
      msie: !isEdge && result['-ms'],
      safari: !isChrome && !isEdge && isBrowseType('Safari'),
      isMobile: isMobile,
      isPC: !isMobile,
      isLocalStorage: isBrowseStorage(staticWindow_1.localStorage),
      isSessionStorage: isBrowseStorage(staticWindow_1.sessionStorage)
    });
  }
  return result
}

var browse_1 = browse;

// 核心


// 对象相关的方法







// 数组相关的方法





































// 基础方法

































































// 数值相关方法















// 日期相关的方法
















// 字符串相关的方法















// 函数相关的方法










// 地址相关的方法




// 浏览器相关的方法





assign_1(xeUtils, {
  // object
  assign: assign_1,
  extend: extend_1,
  objectEach: objectEach_1,
  lastObjectEach: lastObjectEach_1,
  objectMap: objectMap_1,
  merge: merge_1,

  // array
  uniq: uniq_1,
  union: union_1,
  sortBy: sortBy_1,
  shuffle: shuffle_1,
  sample: sample_1,
  some: some_1,
  every: every_1,
  slice: slice_1,
  filter: filter_1,
  find: find_1,
  findKey: findKey_1,
  includes: includes_1,
  arrayIndexOf: arrayIndexOf_1,
  arrayLastIndexOf: arrayLastIndexOf_1,
  map: map_1,
  reduce: reduce_1,
  copyWithin: copyWithin_1,
  chunk: chunk_1,
  zip: zip_1,
  unzip: unzip_1,
  zipObject: zipObject_1,
  flatten: flatten_1,
  toArray: toArray_1,
  includeArrays: includeArrays_1,
  pluck: pluck_1,
  invoke: invoke_1,
  invokeMap: invokeMap_1,
  arrayEach: arrayEach_1,
  lastArrayEach: lastArrayEach_1,
  toArrayTree: toArrayTree_1,
  toTreeArray: toTreeArray_1,
  findTree: findTree_1,
  eachTree: eachTree_1,
  mapTree: mapTree_1,
  filterTree: filterTree_1,
  searchTree: searchTree_1,

  // base
  hasOwnProp: hasOwnProp_1,
  eqNull: eqNull_1,
  isNaN: _isNaN,
  isFinite: _isFinite,
  isUndefined: isUndefined_1,
  isArray: isArray_1,
  isFloat: isFloat_1,
  isInteger: isInteger_1,
  isFunction: isFunction_1,
  isBoolean: isBoolean_1,
  isString: isString_1,
  isNumber: isNumber_1,
  isRegExp: isRegExp_1,
  isObject: isObject_1,
  isPlainObject: isPlainObject_1,
  isDate: isDate_1,
  isError: isError_1,
  isTypeError: isTypeError_1,
  isEmpty: isEmpty_1,
  isNull: isNull_1,
  isSymbol: isSymbol_1,
  isArguments: isArguments_1,
  isElement: isElement_1,
  isDocument: isDocument_1,
  isWindow: isWindow_1,
  isFormData: isFormData_1,
  isMap: isMap_1,
  isWeakMap: isWeakMap_1,
  isSet: isSet_1,
  isWeakSet: isWeakSet_1,
  isLeapYear: isLeapYear_1,
  isMatch: isMatch_1,
  isEqual: isEqual_1,
  isEqualWith: isEqualWith_1,
  getType: getType_1,
  uniqueId: uniqueId_1,
  getSize: getSize_1,
  indexOf: indexOf_1,
  lastIndexOf: lastIndexOf_1,
  findIndexOf: findIndexOf_1,
  findLastIndexOf: findLastIndexOf_1,
  toStringJSON: toStringJSON_1,
  toJSONString: toJSONString_1,
  keys: keys_1,
  values: values_1,
  entries: entries_1,
  pick: pick_1,
  omit: omit_1,
  first: first_1,
  last: last_1,
  each: each_1,
  forOf: forOf_1,
  lastForOf: lastForOf_1,
  lastEach: lastEach_1,
  has: has_1,
  get: get_1,
  set: set_1,
  groupBy: groupBy_1,
  countBy: countBy_1,
  clone: clone_1,
  clear: clear_1,
  remove: remove_1,
  range: range_1,
  destructuring: destructuring_1,

  // number
  random: random_1,
  min: min_1,
  max: max_1,
  commafy: commafy_1,
  toFixedString: toFixedString_1,
  toFixedNumber: toFixedNumber_1,
  toNumber: toNumber_1,
  toInteger: toInteger_1,
  add: add_1,
  subtract: subtract_1,
  multiply: multiply_1,
  divide: divide_1,
  sum: sum_1,
  mean: mean_1,

  // date
  now: now_1,
  timestamp: timestamp_1,
  isDateSame: isDateSame_1,
  toStringDate: toStringDate_1,
  toDateString: toDateString_1,
  getWhatYear: getWhatYear_1,
  getWhatMonth: getWhatMonth_1,
  getWhatWeek: getWhatWeek_1,
  getWhatDay: getWhatDay_1,
  getYearDay: getYearDay_1,
  getYearWeek: getYearWeek_1,
  getMonthWeek: getMonthWeek_1,
  getDayOfYear: getDayOfYear_1,
  getDayOfMonth: getDayOfMonth_1,
  getDateDiff: getDateDiff_1,

  // string
  trim: trim_1,
  trimLeft: trimLeft_1,
  trimRight: trimRight_1,
  escape: _escape,
  unescape: _unescape,
  camelCase: camelCase_1,
  kebabCase: kebabCase_1,
  repeat: repeat_1,
  padStart: padStart_1,
  padEnd: padEnd_1,
  startsWith: startsWith_1,
  endsWith: endsWith_1,
  template: template_1,
  toString: toString_1,

  // function
  noop: noop_1,
  property: property_1,
  bind: bind_1,
  once: once_1,
  after: after_1,
  before: before_1,
  throttle: throttle_1,
  debounce: debounce_1,
  delay: delay_1,

  // url
  unserialize: unserialize_1,
  serialize: serialize_1,
  parseUrl: parseUrl_1,

  // web
  getBaseURL: getBaseURL_1,
  locat: locat_1,
  browse: browse_1,
  cookie: cookie_1
});

var methods = xeUtils;

var xeUtils$1 = methods;

export default xeUtils$1;
