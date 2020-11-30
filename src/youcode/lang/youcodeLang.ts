
const hashes = ['# ', ' #'];
const slashes = ['/* ', ' */'];
const semicolons = [';; ', ' ;;'];
const parens = ['(* ', ' *)'];
const dashes = ['-- ', ' --'];
const chevrons = ['<!--', ' -->'];
const percents = ['%% ', ' %%'];
//  all the supported languages
export const youcodeLanguage: { [lang: string]: string[] | undefined } = {
  'php': hashes,
  'html': chevrons,
  'css': slashes,
  'scss': slashes,
  'javascript': slashes,
  'javascriptreact': slashes,
  'typescript': slashes,
  'typescriptreact': slashes,
  'sql': hashes,
  'python': hashes,
  'c': slashes,
  'java': slashes,
  'latex': percents,
  'asm': hashes,
  'coffeescript': hashes,
  'cpp': slashes,
  'csharp' : slashes,
  'dockerfile': hashes,
  'fsharp': parens,
  'go': slashes,
  'groovy': slashes,
  'haskell': dashes,
  'ini': semicolons,
  'jade': slashes,
  'less': slashes,
  'lua': dashes,
  'makefile': hashes,
  'objective-c': slashes,
  'ocaml': parens,
  'perl': hashes,
  'perl6': hashes,
  'plaintext': hashes,
  'powershell': hashes,
  'r': hashes,
  'ruby': hashes,
  'rust': slashes,
  'shellscript': hashes,
  'swift': slashes,
  'xsl': slashes,
  'yaml': hashes,
};