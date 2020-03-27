import { join } from "path"
import { readdir, stat } from "fs-extra"

export interface LsOptions {
  dirs: string[]
  files: string[]
}

export class Ls {
  async run(
    dir: string,
    deep?: boolean
  ): Promise<LsOptions> {
    if (deep) {
      return await this.deepLs(dir)
    } else {
      return await this.ls(dir)
    }
  }

  async deepLs(
    dir: string,
    options: LsOptions = { dirs: [], files: [] }
  ): Promise<LsOptions> {
    const { dirs, files } = await this.ls(dir)

    options.files = options.files.concat(files)

    await Promise.all(
      dirs.map(async (path) => {
        await this.deepLs(path, options)
      })
    )

    return options
  }

  async ls(dir: string): Promise<LsOptions> {
    const names = await readdir(dir)

    const dirs = []
    const files = []

    await Promise.all(
      names.map(async (name: string) => {
        const isDir = (
          await stat(join(dir, name))
        ).isDirectory()

        if (name[0] === "." || name === "node_modules") {
          // do nothing
        } else if (isDir) {
          dirs.push(join(dir, name))
        } else {
          files.push(join(dir, name))
        }
      })
    )

    return { dirs, files }
  }
}

export default new Ls()
