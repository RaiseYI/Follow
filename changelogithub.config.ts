export default {
  tagFilter: (tag: string) => tag.startsWith("v") && !tag.includes("nightly"),
  dry: true,
}