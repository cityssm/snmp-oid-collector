import cityssmConfig, {
  defineConfig
} from 'eslint-config-cityssm/eslint.packageConfig.js'
import { cspellWords } from 'eslint-config-cityssm/exports.js'

export const config = defineConfig(...cityssmConfig, {
  rules: {
    '@cspell/spellchecker': [
      'warn',
      {
        cspell: {
          words: [...cspellWords, 'oids', 'snmp', 'varbind', 'varbinds']
        }
      }
    ]
  }
})

export default config
