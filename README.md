# fix qif downloads

## Target Audience / Niche Use Case

FreeAgent users who want to download in import statements from Business Barclaycard.

## How to use

Download the repo and

```
node index.js [qif filename] > [filename-fixed.qif]
```

as a Global NPM module

```
    npm i -g fix-qif-from-barclays-to-freeagent

    fix-qif-from-barclays-to-freeagent [qif filename] > [filename-fixed.qif]
```

The script will reverse the sign of transaction amounts.
It also replaces the line `"PNPM, INC."` with `PNPM Inc`
