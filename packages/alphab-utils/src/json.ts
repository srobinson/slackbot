// tslint:disable:no-any
export const jsonifyError = (value: any) => {
  try {
    if (typeof value === "object") {
      return destroyCircular(value, [])
    }
    if (typeof value === "function") {
      // JSON.stringify discards functions. We do too, unless a function is thrown directly.
      return `[Function: ${value.name || "anonymous"}]`
    }
  } catch (e) {
    console.log(e)
  }

  return value
}

const destroyCircular = (from: any, seen: any[]) => {
  const to = Array.isArray(from) ? [] : {}

  seen.push(from)

  for (const key of Object.keys(from)) {
    const value = from[key]

    if (typeof value === "function") {
      continue
    }

    if (!value || typeof value !== "object") {
      to[key] = value
      continue
    }

    if (!seen.includes(from[key])) {
      to[key] = destroyCircular(from[key], seen.slice())
      continue
    }

    to[key] = "[Circular]"
  }

  const commonProperties = ["name", "message", "stack", "code"]

  for (const property of commonProperties) {
    if (typeof from[property] === "string") {
      to[property] = from[property]
    }
  }

  return to
}
