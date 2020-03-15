import { join } from "path"

import expect from "./expect"
import ls from "../src/ls"

const root = join(__dirname, "../")

describe("ls", () => {
  it("runs", async () => {
    const { dirs, files } = await ls.run(root)
    expect(dirs).toContain(join(root, "test"))
    expect(files).toContain(join(root, "package.json"))
    expect(files).not.toContain(
      join(root, "test/ls.spec.ts")
    )
  })

  it("runs deep", async () => {
    const { files } = await ls.run(root, true)
    expect(files).toContain(join(root, "test/ls.spec.ts"))
  })
})
