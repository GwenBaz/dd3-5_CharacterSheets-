import { invoke } from "@tauri-apps/api/core"

export function obj2str(obj: any, visited = new Set<any>()): string {
  if (visited.has(obj)) return "[Circular]"

  const type = typeof obj
  if (type === 'string') return `"${obj}"`
  if (type === 'number' || type === 'boolean') return String(obj)
  if (obj === null) return 'null'
  if (obj === undefined) return 'undefined'

  visited.add(obj)

  let str = ''
  const isArray = Array.isArray(obj)
  str += isArray ? '[\n' : '{\n'

  if (isArray) {
    for (let i = 0; i < obj.length; i++) {
      str += '  ' + obj2str(obj[i], visited) + ',\n'
    }
  } else {
    for (const field in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, field)) {
        str += '  ' + field + ' : ' + obj2str(obj[field], visited) + ',\n'
      }
    }
  }

  str += isArray ? ']' : '}'
  return str
}

export function log(message: any): void {
  if (typeof message === 'object') {
    invoke('log', { message: obj2str(message) })
  } else {
    invoke('log', { message: String(message) })
  }
}
