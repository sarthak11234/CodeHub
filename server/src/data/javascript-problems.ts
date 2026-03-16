export const javascriptProblems = [
    {
        title: 'Two Sum',
        description: '# Two Sum\n\nGiven an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\n## Example\n```javascript\ntwoSum([2, 7, 11, 15], 9)\n// Returns: [0, 1]\n```',
        difficulty: 'easy',
        category: 'javascript',
        starterCode: 'function twoSum(nums, target) {\n  // Your code here\n}',
        solutionCode: 'function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}',
        testCases: [
            { input: '[2,7,11,15], 9', expectedOutput: '[0,1]', description: 'Basic array' },
            { input: '[3,2,4], 6', expectedOutput: '[1,2]', description: 'Unsorted array' },
            { input: '[3,3], 6', expectedOutput: '[0,1]', description: 'Duplicate numbers' }
        ],
        points: 10
    },
    {
        title: 'Valid Palindrome',
        description: '# Valid Palindrome\n\nA phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.\n\nGiven a string `s`, return `true` if it is a palindrome, or `false` otherwise.\n\n## Example\n```javascript\nisPalindrome("A man, a plan, a canal: Panama")\n// Returns: true\n```',
        difficulty: 'easy',
        category: 'javascript',
        starterCode: 'function isPalindrome(s) {\n  // Your code here\n}',
        solutionCode: 'function isPalindrome(s) {\n  const cleanStr = s.replace(/[^A-Za-z0-9]/g, "").toLowerCase();\n  let left = 0;\n  let right = cleanStr.length - 1;\n  while (left < right) {\n    if (cleanStr[left] !== cleanStr[right]) return false;\n    left++;\n    right--;\n  }\n  return true;\n}',
        testCases: [
            { input: '"A man, a plan, a canal: Panama"', expectedOutput: 'true', description: 'String with spaces and punctuation' },
            { input: '"race a car"', expectedOutput: 'false', description: 'Not a palindrome' },
            { input: '" "', expectedOutput: 'true', description: 'Empty string' }
        ],
        points: 10
    },
    {
        title: 'Contains Duplicate',
        description: '# Contains Duplicate\n\nGiven an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.\n\n## Example\n```javascript\ncontainsDuplicate([1,2,3,1])\n// Returns: true\n```',
        difficulty: 'easy',
        category: 'javascript',
        starterCode: 'function containsDuplicate(nums) {\n  // Your code here\n}',
        solutionCode: 'function containsDuplicate(nums) {\n  return new Set(nums).size !== nums.length;\n}',
        testCases: [
            { input: '[1,2,3,1]', expectedOutput: 'true', description: 'Has duplicate' },
            { input: '[1,2,3,4]', expectedOutput: 'false', description: 'All distinct' },
            { input: '[1,1,1,3,3,4,3,2,4,2]', expectedOutput: 'true', description: 'Multiple duplicates' }
        ],
        points: 10
    },
    {
        title: 'Valid Anagram',
        description: '# Valid Anagram\n\nGiven two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.\n\n## Example\n```javascript\nisAnagram("anagram", "nagaram")\n// Returns: true\n```',
        difficulty: 'easy',
        category: 'javascript',
        starterCode: 'function isAnagram(s, t) {\n  // Your code here\n}',
        solutionCode: 'function isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  const count = {};\n  for (let char of s) count[char] = (count[char] || 0) + 1;\n  for (let char of t) {\n    if (!count[char]) return false;\n    count[char]--;\n  }\n  return true;\n}',
        testCases: [
            { input: '"anagram", "nagaram"', expectedOutput: 'true', description: 'Valid anagram' },
            { input: '"rat", "car"', expectedOutput: 'false', description: 'Invalid anagram' },
            { input: '"a", "ab"', expectedOutput: 'false', description: 'Different lengths' }
        ],
        points: 10
    },
    {
        title: 'Best Time to Buy and Sell Stock',
        description: '# Buy and Sell Stock\n\nYou are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit. If you cannot achieve any profit, return `0`.\n\n## Example\n```javascript\nmaxProfit([7,1,5,3,6,4])\n// Returns: 5 (Buy at 1, sell at 6)\n```',
        difficulty: 'easy',
        category: 'javascript',
        starterCode: 'function maxProfit(prices) {\n  // Your code here\n}',
        solutionCode: 'function maxProfit(prices) {\n  let minPrice = Infinity;\n  let maxProfit = 0;\n  for (let price of prices) {\n    if (price < minPrice) minPrice = price;\n    else if (price - minPrice > maxProfit) maxProfit = price - minPrice;\n  }\n  return maxProfit;\n}',
        testCases: [
            { input: '[7,1,5,3,6,4]', expectedOutput: '5', description: 'Normal case' },
            { input: '[7,6,4,3,1]', expectedOutput: '0', description: 'Decreasing prices' },
            { input: '[2,4,1]', expectedOutput: '2', description: 'Buy low, sell high' }
        ],
        points: 15
    },
    {
        title: 'Reverse String',
        description: '# Reverse String\n\nWrite a function that reverses a string. The input string is given as an array of characters `s`.\n\nYou must do this by modifying the input array in-place with `O(1)` extra memory.\n\n## Example\n```javascript\nreverseString(["h","e","l","l","o"])\n// Returns: ["o","l","l","e","h"]\n```',
        difficulty: 'easy',
        category: 'javascript',
        starterCode: 'function reverseString(s) {\n  // Your code here\n}',
        solutionCode: 'function reverseString(s) {\n  let left = 0, right = s.length - 1;\n  while (left < right) {\n    let temp = s[left];\n    s[left] = s[right];\n    s[right] = temp;\n    left++;\n    right--;\n  }\n  return s;\n}',
        testCases: [
            { input: '["h","e","l","l","o"]', expectedOutput: '["o","l","l","e","h"]', description: 'Odd length' },
            { input: '["H","a","n","n","a","h"]', expectedOutput: '["h","a","n","n","a","H"]', description: 'Even length' }
        ],
        points: 10
    },
    {
        title: 'Maximum Subarray',
        description: '# Maximum Subarray\n\nGiven an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.\n\n## Example\n```javascript\nmaxSubArray([-2,1,-3,4,-1,2,1,-5,4])\n// Returns: 6 (Subarray [4,-1,2,1])\n```',
        difficulty: 'medium',
        category: 'javascript',
        starterCode: 'function maxSubArray(nums) {\n  // Your code here\n}',
        solutionCode: 'function maxSubArray(nums) {\n  let maxSum = nums[0];\n  let currentSum = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    currentSum = Math.max(nums[i], currentSum + nums[i]);\n    maxSum = Math.max(maxSum, currentSum);\n  }\n  return maxSum;\n}',
        testCases: [
            { input: '[-2,1,-3,4,-1,2,1,-5,4]', expectedOutput: '6', description: 'Mixed array' },
            { input: '[1]', expectedOutput: '1', description: 'Single element' },
            { input: '[5,4,-1,7,8]', expectedOutput: '23', description: 'Mostly positive' }
        ],
        points: 20
    },
    {
        title: 'Product of Array Except Self',
        description: '# Product of Array Except Self\n\nGiven an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.\n\nYou must write an algorithm that runs in `O(n)` time and without using the division operation.\n\n## Example\n```javascript\nproductExceptSelf([1,2,3,4])\n// Returns: [24,12,8,6]\n```',
        difficulty: 'medium',
        category: 'javascript',
        starterCode: 'function productExceptSelf(nums) {\n  // Your code here\n}',
        solutionCode: 'function productExceptSelf(nums) {\n  const n = nums.length;\n  const res = new Array(n).fill(1);\n  let left = 1;\n  for (let i = 0; i < n; i++) {\n    res[i] *= left;\n    left *= nums[i];\n  }\n  let right = 1;\n  for (let i = n - 1; i >= 0; i--) {\n    res[i] *= right;\n    right *= nums[i];\n  }\n  return res;\n}',
        testCases: [
            { input: '[1,2,3,4]', expectedOutput: '[24,12,8,6]', description: 'Normal array' },
            { input: '[-1,1,0,-3,3]', expectedOutput: '[0,0,9,0,0]', description: 'Contains zero' }
        ],
        points: 25
    },
    {
        title: 'Group Anagrams',
        description: '# Group Anagrams\n\nGiven an array of strings `strs`, group the anagrams together. You can return the answer in any order.\n\n## Example\n```javascript\ngroupAnagrams(["eat","tea","tan","ate","nat","bat"])\n// Returns: [["bat"],["nat","tan"],["ate","eat","tea"]]\n```',
        difficulty: 'medium',
        category: 'javascript',
        starterCode: 'function groupAnagrams(strs) {\n  // Your code here\n}',
        solutionCode: 'function groupAnagrams(strs) {\n  const map = {};\n  for (let str of strs) {\n    const key = str.split("").sort().join("");\n    if (!map[key]) map[key] = [];\n    map[key].push(str);\n  }\n  return Object.values(map);\n}',
        testCases: [
            { input: '["eat","tea","tan","ate","nat","bat"]', expectedOutput: '[["bat"],["nat","tan"],["ate","eat","tea"]]', description: 'Standard input' },
            { input: '[""]', expectedOutput: '[[""]]', description: 'Empty string' },
            { input: '["a"]', expectedOutput: '[["a"]]', description: 'Single character' }
        ],
        points: 25
    },
    {
        title: 'Find Minimum in Rotated Sorted Array',
        description: '# Find Minimum in Rotated Sorted Array\n\nSuppose an array of length `n` sorted in ascending order is rotated between `1` and `n` times. For example, the array `nums = [0,1,2,4,5,6,7]` might become `[4,5,6,7,0,1,2]` if it was rotated 4 times.\n\nGiven the sorted rotated array `nums` of unique elements, return the minimum element of this array. You must write an algorithm that runs in `O(log n)` time.\n\n## Example\n```javascript\nfindMin([3,4,5,1,2])\n// Returns: 1\n```',
        difficulty: 'medium',
        category: 'javascript',
        starterCode: 'function findMin(nums) {\n  // Your code here\n}',
        solutionCode: 'function findMin(nums) {\n  let left = 0, right = nums.length - 1;\n  while (left < right) {\n    let mid = Math.floor((left + right) / 2);\n    if (nums[mid] > nums[right]) left = mid + 1;\n    else right = mid;\n  }\n  return nums[left];\n}',
        testCases: [
            { input: '[3,4,5,1,2]', expectedOutput: '1', description: 'Rotated mid' },
            { input: '[4,5,6,7,0,1,2]', expectedOutput: '0', description: 'Rotated almost fully' },
            { input: '[11,13,15,17]', expectedOutput: '11', description: 'Not rotated' }
        ],
        points: 25
    },
    {
        title: '3Sum',
        description: '# 3Sum\n\nGiven an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nNotice that the solution set must not contain duplicate triplets.\n\n## Example\n```javascript\nthreeSum([-1,0,1,2,-1,-4])\n// Returns: [[-1,-1,2],[-1,0,1]]\n```',
        difficulty: 'medium',
        category: 'javascript',
        starterCode: 'function threeSum(nums) {\n  // Your code here\n}',
        solutionCode: 'function threeSum(nums) {\n  const res = [];\n  nums.sort((a,b) => a - b);\n  for (let i = 0; i < nums.length - 2; i++) {\n    if (i > 0 && nums[i] === nums[i - 1]) continue;\n    let l = i + 1, r = nums.length - 1;\n    while (l < r) {\n      const sum = nums[i] + nums[l] + nums[r];\n      if (sum < 0) l++;\n      else if (sum > 0) r--;\n      else {\n        res.push([nums[i], nums[l], nums[r]]);\n        while (l < r && nums[l] === nums[l + 1]) l++;\n        while (l < r && nums[r] === nums[r - 1]) r--;\n        l++; r--;\n      }\n    }\n  }\n  return res;\n}',
        testCases: [
            { input: '[-1,0,1,2,-1,-4]', expectedOutput: '[[-1,-1,2],[-1,0,1]]', description: 'Multiple triplets' },
            { input: '[0,1,1]', expectedOutput: '[]', description: 'No zeros' },
            { input: '[0,0,0]', expectedOutput: '[[0,0,0]]', description: 'All zeros' }
        ],
        points: 30
    },
    {
        title: 'Longest Substring Without Repeating Characters',
        description: '# Longest Substring Without Repeating Characters\n\nGiven a string `s`, find the length of the longest substring without repeating characters.\n\n## Example\n```javascript\nlengthOfLongestSubstring("abcabcbb")\n// Returns: 3 (The answer is "abc")\n```',
        difficulty: 'medium',
        category: 'javascript',
        starterCode: 'function lengthOfLongestSubstring(s) {\n  // Your code here\n}',
        solutionCode: 'function lengthOfLongestSubstring(s) {\n  let map = new Map();\n  let maxLen = 0, start = 0;\n  for (let i = 0; i < s.length; i++) {\n    if (map.has(s[i])) {\n      start = Math.max(map.get(s[i]) + 1, start);\n    }\n    map.set(s[i], i);\n    maxLen = Math.max(maxLen, i - start + 1);\n  }\n  return maxLen;\n}',
        testCases: [
            { input: '"abcabcbb"', expectedOutput: '3', description: 'Standard case' },
            { input: '"bbbbb"', expectedOutput: '1', description: 'All same letters' },
            { input: '"pwwkew"', expectedOutput: '3', description: 'Substring in middle' }
        ],
        points: 25
    },
    {
        title: 'Longest Palindromic Substring',
        description: '# Longest Palindromic Substring\n\nGiven a string `s`, return the longest palindromic substring in `s`.\n\n## Example\n```javascript\nlongestPalindrome("babad")\n// Returns: "bab" (or "aba")\n```',
        difficulty: 'medium',
        category: 'javascript',
        starterCode: 'function longestPalindrome(s) {\n  // Your code here\n}',
        solutionCode: 'function longestPalindrome(s) {\n  if (!s || s.length < 1) return "";\n  let start = 0, end = 0;\n  for (let i = 0; i < s.length; i++) {\n    let len1 = expandAroundCenter(s, i, i);\n    let len2 = expandAroundCenter(s, i, i + 1);\n    let len = Math.max(len1, len2);\n    if (len > end - start) {\n      start = i - Math.floor((len - 1) / 2);\n      end = i + Math.floor(len / 2);\n    }\n  }\n  return s.substring(start, end + 1);\n}\n\nfunction expandAroundCenter(s, L, R) {\n  while (L >= 0 && R < s.length && s[L] === s[R]) {\n    L--;\n    R++;\n  }\n  return R - L - 1;\n}',
        testCases: [
            { input: '"babad"', expectedOutput: '"bab"', description: 'Palindrome in front' },
            { input: '"cbbd"', expectedOutput: '"bb"', description: 'Even palindrome' },
            { input: '"a"', expectedOutput: '"a"', description: 'Single character' }
        ],
        points: 30
    },
    {
        title: 'Container With Most Water',
        description: '# Container With Most Water\n\nYou are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`th line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.\n\n## Example\n```javascript\nmaxArea([1,8,6,2,5,4,8,3,7])\n// Returns: 49\n```',
        difficulty: 'medium',
        category: 'javascript',
        starterCode: 'function maxArea(height) {\n  // Your code here\n}',
        solutionCode: 'function maxArea(height) {\n  let maxArea = 0, left = 0, right = height.length - 1;\n  while (left < right) {\n    maxArea = Math.max(maxArea, Math.min(height[left], height[right]) * (right - left));\n    if (height[left] < height[right]) left++;\n    else right--;\n  }\n  return maxArea;\n}',
        testCases: [
            { input: '[1,8,6,2,5,4,8,3,7]', expectedOutput: '49', description: 'Wide container' },
            { input: '[1,1]', expectedOutput: '1', description: 'Minimum lines' }
        ],
        points: 25
    },
    {
        title: 'Merging Intervals',
        description: '# Merge Intervals\n\nGiven an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.\n\n## Example\n```javascript\nmerge([[1,3],[2,6],[8,10],[15,18]])\n// Returns: [[1,6],[8,10],[15,18]]\n```',
        difficulty: 'medium',
        category: 'javascript',
        starterCode: 'function merge(intervals) {\n  // Your code here\n}',
        solutionCode: 'function merge(intervals) {\n  if (!intervals.length) return [];\n  intervals.sort((a,b) => a[0] - b[0]);\n  const res = [intervals[0]];\n  for (let i = 1; i < intervals.length; i++) {\n    let current = intervals[i];\n    let lastMerged = res[res.length - 1];\n    if (current[0] <= lastMerged[1]) {\n      lastMerged[1] = Math.max(lastMerged[1], current[1]);\n    } else {\n      res.push(current);\n    }\n  }\n  return res;\n}',
        testCases: [
            { input: '[[1,3],[2,6],[8,10],[15,18]]', expectedOutput: '[[1,6],[8,10],[15,18]]', description: 'Multiple merges' },
            { input: '[[1,4],[4,5]]', expectedOutput: '[[1,5]]', description: 'Touching intervals' }
        ],
        points: 25
    },
    {
        title: 'Trapping Rain Water',
        description: '# Trapping Rain Water\n\nGiven `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.\n\n## Example\n```javascript\ntrap([0,1,0,2,1,0,1,3,2,1,2,1])\n// Returns: 6\n```',
        difficulty: 'hard',
        category: 'javascript',
        starterCode: 'function trap(height) {\n  // Your code here\n}',
        solutionCode: 'function trap(height) {\n  if (!height || height.length === 0) return 0;\n  let left = 0, right = height.length - 1;\n  let leftMax = 0, rightMax = 0, res = 0;\n  while (left < right) {\n    if (height[left] < height[right]) {\n      if (height[left] >= leftMax) leftMax = height[left];\n      else res += leftMax - height[left];\n      left++;\n    } else {\n      if (height[right] >= rightMax) rightMax = height[right];\n      else res += rightMax - height[right];\n      right--;\n    }\n  }\n  return res;\n}',
        testCases: [
            { input: '[0,1,0,2,1,0,1,3,2,1,2,1]', expectedOutput: '6', description: 'Complex topology' },
            { input: '[4,2,0,3,2,5]', expectedOutput: '9', description: 'Bowl shape' }
        ],
        points: 40
    },
    {
        title: 'Course Schedule',
        description: '# Course Schedule\n\nThere are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a_i, b_i]` indicates that you must take course `b_i` first if you want to take course `a_i`.\n\nReturn `true` if you can finish all courses. Otherwise, return `false`.\n\n## Example\n```javascript\ncanFinish(2, [[1,0]])\n// Returns: true\n```',
        difficulty: 'hard',
        category: 'javascript',
        starterCode: 'function canFinish(numCourses, prerequisites) {\n  // Your code here\n}',
        solutionCode: 'function canFinish(numCourses, prerequisites) {\n  const adj = Array.from({length: numCourses}, () => []);\n  const inDegree = new Array(numCourses).fill(0);\n  for (let [course, pre] of prerequisites) {\n    adj[pre].push(course);\n    inDegree[course]++;\n  }\n  const q = [];\n  for (let i = 0; i < numCourses; i++) {\n    if (inDegree[i] === 0) q.push(i);\n  }\n  let completed = 0;\n  while (q.length) {\n    const node = q.shift();\n    completed++;\n    for (let neighbor of adj[node]) {\n      inDegree[neighbor]--;\n      if (inDegree[neighbor] === 0) q.push(neighbor);\n    }\n  }\n  return completed === numCourses;\n}',
        testCases: [
            { input: '2, [[1,0]]', expectedOutput: 'true', description: 'Possible' },
            { input: '2, [[1,0],[0,1]]', expectedOutput: 'false', description: 'Cycle' }
        ],
        points: 40
    },
    {
        title: 'Top K Frequent Elements',
        description: '# Top K Frequent Elements\n\nGiven an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.\n\n## Example\n```javascript\ntopKFrequent([1,1,1,2,2,3], 2)\n// Returns: [1,2]\n```',
        difficulty: 'medium',
        category: 'javascript',
        starterCode: 'function topKFrequent(nums, k) {\n  // Your code here\n}',
        solutionCode: 'function topKFrequent(nums, k) {\n  const map = new Map();\n  for (let num of nums) {\n    map.set(num, (map.get(num) || 0) + 1);\n  }\n  const freq = Array.from({length: nums.length + 1}, () => []);\n  for (let [num, count] of map.entries()) {\n    freq[count].push(num);\n  }\n  const res = [];\n  for (let i = freq.length - 1; i >= 0 && res.length < k; i--) {\n    res.push(...freq[i]);\n  }\n  return res.slice(0, k);\n}',
        testCases: [
            { input: '[1,1,1,2,2,3], 2', expectedOutput: '[1,2]', description: 'Basic array' },
            { input: '[1], 1', expectedOutput: '[1]', description: 'Single element' }
        ],
        points: 30
    },
    {
        title: 'Clone Graph',
        description: '# Clone Graph\n\nGiven a reference of a node in a connected undirected graph.\n\nReturn a deep copy (clone) of the graph. Note: A Node exists as `{ val: number, neighbors: Node[] }`.\n\n## Example\n**(Input represents an adjacency list)**\n```javascript\ncloneGraph(node)\n```',
        difficulty: 'medium',
        category: 'javascript',
        starterCode: 'function cloneGraph(node) {\n  // Your code here\n}',
        solutionCode: 'function cloneGraph(node) {\n  if (!node) return null;\n  const map = new Map();\n  function clone(n) {\n    if (map.has(n)) return map.get(n);\n    const copy = { val: n.val, neighbors: [] };\n    map.set(n, copy);\n    for (let neighbor of (n.neighbors || [])) {\n      copy.neighbors.push(clone(neighbor));\n    }\n    return copy;\n  }\n  return clone(node);\n}',
        testCases: [
            { input: '{val: 1, neighbors: []}', expectedOutput: '{val: 1, neighbors: []}', description: 'Single node' }
        ],
        points: 30
    },
    {
        title: 'Word Search',
        description: '# Word Search\n\nGiven an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring.\n\n## Example\n```javascript\nexist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED")\n// Returns: true\n```',
        difficulty: 'medium',
        category: 'javascript',
        starterCode: 'function exist(board, word) {\n  // Your code here\n}',
        solutionCode: 'function exist(board, word) {\n  const rows = board.length, cols = board[0].length;\n  function dfs(r, c, i) {\n    if (i === word.length) return true;\n    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== word[i]) return false;\n    \n    const temp = board[r][c];\n    board[r][c] = "#";\n    const res = dfs(r+1,c,i+1) || dfs(r-1,c,i+1) || dfs(r,c+1,i+1) || dfs(r,c-1,i+1);\n    board[r][c] = temp;\n    return res;\n  }\n  for (let r = 0; r < rows; r++) {\n    for (let c = 0; c < cols; c++) {\n      if (dfs(r, c, 0)) return true;\n    }\n  }\n  return false;\n}',
        testCases: [
            { input: '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED"', expectedOutput: 'true', description: 'Found word' },
            { input: '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCB"', expectedOutput: 'false', description: 'Missing' }
        ],
        points: 30
    },
    {
        title: 'Search in Rotated Sorted Array',
        description: '# Search in Rotated Sorted Array\n\nThere is an integer array `nums` sorted in ascending order (with distinct values). It is rotated at an unknown pivot index. Given the array `nums` after the rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.\n\nYou must write an algorithm with `O(log n)` runtime complexity.\n\n## Example\n```javascript\nsearch([4,5,6,7,0,1,2], 0)\n// Returns: 4\n```',
        difficulty: 'medium',
        category: 'javascript',
        starterCode: 'function search(nums, target) {\n  // Your code here\n}',
        solutionCode: 'function search(nums, target) {\n  let l = 0, r = nums.length - 1;\n  while (l <= r) {\n    let mid = Math.floor((l + r) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[l] <= nums[mid]) {\n      if (target > nums[mid] || target < nums[l]) l = mid + 1;\n      else r = mid - 1;\n    } else {\n      if (target < nums[mid] || target > nums[r]) r = mid - 1;\n      else l = mid + 1;\n    }\n  }\n  return -1;\n}',
        testCases: [
            { input: '[4,5,6,7,0,1,2], 0', expectedOutput: '4', description: 'Found in right half' },
            { input: '[4,5,6,7,0,1,2], 3', expectedOutput: '-1', description: 'Not present' }
        ],
        points: 30
    },
    {
        title: 'Number of Islands',
        description: '# Number of Islands\n\nGiven an `m x n` 2D binary grid `grid` which represents a map of `\'1\'`s (land) and `\'0\'`s (water), return the number of islands.\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.\n\n## Example\n```javascript\nnumIslands([["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]])\n// Returns: 3\n```',
        difficulty: 'medium',
        category: 'javascript',
        starterCode: 'function numIslands(grid) {\n  // Your code here\n}',
        solutionCode: 'function numIslands(grid) {\n  let count = 0;\n  for (let i = 0; i < grid.length; i++) {\n    for (let j = 0; j < grid[0].length; j++) {\n      if (grid[i][j] === "1") {\n        count++;\n        dfs(grid, i, j);\n      }\n    }\n  }\n  return count;\n  function dfs(grid, r, c) {\n    if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] === "0") return;\n    grid[r][c] = "0";\n    dfs(grid, r+1, c); dfs(grid, r-1, c); dfs(grid, r, c+1); dfs(grid, r, c-1);\n  }\n}',
        testCases: [
            { input: '[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', expectedOutput: '3', description: '3 islands' }
        ],
        points: 35
    },
    {
        title: 'Spiral Matrix',
        description: '# Spiral Matrix\n\nGiven an `m x n` `matrix`, return all elements of the `matrix` in spiral order.\n\n## Example\n```javascript\nspiralOrder([[1,2,3],[4,5,6],[7,8,9]])\n// Returns: [1,2,3,6,9,8,7,4,5]\n```',
        difficulty: 'medium',
        category: 'javascript',
        starterCode: 'function spiralOrder(matrix) {\n  // Your code here\n}',
        solutionCode: 'function spiralOrder(matrix) {\n  const res = [];\n  let left = 0, right = matrix[0].length - 1;\n  let top = 0, bottom = matrix.length - 1;\n  while (left <= right && top <= bottom) {\n    for (let i = left; i <= right; i++) res.push(matrix[top][i]);\n    top++;\n    for (let i = top; i <= bottom; i++) res.push(matrix[i][right]);\n    right--;\n    if (top <= bottom) {\n      for (let i = right; i >= left; i--) res.push(matrix[bottom][i]);\n      bottom--;\n    }\n    if (left <= right) {\n      for (let i = bottom; i >= top; i--) res.push(matrix[i][left]);\n      left++;\n    }\n  }\n  return res;\n}',
        testCases: [
            { input: '[[1,2,3],[4,5,6],[7,8,9]]', expectedOutput: '[1,2,3,6,9,8,7,4,5]', description: '3x3 matrix' },
            { input: '[[1,2,3,4],[5,6,7,8],[9,10,11,12]]', expectedOutput: '[1,2,3,4,8,12,11,10,9,5,6,7]', description: '3x4 matrix' }
        ],
        points: 30
    },
    {
        title: 'Jump Game',
        description: '# Jump Game\n\nYou are given an integer array `nums`. You are initially positioned at the array\'s first index, and each element in the array represents your maximum jump length at that position.\n\nReturn `true` if you can reach the last index, or `false` otherwise.\n\n## Example\n```javascript\ncanJump([2,3,1,1,4])\n// Returns: true\n```',
        difficulty: 'medium',
        category: 'javascript',
        starterCode: 'function canJump(nums) {\n  // Your code here\n}',
        solutionCode: 'function canJump(nums) {\n  let reachable = 0;\n  for (let i = 0; i < nums.length; i++) {\n    if (i > reachable) return false;\n    reachable = Math.max(reachable, i + nums[i]);\n    if (reachable >= nums.length - 1) return true;\n  }\n  return false;\n}',
        testCases: [
            { input: '[2,3,1,1,4]', expectedOutput: 'true', description: 'Can jump to end' },
            { input: '[3,2,1,0,4]', expectedOutput: 'false', description: 'Stuck at zero' }
        ],
        points: 25
    },
    {
        title: 'LRU Cache',
        description: '# LRU Cache\n\nDesign a data structure that follows the constraints of a Least Recently Used (LRU) cache.\nImplement `LRUCache(capacity)`, `get(key)`, and `put(key, value)`.\n\n## Structure\nReturn an object/class.\n\n```javascript\nconst lRUCache = new LRUCache(2);\nlRUCache.put(1, 1); // cache is {1=1}\n```',
        difficulty: 'hard',
        category: 'javascript',
        starterCode: 'class LRUCache {\n  constructor(capacity) {\n    // Code\n  }\n  get(key) {\n    // Code\n  }\n  put(key, value) {\n    // Code\n  }\n}',
        solutionCode: 'class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.map = new Map();\n  }\n  get(key) {\n    if (!this.map.has(key)) return -1;\n    const val = this.map.get(key);\n    this.map.delete(key);\n    this.map.set(key, val);\n    return val;\n  }\n  put(key, value) {\n    if (this.map.has(key)) this.map.delete(key);\n    this.map.set(key, value);\n    if (this.map.size > this.capacity) {\n      const firstKey = this.map.keys().next().value;\n      this.map.delete(firstKey);\n    }\n  }\n}',
        testCases: [
            { input: '2', expectedOutput: 'LRUCache instantiated', description: 'Constructor' }
        ],
        points: 40
    }
];
