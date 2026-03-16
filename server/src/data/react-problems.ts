export const reactProblems = [
    {
        title: 'Theme Toggler Component',
        description: '# Theme Toggler\n\nCreate a React component that toggles between light and dark modes.\n\n## Requirements\n- The component should be a button.\n- Clicking the button toggles the `dark` class on the `<html>` element.\n- The button text should change between "Dark Mode" and "Light Mode" based on the current state.',
        difficulty: 'easy',
        category: 'react',
        starterCode: 'import { useState } from "react";\n\nexport function ThemeToggler() {\n  return <button>Toggle Theme</button>;\n}',
        solutionCode: 'import { useState, useEffect } from "react";\n\nexport function ThemeToggler() {\n  const [isDark, setIsDark] = useState(false);\n  useEffect(() => {\n    if (isDark) document.documentElement.classList.add("dark");\n    else document.documentElement.classList.remove("dark");\n  }, [isDark]);\n  return <button onClick={() => setIsDark(!isDark)}>{isDark ? "Light Mode" : "Dark Mode"}</button>;\n}',
        testCases: [
            { input: 'Initial Class', expectedOutput: 'no dark class', description: 'Starts light mode' },
            { input: 'Click Toggle', expectedOutput: 'dark class added', description: 'Toggles to dark' },
            { input: 'Click Again', expectedOutput: 'dark class removed', description: 'Toggles back to light' }
        ],
        points: 10
    },
    {
        title: 'Form Validation Hook',
        description: '# Form Validation Hook\n\nImplement a custom hook `useForm` that handles standard form state and validation.\n\n## Requirements\n- Accepts `initialValues` and a `validate` function.\n- Returns `{ values, errors, handleChange, handleSubmit }`.\n- `handleSubmit` should only call the passed callback if `errors` is empty.',
        difficulty: 'medium',
        category: 'react',
        starterCode: 'import { useState } from "react";\n\nexport function useForm(initialValues, validate) {\n  // Implement hook logic here\n}',
        solutionCode: 'import { useState } from "react";\n\nexport function useForm(initialValues, validate) {\n  const [values, setValues] = useState(initialValues);\n  const [errors, setErrors] = useState({});\n\n  const handleChange = (e) => {\n    const { name, value } = e.target;\n    setValues({ ...values, [name]: value });\n  };\n\n  const handleSubmit = (callback) => (e) => {\n    e.preventDefault();\n    const validationErrors = validate(values);\n    setErrors(validationErrors);\n    if (Object.keys(validationErrors).length === 0) callback();\n  };\n\n  return { values, errors, handleChange, handleSubmit };\n}',
        testCases: [
            { input: 'Valid submission', expectedOutput: 'Callback fired', description: 'Fires when valid' },
            { input: 'Invalid submission', expectedOutput: 'Errors state populated', description: 'Fails validation' }
        ],
        points: 20
    },
    {
        title: 'Debounced Search Bar',
        description: '# Debounced Search Bar\n\nCreate a search input component that only triggers the `onSearch` callback 500ms after the user stops typing.\n\n## Requirements\n- Must use `useEffect` and `setTimeout`.\n- Must cleanup the timeout on unmount or subsequent keystrokes.',
        difficulty: 'medium',
        category: 'react',
        starterCode: 'import { useState, useEffect } from "react";\n\nexport function SearchBar({ onSearch }) {\n  const [query, setQuery] = useState("");\n  return <input value={query} onChange={e => setQuery(e.target.value)} />;\n}',
        solutionCode: 'import { useState, useEffect } from "react";\n\nexport function SearchBar({ onSearch }) {\n  const [query, setQuery] = useState("");\n  useEffect(() => {\n    const timer = setTimeout(() => onSearch(query), 500);\n    return () => clearTimeout(timer);\n  }, [query, onSearch]);\n  return <input value={query} onChange={e => setQuery(e.target.value)} />;\n}',
        testCases: [
            { input: 'Fast typing (3x/300ms)', expectedOutput: 'onSearch called once', description: 'Correctly debounces' }
        ],
        points: 25
    },
    {
        title: 'Paginated Data Table',
        description: '# Paginated Data Table\n\nBuild a table component that displays a list of users, 5 per page.\n\n## Requirements\n- Provide a `Next` and `Previous` button.\n- Disable `Previous` on page 1.\n- Disable `Next` on the last page.',
        difficulty: 'medium',
        category: 'react',
        starterCode: 'import { useState } from "react";\n\nexport function DataTable({ data }) {\n  // Implement pagination logic here\n  return <div>Table</div>;\n}',
        solutionCode: 'import { useState } from "react";\n\nexport function DataTable({ data }) {\n  const [page, setPage] = useState(1);\n  const ITEMS_PER_PAGE = 5;\n  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);\n  \n  const currentData = data.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);\n  \n  return (\n    <div>\n      {currentData.map(item => <div key={item.id}>{item.name}</div>)}\n      <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>\n      <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>\n    </div>\n  );\n}',
        testCases: [
            { input: 'Data length 12', expectedOutput: '3 pages calculated', description: 'Page count logic' },
            { input: 'Page 1', expectedOutput: 'Prev disabled', description: 'Boundary conditions' }
        ],
        points: 25
    },
    {
        title: 'React Context Authentication',
        description: '# Auth Context Provider\n\nCreate an `AuthProvider` component using React Context that manages the user login state.',
        difficulty: 'medium',
        category: 'react',
        starterCode: 'import { createContext, useState, useContext } from "react";\n// Create context and provider here',
        solutionCode: 'import { createContext, useState, useContext } from "react";\n\nconst AuthContext = createContext(null);\n\nexport function AuthProvider({ children }) {\n  const [user, setUser] = useState(null);\n  const login = (userData) => setUser(userData);\n  const logout = () => setUser(null);\n  \n  return (\n    <AuthContext.Provider value={{ user, login, logout }}>\n      {children}\n    </AuthContext.Provider>\n  );\n}\n\nexport const useAuth = () => useContext(AuthContext);',
        testCases: [
            { input: 'login({name: "Tester"})', expectedOutput: 'user state updated', description: 'Login function' },
            { input: 'logout()', expectedOutput: 'user state reset to null', description: 'Logout function' }
        ],
        points: 20
    },
    {
        title: 'Virtual List Component',
        description: '# Virtual List\n\nBuild a virtualized list component that efficiently renders only the visible items out of a list of 10,000 strings.\n\n## Requirements\n- Accepts `items`, `itemHeight`, and `windowHeight` props.\n- Uses scroll position to calculate start/end indexes.',
        difficulty: 'hard',
        category: 'react',
        starterCode: 'import { useState, useRef } from "react";\n\nexport function VirtualList({ items, itemHeight, windowHeight }) {\n  // Implementation\n}',
        solutionCode: 'import { useState, useRef, useLayoutEffect } from "react";\n\nexport function VirtualList({ items, itemHeight, windowHeight }) {\n  const [scrollTop, setScrollTop] = useState(0);\n  const containerRef = useRef(null);\n  \n  const totalHeight = items.length * itemHeight;\n  const startIndex = Math.floor(scrollTop / itemHeight);\n  const endIndex = Math.min(items.length - 1, startIndex + Math.ceil(windowHeight / itemHeight));\n  \n  const visibleItems = items.slice(startIndex, endIndex + 1);\n  const offsetY = startIndex * itemHeight;\n  \n  return (\n    <div \n      ref={containerRef} \n      onScroll={(e) => setScrollTop(e.target.scrollTop)} \n      style={{ height: windowHeight, overflowY: "auto" }}\n    >\n      <div style={{ height: totalHeight, position: "relative" }}>\n        <div style={{ transform: `translateY(${offsetY}px)`, position: "absolute", top: 0, left: 0, right: 0 }}>\n          {visibleItems.map((item, index) => (\n            <div key={startIndex + index} style={{ height: itemHeight }}>{item}</div>\n          ))}\n        </div>\n      </div>\n    </div>\n  );\n}',
        testCases: [
            { input: 'Scroll to 500px, 10px items', expectedOutput: 'Start index = 50', description: 'Correct visible items slice' }
        ],
        points: 50
    },
    {
        title: 'Custom LocalStorage Hook',
        description: '# useLocalStorage Hook\n\nCreate a custom hook `useLocalStorage` that syncs state to browser localStorage.\n\n## Requirements\n- Takes a `key` and an `initialValue`.\n- Returns identical signature to `useState`: `[value, setValue]`.',
        difficulty: 'medium',
        category: 'react',
        starterCode: 'import { useState } from "react";\n\nexport function useLocalStorage(key, initialValue) {\n  // Implement logic\n}',
        solutionCode: 'import { useState, useEffect } from "react";\n\nexport function useLocalStorage(key, initialValue) {\n  const [value, setValue] = useState(() => {\n    if (typeof window === "undefined") return initialValue;\n    try {\n      const item = window.localStorage.getItem(key);\n      return item ? JSON.parse(item) : initialValue;\n    } catch (error) {\n      return initialValue;\n    }\n  });\n\n  useEffect(() => {\n    try {\n      window.localStorage.setItem(key, JSON.stringify(value));\n    } catch (error) {\n      console.warn("Error setting localStorage", error);\n    }\n  }, [key, value]);\n\n  return [value, setValue];\n}',
        testCases: [
            { input: 'Hook init with key "user"', expectedOutput: 'Reads from localStorage', description: 'Initial state loads correctly' }
        ],
        points: 15
    },
    {
        title: 'Tabs Component',
        description: '# Tabs\n\nBuild a headless-style `Tabs` UI component using React Context to sync `activeTab` between `TabList` and `TabPanels`.',
        difficulty: 'medium',
        category: 'react',
        starterCode: 'import { createContext, useContext, useState } from "react";\n\nexport function Tabs({ children }) {}\nexport function Tab({ value, children }) {}\nexport function TabPanel({ value, children }) {}',
        solutionCode: 'import { createContext, useContext, useState } from "react";\n\nconst TabsContext = createContext();\n\nexport function Tabs({ initialValue, children }) {\n  const [activeTab, setActiveTab] = useState(initialValue);\n  return <TabsContext.Provider value={{ activeTab, setActiveTab }}>{children}</TabsContext.Provider>;\n}\n\nexport function Tab({ value, children }) {\n  const { activeTab, setActiveTab } = useContext(TabsContext);\n  return <button className={activeTab === value ? "active" : ""} onClick={() => setActiveTab(value)}>{children}</button>;\n}\n\nexport function TabPanel({ value, children }) {\n  const { activeTab } = useContext(TabsContext);\n  if (activeTab !== value) return null;\n  return <div>{children}</div>;\n}',
        testCases: [
            { input: 'Click Tab B', expectedOutput: 'TabPanel B shown, TabPanel A hidden', description: 'Content switches correctly' }
        ],
        points: 25
    },
    {
        title: 'Countdown Timer',
        description: '# Countdown Timer\n\nCreate a component that accepts `initialSeconds` and counts down to zero. Display minutes and seconds (e.g. `01:30`).',
        difficulty: 'easy',
        category: 'react',
        starterCode: 'export function Timer({ initialSeconds }) {\n  // Implementation\n}',
        solutionCode: 'import { useState, useEffect } from "react";\n\nexport function Timer({ initialSeconds }) {\n  const [timeLeft, setTimeLeft] = useState(initialSeconds);\n  useEffect(() => {\n    if (timeLeft <= 0) return;\n    const timer = setInterval(() => {\n      setTimeLeft(t => t - 1);\n    }, 1000);\n    return () => clearInterval(timer);\n  }, [timeLeft]);\n\n  const mins = Math.floor(timeLeft / 60).toString().padStart(2, "0");\n  const secs = (timeLeft % 60).toString().padStart(2, "0");\n  return <span>{mins}:{secs}</span>;\n}',
        testCases: [
            { input: 'initialSeconds 90', expectedOutput: '01:30 initially', description: 'Formatting correctness' },
            { input: 'Wait 1s', expectedOutput: '01:29', description: 'Interval works' }
        ],
        points: 15
    },
    {
        title: 'Accordion Menus',
        description: '# Accordion Menu\n\nBuild an accordion menu section. Only one section should be open at a time.',
        difficulty: 'easy',
        category: 'react',
        starterCode: 'export function Accordion({ items }) {\n  // Implementation\n}',
        solutionCode: 'import { useState } from "react";\n\nexport function Accordion({ items }) {\n  const [openIndex, setOpenIndex] = useState(null);\n  return (\n    <div className="accordion">\n      {items.map((item, i) => (\n        <div key={i}>\n          <button onClick={() => setOpenIndex(openIndex === i ? null : i)}>{item.title}</button>\n          {openIndex === i && <div className="content">{item.content}</div>}\n        </div>\n      ))}\n    </div>\n  );\n}',
        testCases: [
            { input: 'Click Item 1, Click Item 2', expectedOutput: 'Item 2 open, Item 1 closed', description: 'Exclusive expansion' }
        ],
        points: 15
    },
    {
        title: 'Modal Hook and Portal',
        description: '# Modal Portal\n\nCreate a React portal-based Modal component and a `useModal` hook.',
        difficulty: 'medium',
        category: 'react',
        starterCode: 'export function useModal() {}\nexport function Modal({ isOpen, onClose, children }) {}',
        solutionCode: 'import { useState } from "react";\nimport { createPortal } from "react-dom";\n\nexport function useModal() {\n  const [isOpen, setIsOpen] = useState(false);\n  const open = () => setIsOpen(true);\n  const close = () => setIsOpen(false);\n  return { isOpen, open, close };\n}\n\nexport function Modal({ isOpen, onClose, children }) {\n  if (!isOpen) return null;\n  return createPortal(\n    <div className="modal-overlay" onClick={onClose} style={{position:"fixed", inset:0}}>\n      <div className="modal-content" onClick={e => e.stopPropagation()}>\n        {children}\n        <button onClick={onClose}>Close</button>\n      </div>\n    </div>,\n    document.body\n  );\n}',
        testCases: [
            { input: 'Modal rendering when open', expectedOutput: 'Rendered outside standard DOM hierarchy via createPortal', description: 'Uses portals correctly' }
        ],
        points: 25
    },
    {
        title: 'Draggable List',
        description: '# Draggable List (Drag & Drop)\n\nBuild a reorderable list of items using standard HTML5 drag and drop events (`draggable`, `onDragStart`, `onDragOver`, `onDrop`).',
        difficulty: 'hard',
        category: 'react',
        starterCode: 'export function DraggableList({ initialItems }) {\n  // Implement logic\n}',
        solutionCode: 'import { useState, useRef } from "react";\n\nexport function DraggableList({ initialItems }) {\n  const [items, setItems] = useState(initialItems);\n  const dragItem = useRef();\n  const dragOverItem = useRef();\n\n  const dragStart = (e, position) => dragItem.current = position;\n  const dragEnter = (e, position) => dragOverItem.current = position;\n  const drop = (e) => {\n    const copyItems = [...items];\n    const dragItemContent = copyItems[dragItem.current];\n    copyItems.splice(dragItem.current, 1);\n    copyItems.splice(dragOverItem.current, 0, dragItemContent);\n    dragItem.current = null;\n    dragOverItem.current = null;\n    setItems(copyItems);\n  };\n\n  return (\n    <ul>\n      {items.map((item, index) => (\n        <li key={index} draggable\n            onDragStart={(e) => dragStart(e, index)}\n            onDragEnter={(e) => dragEnter(e, index)}\n            onDragEnd={drop}\n            onDragOver={(e) => e.preventDefault()}>\n          {item}\n        </li>\n      ))}\n    </ul>\n  );\n}',
        testCases: [
            { input: 'Drag item 1 to pos 3', expectedOutput: 'State array mutated to reflect new order correctly', description: 'Reordering logic' }
        ],
        points: 35
    },
    {
        title: 'Infinite Scroll Fetcher',
        description: '# Infinite Scroll Component\n\nCreate a wrapper component that uses the `IntersectionObserver` API to fetch more data when the user scrolls to the bottom of the list.',
        difficulty: 'hard',
        category: 'react',
        starterCode: 'export function InfiniteScroll({ fetchMore, hasMore, children }) {\n  // Implementation\n}',
        solutionCode: 'import { useEffect, useRef } from "react";\n\nexport function InfiniteScroll({ fetchMore, hasMore, children }) {\n  const observerTarget = useRef(null);\n\n  useEffect(() => {\n    const observer = new IntersectionObserver((entries) => {\n      if (entries[0].isIntersecting && hasMore) {\n        fetchMore();\n      }\n    }, { threshold: 1 });\n    \n    if (observerTarget.current) observer.observe(observerTarget.current);\n    return () => {\n      if (observerTarget.current) observer.unobserve(observerTarget.current);\n    };\n  }, [fetchTarget, hasMore]);\n\n  return (\n    <div>\n      {children}\n      {hasMore && <div ref={observerTarget} style={{ height: "20px" }}>Loading...</div>}\n    </div>\n  );\n}',
        testCases: [
            { input: 'Scroll reaching bottom div', expectedOutput: 'IntersectionObserver triggers fetchMore callback', description: 'Lazy load firing' }
        ],
        points: 30
    },
    {
        title: 'Star Rating Component',
        description: '# Star Rating\n\nBuild a Star Rating component that accepts `rating` and `maxStars`. Features hover states out of 5 stars.',
        difficulty: 'easy',
        category: 'react',
        starterCode: 'export function StarRating({ rating, maxStars = 5, onRate }) {\n // Implementation\n}',
        solutionCode: 'import { useState } from "react";\n\nexport function StarRating({ rating, maxStars = 5, onRate }) {\n  const [hoverRating, setHoverRating] = useState(0);\n  return (\n    <div className="star-rating">\n      {[...Array(maxStars)].map((_, i) => {\n        const val = i + 1;\n        return (\n          <span key={i}\n                style={{ cursor: "pointer", color: val <= (hoverRating || rating) ? "gold" : "gray" }}\n                onClick={() => onRate(val)}\n                onMouseEnter={() => setHoverRating(val)}\n                onMouseLeave={() => setHoverRating(0)}>\n            ★\n          </span>\n        )\n      })}\n    </div>\n  );\n}',
        testCases: [
            { input: 'Hovering 3rd star', expectedOutput: '3 stars highlight', description: 'Hover mechanics' }
        ],
        points: 15
    },
    {
        title: 'Tooltip Component',
        description: '# Tooltip\n\nCreate a `Tooltip` component that displays floating text anchored to a parent element only when hovered.',
        difficulty: 'medium',
        category: 'react',
        starterCode: 'export function Tooltip({ text, children }) {}',
        solutionCode: 'import { useState } from "react";\n\nexport function Tooltip({ text, children }) {\n  const [show, setShow] = useState(false);\n  return (\n    <div className="tooltip-container" \n         style={{position: "relative", display: "inline-block"}}\n         onMouseEnter={() => setShow(true)}\n         onMouseLeave={() => setShow(false)}>\n      {children}\n      {show && (\n        <div className="tooltip-box" style={{position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%)", background: "black", color: "white", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", whiteSpace: "nowrap"}}>\n          {text}\n        </div>\n      )}\n    </div>\n  );\n}',
        testCases: [
            { input: 'Mouse enter trigger', expectedOutput: 'Renders absolute positioned box above children', description: 'Hover mechanics structure' }
        ],
        points: 20
    },
    {
        title: 'Dark/Light Theme ProviderContext',
        description: '# Theme Context System\n\nBuild a full `ThemeProvider` using React context to provide `theme` and `setTheme` without prop drilling.',
        difficulty: 'medium',
        category: 'react',
        starterCode: 'export const ThemeContext = {}; // fixme\nexport function ThemeProvider({ children }) {}',
        solutionCode: 'import { createContext, useContext, useState, useEffect } from "react";\n\nconst ThemeContext = createContext();\n\nexport function ThemeProvider({ children }) {\n  const [theme, setTheme] = useState("light");\n  useEffect(() => {\n    document.body.className = theme;\n  }, [theme]);\n  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;\n}\n\nexport const useTheme = () => useContext(ThemeContext);',
        testCases: [
            { input: 'Context Initialization', expectedOutput: 'Default to light theme', description: 'Value spreading' }
        ],
        points: 15
    },
    {
        title: 'File Tree Component',
        description: '# Recursive File Tree\n\nCreate a React component that recursively renders a nested folder/file tree structure object.',
        difficulty: 'hard',
        category: 'react',
        starterCode: 'export function FileTree({ data }) {\n // Implement logic\n}',
        solutionCode: 'import { useState } from "react";\n\nfunction Node({ node }) {\n  const [isOpen, setIsOpen] = useState(false);\n  const isFolder = node.type === "folder";\n  return (\n    <div style={{ marginLeft: "10px" }}>\n      <div onClick={() => isFolder && setIsOpen(!isOpen)} style={{ cursor: isFolder ? "pointer" : "default" }}>\n        {isFolder ? (isOpen ? "📂" : "📁") : "📄"} {node.name}\n      </div>\n      {isFolder && isOpen && node.children.map((child, i) => <Node key={i} node={child} />)}\n    </div>\n  );\n}\n\nexport function FileTree({ data }) {\n  return <div><Node node={data} /></div>;\n}',
        testCases: [
            { input: 'Deeply nested node', expectedOutput: 'Recursively builds JSX layout matching structure', description: 'Recursive architecture' }
        ],
        points: 35
    },
    {
        title: 'Toast Notification System',
        description: '# Toast Notifications\n\nBuild a Toast manager. Allow firing `toast("Message")` from anywhere, and have a global overlay component that renders stacked toasts that auto-dismiss after 3 seconds.',
        difficulty: 'hard',
        category: 'react',
        starterCode: 'export function ToastProvider({ children }) {}',
        solutionCode: 'import { createContext, useContext, useState } from "react";\nimport { createPortal } from "react-dom";\n\nconst ToastContext = createContext();\n\nexport function ToastProvider({ children }) {\n  const [toasts, setToasts] = useState([]);\n  \n  const addToast = (message) => {\n    const id = Date.now();\n    setToasts(t => [...t, { id, message }]);\n    setTimeout(() => {\n      setToasts(t => t.filter(toast => toast.id !== id));\n    }, 3000);\n  };\n\n  return (\n    <ToastContext.Provider value={addToast}>\n      {children}\n      {createPortal(\n        <div style={{ position: "fixed", bottom: 20, right: 20, display: "flex", flexDirection: "column", gap: 8 }}>\n          {toasts.map(t => <div key={t.id} style={{ background: "black", color: "white", padding: 12, borderRadius: 4 }}>{t.message}</div>)}\n        </div>,\n        document.body\n      )}\n    </ToastContext.Provider>\n  );\n}\n\nexport const useToast = () => useContext(ToastContext);',
        testCases: [
            { input: 'Trigger 3 toasts rapidly', expectedOutput: 'Renders all 3 stacked', description: 'Stacking behavior' }
        ],
        points: 40
    },
    {
        title: 'Window Size Hook',
        description: '# useWindowSize Hook\n\nImplement `useWindowSize` to track the browser dimensions. Ensure it throttles the event listener to avoid crashing React on resize.',
        difficulty: 'medium',
        category: 'react',
        starterCode: 'export function useWindowSize() {}',
        solutionCode: 'import { useState, useEffect } from "react";\n\nexport function useWindowSize() {\n  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });\n  \n  useEffect(() => {\n    let timeoutId;\n    const handleResize = () => {\n      clearTimeout(timeoutId);\n      timeoutId = setTimeout(() => {\n        setSize({ width: window.innerWidth, height: window.innerHeight });\n      }, 100);\n    };\n    \n    window.addEventListener("resize", handleResize);\n    return () => {\n      window.removeEventListener("resize", handleResize);\n      clearTimeout(timeoutId);\n    };\n  }, []);\n  \n  return size;\n}',
        testCases: [
            { input: 'Resize event fired heavily', expectedOutput: 'Callback fires delayed / batched', description: 'Event debouncing constraint' }
        ],
        points: 20
    },
    {
        title: 'UsePrevious Hook',
        description: '# usePrevious Hook\n\nCreate a hook that stores and returns the previous value of a state or prop from the last render cycle.',
        difficulty: 'medium',
        category: 'react',
        starterCode: 'export function usePrevious(value) {}',
        solutionCode: 'import { useRef, useEffect } from "react";\n\nexport function usePrevious(value) {\n  const ref = useRef();\n  useEffect(() => {\n    ref.current = value;\n  }, [value]);\n  return ref.current;\n}',
        testCases: [
            { input: 'Render count++ -> 5', expectedOutput: 'Returns 4', description: 'Returns stale Ref tracking' }
        ],
        points: 15
    },
    {
        title: 'Image Carousel Slider',
        description: '# Image Carousel\n\nBuild an automated image carousel. It accepts an array of URLs and automatically slides to the next image every 3 seconds.',
        difficulty: 'medium',
        category: 'react',
        starterCode: 'export function Carousel({ images }) {}',
        solutionCode: 'import { useState, useEffect } from "react";\n\nexport function Carousel({ images }) {\n  const [currentIndex, setCurrentIndex] = useState(0);\n  \n  useEffect(() => {\n    if (images.length === 0) return;\n    const timer = setInterval(() => {\n      setCurrentIndex(prev => (prev + 1) % images.length);\n    }, 3000);\n    return () => clearInterval(timer);\n  }, [images.length]);\n\n  if (!images.length) return null;\n\n  return (\n    <div className="carousel" style={{position:"relative"}}>\n      <img src={images[currentIndex]} alt="Slide" style={{ width: "100%", display: "block" }} />\n      <button style={{position:"absolute", left:0, top:"50%"}} onClick={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)}>Prev</button>\n      <button style={{position:"absolute", right:0, top:"50%"}} onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}>Next</button>\n    </div>\n  );\n}',
        testCases: [
            { input: 'Timer waiting 3000ms', expectedOutput: 'Index Increments Modularly', description: 'Auto slide execution correctly.' }
        ],
        points: 25
    },
    {
        title: 'Multifield Password Setup',
        description: '# Password Setup Form\n\nBuild a password setup form with real-time strength validation requirements UI (Min 8 chars, 1 uppercase, 1 symbol).',
        difficulty: 'medium',
        category: 'react',
        starterCode: 'export function PasswordSetup() {}',
        solutionCode: 'import { useState } from "react";\n\nexport function PasswordSetup() {\n  const [pwd, setPwd] = useState("");\n  const hasLen = pwd.length >= 8;\n  const hasUpper = /[A-Z]/.test(pwd);\n  const hasSym = /[^A-Za-z0-9]/.test(pwd);\n\n  return (\n    <div>\n      <input type="password" value={pwd} onChange={e => setPwd(e.target.value)} />\n      <ul>\n        <li style={{ color: hasLen ? "green" : "red" }}>8 characters minimum</li>\n        <li style={{ color: hasUpper ? "green" : "red" }}>One uppercase letter</li>\n        <li style={{ color: hasSym ? "green" : "red" }}>One symbol</li>\n      </ul>\n    </div>\n  );\n}',
        testCases: [
            { input: 'Typing "Pass!"', expectedOutput: 'Upper and sym Green, len Red', description: 'Requirements regex logic tests' }
        ],
        points: 20
    },
    {
        title: 'Contextual Menu Dropdown',
        description: '# Dropdown Menu\n\nCreate a dropdown menu that opens on click. The crucial requirement: clicking anywhere outside the menu should close it.',
        difficulty: 'medium',
        category: 'react',
        starterCode: 'export function DropdownMenu() {}',
        solutionCode: 'import { useState, useRef, useEffect } from "react";\n\nexport function DropdownMenu() {\n  const [isOpen, setIsOpen] = useState(false);\n  const menuRef = useRef(null);\n  \n  useEffect(() => {\n    const handleClickOutside = (event) => {\n      if (menuRef.current && !menuRef.current.contains(event.target)) {\n        setIsOpen(false);\n      }\n    };\n    document.addEventListener("mousedown", handleClickOutside);\n    return () => document.removeEventListener("mousedown", handleClickOutside);\n  }, []);\n\n  return (\n    <div ref={menuRef} style={{ position: "relative" }}>\n      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>\n      {isOpen && (\n        <div style={{ position: "absolute", background: "white", border: "1px solid #ccc" }}>\n          <div>Profile</div>\n          <div>Settings</div>\n          <div>Logout</div>\n        </div>\n      )}\n    </div>\n  );\n}',
        testCases: [
            { input: 'MouseDown Document', expectedOutput: 'If outside trigger toggle off', description: 'Window Event Propagation' }
        ],
        points: 25
    },
    {
        title: 'Fetch Data on Prop Change',
        description: '# Profile Fetcher Component\n\nYou are given an ID prop. Fetch `api/user/${id}` when mounted, AND whenever the `id` prop updates.',
        difficulty: 'easy',
        category: 'react',
        starterCode: 'export function UserProfile({ id }) {}',
        solutionCode: 'import { useState, useEffect } from "react";\n\nexport function UserProfile({ id }) {\n  const [data, setData] = useState(null);\n  \n  useEffect(() => {\n    let ignore = false;\n    setData(null);\n    fetch(`/api/user/${id}`)\n      .then(res => res.json())\n      .then(result => {\n        if (!ignore) setData(result);\n      });\n    return () => { ignore = true; }\n  }, [id]);\n  \n  if (!data) return <div>Loading...</div>;\n  return <div>{data.name}</div>;\n}',
        testCases: [
            { input: 'Changing ID Prop trigger', expectedOutput: 'UseEffect dependence array fires correctly', description: 'React lifecycle understanding' }
        ],
        points: 15
    },
    {
        title: 'Shopping Cart Hook',
        description: '# useCart logic hook\n\nBuild a custom hook `useCart` representing e-commerce cart logic: `items`, `addItem()`, `removeItem()`, and `totalPrice` sum getter assuming item object shape `{id, price, quantity}`.',
        difficulty: 'medium',
        category: 'react',
        starterCode: 'export function useCart() {}',
        solutionCode: 'import { useState, useMemo } from "react";\n\nexport function useCart() {\n  const [items, setItems] = useState([]);\n  \n  const addItem = (product) => {\n    setItems(curr => {\n      const existing = curr.find(i => i.id === product.id);\n      if (existing) return curr.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);\n      return [...curr, { ...product, quantity: 1 }];\n    });\n  };\n  \n  const removeItem = (id) => {\n    setItems(curr => curr.filter(i => i.id !== id));\n  };\n  \n  const totalPrice = useMemo(() => {\n    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);\n  }, [items]);\n  \n  return { items, addItem, removeItem, totalPrice };\n}',
        testCases: [
            { input: 'Adding duplicate Item', expectedOutput: 'Appends quantity parameter instead of new array entry', description: 'Shopping business logic checks' }
        ],
        points: 25
    }
];
