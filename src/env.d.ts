/// <reference types="vite/client" />
/// <reference types="react" />

declare module '*.json' {
  const value: any
  export default value
}

// JSX namespace comes from @types/react; no manual declaration needed here.
