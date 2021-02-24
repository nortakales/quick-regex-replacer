# Quick Regex Replacer

This is a VSCode extension that allows you to bind your most frequently used find/replace operations to keybindings/command palette for quick access.

## Features

Configure frequently used find/replace regexs that you can bind to keystrokes or invoke via command palette for quick access. For example, if your log files contain stack traces on a single line where newlines are delimited by |, you could set a regex to replace | with newline to format the stack trace for readability. This is the default "Alpha" regex/replacement set in the configuration as an example.

## Extension Settings

This extension uses pairs of settings for each regex/replacement that you can configure.

* `quickRegexReplacer.alpha.regex`: All matches for this regex will be replaced with the text you set in `quickRegexReplacer.alpha.replacement`
* `quickRegexReplacer.alpha.replacement`: This text will replace all matches of `quickRegexReplacer.alpha.regex`

Notice the use of `alpha` in those settings. This extension allows up to 5 regex/replacement configurations denoted as:

1. `alpha`
1. `beta`
1. `gamma`
1. `delta`
1. `epsilon`

Each of the above find/replace configurations are triggered through the equivalent command: `quickRegexReplacer.replace.alpha` and so on.

Default keymappings are `Ctrl+R` then `1` through `5`

## Known Issues

None yet

## Release Notes

### [1.0.0] - 2021/2/22

- Initial release
- Ability to set up to 5 regex quick replaces
- Replace will take place within a selection only if one exists
- Hot keys are `Ctrl+R` then `1` through `5`

### [1.0.1] - 2021/2/23

- Updated README
- Updated property description