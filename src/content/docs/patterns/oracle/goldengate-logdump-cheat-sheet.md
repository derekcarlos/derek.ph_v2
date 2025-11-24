---
title: GoldenGate LogDump Cheat Sheet
description: Quick reference guide for using Oracle GoldenGate LogDump utility to analyze trail files
---

Reviewing trail files

```
ghdr on
fileheader detail
detail on
detail data
```

Filtering and Counting

```
FILTER FILENAME PDB.SCHEMA.TABLENAME
COUNT
FILTER
FILTER OFF
```

