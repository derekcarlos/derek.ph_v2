---
title: "Update OSB Data Source Connections"
permalink: /blog/osb-data-source-update
date: 2024-02-11
categories: [How-To, Oracle Service Bus]
tags: [osb,wlst]
image:
    path: /assets/img/headers/osb-data-source-update.png
---

If you create a WebLogic domain for Oracle Service Bus, it will ask you to create database schemas using the Repository Creation Utility or RCU. The OSB WebLogic domain will require connectivity to these database schemas to start up successfully.

So if there comes a chance that the customer decides to migrate their database to another server, that would mean you have to update the data sources defined within the OSB WebLogic domain. You can change these from the XML files within the `$DOMAIN_HOME/config/jdbc` folder, but that's something we can automate via WLST.
In this post I am going to share a simple set of work instructions to do just that - how to update OSB data source connections in the event of database server migrations via WLST.

In this scenario, the OSB WebLogic 12.1.3 domain uses GridLink connections, so it's important to get two pieces of information:

* The new JDBC connection string
* The new ONS nodes

Once you have these, you can update the script below:

```python title="updateOSB_DS.py"

# Convert existing Generic Datasources to Active Grid Link
if __name__ == '__main__': 
    from wlstModule import *#@UnusedWildImport
    
def updateDataSource(datasource, jdbcURL, nodes):
    print 'Processing ' + datasource
    # Remove DataSource Targets
    edit()
    startEdit()
    
    
    jdbcDS = getMBean('/JDBCSystemResources/' + datasource)
    dsTargets = jdbcDS.getTargets()
    jdbcDS.setTargets(jarray.array([], weblogic.management.configuration.TargetMBean))
    
    save()
    activate(block="true")
    
    startEdit()
    
    # Update the JDBC Connection String
    jdbcDS = getMBean('/JDBCSystemResources/' + datasource)
    jdbcDriverParams = jdbcDS.getJDBCResource().getJDBCDriverParams()
    
    jdbcDriverParams.setUrl(jdbcURL)
    
    # Set ONS Nodes
    jdbcOracleParams = jdbcDS.getJDBCResource().getJDBCOracleParams()
    jdbcOracleParams.setOnsNodeList(nodes)
        
    save()
    activate(block="true")
    
    startEdit()
    
    # Re-target the datasource
    jdbcDS = getMBean('/JDBCSystemResources/' + datasource)
    jdbcDS.setTargets(dsTargets)
    
    save()
    activate(block="true")

print 'starting the script ....'

username = 'weblogic'
password = 'welcome123'
url='t3://osb-admin-host:7001'

osb_jdbcURL = 'jdbc:oracle:thin:@(DESCRIPTION=(ENABLE=BROKEN)(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=db-scan-address.host.example.com)(PORT=1521)))(CONNECT_DATA=(SERVICE_NAME=ORCLDB)))'
nodes = 'db-scan-address.host.example.com:6200'

connect(username,password,url)

updateDataSource('LocalSvcTblDataSource', osb_jdbcURL, nodes)
updateDataSource('mds-owsm', osb_jdbcURL, nodes)
updateDataSource('opss-audit-DBDS', osb_jdbcURL, nodes)
updateDataSource('opss-audit-viewDS', osb_jdbcURL, nodes)
updateDataSource('opss-data-source', osb_jdbcURL, nodes)
updateDataSource('OraSDPMDataSource', osb_jdbcURL, nodes)
updateDataSource('SOADataSource', osb_jdbcURL, nodes)
updateDataSource('SOALocalTxDataSource', osb_jdbcURL, nodes)
updateDataSource('wlsbjmsrpDataSource', osb_jdbcURL, nodes)
```

Here is the work instruction that you can follow to update the data source connection strings of your OSB WebLogic domain:

Create a backup of the JDBC Configuration. We will back up the `jdbc` folder inside the WebLogic domain i.e. `$DOMAIN_HOME/config/jdbc`.

```bash
cp -r $DOMAIN_HOME/config/jdbc $DOMAIN_HOME/config/jdbc-backup
```

Create a backup of the `fmwconfig` folder. Create a backup of the `$DOMAIN_HOME/config/fmwconfig` folder.

```bash
cp -r $DOMAIN_HOME/config/fmwconfig $DOMAIN_HOME/config/fmwconfig-backup
```

Shutdown the OSB managed servers.

Run the `updateOSB_DS.py`

```bash
$MW_HOME/oracle_common/common/bin/wlst.sh updateOSB_DS.py
```

Modify the following JPS configuration files under $DOMAIN_HOME/config/fmwconfig - replace the OLD JDBC connection string:

* `jps-config-jse.xml`
* `jps-config.xml`

Start OSB Managed Servers

That's it! The OSB Managed Servers should be running and all deployments should be running or active.