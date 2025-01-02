---
title: "Run Remote Diagnostic Agent on OSB Domain"
description: "Using Remote Diagnostic Agent (RDA) to troubleshoot OSB domain issues and gain insights into configuration and root causes."
---


I have been asked to review the issue encountered in an OSB instance running in production. I am kind of reluctant to review the error in face value because after years of dealing with Oracle Fusion Middleware products such as WebLogic, OSB and SOA Suite, I learned that sometimes the error we see in the logs are not the actual problem, but more of symptoms of the real problem. I saw errors related to security, which one can suggest doing Cross Domain Security - but I know that is not the problem; because at one point I fell through that trap, configured cross domain security and still the problem happens.

So never again.

While investigating the issue, I asked them to run RDA or Remote Diagnostics Agent on their OSB domain so I can have a bird's eye view of their domain configuration. It will also take advantage of the Diagnostic Repository which stores the incidents that have occurred in the instance. The good thing with Diagnostic Repository is that it stores a readme.txt describing the error, and other supporting files, such as JRF, and thread dump. I was then able to figure out that they have a problem with their Work Manager where its limits have already been reached.

So you see, it's a good thing to run when investigating an issue - or helping someone who's doing the investigation. 

Here's how to run RDA on OSB:

## Setup RDA Configuration for OSB Domain

You can execute the following commands to declare the ORACLE_HOME and DOMAIN_HOME environment variables:

```bash
export ORACLE_HOME=/u01/app/oracle/Middleware/Oracle_Home
export DOMAIN_HOME=/u01/app/oracle/Middleware/Oracle_Home/user_projects/domains/my_OSB_domain
```

... or if you don't want to do that, you can run this command to initialize those variables

```bash
source $DOMAIN_HOME/bin/setDomainEnv.sh
```

```batch
%DOMAIN_HOME%\bin\setDomainEnv
```

## Run RDA to Configure the Data Collection

Go to the RDA_HOME and run `rda.sh`:

```bash
cd $ORACLE_HOME/oracle_common/rda

./rda.sh -S -p FM12c_OsbMin
```

## Run RDA Again to Start Data Collection

```bash
cd $ORACLE_HOME/oracle_common/rda

./rda.sh
```

## Collect the RDA Zip File

RDA will create a zipped file of the data collected and put it in the RDA Home.

So there you go! You can extract that folder and open `__RDAstart.htm` to see the output. 

