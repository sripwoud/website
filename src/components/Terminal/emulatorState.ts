// @ts-ignore
import * as Terminal from 'javascript-terminal'

import { FILE_SYSTEM } from './constants'
import { links } from './links'

const customFileSystem = Terminal.FileSystem.create(FILE_SYSTEM)

// @ts-ignore
const customCommandMapping = Terminal.CommandMapping.create({
  ...Terminal.defaultCommandMapping,
  '?': {
    function: () => {
      return {
        output: Terminal.OutputFactory.makeTextOutput(
          [
            'cat <file>:  print content',
            'cd <folder>: change directory',
            'cd ..:       go back to parent directory',
            'clear:       clear terminal',
            'open <portfolio-item>: open in new tab a portfolio item',
            'ls <folder>: list content',
          ].join('\n'),
        ),
      }
    },
    optDef: {},
  },
  open: {
    // @ts-ignore
    function: (_, opts) => {
      if (opts.length !== 1) {
        return {
          output: Terminal.OutputFactory.makeTextOutput(
            `Expecting 1 argument. ${opts.length} passed.`,
          ),
        }
      }

      let tab = ''
      if (opts[0] in links) {
        // @ts-ignore
        tab = links[opts[0]]
      } else if (!opts[0].startsWith('http')) {
        return {
          output: Terminal.OutputFactory.makeTextOutput(
            `'${opts[0]}' is not a link`,
          ),
        }
      } else {
        tab = opts[0]
      }

      window.open(tab, '_blank')
      return { output: Terminal.OutputFactory.makeTextOutput('') }
    },
    optDef: {},
  },
})

const emulatorState = Terminal.EmulatorState.create({
  fs: customFileSystem,
  commandMapping: customCommandMapping,
})

export { emulatorState }
