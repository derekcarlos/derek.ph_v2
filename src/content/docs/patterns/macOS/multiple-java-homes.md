---
title: How to Handle Multiple Java Homes in macOS
---

I happen to have multiple Java Homes installed on my machine which I have installed over the years. I don't bother cleaning them up because I would end up re-installing them in the future in the event that I'll need them again.

But I have to figure out how to use them on my PATH variable. I tend to switch my brain to Linux mode, extract a JDK to a path somewhere, set it on the `PATH` variable and call it a day. But I end up with a cluttered disk with files everywhere. So now I trust the Oracle DMG to figure it out for me.

Now I know that if I run this command, it will show me all the installed Oracle JDK versions in my machine and where to find them:

```bash
/usr/libexec/java_home -V
Matching Java Virtual Machines (3):
    17.0.14 (arm64) "Oracle Corporation" - "Java SE 17.0.14" /Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home
    11.0.18 (arm64) "Oracle Corporation" - "Java SE 11.0.18" /Library/Java/JavaVirtualMachines/jdk-11.jdk/Contents/Home
    1.8.451.10 (x86_64) "Oracle Corporation" - "Java" /Library/Internet Plug-Ins/JavaAppletPlugin.plugin/Contents/Home
/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home
```

If I want to use Java 11, I would run:

```bash
/usr/libexec/java_home -v '11.0'
/Library/Java/JavaVirtualMachines/jdk-11.jdk/Contents/Home
```

Because of this, I can have multiple scripts setting up different `JAVA_HOME`s for different cases. If I want to use Java 11:

```bash
export JAVA_HOME=`/usr/libexec/java_home -v '11.0'`
```

If I want to use Java 17:

```bash
export JAVA_HOME=`/usr/libexec/java_home -v '17.0'`
```

And since Java updates the same location whenever there's a critical patch update, I don't have to worry about the path being different, because `java_home` will take care of that.