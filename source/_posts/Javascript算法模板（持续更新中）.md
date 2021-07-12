---
title: Javascript算法模板
date: 2020-04-16 15:00:39
categories:
  - 后台
tags:
  - 算法
---

# 排序

## 冒泡排序

冒泡排序时针对*相邻元素*之间的比较，可以将大的数慢慢沉底

```
var sortArray = function(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (nums[j] > nums[j + 1]) {
        let temp = nums[j]
        nums[j] = nums[j + 1]
        nums[j + 1] = temp
      }
    }
  }
  return nums
};
```

时间复杂度O(n^2)，击败5%的leetcode用户

## 插入排序

前面*已排序数组*找到插入的位置

```
var sortArray = function(nums) {
  for (let i = 0; i < nums.length; i++) {
    let j = i - 1
    let temp = nums[i]
    while (j >= 0) {
      if (temp > nums[j]) {
        break
      }
      nums[j + 1] = nums[j]
      j--
    }
    nums[j + 1] = temp
  }
  return nums
};
```

时间复杂度O(n^2)，击败32%的leetcode用户

## 选择排序

首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。

*个人理解，类似于打斗地主的时候整理牌面，比较符合人类思维*

```
var sortArray = function(nums) {
  for (let i = 0; i < nums.length; i++) {
    let min = Infinity // 最小值
    let minIndex = i // 最小值索引
    for (let j = i; j < nums.length; j++) {
      if (nums[j] < min) {
        min = nums[j]
        minIndex = j
      }
    }
    let temp = nums[i]
    nums[i] = min
    nums[minIndex] = temp
  }
  return nums
};
```

时间复杂度O(n^2)，击败25%的leetcode用户

## 快速排序

快速排序是选取一个“哨兵”(pivot)，将小于pivot放在左边，把大于pivot放在右边，分割成两部分，并且可以固定pivot在数组的位置，再对左右两部分继续进行排序。

步骤1：从数列中挑出一个元素，称为 “基准”（pivot ）；
步骤2：重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
步骤3：递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。

```
var sortArray = function(nums) {
    quickSort(nums, 0, nums.length - 1)
    return nums
};

var quickSort = function (arr, left, right) {
  let len = arr.length
  if (left < right) {
    let partitionIndex = partition(arr, left, right)
    quickSort(arr, left, partitionIndex - 1)
    quickSort(arr, partitionIndex + 1, right)
  }
}

// 确定基准点，并分区
var partition = function (arr, left, right) {
  let pivot = left,
      index = pivot + 1
  for (let i = index; i <= right; i++) {
    if (arr[i] < arr[pivot]) {
      [arr[i], arr[index]] = [arr[index], arr[i]]
      index++
    }
  }
  [arr[pivot], arr[index - 1]] = [arr[index - 1], arr[pivot]]
  return index - 1
}
```

时间复杂度O(nlogn)，击败55%的leetcode用户

## 归并排序

先将数组分成子序列，让子序列有序，再将子序列间有序，合并成有序数组。

```
var sortArray = function(nums) {
  if (nums.length <= 1) return nums
  let mid = Math.floor(nums.length / 2)
  let left = nums.slice(0, mid)
  let right = nums.slice(mid, nums.length)
  return merge(sortArray(left), sortArray(right))
};

var merge = function (left, right) {
  let temp = []
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      temp.push(left[0])
      left.shift()
    } else {
      temp.push(right[0])
      right.shift()
    }
  }
  return temp.concat(left).concat(right)
}
```
时间复杂度O(nlogn)，击败40%的leetcode用户

## API

这个不解释了，底层也是看情况选取不同的排序策略

```
var sortArray = function(nums) {
    return nums.sort((a, b) => a - b)
};
```

# 查找

## 二分查找

```
// 查找起始位置，左右闭区间
var search = function(nums, target) {
  let left = 0, right = nums.length - 1
  while (left <= right) {
    let mid = Math.floor(left + (right - left) / 2)
    if (nums[mid] < target) {
      left = mid + 1
    } else if (nums[mid] > target) {
      right = mid - 1
    } else if (nums[mid] === target) {
      right = mid - 1
    }
  }
  if (left === nums.length || nums[left] !== target) {
    return -1
  }
  return left
};
```
时间复杂度O(logN)

## BFS广度优先搜索

leetcode地址：https://leetcode-cn.com/submissions/detail/63149932/

```
var updateMatrix = function(matrix) {
  let ans = JSON.parse( JSON.stringify( matrix ) ),
      queue = [];
  
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      if (matrix[row][col] === 0) continue;
      queue.push( [row, col, 0] );
      ans[row][col] = bfs();
      queue = [];
    }
  };
  
  // 广度优先搜索
  function bfs() {
    let step = 0;
    while (queue.length > 0) {
      let curr = queue.shift();
      step = curr[2];
      
      // 四个方向
      let ways = [ [-1, 0], [0, 1], [1, 0], [0, -1] ];
      for (let i = 0; i < 4; i++) {
        let r = curr[0] + ways[i][0],
            c = curr[1] + ways[i][1];
        // 如果越界就跳过
        if (r < 0 || r >= matrix.length || c < 0 || c >= matrix[0].length) {
          continue;
        }
        
        // 如果是 0，那么 step + 1; 返回
        if (matrix[r][c] === 0) {
          step += 1;
          queue = [];
          break;
        }
        
        // 记录到 queue 中，step + 1;
        queue.push( [r, c, step + 1] );
      }
    }
    
    return step;
  }
  
  return ans;
};
```