import {
  ActionBoiler,
  PromptBoiler,
  BoilerAction,
  BoilerPrompt,
} from "boiler-dev"

export const install: ActionBoiler = async ({
  allAnswers,
}) => {
  const actions: BoilerAction[] = []

  actions.push({
    action: "npmInstall",
    dev: allAnswers.fsExtraDev,
    source: ["fs-extra", "@types/fs-extra"],
  })

  return actions
}

export const uninstall: ActionBoiler = async () => {
  const actions: BoilerAction[] = []

  // actions.push({
  //   action: "npmInstall",
  //   source: ["fs-extra", "@types/fs-extra"],
  //   uninstall: true,
  // })

  return actions
}

export const generate: ActionBoiler = async () => {
  const actions: BoilerAction[] = []

  actions.push({
    action: "write",
    path: "src/ls.ts",
    sourcePath: "tsignore/ls.ts",
  })

  actions.push({
    action: "write",
    path: "test/ls.spec.ts",
    sourcePath: "tsignore/ls.spec.ts",
  })

  return actions
}

export const absorb: ActionBoiler = async ({ writes }) => {
  return writes.map(({ path, sourcePath }) => ({
    action: "write",
    sourcePath: path,
    path: sourcePath,
    // modify: (src: string): string => src,
  }))
}
